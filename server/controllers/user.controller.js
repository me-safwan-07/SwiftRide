const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

// POST: /api/user/register
module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    
    // Check if username already exists
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    };

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });
    
    // generate auth token using jwt
    const token = await user.generateAuthToken();

    res.status(200).json({ token, user });
}

// POST: /api/user/login
module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = await user.generateAuthToken();
    
    res.cookie('token', token);

    res.status(200).json({ token, user});
}

// GET: /api/user/profile
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

// POST: /api/user/logout
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = await req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
};
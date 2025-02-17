const { validationResult } = require("express-validator");
const captanModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;
        
        // check if captain already exists
        const isCaptainAlreadyExists = await captanModel.findOne({ email });
        if (isCaptainAlreadyExists) {
            return res.status(400).json({ message: "Captain already exists" });
        }
        
        // Hash password
        const hashedPassword = await captanModel.hashPassword(password)
        
        // create new captain
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        
        // Generate authentication token
        const token = captain.generateAuthToken();

        // Set token in httpOnly cookies for security
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict"
        });

        res.status(201).json({ success: true, token, captain });
    } catch (err) {
        next(err);
    }   
};

module.exports.loginCaptain = async (req, res, next) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { email, password } = req.body;
        
        // Find captain with password field included
        const captain = await captanModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Check if password matches
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Generate authentication token
        const token = await captain.generateAuthToken();
        
        // Set token in httpOnly cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict"
        })
        res.status(200).json({ success: true, token, captain });
    } catch (error) {
        next(error);
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        res.status(200).json({ captain: req.captain });
    } catch (error) {
        next(error);
    }
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        // Blacklist token to prevent reuse
        await blacklistTokenModel.create({ token });
        
        // clear cookies
        res.clearCookie('token');

        res.status(200).json({ sucess: true, message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};
const { validationResult } = require("express-validator");
const captanModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captanModel.findOne({ email });

    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captanModel.hashPassword(password)

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

    const token = captain.generateAuthToken();

    res.status(200).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captanModel.findOne({ email }).select('+password');
    
    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    console.log(captain);

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = await captain.generateAuthToken();

    res.cookie(token);

    res.status(200).json({ token, captain });
}
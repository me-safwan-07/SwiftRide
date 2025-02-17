const express = require('express');
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// GET: /api/captain/
router.post(
    '/register', 
    [
        body('email').isEmail().withMessage("Invalid EMail"),
        body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body('vehicle.color').isLength({ min: 3}).withMessage("Color must be at least 3 characters long"),
        body('vehicle.plate')
            .trim() // Removes any leading or trailing spaces
            .toUpperCase() // Converts the plate to uppercase
            .isLength({ min: 6 }) // Checks that the length is at least 6 characters
            .withMessage("Plate must be at least 6 characters long")
            .matches(/^[A-Z0-9]+$/) // Ensure the plate only contains uppercase letters and numbers
            .withMessage("Plate must only contain uppercase letters and numbers"),
        body('vehicle.capacity').isLength({ min: 1}).withMessage("Capacity must be at least 1").isUppercase().withMessage("Plate must have all Uppercase characters"),
        body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle type"),
    ], 
    captainController.registerCaptain
);

// GET: /api/captain/
router.post(
    '/login', 
    [
        body('email').isEmail().withMessage("Invalid EMail"),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    captainController.loginCaptain
);

// GET: /api/captain/profile
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

// GET: /api/captain/logout
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);
module.exports = router;
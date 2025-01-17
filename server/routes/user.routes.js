const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// register
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({  min: 3 }).withMessage('Firstname must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ], 
    userController.registerUser
);

// login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
    ],
    userController.loginUser
);

// profile
router.get(
    '/profile',
    authMiddleware.authUser,
    userController.getUserProfile
);

// logout
router.post(
    '/logout',
    authMiddleware.authUser,
    userController.logoutUser
)

module.exports = router;
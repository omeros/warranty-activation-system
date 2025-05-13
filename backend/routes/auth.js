const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

/**
 * Authentication routes
 */

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', authController.signup);

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', authController.login);

module.exports = router;

















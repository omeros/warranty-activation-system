// routes/users.js

const express = require('express');
const { authenticate } = require('../middlaware/auth');   // note correct folder name!
const {
  getProfile,
  updateProfile,
  changePassword,
} = require('../controllers/UserController');

const router = express.Router();

// All routes under /api/users require a valid JWT
router.use(authenticate);

/**
 * @route   GET /api/users/me
 * @desc    Return the logged-in user’s profile
 * @access  Private
 */
router.get('/me', getProfile);

/**
 * @route   PUT /api/users/me
 * @desc    Update the logged-in user’s profile
 * @access  Private
 */
router.put('/me', updateProfile);

/**
 * @route   PUT /api/users/change-password
 * @desc    Change the logged-in user’s password
 * @access  Private
 */
router.put('/change-password', changePassword);

module.exports = router;

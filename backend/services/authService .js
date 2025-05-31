const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

/**
 * Authentication Service
 * Contains business logic for authentication operations
 */
class AuthService {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Object} - New user and token
   */
  async signup(userData) {
    try {
      // Check if user exists
      const existingUser = await User.findOne({ username: userData.username });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      console.log('AuthService - signup -userData:', userData);
      // Create new user - password hashing happens in the User model pre-save hook
      const user = new User(userData);
      await user.save();
      
      // Generate JWT token
      const token = this.generateToken(user);
      
      return { user, token };
    } catch (error) {
      throw error; // Re-throw to be handled by controller
    }
  }
  
  /**
   * Authenticate a user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Object} - User and token
   */
  async login(username, password) {
    try {
      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      console.log('user=>',user);
      
      
      // Check password
      const isMatch = await user.comparePassword(password);
      console.log('isMatch=>',isMatch);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      
      // Generate JWT token
      const token = this.generateToken(user);
      
      return { user, token };
    } catch (error) {
      throw error; // Re-throw to be handled by controller
    }
  }
  
  /**
   * Generate JWT token
   * @param {Object} user - User object
   * @returns {string} - JWT token
   */
    generateToken(user) {
    // Build a clear payload
    const payload = {
      userId:   user._id.toString(),  // explicit field name
      username: user.username,
      role:     user.role,            // include role for adminOnly checks
    };

    return jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1d' }
    );
  }
}

module.exports = new AuthService();
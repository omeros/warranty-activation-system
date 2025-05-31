const authService = require('../services/authService ');
const { validateSignup, validateLogin } = require('../utils/validators');

/**
 * Authentication Controller
 * Handles authentication route logic
 */
class AuthController {
  /**
   * Register a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async signup(req, res, next) {
    try {
      console.log('Received request body:', req.body);
      console.log('Request headers:', req.headers);
      const credentials = req.body
      // Validate input
      // const { isValid, errors } = validateSignup(credentials);
      // if (!isValid) {
      //   return res.status(400).json({ message: 'Validation error', errors });
      // }
      
      // Process signup through service
      const { user, token } = await authService.signup(credentials);
      
      // Send response
      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Authenticate a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async login(req, res, next) {
    try {
      console.log('login - Received request body:', req.body);
      console.log('login - Request headers:', req.headers);
      // const credentials = req.body
      // console.log('login ======> :',credentials );
      
      // Validate input
      // const { isValid, errors } = validateLogin(req.body);
      // if (!isValid) {
      //   return res.status(400).json({ message: 'Validation error', errors });
      // }
      
      const { username, password } = req.body;
      
      // Process login through service
      const { user, token } = await authService.login(username, password);
      
      // Send response
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          fullname: user.fullname,
          email: user.email
        }
      });
    } catch (error) {
      // Handle specific errors
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new AuthController();
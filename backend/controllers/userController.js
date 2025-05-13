const userService = require('../services/userService');

/**
 * User Controller
 * Handles user-related route logic
 */
class UserController {



  async gewtUsers(req, res){
    const users = userService.getUsers()
    res.send(users)
  }

  /**
   * Get user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getProfile(req, res, next) {
    try {
      // User is already available from auth middleware
      const user = req.user;
      
      res.json({
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email
      });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Update user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async updateProfile(req, res, next) {
    try {
      const { fullname, email } = req.body;
      
      // Process update through service
      const user = await userService.updateProfile(req.user._id, { 
        fullname, 
        email 
      });
      
      res.json({
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email
      });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Change user password
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      
      // Validate input
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ 
          message: 'Current password and new password are required' 
        });
      }
      
      if (newPassword.length < 6) {
        return res.status(400).json({ 
          message: 'New password must be at least 6 characters' 
        });
      }
      
      // Process password change through service
      await userService.changePassword(
        req.user._id, 
        currentPassword, 
        newPassword
      );
      
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      // Handle specific errors
      if (error.message === 'Current password is incorrect') {
        return res.status(401).json({ message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new UserController();
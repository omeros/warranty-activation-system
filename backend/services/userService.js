const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

/**
 * User Service
 * Contains business logic for user-related operations
 */
class UserService {
  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Object} - User object
   */
  // async getUsers() {
  //   try {
  //     const users = await User.find();
  //     if (!users) {
  //       throw new Error('Users not found');
  //     }
  //     return users;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async getUsers(page = 1, perPage = 20) {
    try {
      const users = await User
        .find({ role: 'installer' })      // only installers
        .select('-password')              // exclude password field
        .skip((page - 1) * perPage)       // skip offset
        .limit(perPage)                   // limit page size
        .lean();                          // return plain JS objects
      return users;
    } catch (error) {
      throw error;
    }
  }
    async getByIds(ids) {
    return User.find({ _id: { $in: ids } })
      .select('-password')  // exclude sensitive fields
      .lean();
  }
  
  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Object} - Updated user
   */
  async updateProfile(userId, updateData) {
    try {
      // Only allow updating specific fields
      const allowedUpdates = {
        fullname: updateData.fullname,
        email: updateData.email
      };
      
      // Remove undefined values
      Object.keys(allowedUpdates).forEach(key => 
        allowedUpdates[key] === undefined && delete allowedUpdates[key]
      );
      
      const user = await User.findByIdAndUpdate(
        userId,
        allowedUpdates,
        { new: true, runValidators: true }
      );
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Change user password
   * @param {string} userId - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {boolean} - Success status
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        throw new Error('Current password is incorrect');
      }
      
      // Update password - will be hashed by pre-save hook
      user.password = newPassword;
      await user.save();
      
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
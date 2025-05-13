/**
 * Validates signup data
 * @param {Object} data - User signup data
 * @returns {Object} Validation result
 */
const validateSignup = (data) => {
  const errors = {};
  
  // Validate username
  if (!data.username || data.username.trim() === '') {
    errors.username = 'Username is required';
  } else if (data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }
  
  // Validate password
  if (!data.password || data.password === '') {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  // Validate fullname
  if (!data.fullname || data.fullname.trim() === '') {
    errors.fullname = 'Full name is required';
  }
  
  // Validate email (if provided)
  if (data.email && data.email.trim() !== '') {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please provide a valid email address';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates login data
 * @param {Object} data - User login data
 * @returns {Object} Validation result
 */
const validateLogin = (data) => {
  const errors = {};
  
  // Validate username
  if (!data.username || data.username.trim() === '') {
    errors.username = 'Username is required';
  }
  
  // Validate password
  if (!data.password || data.password === '') {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateSignup,
  validateLogin
};
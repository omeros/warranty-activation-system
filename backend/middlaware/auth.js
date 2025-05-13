// middleware/auth.js
const jwt  = require('jsonwebtoken');
const User = require('../models/UserModel');

async function authenticate(req, res, next) {
  try {
    // 1. Extract and validate the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // 2. Verify token and grab payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded.userId, decoded.username, decoded.role should be present

    // 3. Fetch the full user record (to confirm they still exist)
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // 4. Attach only the needed safe fields to req.user
    req.user = {
      id:       user._id.toString(),
      username: user.username,
      role:     user.role,
    };

    // 5. Proceed
    next();
  } catch (err) {
    console.error('Auth error:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
}

module.exports = { authenticate, requireAdmin };

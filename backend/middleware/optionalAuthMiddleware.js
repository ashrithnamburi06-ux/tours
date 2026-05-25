// backend/middleware/optionalAuthMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      req.user = null;
    }
  }
  next();
};

const publicListFilter = (req) => {
  if (req.query.all === 'true' && req.user && req.user.role === 'admin') {
    return {};
  }
  return { status: 'active' };
};

module.exports = { optionalAuth, publicListFilter };

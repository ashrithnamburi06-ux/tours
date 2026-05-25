// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register (public in dev, restrict later)
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get user profile (protected)
router.get('/profile', protect, getProfile);

module.exports = router;

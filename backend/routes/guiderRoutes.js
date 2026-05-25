// backend/routes/guiderRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getGuiders,
  getGuiderById,
  createGuider,
  updateGuider,
  deleteGuider,
  changeGuiderStatus,
} = require('../controllers/guiderController');

const { optionalAuth } = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

// Public GET routes
router.get('/', optionalAuth, getGuiders);
router.get('/:id', getGuiderById);

// Protected admin routes
router.post('/', protect, admin, createGuider);
router.put('/:id', protect, admin, updateGuider);
router.delete('/:id', protect, admin, deleteGuider);
router.patch('/:id/status', protect, admin, changeGuiderStatus);

module.exports = router;

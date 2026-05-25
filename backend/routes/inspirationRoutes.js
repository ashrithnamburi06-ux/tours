// backend/routes/inspirationRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getInspirations,
  getInspirationById,
  createInspiration,
  updateInspiration,
  deleteInspiration,
  changeInspirationStatus,
} = require('../controllers/inspirationController');
// Validation can reuse packageValidation for title presence if needed
const { packageValidation } = require('../middleware/validationMiddleware');

const { optionalAuth } = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

// Public GET routes
router.get('/', optionalAuth, getInspirations);
router.get('/:id', getInspirationById);

// Protected admin routes
router.post('/', protect, admin, createInspiration);
router.put('/:id', protect, admin, updateInspiration);
router.delete('/:id', protect, admin, deleteInspiration);
router.patch('/:id/status', protect, admin, changeInspirationStatus);

module.exports = router;

// backend/routes/testimonialRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  changeTestimonialStatus,
} = require('../controllers/testimonialController');

const { optionalAuth } = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

// Public GET routes
router.get('/', optionalAuth, getTestimonials);
router.get('/:id', getTestimonialById);

// Protected admin routes
router.post('/', protect, admin, createTestimonial);
router.put('/:id', protect, admin, updateTestimonial);
router.delete('/:id', protect, admin, deleteTestimonial);
router.patch('/:id/status', protect, admin, changeTestimonialStatus);

module.exports = router;

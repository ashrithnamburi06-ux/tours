// backend/routes/faqRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  changeFAQStatus,
} = require('../controllers/faqController');
const { faqValidation } = require('../middleware/validationMiddleware');

const { optionalAuth } = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

// Public GET routes
router.get('/', optionalAuth, getFAQs);
router.get('/:id', getFAQById);

// Protected admin routes
router.post('/', protect, admin, faqValidation, createFAQ);
router.put('/:id', protect, admin, faqValidation, updateFAQ);
router.delete('/:id', protect, admin, deleteFAQ);
router.patch('/:id/status', protect, admin, changeFAQStatus);

module.exports = router;

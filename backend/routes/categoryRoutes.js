// backend/routes/categoryRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  changeCategoryStatus,
} = require('../controllers/categoryController');
const { packageValidation } = require('../middleware/validationMiddleware'); // reuse package validation for name requirement maybe

const { optionalAuth } = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

// Public GET routes
router.get('/', optionalAuth, getCategories);
router.get('/:id', getCategoryById);

// Protected admin routes
router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);
router.patch('/:id/status', protect, admin, changeCategoryStatus);

module.exports = router;

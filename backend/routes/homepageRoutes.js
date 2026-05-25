// backend/routes/homepageRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  changeStatus,
} = require('../controllers/homepageController');

const router = express.Router();

// Public GET routes
router.get('/', getAllSections);
router.get('/:id', getSectionById);

// Protected admin routes
router.post('/', protect, admin, createSection);
router.put('/:id', protect, admin, updateSection);
router.delete('/:id', protect, admin, deleteSection);
router.patch('/:id/status', protect, admin, changeStatus);

module.exports = router;

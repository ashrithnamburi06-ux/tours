// backend/routes/galleryRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  changeGalleryStatus,
} = require('../controllers/galleryController');

const { optionalAuth } = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

router.get('/', optionalAuth, getGalleryItems);
router.get('/:id', getGalleryItemById);

router.post('/', protect, admin, createGalleryItem);
router.put('/:id', protect, admin, updateGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);
router.patch('/:id/status', protect, admin, changeGalleryStatus);

module.exports = router;

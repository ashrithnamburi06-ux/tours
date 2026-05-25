// backend/routes/destinationRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  changeStatus,
  seedDestinationsAndPackages,
} = require('../controllers/destinationController');
const { destinationValidation } = require('../middleware/validationMiddleware');
const { destinationUploadOptional } = require('../middleware/conditionalUploadMiddleware');
const { optionalAuth } = require('../middleware/optionalAuthMiddleware');

const router = express.Router();

// Public GET & Action routes
router.get('/', optionalAuth, getAllDestinations);
router.get('/:id', getDestinationById);
router.post('/seed', seedDestinationsAndPackages);

// Protected admin routes
router.post('/', protect, admin, destinationUploadOptional, destinationValidation, createDestination);
router.put('/:id', protect, admin, destinationUploadOptional, destinationValidation, updateDestination);
router.delete('/:id', protect, admin, deleteDestination);
router.patch('/:id/status', protect, admin, changeStatus);

module.exports = router;

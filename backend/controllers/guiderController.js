// backend/controllers/guiderController.js
const asyncHandler = require('express-async-handler');
const Guider = require('../models/guiderModel');

// Create guider (admin only)
const createGuider = asyncHandler(async (req, res) => {
  const guider = new Guider(req.body);
  const created = await guider.save();
  res.status(201).json({ success: true, data: created });
});

// Get all active guiders
const getGuiders = asyncHandler(async (req, res) => {
  const { publicListFilter } = require('../middleware/optionalAuthMiddleware');
  const guiders = await Guider.find(publicListFilter(req));
  res.json({ success: true, data: guiders });
});

// Get guider by ID
const getGuiderById = asyncHandler(async (req, res) => {
  const guider = await Guider.findById(req.params.id);
  if (!guider) {
    res.status(404);
    throw new Error('Guider not found');
  }
  res.json({ success: true, data: guider });
});

// Update guider (admin only)
const updateGuider = asyncHandler(async (req, res) => {
  const updated = await Guider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('Guider not found');
  }
  res.json({ success: true, data: updated });
});

// Delete guider (admin only)
const deleteGuider = asyncHandler(async (req, res) => {
  const guider = await Guider.findById(req.params.id);
  if (!guider) {
    res.status(404);
    throw new Error('Guider not found');
  }
  await guider.remove();
  res.json({ success: true, data: { message: 'Guider removed' } });
});

// Change status (admin only)
const changeGuiderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updated = await Guider.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Guider not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  createGuider,
  getGuiders,
  getGuiderById,
  updateGuider,
  deleteGuider,
  changeGuiderStatus,
};

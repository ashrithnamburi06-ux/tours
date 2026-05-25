// backend/controllers/homepageController.js
const asyncHandler = require('express-async-handler');
const HomepageSection = require('../models/homepageModel');

// @desc    Get all homepage sections (public)
// @route   GET /api/homepage
// @access  Public
const getAllSections = asyncHandler(async (req, res) => {
  const sections = await HomepageSection.find({ status: 'active' }).sort({ displayOrder: 1 });
  res.json({ success: true, data: sections });
});

// @desc    Get a single section by ID
// @route   GET /api/homepage/:id
// @access  Public
const getSectionById = asyncHandler(async (req, res) => {
  const section = await HomepageSection.findById(req.params.id);
  if (!section) {
    res.status(404);
    throw new Error('Section not found');
  }
  res.json({ success: true, data: section });
});

// @desc    Create a new homepage section
// @route   POST /api/homepage
// @access  Admin
const createSection = asyncHandler(async (req, res) => {
  const section = await HomepageSection.create(req.body);
  res.status(201).json({ success: true, data: section });
});

// @desc    Update a homepage section
// @route   PUT /api/homepage/:id
// @access  Admin
const updateSection = asyncHandler(async (req, res) => {
  const updated = await HomepageSection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('Section not found');
  }
  res.json({ success: true, data: updated });
});

// @desc    Delete a homepage section
// @route   DELETE /api/homepage/:id
// @access  Admin
const deleteSection = asyncHandler(async (req, res) => {
  const section = await HomepageSection.findById(req.params.id);
  if (!section) {
    res.status(404);
    throw new Error('Section not found');
  }
  await section.remove();
  res.json({ success: true, data: { message: 'Section deleted' } });
});

// @desc    Change status (active/inactive)
// @route   PATCH /api/homepage/:id/status
// @access  Admin
const changeStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // expect { status: 'active' }
  if (!['active', 'inactive'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }
  const updated = await HomepageSection.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Section not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  changeStatus,
};

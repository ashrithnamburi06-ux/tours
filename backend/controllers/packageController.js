// backend/controllers/packageController.js
const asyncHandler = require('express-async-handler');
const Package = require('../models/packageModel');
const slugify = require('../utils/slugify');

// @desc    Create new package (admin only)
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = asyncHandler(async (req, res) => {
  const { title, description, price, images, category, destination } = req.body;
  const slug = slugify(title);
  const pkg = new Package({ title, slug, description, price, images, category, destination });
  const created = await pkg.save();
  res.status(201).json({ success: true, data: created });
});

// @desc    Get all active packages
// @route   GET /api/packages
// @access  Public
const getPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find({ status: 'active' }).populate('category destination');
  res.json({ success: true, data: packages });
});

// @desc    Get package by ID
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id).populate('category destination');
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  res.json({ success: true, data: pkg });
});

// @desc    Update package (admin only)
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (title) req.body.slug = slugify(title);
  const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('Package not found');
  }
  res.json({ success: true, data: updated });
});

// @desc    Delete package (admin only)
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  await pkg.remove();
  res.json({ success: true, data: { message: 'Package removed' } });
});

// @desc    Change status (admin only)
// @route   PATCH /api/packages/:id/status
// @access  Private/Admin
const changePackageStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // expect 'active' or 'inactive'
  const updated = await Package.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Package not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  changePackageStatus,
};

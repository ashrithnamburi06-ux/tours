// backend/controllers/inspirationController.js
const asyncHandler = require('express-async-handler');
const Inspiration = require('../models/inspirationModel');
const slugify = require('../utils/slugify');

// Create inspiration (admin only)
const createInspiration = asyncHandler(async (req, res) => {
  const { title, excerpt, content, images } = req.body;
  const slug = slugify(title);
  const inspiration = new Inspiration({ title, slug, excerpt, content, images });
  const created = await inspiration.save();
  res.status(201).json({ success: true, data: created });
});

// Get all active inspirations
const getInspirations = asyncHandler(async (req, res) => {
  const { publicListFilter } = require('../middleware/optionalAuthMiddleware');
  const inspirations = await Inspiration.find(publicListFilter(req));
  res.json({ success: true, data: inspirations });
});

// Get inspiration by ID or Slug
const getInspirationById = asyncHandler(async (req, res) => {
  const idOrSlug = req.params.id;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
  
  let insp;
  if (isObjectId) {
    insp = await Inspiration.findById(idOrSlug);
  } else {
    insp = await Inspiration.findOne({ slug: idOrSlug });
  }

  if (!insp) {
    res.status(404);
    throw new Error('Inspiration not found');
  }
  res.json({ success: true, data: insp });
});

// Update inspiration (admin only)
const updateInspiration = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (title) req.body.slug = slugify(title);
  const updated = await Inspiration.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('Inspiration not found');
  }
  res.json({ success: true, data: updated });
});

// Delete inspiration (admin only)
const deleteInspiration = asyncHandler(async (req, res) => {
  const insp = await Inspiration.findById(req.params.id);
  if (!insp) {
    res.status(404);
    throw new Error('Inspiration not found');
  }
  await insp.remove();
  res.json({ success: true, data: { message: 'Inspiration removed' } });
});

// Change status (admin only)
const changeInspirationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updated = await Inspiration.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Inspiration not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  createInspiration,
  getInspirations,
  getInspirationById,
  updateInspiration,
  deleteInspiration,
  changeInspirationStatus,
};

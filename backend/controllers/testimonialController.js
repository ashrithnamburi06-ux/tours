// backend/controllers/testimonialController.js
const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/testimonialModel');

// Create testimonial (admin only)
const createTestimonial = asyncHandler(async (req, res) => {
  const { author, title, text, rating, ratingType, photo, designation } = req.body;
  const testimonial = new Testimonial({ author, title, text, rating, ratingType, photo, designation });
  const created = await testimonial.save();
  res.status(201).json({ success: true, data: created });
});

// Get all active testimonials
const getTestimonials = asyncHandler(async (req, res) => {
  const { publicListFilter } = require('../middleware/optionalAuthMiddleware');
  const testimonials = await Testimonial.find(publicListFilter(req));
  res.json({ success: true, data: testimonials });
});

// Get testimonial by ID
const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  res.json({ success: true, data: testimonial });
});

// Update testimonial (admin only)
const updateTestimonial = asyncHandler(async (req, res) => {
  const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  res.json({ success: true, data: updated });
});

// Delete testimonial (admin only)
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  await testimonial.remove();
  res.json({ success: true, data: { message: 'Testimonial removed' } });
});

// Change status (admin only)
const changeTestimonialStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updated = await Testimonial.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  changeTestimonialStatus,
};

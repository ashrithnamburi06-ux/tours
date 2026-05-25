// backend/controllers/faqController.js
const asyncHandler = require('express-async-handler');
const FAQ = require('../models/faqModel');

// Create FAQ (admin only)
const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, category } = req.body;
  const faq = new FAQ({ question, answer, category });
  const created = await faq.save();
  res.status(201).json({ success: true, data: created });
});

// Get all active FAQs
const getFAQs = asyncHandler(async (req, res) => {
  const { publicListFilter } = require('../middleware/optionalAuthMiddleware');
  const faqs = await FAQ.find(publicListFilter(req));
  res.json({ success: true, data: faqs });
});

// Get FAQ by ID
const getFAQById = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  res.json({ success: true, data: faq });
});

// Update FAQ (admin only)
const updateFAQ = asyncHandler(async (req, res) => {
  const updated = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  res.json({ success: true, data: updated });
});

// Delete FAQ (admin only)
const deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  await faq.deleteOne();
  res.json({ success: true, data: { message: 'FAQ removed' } });
});

// Change status (admin only)
const changeFAQStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updated = await FAQ.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  createFAQ,
  getFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  changeFAQStatus,
};

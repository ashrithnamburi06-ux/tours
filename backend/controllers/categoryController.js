// backend/controllers/categoryController.js
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const slugify = require('../utils/slugify');

// Create category (admin only)
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const slug = slugify(name);
  const cat = new Category({ name, slug, description });
  const created = await cat.save();
  res.status(201).json({ success: true, data: created });
});

// Get all active categories
const getCategories = asyncHandler(async (req, res) => {
  const { publicListFilter } = require('../middleware/optionalAuthMiddleware');
  const categories = await Category.find(publicListFilter(req));
  res.json({ success: true, data: categories });
});

// Get category by ID
const getCategoryById = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ success: true, data: cat });
});

// Update category (admin only)
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (name) req.body.slug = slugify(name);
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ success: true, data: updated });
});

// Delete category (admin only)
const deleteCategory = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) {
    res.status(404);
    throw new Error('Category not found');
  }
  await cat.remove();
  res.json({ success: true, data: { message: 'Category removed' } });
});

// Change status (admin only)
const changeCategoryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updated = await Category.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  changeCategoryStatus,
};

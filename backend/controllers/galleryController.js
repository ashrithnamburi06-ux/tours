// backend/controllers/galleryController.js
const asyncHandler = require('express-async-handler');
const Gallery = require('../models/galleryModel');

const createGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json({ success: true, data: item });
});

const getGalleryItems = asyncHandler(async (req, res) => {
  const { publicListFilter } = require('../middleware/optionalAuthMiddleware');
  const items = await Gallery.find(publicListFilter(req)).sort({ displayOrder: 1 });
  res.json({ success: true, data: items });
});

const getGalleryItemById = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  res.json({ success: true, data: item });
});

const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  res.json({ success: true, data: item });
});

const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  await item.deleteOne();
  res.json({ success: true, data: { message: 'Gallery item removed' } });
});

const changeGalleryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const item = await Gallery.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  res.json({ success: true, data: item });
});

module.exports = {
  createGalleryItem,
  getGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem,
  changeGalleryStatus,
};

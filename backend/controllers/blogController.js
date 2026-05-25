// backend/controllers/blogController.js
const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');
const slugify = require('../utils/slugify');

// Create a blog post (admin only)
const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, author, coverImage, images } = req.body;
  const slug = slugify(title);
  const blog = new Blog({ title, slug, excerpt, content, author, coverImage, images });
  const created = await blog.save();
  res.status(201).json({ success: true, data: created });
});

// Get all active blogs
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ status: 'active' }).sort({ publishedAt: -1 });
  res.json({ success: true, data: blogs });
});

// Get blog by ID
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  res.json({ success: true, data: blog });
});

// Update blog (admin only)
const updateBlog = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (title) req.body.slug = slugify(title);
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404);
    throw new Error('Blog not found');
  }
  res.json({ success: true, data: updated });
});

// Delete blog (admin only)
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  await blog.remove();
  res.json({ success: true, data: { message: 'Blog removed' } });
});

// Change status (admin only)
const changeBlogStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const updated = await Blog.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) {
    res.status(404);
    throw new Error('Blog not found');
  }
  res.json({ success: true, data: updated });
});

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  changeBlogStatus,
};

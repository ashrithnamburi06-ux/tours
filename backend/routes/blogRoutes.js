// backend/routes/blogRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  changeBlogStatus,
} = require('../controllers/blogController');

const router = express.Router();

// Public GET routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Protected admin routes
router.post('/', protect, admin, createBlog);
router.put('/:id', protect, admin, updateBlog);
router.delete('/:id', protect, admin, deleteBlog);
router.patch('/:id/status', protect, admin, changeBlogStatus);

module.exports = router;

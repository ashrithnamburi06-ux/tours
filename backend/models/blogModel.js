// backend/models/blogModel.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String },
    coverImage: { type: String },
    images: [{ type: String }],
    author: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);

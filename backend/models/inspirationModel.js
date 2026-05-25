// backend/models/inspirationModel.js
const mongoose = require('mongoose');

const inspirationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String },
    location: { type: String },
    date: { type: Date },
    images: [{ type: String }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inspiration', inspirationSchema);

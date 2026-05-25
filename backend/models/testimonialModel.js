// backend/models/testimonialModel.js
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    ratingType: { type: String, enum: ['dots', 'trustpilot'], default: 'dots' },
    photo: { type: String },
    designation: { type: String, default: 'GoFly Traveler' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);

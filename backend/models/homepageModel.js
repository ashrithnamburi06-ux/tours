// backend/models/homepageModel.js
const mongoose = require('mongoose');

const homepageSectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        'hero',
        'featured_packages',
        'inspirations',
        'testimonials',
        'faq',
        'gallery',
        'counters',
        'offers',
        'why_choose_us',
        'partners',
      ],
      required: true,
    },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String }, // stored file path
    images: [{ type: String }], // for galleries / multiple banners
    ctaText: { type: String },
    ctaLink: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    displayOrder: { type: Number, default: 0 },
    // Additional flexible fields can be stored in a generic object
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HomepageSection', homepageSectionSchema);

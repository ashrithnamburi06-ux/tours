// backend/models/destinationModel.js
const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    state: { type: String }, // Indian state or region
    description: { type: String },
    image: { type: String }, // banner or thumbnail image URL
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Destination', destinationSchema);

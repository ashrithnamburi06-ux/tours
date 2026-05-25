// backend/routes/packageRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { optionalAuth, publicListFilter } = require('../middleware/optionalAuthMiddleware');
const Package = require('../models/packageModel');

const router = express.Router();

const sendList = (res, packages) => {
  res.json({ success: true, data: packages });
};

const sendOne = (res, pkg) => {
  res.json({ success: true, data: pkg });
};

// @desc    Get all packages
// @route   GET /api/packages
router.get('/', optionalAuth, async (req, res) => {
  const filter = publicListFilter(req);
  const packages = await Package.find(filter).populate('category destination');
  sendList(res, packages);
});

// @desc    Get single package
// @route   GET /api/packages/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  const { idOrSlug } = req.params;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

  let pkg;
  if (isObjectId) {
    pkg = await Package.findById(idOrSlug).populate('category destination');
  } else {
    pkg = await Package.findOne({ slug: idOrSlug }).populate('category destination');
  }

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  sendOne(res, pkg);
});

// @desc    Create a package (admin only)
// @route   POST /api/packages
router.post('/', protect, admin, async (req, res) => {
  const pkg = new Package(req.body);
  const created = await pkg.save();
  await created.populate('category destination');
  res.status(201).json({ success: true, data: created });
});

// @desc    Update a package (admin only)
// @route   PUT /api/packages/:id
router.put('/:id', protect, admin, async (req, res) => {
  const updated = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('category destination');
  if (!updated) {
    res.status(404);
    throw new Error('Package not found');
  }
  sendOne(res, updated);
});

// @desc    Delete a package (admin only)
// @route   DELETE /api/packages/:id
router.delete('/:id', protect, admin, async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }
  await pkg.deleteOne();
  res.json({ success: true, data: { message: 'Package removed' } });
});

module.exports = router;

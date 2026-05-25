// backend/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// General storage factory
const storageFactory = (folder) => {
  const uploadPath = path.join(__dirname, '..', 'uploads', folder);
  ensureDir(uploadPath);
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${unique}${ext}`);
    },
  });
};

// File filter – only allow certain image mime types
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5 MB

// Export ready‑to‑use multer middlewares for each entity
const packageUpload = multer({
  storage: storageFactory('packages'),
  fileFilter,
  limits,
}).array('images', 10); // allow up to 10 images per package

const destinationUpload = multer({
  storage: storageFactory('destinations'),
  fileFilter,
  limits,
}).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery', maxCount: 20 },
]);

const blogUpload = multer({
  storage: storageFactory('blogs'),
  fileFilter,
  limits,
}).single('coverImage');

const homepageUpload = multer({
  storage: storageFactory('homepage'),
  fileFilter,
  limits,
}).array('images', 10);

const galleryUpload = multer({
  storage: storageFactory('gallery'),
  fileFilter,
  limits,
}).array('images', 30);

module.exports = {
  packageUpload,
  destinationUpload,
  blogUpload,
  homepageUpload,
  galleryUpload,
};

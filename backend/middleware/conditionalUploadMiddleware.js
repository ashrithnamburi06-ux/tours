// backend/middleware/conditionalUploadMiddleware.js
const { destinationUpload } = require('./uploadMiddleware');

/** Skip multer when admin sends JSON (image URL in body) */
const destinationUploadOptional = (req, res, next) => {
  const ct = req.headers['content-type'] || '';
  if (ct.indexOf('application/json') !== -1) {
    return next();
  }
  return destinationUpload(req, res, next);
};

module.exports = { destinationUploadOptional };

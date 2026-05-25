// backend/middleware/validationMiddleware.js
const { body, validationResult } = require('express-validator');

// Helper to format errors as required
const formatValidationErrors = (errorsArray) => {
  return errorsArray.map(err => ({ field: err.param, message: err.msg }));
};

// Middleware to check validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: formatValidationErrors(errors.array()),
    });
  }
  next();
};

// Validation chains
const packageValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('destination').notEmpty().withMessage('Destination is required'),
  validate,
];

const destinationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  validate,
];

const authValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  validate,
];

const faqValidation = [
  body('question').notEmpty().withMessage('Question is required'),
  body('answer').notEmpty().withMessage('Answer is required'),
  validate,
];

module.exports = {
  packageValidation,
  destinationValidation,
  authValidation,
  faqValidation,
  validate,
};

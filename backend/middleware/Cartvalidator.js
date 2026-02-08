const { body, param, validationResult } = require('express-validator');

/**
 * Validation middleware to check for validation errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validation rules for adding items to cart
 */
const addToCartValidation = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid product ID format'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1, max: 100 })
    .withMessage('Quantity must be between 1 and 100'),
  body('sessionId')
    .notEmpty()
    .withMessage('Session ID is required')
    .isString()
    .withMessage('Session ID must be a string')
    .isLength({ min: 10, max: 100 })
    .withMessage('Session ID must be between 10 and 100 characters'),
  validate,
];

/**
 * Validation rules for updating cart item quantity
 */
const updateCartValidation = [
  param('itemId')
    .notEmpty()
    .withMessage('Item ID is required')
    .isMongoId()
    .withMessage('Invalid item ID format'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1, max: 100 })
    .withMessage('Quantity must be between 1 and 100'),
  body('sessionId')
    .notEmpty()
    .withMessage('Session ID is required')
    .isString()
    .withMessage('Session ID must be a string'),
  validate,
];

/**
 * Validation rules for removing item from cart
 */
const removeFromCartValidation = [
  param('itemId')
    .notEmpty()
    .withMessage('Item ID is required')
    .isMongoId()
    .withMessage('Invalid item ID format'),
  body('sessionId')
    .notEmpty()
    .withMessage('Session ID is required')
    .isString()
    .withMessage('Session ID must be a string'),
  validate,
];

/**
 * Validation rules for getting cart
 */
const getCartValidation = [
  param('sessionId')
    .notEmpty()
    .withMessage('Session ID is required')
    .isString()
    .withMessage('Session ID must be a string'),
  validate,
];

module.exports = {
  addToCartValidation,
  updateCartValidation,
  removeFromCartValidation,
  getCartValidation,
};
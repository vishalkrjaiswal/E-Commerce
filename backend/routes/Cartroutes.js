const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const {
  addToCartValidation,
  updateCartValidation,
  removeFromCartValidation,
  getCartValidation,
} = require('../validators/cartValidator');

router.get('/:sessionId', getCartValidation, getCart);


router.post('/', addToCartValidation, addToCart);


router.put('/:itemId', updateCartValidation, updateCartItem);


router.delete('/:itemId', removeFromCartValidation, removeFromCart);


router.delete('/clear/:sessionId', clearCart);

module.exports = router;
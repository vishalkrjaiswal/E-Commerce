const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { asyncHandler, AppError } = require('../middleware/Errorhandler');

const getCart = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  let cart = await Cart.findOne({ sessionId }).populate({
    path: 'items.product',
    select: 'name price image category stock inStock',
  });

  // Create empty cart if doesn't exist
  if (!cart) {
    cart = await Cart.create({ sessionId, items: [] });
  }

  res.status(200).json({
    success: true,
    data: cart,
  });
});

const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity, sessionId } = req.body;

  // Verify product exists and is in stock
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (!product.inStock || product.stock < quantity) {
    return next(
      new AppError('Product is out of stock or insufficient quantity', 400)
    );
  }

  // Find or create cart
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
  }

  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Update quantity if product exists
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  await cart.save();

  // Populate product details
  await cart.populate({
    path: 'items.product',
    select: 'name price image category stock inStock',
  });

  res.status(200).json({
    success: true,
    message: 'Product added to cart successfully',
    data: cart,
  });
});


const updateCartItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity, sessionId } = req.body;

  const cart = await Cart.findOne({ sessionId });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    return next(new AppError('Item not found in cart', 404));
  }

  // Verify stock availability
  const product = await Product.findById(cart.items[itemIndex].product);
  if (!product || product.stock < quantity) {
    return next(new AppError('Insufficient stock available', 400));
  }

  // Update quantity
  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  await cart.populate({
    path: 'items.product',
    select: 'name price image category stock inStock',
  });

  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    data: cart,
  });
});


const removeFromCart = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { sessionId } = req.body;

  const cart = await Cart.findOne({ sessionId });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    return next(new AppError('Item not found in cart', 404));
  }

  // Remove item
  cart.items.splice(itemIndex, 1);
  await cart.save();

  await cart.populate({
    path: 'items.product',
    select: 'name price image category stock inStock',
  });

  res.status(200).json({
    success: true,
    message: 'Item removed from cart successfully',
    data: cart,
  });
});


const clearCart = asyncHandler(async (req, res, next) => {
  const { sessionId } = req.params;

  const cart = await Cart.findOne({ sessionId });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully',
    data: cart,
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
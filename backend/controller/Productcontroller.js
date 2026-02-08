const Product = require('../models/Product');
const { asyncHandler, AppError } = require('../middleware/Errorhandler');


const getAllProducts = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, search, sort } = req.query;

  // Build query
  let query = {};

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (search) {
    query.$text = { $search: search };
  }

  // Execute query
  let productsQuery = Product.find(query);

  // Sorting
  if (sort) {
    const sortBy = sort.split(',').join(' ');
    productsQuery = productsQuery.sort(sortBy);
  } else {
    productsQuery = productsQuery.sort('-createdAt');
  }

  const products = await productsQuery;

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});


const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});


const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});


const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: {},
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
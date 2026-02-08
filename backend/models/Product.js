const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other'],
      default: 'Other',
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ name: 'text' });

// Virtual field to check if product is available
productSchema.virtual('isAvailable').get(function () {
  return this.stock > 0 && this.inStock;
});

// Pre-save middleware to update inStock status
productSchema.pre('save', function (next) {
  this.inStock = this.stock > 0;
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
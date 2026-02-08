const Product = require('../models/Product');

/**
 * Sample product data for seeding the database
 */
const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 149.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  },
  {
    name: 'Smart Watch Pro',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 299.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant backpack with USB charging port',
    price: 49.99,
    category: 'Other',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip exercise mat with carrying strap',
    price: 29.99,
    category: 'Sports',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated bottle keeps drinks cold for 24 hours',
    price: 24.99,
    category: 'Sports',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
  },
  {
    name: 'The Art of Programming',
    description: 'Comprehensive guide to modern software development',
    price: 39.99,
    category: 'Books',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 elegant mugs for your morning coffee',
    price: 34.99,
    category: 'Home',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop',
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic design with precision tracking',
    price: 19.99,
    category: 'Electronics',
    stock: 85,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% organic cotton t-shirt',
    price: 19.99,
    category: 'Clothing',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable brightness with USB charging port',
    price: 44.99,
    category: 'Home',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight athletic shoes with superior cushioning',
    price: 89.99,
    category: 'Sports',
    stock: 65,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
  },
  {
    name: 'Portable Speaker',
    description: 'Bluetooth speaker with 360° sound and waterproof design',
    price: 79.99,
    category: 'Electronics',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
  },
];

/**
 * Seed products into the database
 */
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(products);
    console.log('✅ Sample products seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
};

module.exports = seedProducts;
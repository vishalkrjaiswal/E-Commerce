require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const seedProducts = require('./utils/seedData');

const app = express();

app.use(helmet());


const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'E-commerce API is running',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      health: '/health',
    },
  });
});

app.use(notFound);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Seed initial data (optional - comment out after first run)
    console.log('🌱 Checking for existing products...');
    const Product = require('./models/Product');
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      console.log('📦 No products found. Seeding database...');
      await seedProducts();
    } else {
      console.log(`✅ Found ${productCount} existing products`);
    }

    // Start listening
    app.listen(PORT, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode`);
      console.log(`📡 Server is listening on port ${PORT}`);
      console.log(`🌐 API URL: http://localhost:${PORT}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
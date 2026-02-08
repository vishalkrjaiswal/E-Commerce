# 🛒 E-Commerce MERN Stack Application

A full-stack e-commerce application built with MongoDB, Express.js, React, and Node.js (MERN stack), featuring Docker containerization for easy deployment.



## ✨ Features

### Frontend
- ✅ Product listing page with category filtering
- ✅ Responsive product cards with images, prices, and "Add to Cart" functionality
- ✅ Shopping cart with quantity management
- ✅ Real-time cart updates with item count badge
- ✅ State management using React Context API
- ✅ Clean, modern UI without external UI libraries
- ✅ Fully responsive design (mobile-first approach)

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ Product and Cart models with validation
- ✅ Request validation middleware using express-validator
- ✅ Comprehensive error handling
- ✅ CORS and security middleware (Helmet)
- ✅ Environment-based configuration
- ✅ Database seeding with sample products

### DevOps
- ✅ Docker containerization for all services
- ✅ Docker Compose for orchestration
- ✅ Health checks for all services
- ✅ Production-ready Nginx configuration
- ✅ Multi-stage builds for optimized images

## 🚀 Tech Stack

### Frontend
- **React 18.2** - UI Library
- **React Router DOM 6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Custom CSS** - Styling (no UI libraries)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Express Validator** - Request validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server for frontend

## 📁 Project Structure

```
ecommerce-mern/
├── frontend/                   # React frontend application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles/         # Global CSS styles
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductCard.css
│   │   │   ├── CartItem.js
│   │   │   └── CartItem.css
│   │   ├── pages/              # Page components
│   │   │   ├── Products.js
│   │   │   ├── Products.css
│   │   │   ├── Cart.js
│   │   │   └── Cart.css
│   │   ├── context/            # Context API state management
│   │   │   └── CartContext.js
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── utils/              # Utility functions
│   │   │   └── session.js
│   │   ├── App.js              # Main app component
│   │   └── index.js            # Entry point
│   ├── Dockerfile              # Frontend Docker configuration
│   ├── nginx.conf              # Nginx configuration
│   ├── package.json
│   └── .env
│
├── backend/                    # Express backend API
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   └── database.js
│   │   ├── models/             # Mongoose models
│   │   │   ├── Product.js
│   │   │   └── Cart.js
│   │   ├── controllers/        # Route controllers
│   │   │   ├── productController.js
│   │   │   └── cartController.js
│   │   ├── routes/             # API routes
│   │   │   ├── productRoutes.js
│   │   │   └── cartRoutes.js
│   │   ├── middleware/         # Custom middleware
│   │   │   └── errorHandler.js
│   │   ├── validators/         # Request validators
│   │   │   └── cartValidator.js
│   │   ├── utils/              # Utility functions
│   │   │   └── seedData.js
│   │   └── server.js           # Server entry point
│   ├── Dockerfile              # Backend Docker configuration
│   ├── package.json
│   └── .env
│
├── docker-compose.yml          # Docker Compose configuration
├── .gitignore
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Docker** (v20 or higher) - [Download](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (v2 or higher) - Usually included with Docker Desktop
- **Git** - [Download](https://git-scm.com/)

Verify installations:
```bash
node --version
npm --version
docker --version
docker-compose --version
```

## 🔧 Installation & Setup

### Option 1: Using Docker (Recommended) 🐳

This is the **easiest and recommended method**. Just one command to run everything!

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-mern
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: 

4. **Stop the application**
   ```bash
   docker-compose down
   ```

   To remove volumes (database data):
   ```bash
   docker-compose down -v
   ```

#### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # .env file should already exist with:
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend server**
   ```bash
   npm start
   ```

   The frontend will be available at: http://localhost:3000

## 🐳 Docker Setup

### Docker Architecture

The application consists of three Docker containers:

1. **MongoDB Container** - Database
2. **Backend Container** - Express API (Node.js)
3. **Frontend Container** - React App (Nginx)

### Docker Commands

```bash
# Build and start all containers
docker-compose up --build

# Start containers in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes
docker-compose down -v

# Rebuild specific service
docker-compose up --build backend

# Execute commands in running container
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec mongo mongosh
```

### Health Checks

All services have health checks configured:

- **MongoDB**: Checks database connectivity
- **Backend**: Checks `/health` endpoint
- **Frontend**: Nginx status check

View health status:
```bash
docker-compose ps
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Products

**GET /products**
- Description: Get all products with optional filters
- Query Parameters:
  - `category`: Filter by category
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `search`: Search by name
  - `sort`: Sort field (e.g., `price`, `-price`)
- Response: Array of products

**GET /products/:id**
- Description: Get single product by ID
- Response: Product object

#### Cart

**GET /cart/:sessionId**
- Description: Get cart for a session
- Response: Cart object with populated items

**POST /cart**
- Description: Add item to cart
- Body:
  ```json
  {
    "productId": "string",
    "quantity": number,
    "sessionId": "string"
  }
  ```
- Validation: All fields required, quantity 1-100
- Response: Updated cart

**PUT /cart/:itemId**
- Description: Update cart item quantity
- Body:
  ```json
  {
    "quantity": number,
    "sessionId": "string"
  }
  ```
- Validation: quantity 1-100
- Response: Updated cart

**DELETE /cart/:itemId**
- Description: Remove item from cart
- Body:
  ```json
  {
    "sessionId": "string"
  }
  ```
- Response: Updated cart

**DELETE /cart/clear/:sessionId**
- Description: Clear entire cart
- Response: Empty cart

### Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": []  // Validation errors if applicable
}
```

Status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request / Validation Error
- `404`: Not Found
- `500`: Internal Server Error

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
NODE_ENV=development          # development | production
PORT=5000                     # Server port

# Database Configuration
MONGODB_URI=mongodb://mongo:27017/ecommerce  # For Docker
# MONGODB_URI=mongodb://localhost:27017/ecommerce  # For local

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 💻 Development

### Code Structure Guidelines

- **Components**: Functional components only, no class components
- **State Management**: React Context API with useReducer
- **Styling**: Custom CSS, no external UI libraries
- **API Calls**: Centralized in `services/api.js`
- **Error Handling**: Comprehensive error handling at all levels
- **Validation**: Request validation using express-validator
- **Security**: Helmet middleware, CORS configuration

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make meaningful commits
git commit -m "feat: add product filtering"
git commit -m "fix: resolve cart update issue"
git commit -m "docs: update API documentation"

# Push to remote
git push origin feature/your-feature-name
```

### Commit Message Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 🏗️ Production Build

### Building for Production

#### Using Docker (Recommended)

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Run in production mode
docker-compose up -d
```

#### Manual Build

**Frontend:**
```bash
cd frontend
npm run build
# Build output in ./build directory
```

**Backend:**
```bash
cd backend
# Set NODE_ENV=production in .env
npm start
```

## 🧪 Testing the Application

### Test Product Features

1. **View Products**: Navigate to http://localhost:3000
2. **Filter Products**: Click on category filters
3. **Add to Cart**: Click "Add to Cart" button on any product
4. **View Cart**: Click cart icon in navigation
5. **Update Quantity**: Use +/- buttons in cart
6. **Remove Items**: Click trash icon


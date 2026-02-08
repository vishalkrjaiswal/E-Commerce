import axios from 'axios';



const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});


api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    // Return only the data portion
    return response.data.data || response.data;
  },
  (error) => {
    // Handle errors
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

/**
 * Product API Methods
 */
export const getAllProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return api.get(`/products${params ? `?${params}` : ''}`);
};

export const getProductById = async (id) => {
  return api.get(`/products/${id}`);
};

/**
 * Cart API Methods
 */
export const getCart = async (sessionId) => {
  return api.get(`/cart/${sessionId}`);
};

export const addToCart = async (productId, quantity, sessionId) => {
  return api.post('/cart', { productId, quantity, sessionId });
};

export const updateCartItem = async (itemId, quantity, sessionId) => {
  return api.put(`/cart/${itemId}`, { quantity, sessionId });
};

export const removeFromCart = async (itemId, sessionId) => {
  return api.delete(`/cart/${itemId}`, { data: { sessionId } });
};

export const clearCart = async (sessionId) => {
  return api.delete(`/cart/clear/${sessionId}`);
};

export default api;
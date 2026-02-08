import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCart, addToCart as addToCartAPI, updateCartItem, removeFromCart as removeFromCartAPI } from '../service/api';
import { getSessionId } from '../utils/session';



const CartContext = createContext();

// Action types
const ACTIONS = {
  SET_CART: 'SET_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  UPDATE_ITEM_COUNT: 'UPDATE_ITEM_COUNT',
};

// Initial state
const initialState = {
  cart: null,
  loading: false,
  error: null,
  itemCount: 0,
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CART:
      return {
        ...state,
        cart: action.payload,
        itemCount: action.payload?.totalItems || 0,
        loading: false,
        error: null,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ACTIONS.UPDATE_ITEM_COUNT:
      return {
        ...state,
        itemCount: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  /**
   * Fetch cart from API
   */
  const fetchCart = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const sessionId = getSessionId();
      const data = await getCart(sessionId);
      dispatch({ type: ACTIONS.SET_CART, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      console.error('Error fetching cart:', error);
    }
  };

  /**
   * Add item to cart
   */
  const addItem = async (productId, quantity = 1) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const sessionId = getSessionId();
      const data = await addToCartAPI(productId, quantity, sessionId);
      dispatch({ type: ACTIONS.SET_CART, payload: data });
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  /**
   * Update cart item quantity
   */
  const updateItem = async (itemId, quantity) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const sessionId = getSessionId();
      const data = await updateCartItem(itemId, quantity, sessionId);
      dispatch({ type: ACTIONS.SET_CART, payload: data });
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  /**
   * Remove item from cart
   */
  const removeItem = async (itemId) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const sessionId = getSessionId();
      const data = await removeFromCartAPI(itemId, sessionId);
      dispatch({ type: ACTIONS.SET_CART, payload: data });
      return { success: true };
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  /**
   * Clear cart
   */
  const clearCart = () => {
    dispatch({ type: ACTIONS.SET_CART, payload: { items: [], totalAmount: 0, totalItems: 0 } });
  };

  const value = {
    cart: state.cart,
    loading: state.loading,
    error: state.error,
    itemCount: state.itemCount,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
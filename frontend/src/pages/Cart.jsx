import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utils/session';
import './Cart.css';

/**
 * Cart Page
 * Displays shopping cart with checkout summary
 */
const Cart = () => {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  if (isEmpty) {
    return (
      <div className="container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className="btn btn-primary btn-lg">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">{cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-items-list">
              {cart.items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(cart.totalAmount)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>

            <div className="summary-row">
              <span>Tax (estimated)</span>
              <span>{formatCurrency(cart.totalAmount * 0.1)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatCurrency(cart.totalAmount * 1.1)}</span>
            </div>

            <button className="btn btn-primary btn-lg checkout-btn">
              Proceed to Checkout
            </button>

            <Link to="/" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
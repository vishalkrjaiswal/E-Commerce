import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

/**
 * Header Component
 * Navigation bar with cart icon and item count
 */
const Header = () => {
  const { itemCount } = useCart();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">E-Shop</span>
          </Link>

          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${isActive('/')}`}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className={`nav-link ${isActive('/cart')}`}>
                <span className="cart-icon">🛍️</span>
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="cart-badge">{itemCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
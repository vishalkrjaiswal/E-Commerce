import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/session';
import './CartItem.css';

/**
 * CartItem Component
 * Displays individual cart item with quantity controls
 */
const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 100) return;
    setIsUpdating(true);
    await updateItem(item._id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      await removeItem(item._id);
    }
  };

  const product = item.product;
  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="cart-item-details">
        <div className="cart-item-info">
          <h3 className="cart-item-name">{product.name}</h3>
          <span className="cart-item-category">{product.category}</span>
        </div>

        <div className="cart-item-price">
          {formatCurrency(item.price)}
        </div>

        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
          >
            −
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isUpdating || item.quantity >= product.stock}
          >
            +
          </button>
        </div>

        <div className="cart-item-subtotal">
          {formatCurrency(subtotal)}
        </div>

        <button
          className="remove-btn"
          onClick={handleRemove}
          disabled={isUpdating}
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
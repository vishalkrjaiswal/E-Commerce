import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/session';
import './ProductCard.css';

/**
 * ProductCard Component
 * Displays individual product with add to cart functionality
 */
const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const result = await addItem(product._id, 1);
    setIsAdding(false);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="stock-badge warning">Low Stock</span>
        )}
        {!product.inStock && (
          <span className="stock-badge danger">Out of Stock</span>
        )}
      </div>

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">{formatCurrency(product.price)}</span>
          <button
            className={`btn btn-primary ${showSuccess ? 'btn-success' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding || !product.inStock || showSuccess}
          >
            {showSuccess ? (
              <>
                <span>✓</span>
                <span>Added!</span>
              </>
            ) : isAdding ? (
              <span>Adding...</span>
            ) : (
              <>
                <span>🛒</span>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
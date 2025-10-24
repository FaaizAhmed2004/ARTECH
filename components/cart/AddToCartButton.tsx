'use client';

/**
 * Add to Cart Button Component
 * Handles adding products to the shopping cart with loading states
 */

import React, { useState } from 'react';
import { useCart } from '../../lib/context/CartContext';
import { Product, ProductVariant } from '../../lib/types/ecommerce';

interface AddToCartButtonProps {
  product: Product;
  variant?: ProductVariant;
  quantity?: number;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showQuantity?: boolean;
}

export default function AddToCartButton({
  product,
  variant,
  quantity = 1,
  className = '',
  disabled = false,
  size = 'md',
  showQuantity = false
}: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart();
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;

    setIsAdding(true);
    try {
      addItem(product, localQuantity, variant);
      
      // Show success feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setIsAdding(false);
    }
  };

  const isOutOfStock = product.status === 'out_of_stock' || product.stock <= 0;
  const isDisabled = disabled || isOutOfStock || isLoading || isAdding;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Button classes
  const buttonClasses = `
    ${sizeClasses[size]}
    font-medium rounded-lg transition-all duration-200
    ${isDisabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
    }
    ${isAdding ? 'animate-pulse' : ''}
    ${className}
  `.trim();

  return (
    <div className="flex items-center gap-3">
      {showQuantity && (
        <div className="flex items-center border rounded-lg">
          <button
            type="button"
            onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
            disabled={isDisabled || localQuantity <= 1}
          >
            -
          </button>
          <span className="px-3 py-1 border-x min-w-[3rem] text-center">
            {localQuantity}
          </span>
          <button
            type="button"
            onClick={() => setLocalQuantity(Math.min(product.stock, localQuantity + 1))}
            className="px-3 py-1 hover:bg-gray-100 transition-colors"
            disabled={isDisabled || localQuantity >= product.stock}
          >
            +
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={buttonClasses}
        aria-label={`Add ${product.name} to cart`}
      >
        {isAdding ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Adding...
          </div>
        ) : isOutOfStock ? (
          'Out of Stock'
        ) : (
          <>
            <svg
              className="w-5 h-5 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4"
              />
            </svg>
            Add to Cart
          </>
        )}
      </button>

      {/* Stock indicator */}
      {product.stock <= 10 && product.stock > 0 && (
        <span className="text-sm text-orange-600 font-medium">
          Only {product.stock} left!
        </span>
      )}
    </div>
  );
}
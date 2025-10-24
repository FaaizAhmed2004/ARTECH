'use client';

/**
 * Cart Icon Component
 * Displays shopping cart icon with item count badge
 */

import React from 'react';
import { useCart } from '../../lib/context/CartContext';

interface CartIconProps {
  className?: string;
  onClick?: () => void;
  showBadge?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function CartIcon({
  className = '',
  onClick,
  showBadge = true,
  size = 'md'
}: CartIconProps) {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  // Size classes
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const badgeSizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-2 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      {/* Cart Icon */}
      <svg
        className={`${sizeClasses[size]} text-gray-700`}
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

      {/* Item Count Badge */}
      {showBadge && itemCount > 0 && (
        <span
          className={`
            absolute -top-1 -right-1 ${badgeSizeClasses[size]}
            bg-red-500 text-white rounded-full flex items-center justify-center
            font-bold min-w-0 animate-pulse
          `}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}

      {/* Pulse animation for new items */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75"></span>
      )}
    </button>
  );
}
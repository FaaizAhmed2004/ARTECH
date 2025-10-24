'use client';

/**
 * Cart Summary Component
 * Displays cart totals and pricing breakdown
 */

import React from 'react';
import { useCart } from '../../lib/context/CartContext';

interface CartSummaryProps {
  className?: string;
  showTitle?: boolean;
  showShippingInfo?: boolean;
}

export default function CartSummary({
  className = '',
  showTitle = true,
  showShippingInfo = true
}: CartSummaryProps) {
  const { cart, getItemCount } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const itemCount = getItemCount();

  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      {showTitle && (
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      )}

      {/* Item Count */}
      <div className="flex justify-between text-sm text-gray-600 mb-3">
        <span>Items ({itemCount})</span>
        <span>{formatPrice(cart.subtotal)}</span>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between text-sm mb-3">
        <span>Subtotal</span>
        <span>{formatPrice(cart.subtotal)}</span>
      </div>

      {/* Tax */}
      <div className="flex justify-between text-sm mb-3">
        <span>Tax (8%)</span>
        <span>{formatPrice(cart.tax)}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between text-sm mb-3">
        <span>Shipping</span>
        <span>
          {cart.shipping === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            formatPrice(cart.shipping)
          )}
        </span>
      </div>

      {/* Free Shipping Progress */}
      {showShippingInfo && cart.subtotal < 100 && cart.subtotal > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between text-sm text-blue-800 mb-2">
            <span>Free shipping at $100</span>
            <span>{formatPrice(100 - cart.subtotal)} to go</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((cart.subtotal / 100) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Free Shipping Message */}
      {showShippingInfo && cart.shipping === 0 && cart.subtotal >= 100 && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center text-sm text-green-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You qualify for free shipping!
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* Total */}
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatPrice(cart.total)}</span>
      </div>

      {/* Savings Display */}
      {cart.shipping === 0 && cart.subtotal >= 100 && (
        <div className="text-sm text-green-600 text-right mt-1">
          You saved $10.00 on shipping!
        </div>
      )}

      {/* Payment Methods */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">We accept:</p>
        <div className="flex gap-2">
          {/* Payment method icons */}
          <div className="flex items-center justify-center w-10 h-6 bg-white border rounded text-xs font-bold">
            VISA
          </div>
          <div className="flex items-center justify-center w-10 h-6 bg-white border rounded text-xs font-bold">
            MC
          </div>
          <div className="flex items-center justify-center w-10 h-6 bg-white border rounded text-xs font-bold">
            AMEX
          </div>
          <div className="flex items-center justify-center w-12 h-6 bg-blue-600 text-white border rounded text-xs font-bold">
            PayPal
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure checkout with SSL encryption
      </div>
    </div>
  );
}
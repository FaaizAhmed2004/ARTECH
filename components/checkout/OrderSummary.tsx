'use client';

/**
 * Order Summary Component
 * Displays order details and pricing in checkout
 */

import React from 'react';
import Image from 'next/image';
import { Cart } from '../../lib/types/ecommerce';

interface OrderSummaryProps {
  cart: Cart;
}

export default function OrderSummary({ cart }: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={item.image || '/images/placeholder-product.jpg'}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              {item.quantity > 1 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
              {item.variant && (
                <p className="text-xs text-gray-500">
                  {item.variant.name}: {item.variant.value}
                </p>
              )}
              <p className="text-sm text-gray-600">
                {formatPrice(item.price)} × {item.quantity}
              </p>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{formatPrice(cart.subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {cart.shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              formatPrice(cart.shipping)
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">{formatPrice(cart.tax)}</span>
        </div>
        
        <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>{formatPrice(cart.total)}</span>
        </div>
      </div>

      {/* Shipping Info */}
      {cart.shipping === 0 && cart.subtotal >= 100 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center text-sm text-green-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You qualify for free shipping!
          </div>
        </div>
      )}

      {/* Estimated Delivery */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm">
          <div className="font-medium text-blue-800 mb-1">Estimated Delivery</div>
          <div className="text-blue-700">
            {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-2">
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            SSL Secured Checkout
          </div>
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Money Back Guarantee
          </div>
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Secure Payment Processing
          </div>
        </div>
      </div>
    </div>
  );
}
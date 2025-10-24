'use client';

/**
 * Order Confirmation Component
 * Displays order confirmation after successful payment
 */

import React from 'react';
import Link from 'next/link';
import { CheckoutData } from '../../lib/types/ecommerce';

interface OrderConfirmationProps {
  orderId: string;
  checkoutData: CheckoutData;
}

export default function OrderConfirmation({ orderId, checkoutData }: OrderConfirmationProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Order #{orderId}</h2>
            <p className="text-sm text-gray-600">
              Placed on {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(checkoutData.totals.total)}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-gray-900 mb-4">Items Ordered</h3>
          <div className="space-y-4">
            {checkoutData.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  📦
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  {item.variant && (
                    <p className="text-sm text-gray-600">
                      {item.variant.name}: {item.variant.value}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="font-medium text-gray-900 mb-4">Shipping Information</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                <div className="text-sm text-gray-600">
                  <p>{checkoutData.shippingAddress.firstName} {checkoutData.shippingAddress.lastName}</p>
                  <p>{checkoutData.shippingAddress.address1}</p>
                  {checkoutData.shippingAddress.address2 && (
                    <p>{checkoutData.shippingAddress.address2}</p>
                  )}
                  <p>
                    {checkoutData.shippingAddress.city}, {checkoutData.shippingAddress.state} {checkoutData.shippingAddress.postalCode}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Estimated Delivery</h4>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-green-600">
                    {estimatedDelivery.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p>Standard shipping (5-7 business days)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h3 className="font-medium text-blue-900 mb-3">What happens next?</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            You&apos;ll receive an order confirmation email shortly
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            We&apos;ll send you tracking information when your order ships
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
            Your order will be delivered within 5-7 business days
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/store"
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
        >
          Continue Shopping
        </Link>
        <Link
          href={`/orders/${orderId}`}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
        >
          Track Your Order
        </Link>
      </div>

      {/* Support Information */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Need help with your order?
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <Link href="/contact" className="text-blue-600 hover:text-blue-800">
            Contact Support
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/faq" className="text-blue-600 hover:text-blue-800">
            FAQ
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/policies/returns" className="text-blue-600 hover:text-blue-800">
            Return Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
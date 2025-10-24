'use client';

/**
 * PayPal Payment Form Component
 * Handles PayPal payments
 */

import React, { useState } from 'react';
import { CheckoutData, PaymentMethod } from '../../lib/types/ecommerce';

interface PayPalPaymentFormProps {
  checkoutData: CheckoutData;
  onComplete: (paymentMethod: PaymentMethod) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export default function PayPalPaymentForm({ 
  checkoutData, 
  onComplete, 
  isProcessing, 
  setIsProcessing 
}: PayPalPaymentFormProps) {
  const [paypalEmail, setPaypalEmail] = useState('');

  const handlePayPalPayment = async () => {
    setIsProcessing(true);

    try {
      // Simulate PayPal payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create payment method object
      const paymentMethod: PaymentMethod = {
        type: 'paypal',
        provider: 'paypal'
      };

      onComplete(paymentMethod);
    } catch (error) {
      console.error('PayPal payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900 mb-4">PayPal Payment</h3>

      {/* PayPal Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-2xl mr-3">🅿️</div>
          <div>
            <h4 className="font-medium text-blue-800">Pay with PayPal</h4>
            <p className="text-sm text-blue-700">
              You&apos;ll be redirected to PayPal to complete your payment securely.
            </p>
          </div>
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">Total to be charged:</span>
          <span className="text-xl font-bold text-gray-900">
            ${checkoutData.totals.total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* PayPal Button */}
      <button
        type="button"
        onClick={handlePayPalPayment}
        disabled={isProcessing}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            Redirecting to PayPal...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🅿️</span>
            Pay with PayPal
          </div>
        )}
      </button>

      {/* Alternative Payment Methods */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">PayPal accepts:</p>
        <div className="flex justify-center gap-2">
          <div className="text-xs bg-white border rounded px-2 py-1">Visa</div>
          <div className="text-xs bg-white border rounded px-2 py-1">Mastercard</div>
          <div className="text-xs bg-white border rounded px-2 py-1">Amex</div>
          <div className="text-xs bg-white border rounded px-2 py-1">Bank Account</div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="text-xs text-gray-500 text-center">
        <div className="flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Protected by PayPal&apos;s security measures
        </div>
      </div>
    </div>
  );
}
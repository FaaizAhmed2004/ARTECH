'use client';

/**
 * Payment Form Component
 * Handles payment method selection and processing
 */

import React, { useState } from 'react';
import { CheckoutData, PaymentMethod } from '../../lib/types/ecommerce';
import StripePaymentForm from './StripePaymentForm';
import PayPalPaymentForm from './PayPalPaymentForm';

interface PaymentFormProps {
  checkoutData: CheckoutData;
  onComplete: (paymentMethod: PaymentMethod) => void;
  onBack: () => void;
}

type PaymentType = 'credit_card' | 'paypal';

export default function PaymentForm({ checkoutData, onComplete, onBack }: PaymentFormProps) {
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit or Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: '💳'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: '🅿️'
    }
  ];

  const handlePaymentComplete = (paymentMethod: PaymentMethod) => {
    onComplete(paymentMethod);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

      {/* Payment Method Selection */}
      <div className="space-y-4 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPaymentType === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPaymentType(method.id as PaymentType)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={method.id}
                name="paymentMethod"
                value={method.id}
                checked={selectedPaymentType === method.id}
                onChange={() => setSelectedPaymentType(method.id as PaymentType)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={method.id} className="ml-3 flex items-center cursor-pointer">
                <span className="text-2xl mr-3">{method.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Form */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        {selectedPaymentType === 'credit_card' && (
          <StripePaymentForm
            checkoutData={checkoutData}
            onComplete={handlePaymentComplete}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        )}

        {selectedPaymentType === 'paypal' && (
          <PayPalPaymentForm
            checkoutData={checkoutData}
            onComplete={handlePaymentComplete}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        )}
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h4 className="font-medium text-green-800">Secure Payment</h4>
            <p className="text-sm text-green-700">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Back to Shipping
        </button>
      </div>
    </div>
  );
}
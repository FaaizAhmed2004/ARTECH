'use client';

/**
 * Stripe Payment Form Component
 * Handles credit card payments through Stripe
 */

import React, { useState } from 'react';
import { CheckoutData, PaymentMethod } from '../../lib/types/ecommerce';

interface StripePaymentFormProps {
  checkoutData: CheckoutData;
  onComplete: (paymentMethod: PaymentMethod) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export default function StripePaymentForm({ 
  checkoutData, 
  onComplete, 
  isProcessing, 
  setIsProcessing 
}: StripePaymentFormProps) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!cardData.cardholderName) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCard()) return;

    setIsProcessing(true);

    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create payment method object
      const paymentMethod: PaymentMethod = {
        type: 'credit_card',
        provider: 'stripe',
        last4: cardData.cardNumber.slice(-4),
        expiryMonth: parseInt(cardData.expiryDate.split('/')[0]),
        expiryYear: parseInt('20' + cardData.expiryDate.split('/')[1]),
        brand: getCardBrand(cardData.cardNumber)
      };

      onComplete(paymentMethod);
    } catch (error) {
      console.error('Payment failed:', error);
      setErrors({ general: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardBrand = (cardNumber: string): string => {
    const number = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'American Express';
    if (/^6/.test(number)) return 'Discover';
    
    return 'Unknown';
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-medium text-gray-900 mb-4">Card Information</h3>

      {/* General Error */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      {/* Cardholder Name */}
      <div>
        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardholderName"
          value={cardData.cardholderName}
          onChange={(e) => handleInputChange('cardholderName', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.cardholderName ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="John Doe"
          disabled={isProcessing}
        />
        {errors.cardholderName && (
          <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
        )}
      </div>

      {/* Card Number */}
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            id="cardNumber"
            value={cardData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.cardNumber ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            disabled={isProcessing}
          />
          {cardData.cardNumber && (
            <div className="absolute right-3 top-2.5 text-sm text-gray-500">
              {getCardBrand(cardData.cardNumber)}
            </div>
          )}
        </div>
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
        )}
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            value={cardData.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.expiryDate ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="MM/YY"
            maxLength={5}
            disabled={isProcessing}
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            value={cardData.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.cvv ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="123"
            maxLength={4}
            disabled={isProcessing}
          />
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
          )}
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900">Total to be charged:</span>
          <span className="text-xl font-bold text-gray-900">
            ${checkoutData.totals.total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay $${checkoutData.totals.total.toFixed(2)}`
        )}
      </button>

      {/* Security Notice */}
      <div className="text-xs text-gray-500 text-center mt-4">
        <div className="flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secured by 256-bit SSL encryption
        </div>
      </div>
    </form>
  );
}
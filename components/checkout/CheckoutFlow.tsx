'use client';

/**
 * Checkout Flow Component
 * Multi-step checkout process with form validation
 */

import React, { useState } from 'react';
import { useCart } from '../../lib/context/CartContext';
import { useRouter } from 'next/navigation';
import CheckoutSteps from './CheckoutSteps';
import CustomerInfoForm from './CustomerInfoForm';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import OrderConfirmation from './OrderConfirmation';
import { CheckoutData, Address } from '../../lib/types/ecommerce';

type CheckoutStep = 'customer' | 'shipping' | 'payment' | 'review' | 'confirmation';

export default function CheckoutFlow() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Checkout data state
  const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>({
    customerInfo: {
      email: '',
      firstName: '',
      lastName: '',
      phone: ''
    },
    shippingAddress: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    },
    billingAddress: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    },
    paymentMethod: {
      type: 'credit_card',
      provider: 'stripe'
    },
    items: cart.items,
    totals: {
      subtotal: cart.subtotal,
      tax: cart.tax,
      shipping: cart.shipping,
      total: cart.total
    }
  });

  // Redirect if cart is empty
  if (cart.items.length === 0 && currentStep !== 'confirmation') {
    router.push('/cart');
    return null;
  }

  const steps = [
    { id: 'customer', title: 'Customer Info', completed: false },
    { id: 'shipping', title: 'Shipping', completed: false },
    { id: 'payment', title: 'Payment', completed: false },
    { id: 'review', title: 'Review', completed: false }
  ];

  // Update step completion status
  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const handleStepComplete = (step: CheckoutStep, data: any) => {
    setCheckoutData(prev => ({ ...prev, ...data }));
    
    // Move to next step
    switch (step) {
      case 'customer':
        setCurrentStep('shipping');
        break;
      case 'shipping':
        setCurrentStep('payment');
        break;
      case 'payment':
        setCurrentStep('review');
        break;
      case 'review':
        handlePlaceOrder();
        break;
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order ID
      const newOrderId = `ORD-${Date.now()}`;
      setOrderId(newOrderId);
      
      // Clear cart
      clearCart();
      
      // Move to confirmation
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Order processing failed:', error);
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackStep = () => {
    switch (currentStep) {
      case 'shipping':
        setCurrentStep('customer');
        break;
      case 'payment':
        setCurrentStep('shipping');
        break;
      case 'review':
        setCurrentStep('payment');
        break;
    }
  };

  if (currentStep === 'confirmation' && orderId) {
    return (
      <OrderConfirmation 
        orderId={orderId}
        checkoutData={checkoutData as CheckoutData}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Complete your purchase securely</p>
      </div>

      {/* Progress Steps */}
      <CheckoutSteps 
        steps={steps.map(step => ({
          ...step,
          status: getStepStatus(step.id)
        }))}
        currentStep={currentStep}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {currentStep === 'customer' && (
              <CustomerInfoForm
                initialData={checkoutData.customerInfo}
                onComplete={(data) => handleStepComplete('customer', { customerInfo: data })}
              />
            )}

            {currentStep === 'shipping' && (
              <AddressForm
                title="Shipping Address"
                initialData={checkoutData.shippingAddress}
                onComplete={(data) => handleStepComplete('shipping', { 
                  shippingAddress: data,
                  billingAddress: data // Default billing same as shipping
                })}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 'payment' && (
              <PaymentForm
                checkoutData={checkoutData as CheckoutData}
                onComplete={(data) => handleStepComplete('payment', { paymentMethod: data })}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 'review' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        📦
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Info Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Customer Information</h3>
                  <p>{checkoutData.customerInfo?.firstName} {checkoutData.customerInfo?.lastName}</p>
                  <p>{checkoutData.customerInfo?.email}</p>
                  {checkoutData.customerInfo?.phone && <p>{checkoutData.customerInfo.phone}</p>}
                </div>

                {/* Shipping Address Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p>{checkoutData.shippingAddress?.firstName} {checkoutData.shippingAddress?.lastName}</p>
                  <p>{checkoutData.shippingAddress?.address1}</p>
                  {checkoutData.shippingAddress?.address2 && <p>{checkoutData.shippingAddress.address2}</p>}
                  <p>{checkoutData.shippingAddress?.city}, {checkoutData.shippingAddress?.state} {checkoutData.shippingAddress?.postalCode}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBackStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleStepComplete('review', {})}
                    disabled={isProcessing}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Order...
                      </div>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
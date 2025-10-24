'use client';

/**
 * Checkout Steps Component
 * Visual progress indicator for checkout process
 */

import React from 'react';

interface Step {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface CheckoutStepsProps {
  steps: Step[];
  currentStep: string;
}

export default function CheckoutSteps({ steps, currentStep }: CheckoutStepsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}>
              {/* Connector Line */}
              {stepIdx !== steps.length - 1 && (
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className={`h-0.5 w-full ${
                    step.status === 'completed' ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                </div>
              )}

              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                {step.status === 'completed' ? (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : step.status === 'current' ? (
                  <div className="h-8 w-8 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-transparent" />
                  </div>
                )}

                {/* Step Label */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    step.status === 'current' 
                      ? 'text-blue-600' 
                      : step.status === 'completed'
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
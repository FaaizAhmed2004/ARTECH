import type { Metadata } from 'next';
import React from 'react';
import Container from '@/components/common/Container';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';

export const metadata: Metadata = {
  title: 'Checkout - Arktech5',
  description: 'Complete your purchase securely with our encrypted checkout process.',
};

export default function CheckoutPage() {
  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        <CheckoutFlow />
      </Container>
    </div>
  );
}
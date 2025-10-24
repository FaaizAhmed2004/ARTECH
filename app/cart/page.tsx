import type { Metadata } from 'next';
import React from 'react';
import Container from '@/components/common/Container';
import CartPage from '@/components/cart/CartPage';

export const metadata: Metadata = {
  title: 'Shopping Cart - Arktech5',
  description: 'Review your selected items and proceed to checkout.',
};

export default function Cart() {
  return (
    <div className="py-8">
      <Container>
        <CartPage />
      </Container>
    </div>
  );
}
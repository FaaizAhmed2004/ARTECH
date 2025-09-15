import type { Metadata } from 'next';
import CartPage from './CartPage';

export const metadata: Metadata = {
  title: 'Shopping Cart - Arktech5',
  description: 'Review your selected items and proceed to checkout with Arktech5.',
  keywords: ['shopping cart', 'checkout', 'Arktech5', 'e-commerce'],
};

export default function Cart() {
  return <CartPage />;
}
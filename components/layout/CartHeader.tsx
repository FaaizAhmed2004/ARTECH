'use client';

/**
 * Cart Header Component
 * Client-side cart functionality for the header
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import CartIcon from '@/components/cart/CartIcon';
import CartDrawer from '@/components/cart/CartDrawer';

export default function CartHeader() {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until mounted to avoid SSR issues
  if (!isMounted) {
    return (
      <button className="relative p-2 text-secondary-700 hover:text-primary-600 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4" />
        </svg>
      </button>
    );
  }

  return (
    <>
      <CartIcon 
        onClick={() => setIsCartDrawerOpen(true)}
        className="text-secondary-700 hover:text-primary-600"
      />
      
      <CartDrawer 
        isOpen={isCartDrawerOpen} 
        onClose={() => setIsCartDrawerOpen(false)} 
      />
    </>
  );
}
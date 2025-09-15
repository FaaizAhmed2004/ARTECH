'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, BUSINESS_INFO } from '@/lib/constants';
import { HeaderProps, NavigationItem } from '@/lib/types';
import Container from '@/components/common/Container';
import { useCart } from '@/lib/cart-context';

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const { items, getTotalItems, getTotalPrice, removeFromCart, updateQuantity } = useCart();

  // Close cart when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isCartOpen && !target.closest('.cart-dropdown') && !target.closest('.cart-button')) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const renderNavigationItem = (item: NavigationItem, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isActiveLink(item.href);

    if (hasChildren) {
      return (
        <div key={item.href} className={cn('relative group', isMobile ? 'w-full' : '')}>
          <button
            className={cn(
              'flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'text-primary-600 bg-primary-50'
                : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50',
              isMobile ? 'w-full justify-between' : ''
            )}
          >
            <span>{item.label}</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          <div className={cn(
            'absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50',
            isMobile ? 'relative mt-0 shadow-none ring-0 opacity-100 visible' : ''
          )}>
            <div className="py-1">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    'block px-4 py-2 text-sm transition-colors',
                    isActiveLink(child.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                  )}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'px-3 py-2 rounded-md text-sm font-medium transition-colors',
          isActive
            ? 'text-primary-600 bg-primary-50'
            : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50',
          isMobile ? 'block w-full text-left' : ''
        )}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b border-secondary-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60', className)}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg">
                A
              </div>
              <span className="text-xl font-bold text-secondary-900">{BUSINESS_INFO.name}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => renderNavigationItem(item))}
          </nav>

          {/* Right Side - Cart and Contact */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="cart-button relative p-2 text-secondary-700 hover:text-primary-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="cart-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Shopping Cart</h3>
                    {items.length === 0 ? (
                      <p className="text-secondary-600 text-center py-4">Your cart is empty</p>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 p-2 border-b border-secondary-100">
                              <div className="w-12 h-12 bg-secondary-100 rounded flex items-center justify-center text-lg">
                                📦
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">{item.product.name}</h4>
                                <p className="text-xs text-secondary-600">${item.product.price.toFixed(2)} each</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-6 h-6 rounded-full bg-secondary-200 flex items-center justify-center text-xs hover:bg-secondary-300"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 rounded-full bg-secondary-200 flex items-center justify-center text-xs hover:bg-secondary-300"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-xs text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-secondary-200 pt-3 mt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
                          </div>
                          <Link href="/cart">
                            <button 
                              className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors"
                              onClick={() => setIsCartOpen(false)}
                            >
                              View Cart
                            </button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-4 text-sm text-secondary-600">
              <a 
                href={`tel:${BUSINESS_INFO.contact.phone}`}
                className="hover:text-primary-600 transition-colors"
              >
                {BUSINESS_INFO.contact.phone}
              </a>
              <a 
                href={`mailto:${BUSINESS_INFO.contact.email}`}
                className="hover:text-primary-600 transition-colors"
              >
                {BUSINESS_INFO.contact.email}
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-secondary-700 hover:text-primary-600 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200 bg-white">
              {NAVIGATION_ITEMS.map((item) => renderNavigationItem(item, true))}
              
              {/* Mobile Contact Info */}
              <div className="pt-4 mt-4 border-t border-secondary-200 space-y-2">
                <a 
                  href={`tel:${BUSINESS_INFO.contact.phone}`}
                  className="block px-3 py-2 text-sm text-secondary-600 hover:text-primary-600"
                >
                  📞 {BUSINESS_INFO.contact.phone}
                </a>
                <a 
                  href={`mailto:${BUSINESS_INFO.contact.email}`}
                  className="block px-3 py-2 text-sm text-secondary-600 hover:text-primary-600"
                >
                  ✉️ {BUSINESS_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
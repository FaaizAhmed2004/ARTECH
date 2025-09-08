'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, BUSINESS_INFO } from '@/lib/constants';
import { HeaderProps, NavigationItem } from '@/lib/types';
import Container from '@/components/common/Container';

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BUSINESS_INFO, BUSINESS_HOURS } from '@/lib/constants';
import { FooterProps } from '@/lib/types';
import Container from '@/components/common/Container';

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Store', href: '/store' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Terms & Conditions', href: '/policies/terms' },
    { label: 'Return & Refund Policy', href: '/policies/returns' },
    { label: 'Shipping Policy', href: '/policies/shipping' },
  ];

  return (
    <footer className={cn('bg-secondary-900 text-white', className)}>
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg">
                  A
                </div>
                <span className="text-xl font-bold">{BUSINESS_INFO.name}</span>
              </div>
              <p className="text-secondary-300 text-sm leading-relaxed">
                {BUSINESS_INFO.businessType}. Your trusted partner for quality products and exceptional customer service.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-secondary-300">
                  <span className="font-medium text-white">Owner:</span> {BUSINESS_INFO.owner}
                </p>
                <p className="text-secondary-300">
                  <span className="font-medium text-white">Established:</span> Massachusetts LLC
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Address</p>
                  <p className="text-secondary-300 leading-relaxed">
                    {BUSINESS_INFO.address.full}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Phone</p>
                  <a 
                    href={`tel:${BUSINESS_INFO.contact.phone}`}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {BUSINESS_INFO.contact.phone}
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Email</p>
                  <a 
                    href={`mailto:${BUSINESS_INFO.contact.email}`}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {BUSINESS_INFO.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-secondary-300 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Business Hours */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal & Policies</h3>
              <ul className="space-y-2 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-secondary-300 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <h4 className="font-medium text-white mb-2">Business Hours</h4>
                <div className="text-xs text-secondary-300 space-y-1">
                  <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-secondary-400">
              <p>© {currentYear} {BUSINESS_INFO.name} LLC. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-secondary-400">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">🔒</span>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">🏢</span>
                <span>LLC Registered</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">🛒</span>
                <span>Walmart Partner</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
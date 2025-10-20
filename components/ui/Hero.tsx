import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HeroProps } from '@/lib/types';
import { BUSINESS_INFO } from '@/lib/constants';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaHref,
  backgroundImage,
  className
}) => {
  return (
    <section className={cn('relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50', className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-secondary-100/50 bg-[size:20px_20px] opacity-30" />

      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      <Container className="relative">
        <div className="py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  🏢 Professional ecommerce Business
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                  {title}
                </h1>

                <p className="text-xl text-secondary-600 leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              </div>

              {/* Business Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                    <span className="text-success-600 text-sm">✓</span>
                  </div>
                  <span className="text-secondary-700 font-medium">Walmart Marketplace Seller</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                    <span className="text-success-600 text-sm">✓</span>
                  </div>
                  <span className="text-secondary-700 font-medium">Canadian Based</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                    <span className="text-success-600 text-sm">✓</span>
                  </div>
                  <span className="text-secondary-700 font-medium">SSL Secured Shopping</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                    <span className="text-success-600 text-sm">✓</span>
                  </div>
                  <span className="text-secondary-700 font-medium">30-Day Returns</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={ctaHref}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {ctaText}
                  </Button>
                </Link>

                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn About Us
                  </Button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-secondary-200">
                <a
                  href={`tel:${BUSINESS_INFO.contact.phone}`}
                  className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <span className="text-lg">📞</span>
                  <span className="font-medium">{BUSINESS_INFO.contact.phone}</span>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.contact.email}`}
                  className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <span className="text-lg">✉️</span>
                  <span className="font-medium">{BUSINESS_INFO.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border border-secondary-100">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white text-2xl font-bold mb-4">
                      A
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900">{BUSINESS_INFO.name}</h3>
                    <p className="text-secondary-600">Professional E-commerce Solutions</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-700 font-medium">Business Type</span>
                      <span className="text-primary-600 font-semibold">LLC</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-700 font-medium">Location</span>
                      <span className="text-primary-600 font-semibold">Canada</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <span className="text-secondary-700 font-medium">Owner</span>
                      <span className="text-primary-600 font-semibold">{BUSINESS_INFO.owner}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-200 rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
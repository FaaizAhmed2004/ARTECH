import React from 'react';
import { cn } from '@/lib/utils';
import { TrustBadgesProps } from '@/lib/types';
import { Card, CardContent } from '@/components/common/Card';
import Container from '@/components/common/Container';

const TrustBadges: React.FC<TrustBadgesProps> = ({ badges, className }) => {
  return (
    <section className={cn('py-16 bg-secondary-50', className)}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">
            Why Choose Arktech5?
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            We&apos;re committed to providing a secure, reliable, and professional shopping experience 
            backed by our LLC registration and marketplace partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <Card 
              key={index} 
              variant="elevated" 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full text-3xl group-hover:bg-primary-200 transition-colors">
                    {badge.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {badge.title}
                </h3>
                
                <p className="text-secondary-600 leading-relaxed">
                  {badge.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-secondary-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-secondary-600 font-medium">Secure Checkout</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary-600">LLC</div>
              <div className="text-sm text-secondary-600 font-medium">Registered Business</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary-600">24/7</div>
              <div className="text-sm text-secondary-600 font-medium">Customer Support</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary-600">30</div>
              <div className="text-sm text-secondary-600 font-medium">Day Returns</div>
            </div>
          </div>
        </div>

        {/* Business Credentials */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm border border-secondary-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Business Credentials & Partnerships
            </h3>
            <p className="text-secondary-600">
              Verified and trusted by major platforms and regulatory bodies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3 p-4 bg-secondary-50 rounded-lg">
              <span className="text-2xl">🏢</span>
              <div>
                <div className="font-semibold text-secondary-900">Canada Inc. Registered</div>
                <div className="text-sm text-secondary-600">Officially Registered</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-secondary-50 rounded-lg">
              <span className="text-2xl">🛒</span>
              <div>
                <div className="font-semibold text-secondary-900">Walmart Marketplace</div>
                <div className="text-sm text-secondary-600">Verified Seller</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-secondary-50 rounded-lg">
              <span className="text-2xl">🔒</span>
              <div>
                <div className="font-semibold text-secondary-900">SSL Certificate</div>
                <div className="text-sm text-secondary-600">Secure Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustBadges;
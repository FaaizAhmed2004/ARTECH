import type { Metadata } from 'next';
import React from 'react';
import Container from '@/components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { BUSINESS_INFO, COMPANY_MISSION, COMPANY_VISION } from '@/lib/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Arktech5 | Our Story & Mission',
  description: 'Learn about Arktech5, founded by Adeel Shafiq in Canada. Discover our mission, vision, and commitment to professional e-commerce excellence.',
  keywords: ['about Arktech5', 'company story', 'Adeel Shafiq', 'Canadian corporation', 'e-commerce business', 'mission vision'],
};

export default function AboutPage() {
  return (
    <div className="py-8">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            About Arktech5
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover our story, mission, and the values that drive our commitment 
            to providing exceptional e-commerce experiences.
          </p>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Story</h2>
              <div className="space-y-4 text-secondary-700 leading-relaxed">
                <p>
                  Founded in Canada, Arktech5 represents a commitment to excellence 
                  in the e-commerce industry. Under the leadership of owner Adeel Shafiq, 
                  we&apos;ve built a reputation for reliability, professionalism, and customer satisfaction 
                  over our 1.5 years of dedicated service in the marketplace.
                </p>
                <p>
                  With 1.5 years of proven experience in e-commerce operations, we&apos;ve successfully 
                  served customers as a registered LLC and verified Walmart Marketplace seller. 
                  We understand the importance of trust in online commerce, and our business is built on the 
                  foundation of transparency, quality products, and exceptional customer service.
                </p>
                <p>
                  Located in Mississauga, Ontario, Canada, we serve customers with 
                  a focus on providing secure, reliable shopping experiences backed by 
                  comprehensive policies and professional support.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card variant="elevated" className="p-8">
              <div className="text-center space-y-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-white text-3xl font-bold">
                  A
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                    {BUSINESS_INFO.name} LLC
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    Professional E-commerce Solutions
                  </p>
                </div>
                
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                    <span className="font-medium text-secondary-700">Founded</span>
                    <span className="text-primary-600 font-semibold">Canada</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                    <span className="font-medium text-secondary-700">Business Type</span>
                    <span className="text-primary-600 font-semibold">LLC</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                    <span className="font-medium text-secondary-700">Owner</span>
                    <span className="text-primary-600 font-semibold">{BUSINESS_INFO.owner}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                    <span className="font-medium text-secondary-700">Experience</span>
                    <span className="text-primary-600 font-semibold">1.5 Years</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                    <span className="font-medium text-secondary-700">Status</span>
                    <span className="text-success-600 font-semibold">Active & Verified</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-700 leading-relaxed">
                {COMPANY_MISSION}
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🔮</span>
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-700 leading-relaxed">
                {COMPANY_VISION}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="elevated" className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Security</h3>
              <p className="text-secondary-600 text-sm">
                SSL-secured transactions and data protection for every customer interaction.
              </p>
            </Card>

            <Card variant="elevated" className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Quality</h3>
              <p className="text-secondary-600 text-sm">
                Carefully curated products that meet our high standards for excellence.
              </p>
            </Card>

            <Card variant="elevated" className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Trust</h3>
              <p className="text-secondary-600 text-sm">
                Transparent business practices and honest communication with all customers.
              </p>
            </Card>

            <Card variant="elevated" className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Support</h3>
              <p className="text-secondary-600 text-sm">
                Dedicated customer service team ready to assist with any questions or concerns.
              </p>
            </Card>
          </div>
        </div>

        {/* Experience Highlight */}
        <div className="mb-16">
          <Card variant="elevated" className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                  1.5
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  Years of Proven Experience
                </h3>
                <p className="text-lg text-secondary-700 max-w-2xl mx-auto">
                  Over the past 1.5 years, we&apos;ve successfully built and maintained our reputation 
                  in the e-commerce industry, serving customers with dedication and achieving 
                  verified seller status on major marketplaces.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Growing Success</h4>
                  <p className="text-sm text-secondary-600">
                    Consistent growth and customer satisfaction over 18 months
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Proven Track Record</h4>
                  <p className="text-sm text-secondary-600">
                    Established reputation for reliability and professional service
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Market Expertise</h4>
                  <p className="text-sm text-secondary-600">
                    Deep understanding of e-commerce operations and customer needs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Credentials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
            Business Credentials & Partnerships
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center p-8">
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Canadian Corporation
              </h3>
              <p className="text-secondary-600 mb-4">
                Officially registered Canadian corporation (17402325 CANADA INC.), 
                ensuring legal compliance and business legitimacy.
              </p>
              <div className="text-sm text-secondary-500">
                Registration Status: Active
              </div>
            </Card>

            <Card variant="elevated" className="text-center p-8">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Walmart Marketplace
              </h3>
              <p className="text-secondary-600 mb-4">
                Verified seller on Walmart Marketplace, meeting their strict requirements 
                for product quality, customer service, and business operations.
              </p>
              <div className="text-sm text-secondary-500">
                Seller Status: Verified
              </div>
            </Card>

            <Card variant="elevated" className="text-center p-8">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                SSL Certified
              </h3>
              <p className="text-secondary-600 mb-4">
                Industry-standard SSL encryption protects all customer data and 
                transactions, ensuring secure online shopping experiences.
              </p>
              <div className="text-sm text-secondary-500">
                Security Level: Enterprise Grade
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Arktech5 Difference?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our growing community of satisfied customers who trust us for 
            quality products and exceptional service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/store">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse Our Store
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
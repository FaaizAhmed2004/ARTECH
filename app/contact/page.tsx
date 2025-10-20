import type { Metadata } from 'next';
import React from 'react';
import ContactForm from '@/components/ui/ContactForm';
import Container from '@/components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { BUSINESS_INFO, BUSINESS_HOURS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us - Arktech5 | Get in Touch with Our Team',
  description: 'Contact Arktech5 for customer support, inquiries, or business questions. Located in Mississauga, Ontario, Canada. Phone: +1 437 254 3111',
  keywords: ['contact Arktech5', 'customer support', 'business inquiries', 'Canada', 'Ontario', 'phone support'],
};

export default function ContactPage() {
  return (
    <div className="py-8">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            We&apos;re here to help! Get in touch with our team for any questions, 
            support needs, or business inquiries. We&apos;ll respond promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Business Information */}
          <div className="space-y-6">
            {/* Contact Information Card */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">📍</span>
                  <span>Business Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Company</h4>
                  <p className="text-secondary-600">{BUSINESS_INFO.name} {BUSINESS_INFO.registrationNumber ? `(${BUSINESS_INFO.registrationNumber})` : 'LLC'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Owner</h4>
                  <p className="text-secondary-600">{BUSINESS_INFO.owner}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Address</h4>
                  <p className="text-secondary-600 leading-relaxed">
                    {BUSINESS_INFO.address.full}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Phone</h4>
                  <a 
                    href={`tel:${BUSINESS_INFO.contact.phone}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {BUSINESS_INFO.contact.phone}
                  </a>
                </div>
                
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Email</h4>
                  <a 
                    href={`mailto:${BUSINESS_INFO.contact.email}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {BUSINESS_INFO.contact.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours Card */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">🕒</span>
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary-700">Monday - Friday</span>
                    <span className="font-medium text-secondary-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-700">Saturday</span>
                    <span className="font-medium text-secondary-900">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-700">Sunday</span>
                    <span className="font-medium text-secondary-900">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-secondary-200">
                  <p className="text-xs text-secondary-600">
                    * Response times may vary on weekends and holidays. 
                    We aim to respond to all inquiries within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">💬</span>
                  <span>Quick Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a 
                  href={`tel:${BUSINESS_INFO.contact.phone}`}
                  className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white">
                    📞
                  </div>
                  <div>
                    <div className="font-medium text-secondary-900 group-hover:text-primary-700">
                      Call Us Now
                    </div>
                    <div className="text-sm text-secondary-600">
                      {BUSINESS_INFO.contact.phone}
                    </div>
                  </div>
                </a>
                
                <a 
                  href={`mailto:${BUSINESS_INFO.contact.email}`}
                  className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary-600 rounded-full flex items-center justify-center text-white">
                    ✉️
                  </div>
                  <div>
                    <div className="font-medium text-secondary-900 group-hover:text-secondary-700">
                      Send Email
                    </div>
                    <div className="text-sm text-secondary-600">
                      {BUSINESS_INFO.contact.email}
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-secondary-50 rounded-xl p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              We&apos;re Here to Help
            </h3>
            <p className="text-secondary-600 mb-6">
              As a Canadian corporation and verified Walmart Marketplace seller, 
              we&apos;re committed to providing exceptional customer service. Whether you have 
              questions about our products, need support with an order, or want to learn 
              more about our business, we&apos;re ready to assist you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🏢</div>
                <h4 className="font-semibold text-secondary-900 mb-1">Canada Inc. Registered</h4>
                <p className="text-sm text-secondary-600">Official Canadian corporation</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🛒</div>
                <h4 className="font-semibold text-secondary-900 mb-1">Walmart Partner</h4>
                <p className="text-sm text-secondary-600">Verified marketplace seller</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-secondary-900 mb-1">Fast Response</h4>
                <p className="text-sm text-secondary-600">24-hour response guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
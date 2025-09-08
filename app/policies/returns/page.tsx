import type { Metadata } from 'next';
import React from 'react';
import Container from '@/components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Return & Refund Policy - Arktech5 | 30-Day Returns',
  description: 'Arktech5 30-day return and refund policy. Learn about our hassle-free returns, refund process, and customer satisfaction guarantee.',
  keywords: ['return policy', 'refund policy', '30-day returns', 'Arktech5 returns', 'customer satisfaction'],
};

export default function ReturnPolicyPage() {
  const lastUpdated = 'December 2024';

  return (
    <div className="py-8">
      <Container size="md">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-lg text-secondary-600">
            We stand behind our products with a comprehensive 30-day return policy
          </p>
          <p className="text-sm text-secondary-500 mt-2">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📋</span>
                <span>Policy Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                At {BUSINESS_INFO.name} LLC, we are committed to your satisfaction. We offer a 30-day 
                return policy on most items, allowing you to shop with confidence. This policy outlines 
                the terms and conditions for returns, exchanges, and refunds.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-primary-800 font-medium">
                  <strong>Quick Summary:</strong> 30-day return window • Original condition required • 
                  Free return shipping on defective items • Full refunds processed within 5-7 business days
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Return Window */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">⏰</span>
                <span>Return Window</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                You have <strong>30 calendar days</strong> from the date of delivery to initiate a return. 
                The return window begins on the day you receive your item(s).
              </p>
              <ul className="list-disc list-inside space-y-2 text-secondary-700">
                <li>Returns must be initiated within 30 days of delivery</li>
                <li>Items must be returned within 14 days of return authorization</li>
                <li>Late returns may be subject to restocking fees or rejection</li>
                <li>Holiday purchases may have extended return windows (details provided at checkout)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Eligible Items */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">✅</span>
                <span>Eligible Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                Most items sold by {BUSINESS_INFO.name} are eligible for return, provided they meet our return conditions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-success-700 mb-2">✓ Returnable Items</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Unopened electronics in original packaging</li>
                    <li>Unused accessories with all components</li>
                    <li>Items in original condition with tags/labels</li>
                    <li>Defective or damaged items (any condition)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-error-700 mb-2">✗ Non-Returnable Items</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Personalized or customized products</li>
                    <li>Software with opened licenses</li>
                    <li>Items damaged by misuse or normal wear</li>
                    <li>Products without original packaging</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Process */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🔄</span>
                <span>How to Return Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                Follow these simple steps to return your item(s):
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Contact Us</h4>
                    <p className="text-secondary-700 text-sm">
                      Email us at {BUSINESS_INFO.contact.email} or call {BUSINESS_INFO.contact.phone} 
                      to initiate your return and receive a Return Authorization (RA) number.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Package Your Item</h4>
                    <p className="text-secondary-700 text-sm">
                      Securely package the item in its original packaging with all accessories, 
                      manuals, and components included.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Ship the Return</h4>
                    <p className="text-secondary-700 text-sm">
                      Use the prepaid return label (for defective items) or ship at your expense 
                      to the address provided with your RA number.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Receive Your Refund</h4>
                    <p className="text-secondary-700 text-sm">
                      Once we receive and inspect your return, we&apos;ll process your refund within 
                      5-7 business days to your original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Information */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">💰</span>
                <span>Refund Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Refund Timeline</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Processing: 1-2 business days after receipt</li>
                    <li>Credit cards: 3-5 business days</li>
                    <li>Debit cards: 5-7 business days</li>
                    <li>PayPal: 1-2 business days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Refund Amount</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Full purchase price for defective items</li>
                    <li>Purchase price minus return shipping (customer returns)</li>
                    <li>Original shipping charges (if item was defective)</li>
                    <li>Restocking fee may apply (opened electronics)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exchanges */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🔁</span>
                <span>Exchanges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                We offer exchanges for defective items or incorrect orders. For size, color, or 
                model changes, we recommend processing a return and placing a new order to ensure 
                faster processing.
              </p>
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <p className="text-warning-800">
                  <strong>Note:</strong> Exchanges are subject to product availability. If the 
                  desired item is out of stock, we&apos;ll process a full refund instead.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📞</span>
                <span>Questions About Returns?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                Our customer service team is here to help with any questions about returns or refunds.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-medium text-secondary-900">Email Support</div>
                    <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="text-primary-600 text-sm">
                      {BUSINESS_INFO.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-medium text-secondary-900">Phone Support</div>
                    <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="text-primary-600 text-sm">
                      {BUSINESS_INFO.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-xs text-secondary-500">
                Business Hours: Monday-Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 4:00 PM (EST)
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
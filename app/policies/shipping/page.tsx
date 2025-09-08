import type { Metadata } from 'next';
import React from 'react';
import Container from '@/components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Shipping Policy - Arktech5 | Fast & Reliable Delivery',
  description: 'Learn about Arktech5 shipping options, delivery times, and coverage areas. Fast, reliable shipping nationwide with tracking included.',
  keywords: ['shipping policy', 'delivery times', 'shipping rates', 'Arktech5 shipping', 'nationwide delivery'],
};

export default function ShippingPolicyPage() {
  const lastUpdated = 'December 2024';

  return (
    <div className="py-8">
      <Container size="md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Shipping Policy
          </h1>
          <p className="text-lg text-secondary-600">
            Fast, reliable shipping nationwide with comprehensive tracking
          </p>
          <p className="text-sm text-secondary-500 mt-2">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-8">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🚚</span>
                <span>Shipping Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                {BUSINESS_INFO.name} LLC is committed to getting your orders to you quickly and safely. 
                We offer multiple shipping options to meet your needs and provide tracking information 
                for all shipments.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-primary-800 font-medium">
                  <strong>Free Standard Shipping</strong> on orders over $50 • 
                  <strong>Same-day processing</strong> for orders placed before 2 PM EST • 
                  <strong>Full tracking</strong> provided for all shipments
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📦</span>
                <span>Shipping Options & Rates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-secondary-200">
                      <th className="text-left py-3 px-4 font-semibold text-secondary-900">Shipping Method</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-900">Delivery Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-900">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-secondary-100">
                      <td className="py-3 px-4 font-medium">Standard Shipping</td>
                      <td className="py-3 px-4 text-secondary-700">5-7 business days</td>
                      <td className="py-3 px-4 text-secondary-700">$5.99 (Free over $50)</td>
                    </tr>
                    <tr className="border-b border-secondary-100">
                      <td className="py-3 px-4 font-medium">Expedited Shipping</td>
                      <td className="py-3 px-4 text-secondary-700">3-4 business days</td>
                      <td className="py-3 px-4 text-secondary-700">$12.99</td>
                    </tr>
                    <tr className="border-b border-secondary-100">
                      <td className="py-3 px-4 font-medium">Express Shipping</td>
                      <td className="py-3 px-4 text-secondary-700">1-2 business days</td>
                      <td className="py-3 px-4 text-secondary-700">$24.99</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Overnight Shipping</td>
                      <td className="py-3 px-4 text-secondary-700">Next business day</td>
                      <td className="py-3 px-4 text-secondary-700">$39.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">⏱️</span>
                <span>Processing Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                Orders are typically processed and shipped within 1-2 business days. Processing times may vary during peak seasons or for special orders.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Standard Processing</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Orders placed before 2 PM EST: Same day processing</li>
                    <li>Orders placed after 2 PM EST: Next business day</li>
                    <li>Weekend orders: Processed Monday</li>
                    <li>Holiday orders: Next business day</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Special Circumstances</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Custom orders: 3-5 business days</li>
                    <li>Back-ordered items: 7-14 business days</li>
                    <li>Large orders (10+ items): 2-3 business days</li>
                    <li>Peak season: Up to 3 business days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🗺️</span>
                <span>Shipping Coverage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-success-700 mb-2">✓ We Ship To</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>All 50 United States</li>
                    <li>Washington D.C.</li>
                    <li>Puerto Rico</li>
                    <li>U.S. Virgin Islands</li>
                    <li>Military APO/FPO addresses</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-error-700 mb-2">✗ Shipping Restrictions</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>International addresses (coming soon)</li>
                    <li>P.O. Boxes (for certain large items)</li>
                    <li>Remote areas with limited carrier access</li>
                    <li>Addresses requiring special delivery arrangements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📱</span>
                <span>Order Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                Stay informed about your order every step of the way with our comprehensive tracking system.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Order Confirmation</h4>
                    <p className="text-secondary-700 text-sm">Immediate email confirmation with order details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Processing Notification</h4>
                    <p className="text-secondary-700 text-sm">Email when your order enters processing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Shipping Confirmation</h4>
                    <p className="text-secondary-700 text-sm">Tracking number and carrier information provided</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Delivery Confirmation</h4>
                    <p className="text-secondary-700 text-sm">Notification when your package is delivered</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🚛</span>
                <span>Shipping Carriers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                We partner with trusted carriers to ensure reliable delivery of your orders.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl mb-2">📦</div>
                  <h4 className="font-semibold text-secondary-900">UPS</h4>
                  <p className="text-sm text-secondary-600">Ground & Express services</p>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl mb-2">✈️</div>
                  <h4 className="font-semibold text-secondary-900">FedEx</h4>
                  <p className="text-sm text-secondary-600">Express & Overnight delivery</p>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl mb-2">📮</div>
                  <h4 className="font-semibold text-secondary-900">USPS</h4>
                  <p className="text-sm text-secondary-600">Standard & Priority Mail</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📞</span>
                <span>Shipping Questions?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                Need help with shipping options or have questions about your delivery? We&apos;re here to help.
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
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
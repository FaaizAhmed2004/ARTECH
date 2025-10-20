import type { Metadata } from 'next';
import React from 'react';
import Container from '@/components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Arktech5 | Legal Terms of Service',
  description: 'Arktech5 Terms & Conditions: Legal terms governing the use of our website and services. Buyer and seller obligations and rights.',
  keywords: ['terms and conditions', 'terms of service', 'legal terms', 'user agreement', 'Arktech5 terms'],
};

export default function TermsPage() {
  const lastUpdated = 'December 2024';
  const effectiveDate = 'January 1, 2024';

  return (
    <div className="py-8">
      <Container size="md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-secondary-600">
            Legal terms governing the use of our website and services
          </p>
          <div className="text-sm text-secondary-500 mt-2 space-y-1">
            <p>Effective Date: {effectiveDate}</p>
            <p>Last Updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="space-y-8">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📋</span>
                <span>Agreement Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                These Terms and Conditions (&quot;Terms&quot;) govern your use of the {BUSINESS_INFO.name} LLC website 
                and services. By accessing or using our website, you agree to be bound by these Terms. 
                If you do not agree to these Terms, please do not use our services.
              </p>
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <p className="text-warning-800 font-medium">
                  <strong>Important:</strong> These Terms constitute a legally binding agreement between you and 
                  {BUSINESS_INFO.name} LLC. Please read them carefully before using our services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🏢</span>
                <span>Company Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Business Details</h4>
                  <ul className="space-y-1 text-sm text-secondary-700">
                    <li><strong>Company:</strong> {BUSINESS_INFO.name} LLC</li>
                    <li><strong>Owner:</strong> {BUSINESS_INFO.owner}</li>
                    <li><strong>Business Type:</strong> {BUSINESS_INFO.businessType}</li>
                    {BUSINESS_INFO.registrationNumber && (
                      <li><strong>Registration:</strong> {BUSINESS_INFO.registrationNumber}</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Contact Information</h4>
                  <ul className="space-y-1 text-sm text-secondary-700">
                    <li><strong>Address:</strong> {BUSINESS_INFO.address.full}</li>
                    <li><strong>Phone:</strong> {BUSINESS_INFO.contact.phone}</li>
                    <li><strong>Email:</strong> {BUSINESS_INFO.contact.email}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">✅</span>
                <span>Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                By using our website or services, you acknowledge that you have read, understood, and agree to be bound by these Terms. You also agree to comply with all applicable laws and regulations.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Age Requirements</h4>
                  <p className="text-sm text-secondary-700">
                    You must be at least 18 years old to use our services. If you are under 18, you may only use our services with parental consent and supervision.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Account Responsibility</h4>
                  <p className="text-sm text-secondary-700">
                    You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🛒</span>
                <span>Purchase Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Order Acceptance</h4>
                  <p className="text-sm text-secondary-700 leading-relaxed">
                    All orders are subject to acceptance by {BUSINESS_INFO.name} LLC. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraudulent activity.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Pricing and Payment</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>All prices are in U.S. dollars and subject to change without notice</li>
                    <li>Payment is due at the time of order placement</li>
                    <li>We accept major credit cards, debit cards, and PayPal</li>
                    <li>Sales tax will be added where applicable</li>
                    <li>Promotional codes and discounts cannot be combined unless specified</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Product Information</h4>
                  <p className="text-sm text-secondary-700 leading-relaxed">
                    We strive to provide accurate product descriptions, images, and specifications. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🚚</span>
                <span>Shipping and Delivery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Shipping Policy</h4>
                  <p className="text-sm text-secondary-700">
                    Shipping terms, costs, and delivery timeframes are detailed in our Shipping Policy. 
                    Risk of loss and title for items pass to you upon delivery to the carrier.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Delivery Issues</h4>
                  <p className="text-sm text-secondary-700">
                    We are not responsible for delays caused by shipping carriers, weather conditions, 
                    or other circumstances beyond our control. Claims for damaged or lost packages must 
                    be reported within 48 hours of delivery.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">↩️</span>
                <span>Returns and Refunds</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                Our return and refund policy is detailed in our Return & Refund Policy. By making a purchase, 
                you agree to the terms outlined in that policy.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-primary-800 text-sm">
                  <strong>Key Points:</strong> 30-day return window • Items must be in original condition • 
                  Refunds processed within 5-7 business days • Customer responsible for return shipping costs 
                  (except defective items)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">⚖️</span>
                <span>Limitation of Liability</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Warranty Disclaimer</h4>
                  <p className="text-sm text-secondary-700 leading-relaxed">
                    Our products are provided &quot;as is&quot; without any warranty of any kind. We disclaim all warranties, 
                    express or implied, including but not limited to merchantability, fitness for a particular purpose, 
                    and non-infringement.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Liability Limits</h4>
                  <p className="text-sm text-secondary-700 leading-relaxed">
                    In no event shall {BUSINESS_INFO.name} LLC be liable for any indirect, incidental, special, 
                    consequential, or punitive damages, including but not limited to loss of profits, data, or use, 
                    regardless of the theory of liability.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Maximum Liability</h4>
                  <p className="text-sm text-secondary-700 leading-relaxed">
                    Our total liability to you for any claim arising out of or relating to these Terms or our services 
                    shall not exceed the amount you paid for the specific product or service that gave rise to the claim.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🔒</span>
                <span>Intellectual Property</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Our Content</h4>
                  <p className="text-sm text-secondary-700">
                    All content on our website, including text, graphics, logos, images, and software, 
                    is the property of {BUSINESS_INFO.name} LLC and is protected by copyright and other 
                    intellectual property laws.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-1">Permitted Use</h4>
                  <p className="text-sm text-secondary-700">
                    You may use our website for personal, non-commercial purposes only. You may not reproduce, 
                    distribute, modify, or create derivative works of our content without written permission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <span>Termination</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                We may terminate or suspend your access to our services at any time, with or without cause, 
                and with or without notice. Upon termination, your right to use our services will cease immediately.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-secondary-900">Grounds for Termination</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Abuse of our services or staff</li>
                  <li>Failure to pay for orders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🏛️</span>
                <span>Governing Law</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of Canada and the Province of Ontario, 
                without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject 
                to the exclusive jurisdiction of the courts of Ontario, Canada.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📞</span>
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-medium text-secondary-900">Email</div>
                    <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="text-primary-600 text-sm">
                      {BUSINESS_INFO.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-medium text-secondary-900">Phone</div>
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
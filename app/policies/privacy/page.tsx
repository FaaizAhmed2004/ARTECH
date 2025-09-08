import type { Metadata } from 'next';
import React from 'react';
import Container from '@/components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy - Arktech5 | Your Data Protection & Privacy Rights',
  description: 'Arktech5 Privacy Policy: Learn how we collect, use, and protect your personal information. GDPR compliant data protection practices.',
  keywords: ['privacy policy', 'data protection', 'GDPR compliance', 'personal information', 'Arktech5 privacy'],
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'December 2024';
  const effectiveDate = 'January 1, 2024';

  return (
    <div className="py-8">
      <Container size="md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-secondary-600">
            Your privacy is important to us. Learn how we protect your personal information.
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
                <span className="text-2xl">🔒</span>
                <span>Privacy Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                {BUSINESS_INFO.name} LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or make purchases from us.
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-primary-800 font-medium">
                  <strong>Key Points:</strong> We never sell your personal data • SSL encryption protects all transactions • 
                  You control your data and can request deletion • GDPR and CCPA compliant practices
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📊</span>
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-secondary-900 mb-3">Personal Information You Provide</h4>
                <p className="text-secondary-700 mb-3">We collect information you voluntarily provide to us, including:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700 ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by our payment processors)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with customer service</li>
                  <li>Account credentials and profile information</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-secondary-900 mb-3">Automatically Collected Information</h4>
                <p className="text-secondary-700 mb-3">We automatically collect certain information when you visit our website:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700 ml-4">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website and search terms</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <span>How We Use Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                We use the information we collect for legitimate business purposes, including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Order Processing</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Processing and fulfilling orders</li>
                    <li>Payment processing and verification</li>
                    <li>Shipping and delivery coordination</li>
                    <li>Order status updates and notifications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Customer Service</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Responding to inquiries and support requests</li>
                    <li>Resolving disputes and issues</li>
                    <li>Providing product information and assistance</li>
                    <li>Processing returns and refunds</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Website Improvement</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Analyzing website usage and performance</li>
                    <li>Improving user experience and functionality</li>
                    <li>Personalizing content and recommendations</li>
                    <li>Preventing fraud and security threats</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Legal Compliance</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Complying with legal obligations</li>
                    <li>Protecting our rights and property</li>
                    <li>Enforcing terms and conditions</li>
                    <li>Responding to legal requests</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🤝</span>
                <span>Information Sharing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Service Providers</h4>
                  <p className="text-sm text-secondary-700">
                    We work with trusted third-party service providers who help us operate our business, 
                    including payment processors, shipping companies, and technology providers. These partners 
                    are contractually obligated to protect your information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Legal Requirements</h4>
                  <p className="text-sm text-secondary-700">
                    We may disclose your information if required by law, court order, or government regulation, 
                    or to protect our rights, property, or safety, or that of our users or the public.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Business Transfers</h4>
                  <p className="text-sm text-secondary-700">
                    In the event of a merger, acquisition, or sale of assets, your information may be 
                    transferred as part of the transaction, subject to the same privacy protections.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🛡️</span>
                <span>Data Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-success-700 mb-2">✓ Security Measures</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure payment processing (PCI DSS compliant)</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and employee training</li>
                    <li>Data backup and recovery procedures</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-warning-700 mb-2">⚠️ Important Note</h4>
                  <p className="text-sm text-secondary-700">
                    While we strive to protect your information, no method of transmission over the internet 
                    or electronic storage is 100% secure. We cannot guarantee absolute security but are 
                    committed to using industry-standard practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">⚙️</span>
                <span>Your Privacy Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                You have certain rights regarding your personal information. Contact us to exercise these rights:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Access & Portability</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Request a copy of your personal data</li>
                    <li>Receive data in a portable format</li>
                    <li>Verify the accuracy of your information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Control & Deletion</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-secondary-700">
                    <li>Correct or update your information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </div>
              </div>
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <p className="text-warning-800 text-sm">
                  <strong>Note:</strong> Some information may be retained for legal or business purposes 
                  even after deletion requests, such as transaction records required for tax compliance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🍪</span>
                <span>Cookies & Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Essential Cookies</h4>
                  <p className="text-sm text-secondary-700">
                    Required for website functionality, including shopping cart, checkout process, and security features.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-secondary-700">
                    Help us understand how visitors use our website to improve performance and user experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Preference Cookies</h4>
                  <p className="text-sm text-secondary-700">
                    Remember your preferences and settings to provide a personalized experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📞</span>
                <span>Contact Us About Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-secondary-700 leading-relaxed">
                If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
              </p>
              <div className="space-y-4">
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
                <div className="bg-secondary-50 rounded-lg p-4">
                  <h4 className="font-medium text-secondary-900 mb-2">Mailing Address</h4>
                  <p className="text-sm text-secondary-700">
                    {BUSINESS_INFO.name} LLC<br />
                    {BUSINESS_INFO.address.full}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
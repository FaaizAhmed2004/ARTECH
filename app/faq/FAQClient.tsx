'use client';

import React, { useState } from 'react';
import Container from '@/components/common/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { BUSINESS_INFO } from '@/lib/constants';

const faqData = [
  {
    category: 'Orders & Shopping',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'Browse our store, add items to your cart, and proceed to checkout. You&apos;ll need to provide shipping and payment information to complete your order. We accept major credit cards, debit cards, and PayPal.'
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer: 'Orders can be modified or cancelled within 2 hours of placement by contacting us immediately. After processing begins, modifications may not be possible, but you can return items according to our return policy.'
      },
      {
        question: 'Do you offer bulk or wholesale pricing?',
        answer: 'Yes, we offer special pricing for bulk orders (typically 10+ units). Contact us directly with your requirements for a custom quote and wholesale pricing information.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and PayPal. All transactions are processed securely with SSL encryption.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 5-7 business days, expedited shipping takes 3-4 business days, and express shipping takes 1-2 business days. Processing time is typically 1-2 business days before shipment.'
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free standard shipping on all orders over $50. Orders under $50 have a $5.99 shipping fee. Expedited and express shipping options are available for additional fees.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within the United States, including Alaska, Hawaii, and U.S. territories. International shipping is coming soon - sign up for our newsletter to be notified when it becomes available.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you&apos;ll receive a tracking number via email. You can track your package directly with the carrier (UPS, FedEx, or USPS) or contact us for assistance.'
      }
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy on most items. Items must be in original condition with all packaging and accessories. Contact us to initiate a return and receive a Return Authorization number.'
      },
      {
        question: 'How do I return an item?',
        answer: 'Contact us at ' + BUSINESS_INFO.contact.email + ' or call ' + BUSINESS_INFO.contact.phone + ' to request a Return Authorization. Package the item securely and ship it to the address we provide. Refunds are processed within 5-7 business days after we receive the return.'
      },
      {
        question: 'Who pays for return shipping?',
        answer: 'For defective or incorrect items, we provide a prepaid return label. For other returns (change of mind, wrong size, etc.), the customer is responsible for return shipping costs.'
      },
      {
        question: 'Can I exchange an item instead of returning it?',
        answer: 'We offer exchanges for defective items or incorrect orders. For size, color, or model changes, we recommend processing a return and placing a new order for faster service.'
      }
    ]
  },
  {
    category: 'Products & Quality',
    questions: [
      {
        question: 'Are your products authentic and new?',
        answer: 'Yes, all our products are 100% authentic and brand new unless specifically marked as refurbished. We work directly with manufacturers and authorized distributors to ensure product authenticity.'
      },
      {
        question: 'Do your products come with warranties?',
        answer: 'Most of our products come with manufacturer warranties. Warranty terms vary by product and manufacturer. Warranty information is included with each product and in the product description.'
      },
      {
        question: 'What if I receive a defective product?',
        answer: 'If you receive a defective product, contact us immediately. We&apos;ll provide a prepaid return label and either send a replacement or process a full refund, including original shipping costs.'
      },
      {
        question: 'Do you test products before shipping?',
        answer: 'We perform quality checks on all orders before shipping. However, if you encounter any issues with your product, our customer service team is ready to help resolve the problem quickly.'
      }
    ]
  },
  {
    category: 'Account & Security',
    questions: [
      {
        question: 'Do I need to create an account to shop?',
        answer: 'You can shop as a guest, but creating an account allows you to track orders, save addresses, view order history, and receive exclusive offers. Account creation is free and takes just a few minutes.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never sell or share your data with third parties. Read our Privacy Policy for complete details.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page and enter your email address. We&apos;ll send you a secure link to reset your password. If you need help, contact our customer service team.'
      },
      {
        question: 'Can I update my account information?',
        answer: 'Yes, you can update your account information, shipping addresses, and preferences by logging into your account and visiting the account settings page.'
      }
    ]
  },
  {
    category: 'Business & Support',
    questions: [
      {
        question: 'Who is Arktech5?',
        answer: 'Arktech5 LLC is a Massachusetts-based e-commerce company owned by ' + BUSINESS_INFO.owner + '. We&apos;re a registered LLC and verified Walmart Marketplace seller committed to providing quality products and exceptional customer service.'
      },
      {
        question: 'What are your business hours?',
        answer: 'Our customer service team is available Monday-Friday 9:00 AM - 6:00 PM and Saturday 10:00 AM - 4:00 PM (EST). We&apos;re closed on Sundays and major holidays. Email support is available 24/7.'
      },
      {
        question: 'How can I contact customer service?',
        answer: 'You can reach us by phone at ' + BUSINESS_INFO.contact.phone + ', email at ' + BUSINESS_INFO.contact.email + ', or through our contact form. We aim to respond to all inquiries within 24 hours.'
      },
      {
        question: 'Do you have a physical store?',
        answer: 'We&apos;re an online-only business based in ' + BUSINESS_INFO.address.city + ', Massachusetts. While we don&apos;t have a physical retail store, our customer service team provides personalized support for all your needs.'
      }
    ]
  }
];

export default function FAQClient() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="py-8">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Find answers to common questions about shopping with Arktech5. 
            Can&apos;t find what you&apos;re looking for? Contact our customer service team.
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex} variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {categoryIndex === 0 && '🛒'}
                    {categoryIndex === 1 && '🚚'}
                    {categoryIndex === 2 && '↩️'}
                    {categoryIndex === 3 && '⭐'}
                    {categoryIndex === 4 && '🔒'}
                    {categoryIndex === 5 && '🏢'}
                  </span>
                  <span>{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const itemId = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openItems.includes(itemId);
                    
                    return (
                      <div key={questionIndex} className="border border-secondary-200 rounded-lg">
                        <button
                          type="button"
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-secondary-50 transition-colors rounded-lg"
                        >
                          <span className="font-medium text-secondary-900 pr-4">
                            {faq.question}
                          </span>
                          <svg
                            className={`w-5 h-5 text-secondary-500 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <div className="pt-2 border-t border-secondary-100">
                              <p className="text-secondary-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-primary-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our customer service team is here to help! Contact us and we&apos;ll get back to you within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${BUSINESS_INFO.contact.phone}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              📞 Call Us: {BUSINESS_INFO.contact.phone}
            </a>
            
            <a 
              href={`mailto:${BUSINESS_INFO.contact.email}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
            >
              ✉️ Email: {BUSINESS_INFO.contact.email}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
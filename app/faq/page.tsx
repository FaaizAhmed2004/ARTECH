import type { Metadata } from 'next';
import React from 'react';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'FAQ - Arktech5 | Frequently Asked Questions',
  description: 'Find answers to common questions about shopping with Arktech5. Learn about orders, shipping, returns, and our business policies.',
  keywords: ['FAQ', 'frequently asked questions', 'Arktech5 help', 'customer support', 'shopping questions'],
};

export default function FAQPage() {
  return <FAQClient />;
}
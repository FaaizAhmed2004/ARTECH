import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://arktech5.com'),
  title: 'Arktech5 - Professional E-commerce Solutions',
  description: 'Arktech5 LLC - Your trusted partner for quality products and exceptional service. Walmart Marketplace seller based in Bellingham, Massachusetts.',
  keywords: ['e-commerce', 'online shopping', 'Arktech5', 'Walmart marketplace', 'Massachusetts business'],
  authors: [{ name: 'Arktech5 LLC' }],
  creator: 'Arktech5 LLC',
  publisher: 'Arktech5 LLC',
  robots: 'index, follow',
  verification: {
    google: 'google-site-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arktech5.com',
    title: 'Arktech5 - Professional E-commerce Solutions',
    description: 'Arktech5 LLC - Your trusted partner for quality products and exceptional service.',
    siteName: 'Arktech5',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arktech5 - Professional E-commerce Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arktech5 - Professional E-commerce Solutions',
    description: 'Arktech5 LLC - Your trusted partner for quality products and exceptional service.',
    images: ['/images/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Arktech5 LLC",
    "url": "https://arktech5.com",
    "logo": "https://arktech5.com/images/logo.png",
    "description": "Professional e-commerce solutions and quality products with exceptional customer service.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2 Connor Lane",
      "addressLocality": "Bellingham",
      "addressRegion": "MA",
      "postalCode": "02019",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-781-241-5399",
      "contactType": "customer service",
      "email": "support@ark5tech.com"
    },
    "sameAs": [
      "https://www.walmart.com/seller/arktech5"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Arktech5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/layout/Layout'
import { CartProvider } from '@/lib/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://arktech5.com'),
  title: 'Arktech5 - Professional E-commerce Solutions',
  description: 'Arktech5 - Your trusted partner for quality products and exceptional service. Walmart Marketplace seller based in Mississauga, Ontario, Canada.',
  keywords: ['e-commerce', 'online shopping', 'Arktech5', 'Walmart marketplace', 'Canadian business'],
  authors: [{ name: 'Arktech5' }],
  creator: 'Arktech5',
  publisher: 'Arktech5',
  robots: 'index, follow',
  verification: {
    google: 'google-site-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://arktech5.com',
    title: 'Arktech5 - Professional E-commerce Solutions',
    description: 'Arktech5 - Your trusted partner for quality products and exceptional service.',
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
    description: 'Arktech5 - Your trusted partner for quality products and exceptional service.',
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
    "name": "Arktech5",
    "legalName": "17402325 CANADA INC.",
    "url": "https://arktech5.com",
    "logo": "https://arktech5.com/images/logo.png",
    "description": "Professional e-commerce solutions and quality products with exceptional customer service.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3174 Tacc drive",
      "addressLocality": "Mississauga",
      "addressRegion": "ON",
      "postalCode": "L5M 0B6",
      "addressCountry": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-437-254-3111",
      "contactType": "customer service",
      "email": "raoadeelshafiq@gmail.com"
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
        <CartProvider>
          <Layout>
            {children}
          </Layout>
        </CartProvider>
      </body>
    </html>
  )
}
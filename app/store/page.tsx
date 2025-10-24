import type { Metadata } from 'next';
import React from 'react';
import Container from '@/components/common/Container';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/lib/types/ecommerce';

export const metadata: Metadata = {
  title: 'Store - Arktech5 | Quality Products & Professional Service',
  description: 'Browse our carefully curated selection of quality products. Arktech5 offers electronics, accessories, and more with professional service and fast shipping.',
  keywords: ['online store', 'electronics', 'accessories', 'quality products', 'Arktech5 store', 'e-commerce'],
};

// Sample products for demonstration
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    images: ['/images/wirelessheadphones.jpg', '/images/products/wirelessheadphones.jpg'],
    category: 'Electronics',
    stock: 50,
    variants: [
      { id: 'v1', name: 'Color', value: 'Black', priceModifier: 0, stock: 25 },
      { id: 'v2', name: 'Color', value: 'White', priceModifier: 0, stock: 25 }
    ],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone integration. Track your health and fitness goals.',
    price: 199.99,
    images: ['/images/fitnesstracker.jpg'],
    category: 'Electronics',
    stock: 75,
    variants: [],
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic office chair with lumbar support and adjustable height. Designed for comfort during long work sessions.',
    price: 449.99,
    images: ['/images/office chair.jpg'],
    category: 'Furniture',
    stock: 25,
    variants: [
      { id: 'v3', name: 'Color', value: 'Black', priceModifier: 0, stock: 15 },
      { id: 'v4', name: 'Color', value: 'Gray', priceModifier: 0, stock: 10 }
    ],
    status: 'active',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact and powerful Bluetooth speaker with waterproof design. Perfect for outdoor activities and travel.',
    price: 89.99,
    images: ['/images/speaker.jpg'],
    category: 'Electronics',
    stock: 100,
    variants: [],
    status: 'active',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '5',
    name: 'Professional Camera Lens',
    description: 'High-quality camera lens for professional photography. Compatible with major camera brands.',
    price: 799.99,
    images: ['/images/products/camera.jpg'],
    category: 'Photography',
    stock: 15,
    variants: [],
    status: 'active',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '6',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB mechanical gaming keyboard with customizable keys and premium switches. Perfect for gaming and typing.',
    price: 159.99,
    images: ['/images/gamingkeyboard.jpg'],
    category: 'Electronics',
    stock: 60,
    variants: [
      { id: 'v5', name: 'Switch Type', value: 'Blue', priceModifier: 0, stock: 20 },
      { id: 'v6', name: 'Switch Type', value: 'Red', priceModifier: 0, stock: 20 },
      { id: 'v7', name: 'Switch Type', value: 'Brown', priceModifier: 0, stock: 20 }
    ],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 34.99,
    images: ['/images/bottle.jpg'],
    category: 'Lifestyle',
    stock: 200,
    variants: [
      { id: 'v8', name: 'Size', value: '16oz', priceModifier: 0, stock: 100 },
      { id: 'v9', name: 'Size', value: '24oz', priceModifier: 10, stock: 100 }
    ],
    status: 'active',
    createdAt: new Date('2023-12-28'),
    updatedAt: new Date('2023-12-28')
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicators.',
    price: 49.99,
    images: ['/images/charging-pad-1.jpg'],
    category: 'Electronics',
    stock: 80,
    variants: [],
    status: 'active',
    createdAt: new Date('2023-12-25'),
    updatedAt: new Date('2023-12-25')
  }
];

export default function StorePage() {
  return (
    <div className="py-8">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Store
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of quality products.
            Each item is backed by our commitment to excellence and customer satisfaction.
          </p>
        </div>

        {/* Products Grid with Filters */}
        <ProductGrid
          products={SAMPLE_PRODUCTS}
          showFilters={true}
          showSearch={true}
          columns={3}
        />

        {/* Store Information */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Shop with Arktech5?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🚚</div>
                <h4 className="font-semibold text-gray-900 mb-1">Fast Shipping</h4>
                <p className="text-sm text-gray-600">Quick and reliable delivery nationwide</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">↩️</div>
                <h4 className="font-semibold text-gray-900 mb-1">30-Day Returns</h4>
                <p className="text-sm text-gray-600">Easy returns and refunds within 30 days</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-900 mb-1">Secure Shopping</h4>
                <p className="text-sm text-gray-600">SSL encrypted checkout and data protection</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
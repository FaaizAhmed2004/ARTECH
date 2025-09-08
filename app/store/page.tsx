import type { Metadata } from 'next';
import React from 'react';
import ProductCard from '@/components/ui/ProductCard';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Product } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Store - Arktech5 | Quality Products & Professional Service',
  description: 'Browse our carefully curated selection of quality products. Arktech5 offers electronics, accessories, and more with professional service and fast shipping.',
  keywords: ['online store', 'electronics', 'accessories', 'quality products', 'Arktech5 store', 'e-commerce'],
};

// Dummy product data for demonstration
const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 199.99,
    category: 'Electronics',
    image: '/images/wirlessheadphones.jpg',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Smart Home Security Camera',
    description: '1080p HD security camera with night vision, motion detection, and smartphone app integration.',
    price: 149.99,
    category: 'Security',
    image: '/images/security.jpg',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 12-hour battery life, deep bass, and crystal-clear sound.',
    price: 79.99,
    category: 'Audio',
    image: '/images/speaker.jpg',
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: 'USB-C Fast Charging Cable',
    description: 'Durable 6ft USB-C cable with fast charging support and data transfer capabilities.',
    price: 24.99,
    category: 'Accessories',
    image: '/images/cable.jpg',
    inStock: true,
    featured: false
  },
  {
    id: '5',
    name: 'Wireless Power Bank',
    description: 'High-capacity power bank with wireless charging and multiple USB ports for all your devices.',
    price: 39.99,
    category: 'Accessories',
    image: '/images/wirelessbank.jpg',
    inStock: true,
    featured: false
  },
  {
    id: '6',
    name: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.',
    price: 129.99,
    category: 'Electronics',
    image: '/images/fitnesstracker.jpg',
    inStock: false,
    featured: false
  },
  {
    id: '7',
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels and USB charging port.',
    price: 59.99,
    category: 'Home & Office',
    image: '/images/desllamp.jpg',
    inStock: true,
    featured: false
  },
  {
    id: '8',
    name: 'Bluetooth Gaming Mouse',
    description: 'Precision gaming mouse with customizable buttons, RGB lighting, and ergonomic design.',
    price: 89.99,
    category: 'Electronics',
    image: '/images/gamingmouse.jpg',
    inStock: true,
    featured: true
  }
];

const categories = [
  { id: 'all', name: 'All Products', count: dummyProducts.length },
  { id: 'electronics', name: 'Electronics', count: dummyProducts.filter(p => p.category === 'Electronics').length },
  { id: 'accessories', name: 'Accessories', count: dummyProducts.filter(p => p.category === 'Accessories').length },
  { id: 'audio', name: 'Audio', count: dummyProducts.filter(p => p.category === 'Audio').length },
  { id: 'security', name: 'Security', count: dummyProducts.filter(p => p.category === 'Security').length },
  { id: 'home-office', name: 'Home & Office', count: dummyProducts.filter(p => p.category === 'Home & Office').length },
];

export default function StorePage() {
  return (
    <div className="py-8">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Our Store
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of quality products. 
            Each item is backed by our commitment to excellence and customer satisfaction.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.id === 'all' ? 'primary' : 'outline'}
                size="sm"
                className="flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyProducts
              .filter(product => product.featured)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>

        {/* All Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-secondary-900">All Products</h2>
            <div className="flex items-center space-x-4 text-sm text-secondary-600">
              <span>Showing {dummyProducts.length} products</span>
              <select 
                className="border border-secondary-300 rounded-md px-3 py-1 bg-white"
                aria-label="Sort products"
                title="Sort products"
              >
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Store Information */}
        <div className="mt-16 bg-secondary-50 rounded-xl p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">
              Why Shop with Arktech5?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🚚</div>
                <h4 className="font-semibold text-secondary-900 mb-1">Fast Shipping</h4>
                <p className="text-sm text-secondary-600">Quick and reliable delivery nationwide</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">↩️</div>
                <h4 className="font-semibold text-secondary-900 mb-1">30-Day Returns</h4>
                <p className="text-sm text-secondary-600">Easy returns and refunds within 30 days</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-semibold text-secondary-900 mb-1">Secure Shopping</h4>
                <p className="text-sm text-secondary-600">SSL encrypted checkout and data protection</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
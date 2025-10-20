import type { Metadata } from 'next';
import React from 'react';
import ProductCard from '@/components/ui/ProductCard';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Product } from '@/lib/types';
import { SAMPLE_PRODUCTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Store - Arktech5 | Quality Products & Professional Service',
  description: 'Browse our carefully curated selection of quality products. Arktech5 offers electronics, accessories, and more with professional service and fast shipping.',
  keywords: ['online store', 'electronics', 'accessories', 'quality products', 'Arktech5 store', 'e-commerce'],
};

const categories = [
  { id: 'all', name: 'All Products', count: SAMPLE_PRODUCTS.length },
  { id: 'electronics', name: 'Electronics', count: SAMPLE_PRODUCTS.filter(p => p.category === 'Electronics').length },
  { id: 'accessories', name: 'Accessories', count: SAMPLE_PRODUCTS.filter(p => p.category === 'Accessories').length },
  { id: 'audio', name: 'Audio', count: SAMPLE_PRODUCTS.filter(p => p.category === 'Audio').length },
  { id: 'security', name: 'Security', count: SAMPLE_PRODUCTS.filter(p => p.category === 'Security').length },
  { id: 'home-office', name: 'Home & Office', count: SAMPLE_PRODUCTS.filter(p => p.category === 'Home & Office').length },
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
            {SAMPLE_PRODUCTS
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
              <span>Showing {SAMPLE_PRODUCTS.length} products</span>
              <select 
                className="border border-secondary-300 rounded-md px-3 py-1 bg-white"
                aria-label="Sort products"
                title="Sort products"
              >
                <option>Sort by: Featured</option>
                <option>Price: 100 to 150</option>
                <option>Price: 300 to 500</option>
                <option>Name: A to Z</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SAMPLE_PRODUCTS.map((product) => (
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
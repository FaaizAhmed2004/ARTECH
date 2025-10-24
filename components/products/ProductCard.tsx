'use client';

/**
 * Product Card Component
 * Displays product information with add to cart functionality
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../lib/types/ecommerce';
import AddToCartButton from '../cart/AddToCartButton';

interface ProductCardProps {
  product: Product;
  className?: string;
  showQuickView?: boolean;
  priority?: boolean;
}

export default function ProductCard({
  product,
  className = '',
  showQuickView = false,
  priority = false
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const isOutOfStock = product.status === 'out_of_stock' || product.stock <= 0;
  const isLowStock = product.stock <= 10 && product.stock > 0;

  return (
    <div className={`group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}>
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || '/images/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isOutOfStock && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
          {isLowStock && (
            <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
              Low Stock
            </span>
          )}
          {product.status === 'inactive' && (
            <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
              Inactive
            </span>
          )}
        </div>

        {/* Quick View Button */}
        {showQuickView && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              Quick View
            </button>
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
          title="Add to wishlist"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {/* Show variant price range if variants exist */}
            {product.variants && product.variants.length > 0 && (
              <span className="text-sm text-gray-500">
                - {formatPrice(product.price + Math.max(...product.variants.map(v => v.priceModifier)))}
              </span>
            )}
          </div>

          {/* Stock Info */}
          <div className="text-right">
            <p className="text-xs text-gray-500">
              {product.stock} in stock
            </p>
          </div>
        </div>

        {/* Variants Preview */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Available options:</p>
            <div className="flex flex-wrap gap-1">
              {product.variants.slice(0, 3).map((variant) => (
                <span
                  key={variant.id}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {variant.value}
                </span>
              ))}
              {product.variants.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.variants.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <AddToCartButton
          product={product}
          size="sm"
          className="w-full"
          disabled={isOutOfStock}
        />

        {/* Additional Actions */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <Link
            href={`/products/${product.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            View Details
          </Link>
          
          {/* Rating placeholder */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-3 h-3 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>(4.5)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
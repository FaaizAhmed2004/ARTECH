import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ProductCardProps } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <Card 
      className={cn('group hover:shadow-lg transition-all duration-300 hover:-translate-y-1', className)}
      variant="elevated"
    >
      {/* Product Image */}
      <div className="aspect-square bg-secondary-100 rounded-t-lg flex items-center justify-center overflow-hidden relative">
        {product.image && product.image !== '/images/placeholder-product.jpg' ? (
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-6xl text-secondary-400 group-hover:scale-110 transition-transform duration-300">
            📦
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        {/* Category Badge and Stock Status */}
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {product.category}
          </span>
          <span className={cn(
            'text-sm font-medium',
            product.inStock 
              ? 'text-success-600' 
              : 'text-error-600'
          )}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Product Name */}
        <CardTitle className="text-lg group-hover:text-primary-600 transition-colors">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Product Description */}
        <p className="text-secondary-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.featured && (
              <span className="text-xs text-warning-600 font-medium">
                ⭐ Featured
              </span>
            )}
          </div>
          
          <Link href={`/store/product/${product.id}`}>
            <Button 
              size="sm" 
              variant="outline"
              disabled={!product.inStock}
              className={cn(
                'transition-all duration-200',
                product.inStock 
                  ? 'hover:bg-primary-600 hover:text-white' 
                  : 'opacity-50 cursor-not-allowed'
              )}
            >
              {product.inStock ? 'View Details' : 'Unavailable'}
            </Button>
          </Link>
        </div>

        {/* Additional Product Info */}
        {product.featured && (
          <div className="mt-3 pt-3 border-t border-secondary-200">
            <div className="flex items-center space-x-2 text-xs text-secondary-500">
              <span className="flex items-center space-x-1">
                <span>🚚</span>
                <span>Free Shipping</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>↩️</span>
                <span>30-Day Returns</span>
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
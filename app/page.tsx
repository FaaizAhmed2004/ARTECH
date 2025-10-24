import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import TrustBadges from '@/components/ui/TrustBadges';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { TRUST_BADGES } from '@/lib/constants';
import { Product } from '@/lib/types/ecommerce';

// Featured products for home page
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    images: ['/images/products/headphones-1.jpg'],
    category: 'Electronics',
    stock: 50,
    variants: [],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS.',
    price: 199.99,
    images: ['/images/products/fitness-tracker-1.jpg'],
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
    description: 'Professional ergonomic office chair with lumbar support.',
    price: 449.99,
    images: ['/images/products/office-chair-1.jpg'],
    category: 'Furniture',
    stock: 25,
    variants: [],
    status: 'active',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact and powerful Bluetooth speaker with waterproof design.',
    price: 89.99,
    images: ['/images/products/speaker-1.jpg'],
    category: 'Electronics',
    stock: 100,
    variants: [],
    status: 'active',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Welcome to Arktech5"
        subtitle="Your trusted partner for quality products and exceptional customer service. We're a Canadian corporation committed to providing professional e-commerce solutions with integrity and reliability."
        ctaText="Shop Our Store"
        ctaHref="/store"
      />

      {/* Trust Badges Section */}
      <TrustBadges badges={TRUST_BADGES} />

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover our carefully selected range of quality products,
              each backed by our commitment to excellence and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/store">
              <Button size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience Professional E-commerce?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of satisfied customers who trust Arktech5 for their shopping needs.
              Browse our store or get in touch with any questions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/store">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse Store
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
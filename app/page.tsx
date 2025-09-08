import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import TrustBadges from '@/components/ui/TrustBadges';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import { TRUST_BADGES } from '@/lib/constants';

// Dummy featured products data
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    image: '/images/wirlessheadphones.jpg',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Smart Home Security Camera',
    description: '1080p HD security camera with night vision',
    price: 149.99,
    category: 'Security',
    image: '/images/security.jpg',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker with 12-hour battery life',
    price: 79.99,
    category: 'Audio',
    image: '/images/speaker.jpg',
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'USB-C Fast Charging Cable',
    description: 'Durable 6ft USB-C cable with fast charging support',
    price: 24.99,
    category: 'Accessories',
    image: '/images/cable.jpg',
    inStock: true,
    featured: true
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Welcome to Arktech5"
        subtitle="Your trusted partner for quality products and exceptional customer service. We're a Massachusetts-based LLC committed to providing professional e-commerce solutions with integrity and reliability."
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
              <Card key={product.id} variant="elevated" className="group hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-secondary-100 rounded-t-lg flex items-center justify-center overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {product.category}
                    </span>
                    <span className="text-success-600 text-sm font-medium">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
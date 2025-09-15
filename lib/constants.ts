import { BusinessInfo, NavigationItem, TrustBadge } from './types';

// Business Information
export const BUSINESS_INFO: BusinessInfo = {
  name: 'Arktech5',
  owner: 'Mayyed Hasan',
  address: {
    street: '2 Connor Lane',
    city: 'Bellingham',
    state: 'Massachusetts',
    zipCode: '02019',
    full: '2 Connor Lane, Bellingham, Massachusetts, 02019'
  },
  contact: {
    email: 'support@ark5tech.com',
    phone: '+1 (781) 241-5399'
  },
  businessType: 'LLC registered e-commerce (Walmart Marketplace seller)'
};

// Navigation Menu
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Store',
    href: '/store'
  },
  {
    label: 'Contact',
    href: '/contact'
  },
  {
    label: 'FAQ',
    href: '/faq'
  },
  {
    label: 'Policies',
    href: '/policies',
    children: [
      {
        label: 'Returns & Refunds',
        href: '/policies/returns'
      },
      {
        label: 'Shipping Policy',
        href: '/policies/shipping'
      },
      {
        label: 'Privacy Policy',
        href: '/policies/privacy'
      },
      {
        label: 'Terms & Conditions',
        href: '/policies/terms'
      }
    ]
  }
];

// Trust Badges
export const TRUST_BADGES: TrustBadge[] = [
  {
    icon: '🔒',
    title: 'SSL Secured',
    description: 'Your data is protected with industry-standard encryption'
  },
  {
    icon: '🏢',
    title: 'LLC Registered',
    description: 'Officially registered business in Massachusetts'
  },
  {
    icon: '🛒',
    title: 'Walmart Partner',
    description: 'Verified seller on Walmart Marketplace'
  },
  {
    icon: '↩️',
    title: '30-Day Returns',
    description: 'Easy returns and refunds within 30 days'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Customer service available when you need it'
  },
  {
    icon: '🚚',
    title: 'Fast Shipping',
    description: 'Quick and reliable delivery nationwide'
  }
];

// SEO Keywords
export const SEO_KEYWORDS = [
  'e-commerce',
  'online shopping',
  'Arktech5',
  'Walmart marketplace',
  'Massachusetts business',
  'LLC registered',
  'professional service',
  'quality products',
  'customer service',
  'secure shopping'
];

// Company Mission & Vision
export const COMPANY_MISSION = 'To provide exceptional products and outstanding customer service while maintaining the highest standards of business integrity and professionalism.';

export const COMPANY_VISION = 'To be recognized as a trusted leader in e-commerce, known for quality, reliability, and customer satisfaction.';

// Business Hours
export const BUSINESS_HOURS = {
  monday: '9:00 AM - 6:00 PM',
  tuesday: '9:00 AM - 6:00 PM',
  wednesday: '9:00 AM - 6:00 PM',
  thursday: '9:00 AM - 6:00 PM',
  friday: '9:00 AM - 6:00 PM',
  saturday: '10:00 AM - 4:00 PM',
  sunday: 'Closed'
};

// Social Media Links (placeholder)
export const SOCIAL_LINKS = {
  facebook: '#',
  twitter: '#',
  linkedin: '#',
  instagram: '#'
};

// Sample Products for Store
export const SAMPLE_PRODUCTS = [
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
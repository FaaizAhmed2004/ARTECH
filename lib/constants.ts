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
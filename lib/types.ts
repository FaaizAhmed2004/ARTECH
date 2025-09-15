// Business Information Types
export interface BusinessInfo {
  name: string;
  owner: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    full: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  businessType: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  featured: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

// SEO Types
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Trust Badge Types
export interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Component Props Types
export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage?: string;
  className?: string;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export interface ContactFormProps {
  className?: string;
}

export interface TrustBadgesProps {
  badges: TrustBadge[];
  className?: string;
}

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}
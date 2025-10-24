/**
 * Database Initialization
 * Handles database setup and seeding
 */

import { initializeDatabase, runMigrations, checkDatabaseHealth } from './connection';
import { createProduct } from './queries/products';
import { Product } from '../types/ecommerce';

/**
 * Initialize the database with schema and seed data
 */
export async function initializeEcommerceDatabase(): Promise<void> {
  try {
    console.log('Initializing e-commerce database...');
    
    // Initialize connection pool
    initializeDatabase();
    
    // Check database health
    const isHealthy = await checkDatabaseHealth();
    if (!isHealthy) {
      throw new Error('Database health check failed');
    }
    
    // Run migrations
    await runMigrations();
    console.log('Database schema created successfully');
    
    // Seed initial data if needed
    await seedInitialData();
    console.log('Database initialization completed successfully');
    
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

/**
 * Seed initial data for development and testing
 */
async function seedInitialData(): Promise<void> {
  try {
    // Check if products already exist
    const { query } = await import('./connection');
    const existingProducts = await query('SELECT COUNT(*) as count FROM products');
    const productCount = parseInt(existingProducts.rows[0].count);
    
    if (productCount > 0) {
      console.log('Products already exist, skipping seed data');
      return;
    }
    
    console.log('Seeding initial product data...');
    
    // Sample products for ARTech store
    const sampleProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
        price: 299.99,
        images: ['/images/products/headphones-1.jpg', '/images/products/headphones-2.jpg'],
        category: 'Electronics',
        stock: 50,
        variants: [],
        status: 'active'
      },
      {
        name: 'Smart Fitness Tracker',
        description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone integration. Track your health and fitness goals.',
        price: 199.99,
        images: ['/images/products/fitness-tracker-1.jpg', '/images/products/fitness-tracker-2.jpg'],
        category: 'Electronics',
        stock: 75,
        variants: [],
        status: 'active'
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Professional ergonomic office chair with lumbar support and adjustable height. Designed for comfort during long work sessions.',
        price: 449.99,
        images: ['/images/products/office-chair-1.jpg', '/images/products/office-chair-2.jpg'],
        category: 'Furniture',
        stock: 25,
        variants: [],
        status: 'active'
      },
      {
        name: 'Portable Bluetooth Speaker',
        description: 'Compact and powerful Bluetooth speaker with waterproof design. Perfect for outdoor activities and travel.',
        price: 89.99,
        images: ['/images/products/speaker-1.jpg', '/images/products/speaker-2.jpg'],
        category: 'Electronics',
        stock: 100,
        variants: [],
        status: 'active'
      },
      {
        name: 'Professional Camera Lens',
        description: 'High-quality camera lens for professional photography. Compatible with major camera brands.',
        price: 799.99,
        images: ['/images/products/camera-lens-1.jpg', '/images/products/camera-lens-2.jpg'],
        category: 'Photography',
        stock: 15,
        variants: [],
        status: 'active'
      },
      {
        name: 'Gaming Mechanical Keyboard',
        description: 'RGB mechanical gaming keyboard with customizable keys and premium switches. Perfect for gaming and typing.',
        price: 159.99,
        images: ['/images/products/keyboard-1.jpg', '/images/products/keyboard-2.jpg'],
        category: 'Electronics',
        stock: 60,
        variants: [],
        status: 'active'
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
        price: 34.99,
        images: ['/images/products/water-bottle-1.jpg', '/images/products/water-bottle-2.jpg'],
        category: 'Lifestyle',
        stock: 200,
        variants: [],
        status: 'active'
      },
      {
        name: 'Wireless Charging Pad',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicators.',
        price: 49.99,
        images: ['/images/products/charging-pad-1.jpg', '/images/products/charging-pad-2.jpg'],
        category: 'Electronics',
        stock: 80,
        variants: [],
        status: 'active'
      }
    ];
    
    // Create products
    for (const productData of sampleProducts) {
      await createProduct(productData);
    }
    
    console.log(`Successfully seeded ${sampleProducts.length} products`);
    
  } catch (error) {
    console.error('Error seeding initial data:', error);
    // Don't throw error for seeding failures in production
    if (process.env.NODE_ENV === 'development') {
      throw error;
    }
  }
}

/**
 * Reset database (for development/testing only)
 */
export async function resetDatabase(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Database reset is not allowed in production');
  }
  
  try {
    console.log('Resetting database...');
    
    const { query } = await import('./connection');
    
    // Drop all tables in reverse order of dependencies
    const dropQueries = [
      'DROP TABLE IF EXISTS inventory_alerts CASCADE',
      'DROP TABLE IF EXISTS admin_users CASCADE',
      'DROP TABLE IF EXISTS email_notifications CASCADE',
      'DROP TABLE IF EXISTS payment_transactions CASCADE',
      'DROP TABLE IF EXISTS order_items CASCADE',
      'DROP TABLE IF EXISTS orders CASCADE',
      'DROP TABLE IF EXISTS addresses CASCADE',
      'DROP TABLE IF EXISTS customers CASCADE',
      'DROP TABLE IF EXISTS product_variants CASCADE',
      'DROP TABLE IF EXISTS products CASCADE',
      'DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE',
      'DROP FUNCTION IF EXISTS generate_order_number() CASCADE',
      'DROP FUNCTION IF EXISTS update_product_stock(UUID, INTEGER) CASCADE',
      'DROP FUNCTION IF EXISTS check_inventory_alerts() CASCADE'
    ];
    
    for (const dropQuery of dropQueries) {
      await query(dropQuery);
    }
    
    console.log('Database reset completed');
    
    // Reinitialize
    await initializeEcommerceDatabase();
    
  } catch (error) {
    console.error('Database reset failed:', error);
    throw error;
  }
}

/**
 * Check if database is properly initialized
 */
export async function isDatabaseInitialized(): Promise<boolean> {
  try {
    const { query } = await import('./connection');
    
    // Check if main tables exist
    const tableCheckQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('products', 'orders', 'order_items', 'payment_transactions')
    `;
    
    const result = await query(tableCheckQuery);
    return result.rows.length === 4; // All 4 main tables should exist
    
  } catch (error) {
    console.error('Error checking database initialization:', error);
    return false;
  }
}

/**
 * Get database status and statistics
 */
export async function getDatabaseStatus(): Promise<{
  initialized: boolean;
  healthy: boolean;
  productCount: number;
  orderCount: number;
  transactionCount: number;
}> {
  try {
    const { query } = await import('./connection');
    
    const initialized = await isDatabaseInitialized();
    const healthy = await checkDatabaseHealth();
    
    let productCount = 0;
    let orderCount = 0;
    let transactionCount = 0;
    
    if (initialized && healthy) {
      const [productResult, orderResult, transactionResult] = await Promise.all([
        query('SELECT COUNT(*) as count FROM products'),
        query('SELECT COUNT(*) as count FROM orders'),
        query('SELECT COUNT(*) as count FROM payment_transactions')
      ]);
      
      productCount = parseInt(productResult.rows[0].count);
      orderCount = parseInt(orderResult.rows[0].count);
      transactionCount = parseInt(transactionResult.rows[0].count);
    }
    
    return {
      initialized,
      healthy,
      productCount,
      orderCount,
      transactionCount
    };
    
  } catch (error) {
    console.error('Error getting database status:', error);
    return {
      initialized: false,
      healthy: false,
      productCount: 0,
      orderCount: 0,
      transactionCount: 0
    };
  }
}
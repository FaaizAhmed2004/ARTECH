/**
 * Database Connection Utilities
 * Provides database connection and query execution functionality
 */

import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { QueryOptions } from '../types/ecommerce';

// Database configuration interface
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

// Singleton database pool
let pool: Pool | null = null;

/**
 * Get database configuration from environment variables
 */
function getDatabaseConfig(): DatabaseConfig {
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ecommerce',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.DB_SSL === 'true',
    max: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '2000'),
  };
}

/**
 * Initialize database connection pool
 */
export function initializeDatabase(): Pool {
  if (!pool) {
    const config = getDatabaseConfig();
    pool = new Pool(config);

    // Handle pool errors
    pool.on('error', (err: Error) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    // Handle pool connection
    pool.on('connect', () => {
      console.log('Connected to database');
    });
  }

  return pool;
}

/**
 * Get database connection pool
 */
export function getDatabase(): Pool {
  if (!pool) {
    return initializeDatabase();
  }
  return pool;
}

/**
 * Execute a database query
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const db = getDatabase();
  const start = Date.now();
  
  try {
    const result = await db.query<T>(text, params);
    const duration = Date.now() - start;
    
    // Log slow queries (> 1000ms)
    if (duration > 1000) {
      console.warn(`Slow query detected: ${duration}ms`, { text, params });
    }
    
    return result;
  } catch (error) {
    console.error('Database query error:', { text, params, error });
    throw error;
  }
}

/**
 * Execute a query with a specific client (for transactions)
 */
export async function queryWithClient<T extends QueryResultRow = any>(
  client: PoolClient,
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  
  try {
    const result = await client.query<T>(text, params);
    const duration = Date.now() - start;
    
    if (duration > 1000) {
      console.warn(`Slow query detected: ${duration}ms`, { text, params });
    }
    
    return result;
  } catch (error) {
    console.error('Database query error:', { text, params, error });
    throw error;
  }
}

/**
 * Execute multiple queries in a transaction
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const db = getDatabase();
  const client = await db.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Build WHERE clause from filters
 */
export function buildWhereClause(
  filters: Record<string, any>,
  startIndex: number = 1
): { whereClause: string; values: any[]; nextIndex: number } {
  const conditions: string[] = [];
  const values: any[] = [];
  let paramIndex = startIndex;

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // Handle array values (IN clause)
        const placeholders = value.map(() => `$${paramIndex++}`).join(', ');
        conditions.push(`${key} IN (${placeholders})`);
        values.push(...value);
      } else if (typeof value === 'string' && value.includes('%')) {
        // Handle LIKE queries
        conditions.push(`${key} ILIKE $${paramIndex++}`);
        values.push(value);
      } else {
        // Handle exact matches
        conditions.push(`${key} = $${paramIndex++}`);
        values.push(value);
      }
    }
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  
  return { whereClause, values, nextIndex: paramIndex };
}

/**
 * Build ORDER BY clause
 */
export function buildOrderByClause(
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'desc'
): string {
  if (!sortBy) return 'ORDER BY created_at DESC';
  
  // Sanitize sort column to prevent SQL injection
  const allowedColumns = [
    'id', 'name', 'price', 'stock', 'status', 'created_at', 'updated_at',
    'order_number', 'total', 'customer_email', 'customer_name'
  ];
  
  if (!allowedColumns.includes(sortBy)) {
    return 'ORDER BY created_at DESC';
  }
  
  return `ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
}

/**
 * Build LIMIT and OFFSET clause
 */
export function buildPaginationClause(options: QueryOptions): {
  limitClause: string;
  offset: number;
} {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const offset = (page - 1) * limit;
  
  return {
    limitClause: `LIMIT ${limit} OFFSET ${offset}`,
    offset
  };
}

/**
 * Get total count for pagination
 */
export async function getCount(
  table: string,
  filters: Record<string, any> = {}
): Promise<number> {
  const { whereClause, values } = buildWhereClause(filters);
  const countQuery = `SELECT COUNT(*) as count FROM ${table} ${whereClause}`;
  
  const result = await query<{ count: string }>(countQuery, values);
  return parseInt(result.rows[0].count);
}

/**
 * Close database connection
 */
export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('Database connection closed');
  }
}

/**
 * Check database connection health
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const result = await query('SELECT 1 as health');
    return result.rows.length > 0;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

/**
 * Run database migrations
 */
export async function runMigrations(): Promise<void> {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const schemaPath = path.join(process.cwd(), 'lib/database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await query(schema);
    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Database migration failed:', error);
    throw error;
  }
}
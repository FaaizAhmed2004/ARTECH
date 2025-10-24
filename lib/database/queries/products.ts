/**
 * Product Database Queries
 * Handles all product-related database operations
 */

import { query, transaction, buildWhereClause, buildOrderByClause, buildPaginationClause, getCount } from '../connection';
import { Product, ProductVariant, QueryOptions, PaginatedResponse } from '../../types/ecommerce';

/**
 * Create a new product
 */
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const insertQuery = `
    INSERT INTO products (name, description, price, images, category, stock, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  
  const values = [
    productData.name,
    productData.description,
    productData.price,
    productData.images,
    productData.category,
    productData.stock,
    productData.status
  ];
  
  const result = await query<Product>(insertQuery, values);
  return result.rows[0];
}

/**
 * Get product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const selectQuery = `
    SELECT p.*, 
           COALESCE(
             json_agg(
               json_build_object(
                 'id', pv.id,
                 'name', pv.name,
                 'value', pv.value,
                 'priceModifier', pv.price_modifier,
                 'stock', pv.stock
               )
             ) FILTER (WHERE pv.id IS NOT NULL), 
             '[]'
           ) as variants
    FROM products p
    LEFT JOIN product_variants pv ON p.id = pv.product_id
    WHERE p.id = $1
    GROUP BY p.id
  `;
  
  const result = await query<Product>(selectQuery, [id]);
  return result.rows[0] || null;
}

/**
 * Get products with pagination and filtering
 */
export async function getProducts(options: QueryOptions = {}): Promise<PaginatedResponse<Product>> {
  const { filters = {}, sortBy, sortOrder } = options;
  
  // Build query components
  const { whereClause, values } = buildWhereClause(filters);
  const orderByClause = buildOrderByClause(sortBy, sortOrder);
  const { limitClause } = buildPaginationClause(options);
  
  // Main query with variants
  const selectQuery = `
    SELECT p.*, 
           COALESCE(
             json_agg(
               json_build_object(
                 'id', pv.id,
                 'name', pv.name,
                 'value', pv.value,
                 'priceModifier', pv.price_modifier,
                 'stock', pv.stock
               )
             ) FILTER (WHERE pv.id IS NOT NULL), 
             '[]'
           ) as variants
    FROM products p
    LEFT JOIN product_variants pv ON p.id = pv.product_id
    ${whereClause}
    GROUP BY p.id
    ${orderByClause}
    ${limitClause}
  `;
  
  // Get total count
  const total = await getCount('products', filters);
  
  // Execute main query
  const result = await query<Product>(selectQuery, values);
  
  // Calculate pagination info
  const page = options.page || 1;
  const limit = options.limit || 20;
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    data: result.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };
}

/**
 * Update product
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const updateFields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;
  
  // Build dynamic update query
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
      updateFields.push(`${key} = $${paramIndex++}`);
      values.push(value);
    }
  }
  
  if (updateFields.length === 0) {
    throw new Error('No valid fields to update');
  }
  
  values.push(id); // Add ID as last parameter
  
  const updateQuery = `
    UPDATE products 
    SET ${updateFields.join(', ')}, updated_at = NOW()
    WHERE id = $${paramIndex}
    RETURNING *
  `;
  
  const result = await query<Product>(updateQuery, values);
  return result.rows[0] || null;
}

/**
 * Delete product
 */
export async function deleteProduct(id: string): Promise<boolean> {
  const deleteQuery = 'DELETE FROM products WHERE id = $1';
  const result = await query(deleteQuery, [id]);
  return (result.rowCount ?? 0) > 0;
}

/**
 * Update product stock
 */
export async function updateProductStock(id: string, quantityChange: number): Promise<Product | null> {
  const updateQuery = 'SELECT update_product_stock($1, $2)';
  await query(updateQuery, [id, quantityChange]);
  
  // Return updated product
  return getProductById(id);
}

/**
 * Search products by name or description
 */
export async function searchProducts(searchTerm: string, options: QueryOptions = {}): Promise<PaginatedResponse<Product>> {
  const searchFilters = {
    ...options.filters,
    'p.name': `%${searchTerm}%`,
    'p.description': `%${searchTerm}%`
  };
  
  // Modify the search to use OR condition for name and description
  const { values } = buildWhereClause(searchFilters);
  const { limitClause } = buildPaginationClause(options);
  const orderByClause = buildOrderByClause(options.sortBy, options.sortOrder);
  
  const searchQuery = `
    SELECT p.*, 
           COALESCE(
             json_agg(
               json_build_object(
                 'id', pv.id,
                 'name', pv.name,
                 'value', pv.value,
                 'priceModifier', pv.price_modifier,
                 'stock', pv.stock
               )
             ) FILTER (WHERE pv.id IS NOT NULL), 
             '[]'
           ) as variants
    FROM products p
    LEFT JOIN product_variants pv ON p.id = pv.product_id
    WHERE (p.name ILIKE $1 OR p.description ILIKE $1)
    GROUP BY p.id
    ${orderByClause}
    ${limitClause}
  `;
  
  // Get total count for search
  const countQuery = `
    SELECT COUNT(*) as count 
    FROM products p
    WHERE (p.name ILIKE $1 OR p.description ILIKE $1)
  `;
  
  const [productsResult, countResult] = await Promise.all([
    query<Product>(searchQuery, [`%${searchTerm}%`]),
    query<{ count: string }>(countQuery, [`%${searchTerm}%`])
  ]);
  
  const total = parseInt(countResult.rows[0].count);
  const page = options.page || 1;
  const limit = options.limit || 20;
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    data: productsResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string, options: QueryOptions = {}): Promise<PaginatedResponse<Product>> {
  return getProducts({
    ...options,
    filters: {
      ...options.filters,
      category
    }
  });
}

/**
 * Get low stock products
 */
export async function getLowStockProducts(threshold: number = 10): Promise<Product[]> {
  const selectQuery = `
    SELECT p.*, 
           COALESCE(
             json_agg(
               json_build_object(
                 'id', pv.id,
                 'name', pv.name,
                 'value', pv.value,
                 'priceModifier', pv.price_modifier,
                 'stock', pv.stock
               )
             ) FILTER (WHERE pv.id IS NOT NULL), 
             '[]'
           ) as variants
    FROM products p
    LEFT JOIN product_variants pv ON p.id = pv.product_id
    WHERE p.stock <= $1 AND p.status = 'active'
    GROUP BY p.id
    ORDER BY p.stock ASC
  `;
  
  const result = await query<Product>(selectQuery, [threshold]);
  return result.rows;
}

/**
 * Create product variant
 */
export async function createProductVariant(
  productId: string, 
  variantData: Omit<ProductVariant, 'id'>
): Promise<ProductVariant> {
  const insertQuery = `
    INSERT INTO product_variants (product_id, name, value, price_modifier, stock)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const values = [
    productId,
    variantData.name,
    variantData.value,
    variantData.priceModifier,
    variantData.stock
  ];
  
  const result = await query<ProductVariant>(insertQuery, values);
  return result.rows[0];
}

/**
 * Update product variant
 */
export async function updateProductVariant(
  id: string, 
  updates: Partial<ProductVariant>
): Promise<ProductVariant | null> {
  const updateFields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;
  
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined && key !== 'id') {
      updateFields.push(`${key} = $${paramIndex++}`);
      values.push(value);
    }
  }
  
  if (updateFields.length === 0) {
    throw new Error('No valid fields to update');
  }
  
  values.push(id);
  
  const updateQuery = `
    UPDATE product_variants 
    SET ${updateFields.join(', ')}, updated_at = NOW()
    WHERE id = $${paramIndex}
    RETURNING *
  `;
  
  const result = await query<ProductVariant>(updateQuery, values);
  return result.rows[0] || null;
}

/**
 * Delete product variant
 */
export async function deleteProductVariant(id: string): Promise<boolean> {
  const deleteQuery = 'DELETE FROM product_variants WHERE id = $1';
  const result = await query(deleteQuery, [id]);
  return (result.rowCount ?? 0) > 0;
}
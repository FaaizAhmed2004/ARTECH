/**
 * Order Database Queries
 * Handles all order-related database operations
 */

import { query, transaction, buildWhereClause, buildOrderByClause, buildPaginationClause, getCount, queryWithClient } from '../connection';
import { Order, OrderItem, OrderStatus, QueryOptions, PaginatedResponse, CheckoutData } from '../../types/ecommerce';
import { PoolClient } from 'pg';

/**
 * Create a new order with items
 */
export async function createOrder(checkoutData: CheckoutData): Promise<Order> {
  return transaction(async (client: PoolClient) => {
    // Generate order number
    const orderNumberResult = await queryWithClient<{ generate_order_number: string }>(
      client,
      'SELECT generate_order_number() as generate_order_number'
    );
    const orderNumber = orderNumberResult.rows[0].generate_order_number;

    // Create order
    const orderInsertQuery = `
      INSERT INTO orders (
        order_number, customer_email, customer_name, shipping_address, 
        billing_address, payment_method, status, subtotal, tax, shipping, total
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const orderValues = [
      orderNumber,
      checkoutData.customerInfo.email,
      `${checkoutData.customerInfo.firstName} ${checkoutData.customerInfo.lastName}`,
      JSON.stringify(checkoutData.shippingAddress),
      JSON.stringify(checkoutData.billingAddress),
      JSON.stringify(checkoutData.paymentMethod),
      'pending',
      checkoutData.totals.subtotal,
      checkoutData.totals.tax,
      checkoutData.totals.shipping,
      checkoutData.totals.total
    ];

    const orderResult = await queryWithClient<Order>(client, orderInsertQuery, orderValues);
    const order = orderResult.rows[0];

    // Create order items
    const orderItems: OrderItem[] = [];
    for (const item of checkoutData.items) {
      // Get product snapshot
      const productQuery = 'SELECT * FROM products WHERE id = $1';
      const productResult = await queryWithClient(client, productQuery, [item.productId]);
      const productSnapshot = productResult.rows[0];

      // Insert order item
      const itemInsertQuery = `
        INSERT INTO order_items (
          order_id, product_id, quantity, unit_price, total_price, product_snapshot
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;

      const itemValues = [
        order.id,
        item.productId,
        item.quantity,
        item.price,
        item.price * item.quantity,
        JSON.stringify(productSnapshot)
      ];

      const itemResult = await queryWithClient<OrderItem>(client, itemInsertQuery, itemValues);
      orderItems.push(itemResult.rows[0]);

      // Update product stock
      await queryWithClient(
        client,
        'SELECT update_product_stock($1, $2)',
        [item.productId, -item.quantity]
      );
    }

    // Return complete order with items
    return {
      ...order,
      items: orderItems
    };
  });
}

/**
 * Get order by ID with items
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const orderQuery = `
    SELECT o.*,
           json_agg(
             json_build_object(
               'id', oi.id,
               'orderId', oi.order_id,
               'productId', oi.product_id,
               'quantity', oi.quantity,
               'unitPrice', oi.unit_price,
               'totalPrice', oi.total_price,
               'productSnapshot', oi.product_snapshot
             )
           ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.id = $1
    GROUP BY o.id
  `;

  const result = await query<Order>(orderQuery, [id]);
  return result.rows[0] || null;
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const orderQuery = `
    SELECT o.*,
           json_agg(
             json_build_object(
               'id', oi.id,
               'orderId', oi.order_id,
               'productId', oi.product_id,
               'quantity', oi.quantity,
               'unitPrice', oi.unit_price,
               'totalPrice', oi.total_price,
               'productSnapshot', oi.product_snapshot
             )
           ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.order_number = $1
    GROUP BY o.id
  `;

  const result = await query<Order>(orderQuery, [orderNumber]);
  return result.rows[0] || null;
}

/**
 * Get orders with pagination and filtering
 */
export async function getOrders(options: QueryOptions = {}): Promise<PaginatedResponse<Order>> {
  const { filters = {}, sortBy, sortOrder } = options;
  
  const { whereClause, values } = buildWhereClause(filters);
  const orderByClause = buildOrderByClause(sortBy, sortOrder);
  const { limitClause } = buildPaginationClause(options);

  const selectQuery = `
    SELECT o.*,
           json_agg(
             json_build_object(
               'id', oi.id,
               'orderId', oi.order_id,
               'productId', oi.product_id,
               'quantity', oi.quantity,
               'unitPrice', oi.unit_price,
               'totalPrice', oi.total_price,
               'productSnapshot', oi.product_snapshot
             )
           ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    ${whereClause}
    GROUP BY o.id
    ${orderByClause}
    ${limitClause}
  `;

  const total = await getCount('orders', filters);
  const result = await query<Order>(selectQuery, values);

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
 * Get orders by customer email
 */
export async function getOrdersByCustomer(customerEmail: string, options: QueryOptions = {}): Promise<PaginatedResponse<Order>> {
  return getOrders({
    ...options,
    filters: {
      ...options.filters,
      customer_email: customerEmail
    }
  });
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: string, status: OrderStatus, trackingNumber?: string): Promise<Order | null> {
  const updateFields = ['status = $2', 'updated_at = NOW()'];
  const values = [id, status];
  let paramIndex = 3;

  if (trackingNumber) {
    updateFields.push(`tracking_number = $${paramIndex++}`);
    values.push(trackingNumber);
  }

  if (status === 'shipped' && !trackingNumber) {
    throw new Error('Tracking number is required when marking order as shipped');
  }

  const updateQuery = `
    UPDATE orders 
    SET ${updateFields.join(', ')}
    WHERE id = $1
    RETURNING *
  `;

  const result = await query<Order>(updateQuery, values);
  return result.rows[0] || null;
}

/**
 * Update order
 */
export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  const updateFields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'items') {
      if (key === 'shippingAddress' || key === 'billingAddress' || key === 'paymentMethod') {
        updateFields.push(`${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = $${paramIndex++}`);
        values.push(JSON.stringify(value));
      } else {
        updateFields.push(`${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = $${paramIndex++}`);
        values.push(value);
      }
    }
  }

  if (updateFields.length === 0) {
    throw new Error('No valid fields to update');
  }

  values.push(id);

  const updateQuery = `
    UPDATE orders 
    SET ${updateFields.join(', ')}, updated_at = NOW()
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  const result = await query<Order>(updateQuery, values);
  return result.rows[0] || null;
}

/**
 * Cancel order and restore inventory
 */
export async function cancelOrder(id: string): Promise<Order | null> {
  return transaction(async (client: PoolClient) => {
    // Get order with items
    const order = await getOrderById(id);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status === 'cancelled' || order.status === 'delivered') {
      throw new Error(`Cannot cancel order with status: ${order.status}`);
    }

    // Restore inventory for each item
    for (const item of order.items) {
      await queryWithClient(
        client,
        'SELECT update_product_stock($1, $2)',
        [item.productId, item.quantity]
      );
    }

    // Update order status
    const updateQuery = `
      UPDATE orders 
      SET status = 'cancelled', updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

    const result = await queryWithClient<Order>(client, updateQuery, [id]);
    return result.rows[0];
  });
}

/**
 * Get order statistics
 */
export async function getOrderStatistics(dateFrom?: Date, dateTo?: Date): Promise<{
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
}> {
  let dateFilter = '';
  const values: any[] = [];
  
  if (dateFrom && dateTo) {
    dateFilter = 'WHERE created_at BETWEEN $1 AND $2';
    values.push(dateFrom, dateTo);
  } else if (dateFrom) {
    dateFilter = 'WHERE created_at >= $1';
    values.push(dateFrom);
  } else if (dateTo) {
    dateFilter = 'WHERE created_at <= $1';
    values.push(dateTo);
  }

  const statsQuery = `
    SELECT 
      COUNT(*) as total_orders,
      COALESCE(SUM(total), 0) as total_revenue,
      COALESCE(AVG(total), 0) as average_order_value,
      status,
      COUNT(*) as status_count
    FROM orders
    ${dateFilter}
    GROUP BY ROLLUP(status)
    ORDER BY status NULLS FIRST
  `;

  const result = await query(statsQuery, values);
  const rows = result.rows;

  // First row contains totals (status is null due to ROLLUP)
  const totals = rows[0];
  const statusCounts = rows.slice(1);

  const ordersByStatus: Record<OrderStatus, number> = {
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    refunded: 0
  };

  statusCounts.forEach((row: any) => {
    if (row.status) {
      ordersByStatus[row.status as OrderStatus] = parseInt(row.status_count);
    }
  });

  return {
    totalOrders: parseInt(totals.total_orders),
    totalRevenue: parseFloat(totals.total_revenue),
    averageOrderValue: parseFloat(totals.average_order_value),
    ordersByStatus
  };
}

/**
 * Get recent orders
 */
export async function getRecentOrders(limit: number = 10): Promise<Order[]> {
  const selectQuery = `
    SELECT o.*,
           json_agg(
             json_build_object(
               'id', oi.id,
               'orderId', oi.order_id,
               'productId', oi.product_id,
               'quantity', oi.quantity,
               'unitPrice', oi.unit_price,
               'totalPrice', oi.total_price,
               'productSnapshot', oi.product_snapshot
             )
           ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id
    ORDER BY o.created_at DESC
    LIMIT $1
  `;

  const result = await query<Order>(selectQuery, [limit]);
  return result.rows;
}

/**
 * Search orders
 */
export async function searchOrders(searchTerm: string, options: QueryOptions = {}): Promise<PaginatedResponse<Order>> {
  const { limitClause } = buildPaginationClause(options);
  const orderByClause = buildOrderByClause(options.sortBy, options.sortOrder);

  const searchQuery = `
    SELECT o.*,
           json_agg(
             json_build_object(
               'id', oi.id,
               'orderId', oi.order_id,
               'productId', oi.product_id,
               'quantity', oi.quantity,
               'unitPrice', oi.unit_price,
               'totalPrice', oi.total_price,
               'productSnapshot', oi.product_snapshot
             )
           ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE (
      o.order_number ILIKE $1 OR 
      o.customer_email ILIKE $1 OR 
      o.customer_name ILIKE $1
    )
    GROUP BY o.id
    ${orderByClause}
    ${limitClause}
  `;

  const countQuery = `
    SELECT COUNT(*) as count 
    FROM orders o
    WHERE (
      o.order_number ILIKE $1 OR 
      o.customer_email ILIKE $1 OR 
      o.customer_name ILIKE $1
    )
  `;

  const searchPattern = `%${searchTerm}%`;
  
  const [ordersResult, countResult] = await Promise.all([
    query<Order>(searchQuery, [searchPattern]),
    query<{ count: string }>(countQuery, [searchPattern])
  ]);

  const total = parseInt(countResult.rows[0].count);
  const page = options.page || 1;
  const limit = options.limit || 20;
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    data: ordersResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  };
}
/**
 * Payment Transaction Database Queries
 * Handles all payment-related database operations
 */

import { query, buildWhereClause, buildOrderByClause, buildPaginationClause, getCount } from '../connection';
import { PaymentTransaction, QueryOptions, PaginatedResponse } from '../../types/ecommerce';

/**
 * Create a new payment transaction
 */
export async function createPaymentTransaction(
  transactionData: Omit<PaymentTransaction, 'id' | 'createdAt'>
): Promise<PaymentTransaction> {
  const insertQuery = `
    INSERT INTO payment_transactions (
      order_id, amount, currency, status, gateway_transaction_id, gateway_response
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const values = [
    transactionData.orderId,
    transactionData.amount,
    transactionData.currency,
    transactionData.status,
    transactionData.gatewayTransactionId,
    JSON.stringify(transactionData.gatewayResponse)
  ];

  const result = await query<PaymentTransaction>(insertQuery, values);
  return result.rows[0];
}

/**
 * Get payment transaction by ID
 */
export async function getPaymentTransactionById(id: string): Promise<PaymentTransaction | null> {
  const selectQuery = 'SELECT * FROM payment_transactions WHERE id = $1';
  const result = await query<PaymentTransaction>(selectQuery, [id]);
  return result.rows[0] || null;
}

/**
 * Get payment transaction by gateway transaction ID
 */
export async function getPaymentTransactionByGatewayId(gatewayTransactionId: string): Promise<PaymentTransaction | null> {
  const selectQuery = 'SELECT * FROM payment_transactions WHERE gateway_transaction_id = $1';
  const result = await query<PaymentTransaction>(selectQuery, [gatewayTransactionId]);
  return result.rows[0] || null;
}

/**
 * Get payment transactions by order ID
 */
export async function getPaymentTransactionsByOrderId(orderId: string): Promise<PaymentTransaction[]> {
  const selectQuery = `
    SELECT * FROM payment_transactions 
    WHERE order_id = $1 
    ORDER BY created_at DESC
  `;
  const result = await query<PaymentTransaction>(selectQuery, [orderId]);
  return result.rows;
}

/**
 * Get payment transactions with pagination and filtering
 */
export async function getPaymentTransactions(options: QueryOptions = {}): Promise<PaginatedResponse<PaymentTransaction>> {
  const { filters = {}, sortBy, sortOrder } = options;
  
  const { whereClause, values } = buildWhereClause(filters);
  const orderByClause = buildOrderByClause(sortBy, sortOrder);
  const { limitClause } = buildPaginationClause(options);

  const selectQuery = `
    SELECT pt.*, o.order_number, o.customer_email
    FROM payment_transactions pt
    LEFT JOIN orders o ON pt.order_id = o.id
    ${whereClause}
    ${orderByClause}
    ${limitClause}
  `;

  const total = await getCount('payment_transactions', filters);
  const result = await query<PaymentTransaction & { order_number: string; customer_email: string }>(selectQuery, values);

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
 * Update payment transaction status
 */
export async function updatePaymentTransactionStatus(
  id: string,
  status: PaymentTransaction['status'],
  gatewayResponse?: any
): Promise<PaymentTransaction | null> {
  const updateFields = ['status = $2', 'updated_at = NOW()'];
  const values = [id, status];
  let paramIndex = 3;

  if (gatewayResponse) {
    updateFields.push(`gateway_response = $${paramIndex++}`);
    values.push(JSON.stringify(gatewayResponse));
  }

  const updateQuery = `
    UPDATE payment_transactions 
    SET ${updateFields.join(', ')}
    WHERE id = $1
    RETURNING *
  `;

  const result = await query<PaymentTransaction>(updateQuery, values);
  return result.rows[0] || null;
}

/**
 * Update payment transaction by gateway ID
 */
export async function updatePaymentTransactionByGatewayId(
  gatewayTransactionId: string,
  status: PaymentTransaction['status'],
  gatewayResponse?: any
): Promise<PaymentTransaction | null> {
  const updateFields = ['status = $2', 'updated_at = NOW()'];
  const values = [gatewayTransactionId, status];
  let paramIndex = 3;

  if (gatewayResponse) {
    updateFields.push(`gateway_response = $${paramIndex++}`);
    values.push(JSON.stringify(gatewayResponse));
  }

  const updateQuery = `
    UPDATE payment_transactions 
    SET ${updateFields.join(', ')}
    WHERE gateway_transaction_id = $1
    RETURNING *
  `;

  const result = await query<PaymentTransaction>(updateQuery, values);
  return result.rows[0] || null;
}

/**
 * Get payment statistics
 */
export async function getPaymentStatistics(dateFrom?: Date, dateTo?: Date): Promise<{
  totalTransactions: number;
  totalAmount: number;
  successfulTransactions: number;
  successfulAmount: number;
  failedTransactions: number;
  refundedTransactions: number;
  refundedAmount: number;
  transactionsByStatus: Record<PaymentTransaction['status'], number>;
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
      COUNT(*) as total_transactions,
      COALESCE(SUM(amount), 0) as total_amount,
      COUNT(*) FILTER (WHERE status = 'completed') as successful_transactions,
      COALESCE(SUM(amount) FILTER (WHERE status = 'completed'), 0) as successful_amount,
      COUNT(*) FILTER (WHERE status = 'failed') as failed_transactions,
      COUNT(*) FILTER (WHERE status = 'refunded') as refunded_transactions,
      COALESCE(SUM(amount) FILTER (WHERE status = 'refunded'), 0) as refunded_amount,
      status,
      COUNT(*) as status_count
    FROM payment_transactions
    ${dateFilter}
    GROUP BY ROLLUP(status)
    ORDER BY status NULLS FIRST
  `;

  const result = await query(statsQuery, values);
  const rows = result.rows;

  // First row contains totals (status is null due to ROLLUP)
  const totals = rows[0];
  const statusCounts = rows.slice(1);

  const transactionsByStatus: Record<PaymentTransaction['status'], number> = {
    pending: 0,
    completed: 0,
    failed: 0,
    refunded: 0
  };

  statusCounts.forEach((row: any) => {
    if (row.status) {
      transactionsByStatus[row.status as PaymentTransaction['status']] = parseInt(row.status_count);
    }
  });

  return {
    totalTransactions: parseInt(totals.total_transactions),
    totalAmount: parseFloat(totals.total_amount),
    successfulTransactions: parseInt(totals.successful_transactions),
    successfulAmount: parseFloat(totals.successful_amount),
    failedTransactions: parseInt(totals.failed_transactions),
    refundedTransactions: parseInt(totals.refunded_transactions),
    refundedAmount: parseFloat(totals.refunded_amount),
    transactionsByStatus
  };
}

/**
 * Get recent transactions
 */
export async function getRecentTransactions(limit: number = 10): Promise<PaymentTransaction[]> {
  const selectQuery = `
    SELECT pt.*, o.order_number, o.customer_email
    FROM payment_transactions pt
    LEFT JOIN orders o ON pt.order_id = o.id
    ORDER BY pt.created_at DESC
    LIMIT $1
  `;

  const result = await query<PaymentTransaction & { order_number: string; customer_email: string }>(selectQuery, [limit]);
  return result.rows;
}

/**
 * Get failed transactions for retry
 */
export async function getFailedTransactions(olderThanMinutes: number = 5): Promise<PaymentTransaction[]> {
  const selectQuery = `
    SELECT pt.*, o.order_number, o.customer_email
    FROM payment_transactions pt
    LEFT JOIN orders o ON pt.order_id = o.id
    WHERE pt.status = 'failed' 
    AND pt.created_at < NOW() - INTERVAL '${olderThanMinutes} minutes'
    ORDER BY pt.created_at ASC
  `;

  const result = await query<PaymentTransaction & { order_number: string; customer_email: string }>(selectQuery);
  return result.rows;
}

/**
 * Create refund transaction
 */
export async function createRefundTransaction(
  originalTransactionId: string,
  refundAmount: number,
  gatewayTransactionId: string,
  gatewayResponse: any
): Promise<PaymentTransaction> {
  // Get original transaction to get order ID
  const originalTransaction = await getPaymentTransactionById(originalTransactionId);
  if (!originalTransaction) {
    throw new Error('Original transaction not found');
  }

  const refundData: Omit<PaymentTransaction, 'id' | 'createdAt'> = {
    orderId: originalTransaction.orderId,
    amount: refundAmount,
    currency: originalTransaction.currency,
    status: 'refunded',
    gatewayTransactionId,
    gatewayResponse
  };

  return createPaymentTransaction(refundData);
}

/**
 * Get transaction summary for order
 */
export async function getTransactionSummaryForOrder(orderId: string): Promise<{
  totalPaid: number;
  totalRefunded: number;
  netAmount: number;
  transactionCount: number;
  lastTransactionDate: Date | null;
}> {
  const summaryQuery = `
    SELECT 
      COALESCE(SUM(amount) FILTER (WHERE status = 'completed'), 0) as total_paid,
      COALESCE(SUM(amount) FILTER (WHERE status = 'refunded'), 0) as total_refunded,
      COUNT(*) as transaction_count,
      MAX(created_at) as last_transaction_date
    FROM payment_transactions
    WHERE order_id = $1
  `;

  const result = await query(summaryQuery, [orderId]);
  const row = result.rows[0];

  const totalPaid = parseFloat(row.total_paid);
  const totalRefunded = parseFloat(row.total_refunded);

  return {
    totalPaid,
    totalRefunded,
    netAmount: totalPaid - totalRefunded,
    transactionCount: parseInt(row.transaction_count),
    lastTransactionDate: row.last_transaction_date
  };
}
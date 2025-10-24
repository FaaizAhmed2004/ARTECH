/**
 * Database Status API Route
 * Provides database health and initialization status
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseStatus } from '../../../../lib/database/init';

export async function GET(request: NextRequest) {
  try {
    const status = await getDatabaseStatus();
    
    return NextResponse.json({
      success: true,
      data: status,
      message: status.healthy ? 'Database is healthy' : 'Database connection issues detected'
    });
    
  } catch (error) {
    console.error('Database status check failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to check database status',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
// Health check endpoint
import { NextRequest } from 'next/server';
import { successResponse } from '@/lib/utils/api';
import { withErrorHandling } from '@/lib/api/middleware';

async function handler(req: NextRequest) {
  return successResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

export const GET = withErrorHandling(handler);

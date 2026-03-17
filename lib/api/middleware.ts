// API middleware for error handling
// Source: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextRequest, NextResponse } from 'next/server';
import { errorResponse } from '@/lib/utils/api';

export function withErrorHandling(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('API Error:', error);
      return errorResponse('Internal server error', 500);
    }
  };
}

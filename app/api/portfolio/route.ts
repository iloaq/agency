// API route for fetching portfolio cases
// Source: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextResponse } from 'next/server';
import { getPortfolioCases } from '@/lib/directus/portfolio';
import { withErrorHandling } from '@/lib/api/middleware';
import { successResponse } from '@/lib/utils/api';

async function handler() {
  const cases = await getPortfolioCases();
  return successResponse(cases);
}

export const GET = withErrorHandling(handler);

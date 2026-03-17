// API route for fetching about section
// Source: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextResponse } from 'next/server';
import { getAboutSection } from '@/lib/directus/about';
import { withErrorHandling } from '@/lib/api/middleware';
import { successResponse } from '@/lib/utils/api';

async function handler() {
  const section = await getAboutSection();
  return successResponse(section);
}

export const GET = withErrorHandling(handler);

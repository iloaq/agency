// API route for fetching slides
// Source: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextResponse } from 'next/server';
import { getSlides } from '@/lib/directus/slides';
import { withErrorHandling } from '@/lib/api/middleware';
import { successResponse, errorResponse } from '@/lib/utils/api';

async function handler() {
  const slides = await getSlides();
  return successResponse(slides);
}

export const GET = withErrorHandling(handler);

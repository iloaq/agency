// API utilities for Next.js App Router
// Source: https://nextjs.org/docs/app/api-reference/functions/next-response

import { NextResponse } from 'next/server';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  });
}

export function errorResponse(
  error: string | Error,
  status: number = 500
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : error,
    },
    { status }
  );
}

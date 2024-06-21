import { NextResponse } from 'next/server';

export function middleware(req) {
  const response = NextResponse.next();
  // Configure CORS headers specifically for API routes
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );
  if (req.method === 'OPTIONS') {
    return response;
  }
  return response;
}

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get all possible IP headers
  const headers = {
    'x-forwarded-for': request.headers.get('x-forwarded-for'),
    'x-real-ip': request.headers.get('x-real-ip'),
    'x-client-ip': request.headers.get('x-client-ip'),
    'cf-connecting-ip': request.headers.get('cf-connecting-ip'),
    'x-cluster-client-ip': request.headers.get('x-cluster-client-ip'),
    'x-forwarded': request.headers.get('x-forwarded'),
    'forwarded-for': request.headers.get('forwarded-for'),
    'forwarded': request.headers.get('forwarded'),
    'user-agent': request.headers.get('user-agent'),
  }

  // @ts-ignore - Next.js might provide ip
  const requestIP = request.ip || 'not-available'
  
  // Get connection info if available
  // @ts-ignore
  const connection = request.socket || {}
  
  return NextResponse.json({
    message: 'IP Detection Test',
    environment: process.env.NODE_ENV,
    headers,
    requestIP,
    url: request.url,
    timestamp: new Date().toISOString(),
  })
}
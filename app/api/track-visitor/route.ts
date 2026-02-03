import { NextRequest, NextResponse } from 'next/server'
import { trackVisitor, parseVisitorData, checkSuspiciousActivity } from '@/lib/visitor-tracking'

export async function POST(request: NextRequest) {
  try {
    // Parse visitor data from request headers
    const visitorData = parseVisitorData(request)
    
    // Get additional data from request body (from client-side)
    const body = await request.json()
    
    // Merge server-side and client-side data
    const completeVisitorData = {
      ...visitorData,
      page_url: body.page_url || visitorData.page_url,
      referer: body.referer || visitorData.referer,
    }

    // Get real IP address from various headers (production-ready)
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const cfConnectingIP = request.headers.get('cf-connecting-ip')
    const clientIP_header = request.headers.get('x-client-ip')
    const trueClientIP = request.headers.get('true-client-ip')
    
    // Priority for production hosting platforms:
    // 1. CF-Connecting-IP (Cloudflare)
    // 2. True-Client-IP (Akamai)
    // 3. X-Real-IP (Nginx)
    // 4. X-Client-IP (Apache)
    // 5. X-Forwarded-For (Load Balancers)
    let clientIP = cfConnectingIP 
      || trueClientIP 
      || realIP 
      || clientIP_header 
      || (forwarded ? forwarded.split(',')[0].trim() : null)
    
    // Fallback to Next.js IP detection
    if (!clientIP) {
      // @ts-ignore - Next.js provides ip in some environments
      clientIP = request.ip || 'unknown'
    }
    
    // Handle localhost/development IPs
    if (clientIP === '::1' || clientIP === '127.0.0.1' || clientIP === 'unknown') {
      if (process.env.NODE_ENV === 'development') {
        // For development, use a recognizable placeholder
        clientIP = 'dev-localhost-' + Date.now().toString().slice(-6) // Add timestamp for uniqueness
      } else {
        // In production, this should not happen, but keep as fallback
        clientIP = 'production-unknown'
      }
    }

    // Update visitor data with real IP
    completeVisitorData.ip_address = clientIP

    console.log('IP Detection Debug:', {
      'x-forwarded-for': forwarded,
      'x-real-ip': realIP,
      'cf-connecting-ip': cfConnectingIP,
      'final-ip': clientIP,
      'environment': process.env.NODE_ENV
    })

    console.log('Tracking visitor:', {
      ip: clientIP,
      userAgent: completeVisitorData.user_agent,
      isBot: completeVisitorData.is_bot,
      device: completeVisitorData.device_type
    })

    // Check for suspicious activity before tracking
    const isSuspicious = await checkSuspiciousActivity(clientIP)
    if (isSuspicious) {
      console.warn('Suspicious activity detected from IP:', clientIP)
      // Still track but flag as potentially suspicious
      completeVisitorData.is_bot = true
    }

    // Track the visitor
    const result = await trackVisitor(completeVisitorData)

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        tracked: true,
        is_bot: completeVisitorData.is_bot
      })
    } else {
      // If database is not configured, return 200 but with tracking disabled
      if (result.message === 'Database not configured') {
        return NextResponse.json({ 
          success: false, 
          message: 'Visitor tracking is currently disabled',
          tracked: false
        }, { status: 200 })
      }
      
      console.error('Failed to track visitor:', result.message)
      return NextResponse.json({ 
        success: false, 
        message: result.message 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Visitor tracking API error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}

// Optional: GET method to retrieve visitor stats (for admin use)
export async function GET(request: NextRequest) {
  try {
    // You can add authentication here if needed
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'stats') {
      // This would be for admin dashboard - implement authentication first
      return NextResponse.json({ 
        message: 'Stats endpoint - implement authentication first' 
      })
    }
    
    return NextResponse.json({ 
      message: 'Visitor tracking API is working' 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Error processing request' 
    }, { status: 500 })
  }
}
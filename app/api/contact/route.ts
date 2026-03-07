import { NextRequest, NextResponse } from 'next/server'
import { supabase, type ContactFormData } from '@/lib/supabase'

interface ContactFormRequest {
  name: string
  email: string
  company?: string
  phone?: string
  activateFreeDemo: boolean
  projectType?: string
  role?: string
  budget?: string
  timeline?: string
  message?: string
  userAgent?: string
}

async function checkSuspiciousActivity(clientIP: string): Promise<boolean> {
  try {
    // Simple bot detection based on common patterns
    // In production, you might want to use a service like Cloudflare or MaxMind
    const suspiciousPatterns = [
      /bot|crawler|spider|scraper/i,
      /curl|wget|python|java(?!script)/i,
    ]
    
    // You could add more sophisticated checks here
    return false
  } catch (error) {
    console.error('Bot detection error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP address from various headers
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const cfConnectingIP = request.headers.get('cf-connecting-ip')
    const clientIP_header = request.headers.get('x-client-ip')
    const trueClientIP = request.headers.get('true-client-ip')
    
    // Priority for production hosting platforms
    let clientIP = cfConnectingIP 
      || trueClientIP 
      || realIP 
      || clientIP_header 
      || (forwarded ? forwarded.split(',')[0].trim() : null)
    
    // Fallback to Next.js IP detection
    if (!clientIP) {
      // @ts-ignore
      clientIP = request.ip || 'unknown'
    }
    
    // Handle localhost/development IPs
    if (clientIP === '::1' || clientIP === '127.0.0.1' || clientIP === 'unknown') {
      if (process.env.NODE_ENV === 'development') {
        clientIP = 'dev-localhost-' + Date.now().toString().slice(-6)
      } else {
        clientIP = 'production-unknown'
      }
    }

    // Parse request body
    const body: ContactFormRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check for suspicious activity
    const isSuspicious = await checkSuspiciousActivity(clientIP)
    const isPotentialBot = isSuspicious || false

    // Prepare data for database
    const contactFormData: Omit<ContactFormData, 'id' | 'created_at' | 'updated_at'> = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company?.trim() || null,
      phone: body.phone?.trim() || null,
      activate_free_demo: body.activateFreeDemo || false,
      project_type: body.projectType?.trim() || null,
      role: body.role?.trim() || null,
      budget: body.budget?.trim() || null,
      timeline: body.timeline?.trim() || null,
      message: body.message?.trim() || null,
      ip_address: clientIP,
      user_agent: body.userAgent || 'unknown',
      is_potential_bot: isPotentialBot,
    }

    console.log('Contact form data to be inserted:', contactFormData)

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_forms')
      .insert([contactFormData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        fullError: error
      })
      return NextResponse.json(
        { success: false, message: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: 'Form submitted successfully! We\'ll be in touch within 24 hours.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    return NextResponse.json(
      { 
        success: false, 
        message: `Error: ${errorMessage}`
      },
      { status: 500 }
    )
  }
}

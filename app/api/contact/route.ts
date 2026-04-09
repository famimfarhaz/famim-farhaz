import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'


interface ContactFormRequest {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  userAgent?: string
}

export async function POST(request: NextRequest) {
  try {
    // Capture client IP
    const forwarded = request.headers.get('x-forwarded-for')
    const cfIP = request.headers.get('cf-connecting-ip')
    const realIP = request.headers.get('x-real-ip')
    let clientIP = cfIP || realIP || (forwarded ? forwarded.split(',')[0].trim() : null)
    if (!clientIP) clientIP = (request as any).ip || 'unknown'
    if (clientIP === '::1' || clientIP === '127.0.0.1') {
      clientIP = process.env.NODE_ENV === 'development' ? `dev-${Date.now()}` : 'unknown'
    }

    const body: ContactFormRequest = await request.json()

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      )
    }

    if (!body.message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Message is required.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('contact_forms')
      .insert([
        {
          name: body.name.trim(),
          email: body.email.trim().toLowerCase(),
          company: body.company?.trim() || null,
          phone: body.phone?.trim() || null,
          message: body.message.trim(),
          ip_address: clientIP,
          user_agent: body.userAgent || 'unknown',
        },
      ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, message: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been received. I will respond within 24 hours.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

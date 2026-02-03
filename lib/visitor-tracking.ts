import { supabase, isSupabaseConfigured } from './supabase'

export interface VisitorData {
  ip_address: string
  user_agent?: string
  referer?: string
  page_url?: string
  country?: string
  city?: string
  device_type?: string
  browser?: string
  os?: string
  is_bot?: boolean
}

export interface VisitorLog extends VisitorData {
  id?: string
  visit_count?: number
  first_visit?: string
  last_visit?: string
  created_at?: string
}

// Bot detection patterns
const BOT_PATTERNS = [
  /bot/i, /crawler/i, /spider/i, /scraper/i,
  /facebook/i, /twitter/i, /linkedin/i,
  /google/i, /bing/i, /yahoo/i, /duckduck/i,
  /curl/i, /wget/i, /python/i, /node/i,
  /postman/i, /insomnia/i, /httpie/i
]

// Device detection
const DEVICE_PATTERNS = {
  mobile: /Mobile|Android|iPhone|iPad/i,
  tablet: /iPad|Tablet/i,
  desktop: /Windows|Macintosh|Linux/i
}

// Browser detection
const BROWSER_PATTERNS = {
  chrome: /Chrome/i,
  firefox: /Firefox/i,
  safari: /Safari/i,
  edge: /Edge/i,
  opera: /Opera/i,
  ie: /MSIE|Trident/i
}

// OS detection
const OS_PATTERNS = {
  windows: /Windows/i,
  macos: /Mac OS/i,
  linux: /Linux/i,
  android: /Android/i,
  ios: /iPhone|iPad/i
}

function detectBot(userAgent: string): boolean {
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent))
}

function detectDevice(userAgent: string): string {
  if (DEVICE_PATTERNS.mobile.test(userAgent)) return 'mobile'
  if (DEVICE_PATTERNS.tablet.test(userAgent)) return 'tablet'
  if (DEVICE_PATTERNS.desktop.test(userAgent)) return 'desktop'
  return 'unknown'
}

function detectBrowser(userAgent: string): string {
  for (const [browser, pattern] of Object.entries(BROWSER_PATTERNS)) {
    if (pattern.test(userAgent)) return browser
  }
  return 'unknown'
}

function detectOS(userAgent: string): string {
  for (const [os, pattern] of Object.entries(OS_PATTERNS)) {
    if (pattern.test(userAgent)) return os
  }
  return 'unknown'
}

// Get client IP address
export function getClientIP(request?: Request): string {
  if (typeof window !== 'undefined') {
    // Client-side fallback - will need server-side for real IP
    return 'client-side'
  }

  if (request) {
    // Try various headers for IP detection
    const forwarded = request.headers.get('x-forwarded-for')
    const real = request.headers.get('x-real-ip')
    const cfConnecting = request.headers.get('cf-connecting-ip')
    
    if (forwarded) return forwarded.split(',')[0].trim()
    if (real) return real
    if (cfConnecting) return cfConnecting
  }
  
  return 'unknown'
}

// Parse visitor data from request
export function parseVisitorData(request?: Request): VisitorData {
  const userAgent = (typeof window !== 'undefined' 
    ? navigator.userAgent 
    : request?.headers.get('user-agent')) || 'unknown'
  
  const referer = (typeof window !== 'undefined' 
    ? document.referrer 
    : request?.headers.get('referer')) || undefined
  
  const pageUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : request?.url || undefined

  const ip_address = getClientIP(request)
  const is_bot = detectBot(userAgent)
  const device_type = is_bot ? 'bot' : detectDevice(userAgent)
  const browser = detectBrowser(userAgent)
  const os = detectOS(userAgent)

  return {
    ip_address,
    user_agent: userAgent,
    referer,
    page_url: pageUrl,
    device_type,
    browser,
    os,
    is_bot
  }
}

// Track visitor
export async function trackVisitor(visitorData?: VisitorData): Promise<{ success: boolean, data?: any, message: string }> {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured. Skipping visitor tracking.')
      return { success: false, message: 'Database not configured' }
    }
    
    const data = visitorData || parseVisitorData()
    
    // Check if visitor already exists
    const { data: existingVisitor, error: selectError } = await supabase
      .from('visitor_logs')
      .select('*')
      .eq('ip_address', data.ip_address)
      .single()

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error checking existing visitor:', selectError)
    }

    if (existingVisitor) {
      // Update existing visitor
      const { data: updatedData, error: updateError } = await supabase
        .from('visitor_logs')
        .update({
          visit_count: (existingVisitor.visit_count || 1) + 1,
          last_visit: new Date().toISOString(),
          page_url: data.page_url,
          referer: data.referer
        })
        .eq('id', existingVisitor.id)
        .select()

      if (updateError) {
        console.error('Visitor update error:', updateError)
        return { success: false, message: 'Failed to update visitor log' }
      }

      return { success: true, data: updatedData, message: 'Visitor updated' }
    } else {
      // Insert new visitor
      const { data: newData, error: insertError } = await supabase
        .from('visitor_logs')
        .insert([data])
        .select()

      if (insertError) {
        console.error('Visitor insert error:', insertError)
        return { success: false, message: 'Failed to create visitor log' }
      }

      return { success: true, data: newData, message: 'New visitor tracked' }
    }
  } catch (error) {
    console.error('Visitor tracking error:', error)
    return { success: false, message: 'Visitor tracking failed' }
  }
}

// Get visitor statistics
export async function getVisitorStats() {
  try {
    const { data, error } = await supabase
      .from('visitor_stats')
      .select('*')
      .limit(30) // Last 30 days

    if (error) {
      console.error('Error fetching visitor stats:', error)
      return { success: false, data: null, message: error.message }
    }

    return { success: true, data, message: 'Stats retrieved successfully' }
  } catch (error) {
    console.error('Stats retrieval error:', error)
    return { success: false, data: null, message: 'Failed to retrieve stats' }
  }
}

// Check if IP is suspicious (multiple rapid requests, bot-like behavior)
export async function checkSuspiciousActivity(ipAddress: string): Promise<boolean> {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    
    const { data, error } = await supabase
      .from('visitor_logs')
      .select('visit_count, is_bot')
      .eq('ip_address', ipAddress)
      .gte('last_visit', oneHourAgo)
      .single()

    if (error) return false

    // Consider suspicious if more than 50 visits in an hour or marked as bot
    return (data?.visit_count || 0) > 50 || data?.is_bot === true
  } catch (error) {
    console.error('Suspicious activity check error:', error)
    return false
  }
}
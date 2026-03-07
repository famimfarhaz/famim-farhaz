import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn('Supabase environment variables not found. Some features may not work properly.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Database types
export interface ContactFormData {
  id?: string
  name: string
  email: string
  company?: string | null
  phone?: string | null
  activate_free_demo: boolean
  project_type?: string | null
  role?: string | null
  budget?: string | null
  timeline?: string | null
  message?: string | null
  ip_address?: string | null
  user_agent?: string | null
  is_potential_bot?: boolean | null
  created_at?: string
  updated_at?: string
}

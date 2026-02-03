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
  company?: string
  phone?: string
  activate_free_demo: boolean
  selected_action?: 'meeting' | 'hire' | null
  
  // Meeting specific fields
  meeting_topic?: string
  preferred_date?: string
  preferred_time?: string
  timezone?: string
  custom_timezone?: string
  meeting_platform?: string
  meeting_notes?: string
  
  // Hire specific fields
  project_type?: string
  custom_project_type?: string
  role?: string
  budget?: string
  timeline?: string
  message?: string
  
  created_at?: string
  updated_at?: string
}
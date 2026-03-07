import { supabase, ContactFormData } from './supabase'

export interface FormSubmissionData {
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
}

export const submitContactForm = async (formData: FormSubmissionData) => {
  try {
    // Get user agent and prepare for IP tracking
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'unknown'
    
    // Get IP address from our API (will be set server-side)
    let ipAddress = 'unknown'
    let isPotentialBot = false
    
    try {
      const ipResponse = await fetch('/api/track-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_agent: userAgent,
          page_url: window.location.href,
          referer: document.referrer
        })
      })
      
      if (ipResponse.ok) {
        const ipData = await ipResponse.json()
        isPotentialBot = ipData.is_bot || false
      }
    } catch (ipError) {
      console.error('IP tracking error:', ipError)
    }
    
    // Transform the form data to match database schema
    const dbData: Omit<ContactFormData, 'id' | 'created_at' | 'updated_at'> = {
      name: formData.name,
      email: formData.email,
      company: formData.company || null,
      phone: formData.phone || null,
      activate_free_demo: formData.activateFreeDemo,
      project_type: formData.projectType || null,
      role: formData.role || null,
      budget: formData.budget || null,
      timeline: formData.timeline || null,
      message: formData.message || null,
      ip_address: ipAddress,
      user_agent: userAgent,
      is_potential_bot: isPotentialBot,
    }

    const { data, error } = await supabase
      .from('contact_forms')
      .insert([dbData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Database error: ${error.message}`)
    }

    return {
      success: true,
      data: data,
      message: 'Form submitted successfully!'
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

// Function to get all form submissions (for admin use)
export const getContactForms = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_forms')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return {
      success: true,
      data: data,
      message: 'Forms retrieved successfully!'
    }
  } catch (error) {
    console.error('Error fetching forms:', error)
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}
import { ContactFormData, supabase } from './supabase'

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
    // Get user agent
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'unknown'

    // Send form data to server-side API endpoint
    // The server will handle IP capture, bot detection, and database insertion
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        phone: formData.phone || undefined,
        activateFreeDemo: formData.activateFreeDemo,
        projectType: formData.projectType || undefined,
        role: formData.role || undefined,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
        message: formData.message || undefined,
        userAgent: userAgent,
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to submit form')
    }

    return {
      success: true,
      data: responseData.data,
      message: responseData.message || 'Form submitted successfully!'
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
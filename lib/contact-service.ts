import { supabase } from './supabase'

export interface FormSubmissionData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

export const submitContactForm = async (formData: FormSubmissionData) => {
  try {
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'unknown'

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        phone: formData.phone || undefined,
        message: formData.message,
        userAgent,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to submit form')
    }

    return {
      success: true,
      data: responseData.data,
      message: responseData.message || 'Message sent successfully.',
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

// Get all form submissions (admin use)
export const getContactForms = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_forms')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Database error: ${error.message}`)

    return { success: true, data, message: 'Forms retrieved successfully.' }
  } catch (error) {
    console.error('Error fetching forms:', error)
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}
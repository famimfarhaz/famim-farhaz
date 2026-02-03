import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { projectId, rating, userFingerprint } = await request.json()

    // Validate input
    if (!projectId || !rating || !userFingerprint) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 10) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 10' },
        { status: 400 }
      )
    }

    // Check if user already rated this project
    const { data: existingRating } = await supabase
      .from('project_ratings')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_fingerprint', userFingerprint)
      .single()

    if (existingRating) {
      // Update existing rating
      const { data, error } = await supabase
        .from('project_ratings')
        .update({ rating, updated_at: new Date().toISOString() })
        .eq('project_id', projectId)
        .eq('user_fingerprint', userFingerprint)
        .select()

      if (error) throw error

      return NextResponse.json({ success: true, data, updated: true })
    } else {
      // Insert new rating
      const { data, error } = await supabase
        .from('project_ratings')
        .insert([
          {
            project_id: projectId,
            rating,
            user_fingerprint: userFingerprint,
          },
        ])
        .select()

      if (error) throw error

      return NextResponse.json({ success: true, data, updated: false })
    }
  } catch (error: any) {
    console.error('Error saving rating:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save rating' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const userFingerprint = searchParams.get('userFingerprint')

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    // Get user's rating if fingerprint provided
    if (userFingerprint) {
      const { data, error } = await supabase
        .from('project_ratings')
        .select('*')
        .eq('project_id', projectId)
        .eq('user_fingerprint', userFingerprint)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return NextResponse.json({ rating: data?.rating || null })
    }

    // Get average rating for project
    const { data, error } = await supabase
      .from('project_ratings')
      .select('rating')
      .eq('project_id', projectId)

    if (error) throw error

    const ratings = data || []
    const average = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : null

    return NextResponse.json({
      average: average ? Math.round(average * 10) / 10 : null,
      count: ratings.length,
    })
  } catch (error: any) {
    console.error('Error fetching rating:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch rating' },
      { status: 500 }
    )
  }
}

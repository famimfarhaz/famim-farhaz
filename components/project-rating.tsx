"use client"

import { useEffect, useState } from "react"
import { RatingScaleGroup, RatingScaleItem } from "@/components/ui/rating-scale-group"

interface ProjectRatingProps {
  projectId: string
}

// Generate a browser-specific fingerprint
function getUserFingerprint(): string {
  if (typeof window === 'undefined') return ''

  let fingerprint = localStorage.getItem('user_fingerprint')

  if (!fingerprint) {
    // Create a consistent fingerprint based on browser characteristics
    // This will be different for each browser but consistent within the same browser
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let canvasFingerprint = ''

    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('Browser fingerprint', 2, 2)
      canvasFingerprint = canvas.toDataURL()
    }

    // Combine multiple browser characteristics for unique fingerprint
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 'unknown',
      navigator.platform,
      canvasFingerprint.substring(0, 50), // First 50 chars of canvas fingerprint
    ].join('|')

    // Generate hash-like fingerprint
    fingerprint = btoa(components).substring(0, 64)

    localStorage.setItem('user_fingerprint', fingerprint)
  }

  return fingerprint
}

export function ProjectRating({ projectId }: ProjectRatingProps) {
  const [selectedRating, setSelectedRating] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [ratingCount, setRatingCount] = useState<number>(0)

  // Fetch rating count for this project
  const fetchRatingCount = async () => {
    try {
      const response = await fetch(`/api/ratings?projectId=${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setRatingCount(data.count || 0)
      }
    } catch (error) {
      console.error('Failed to load rating count:', error)
    }
  }

  // Load saved rating on mount
  useEffect(() => {
    const loadSavedRating = async () => {
      // Fetch from backend using browser-specific fingerprint
      try {
        const userFingerprint = getUserFingerprint()
        const response = await fetch(
          `/api/ratings?projectId=${projectId}&userFingerprint=${userFingerprint}`
        )

        if (response.ok) {
          const data = await response.json()
          if (data.rating) {
            setSelectedRating(data.rating.toString())
            localStorage.setItem(`rating_${projectId}`, data.rating.toString())
            setIsSaved(true)
          } else {
            // No rating found for this browser's fingerprint
            setSelectedRating(null)
            setIsSaved(false)
            // Clear localStorage if it exists but backend doesn't have it
            localStorage.removeItem(`rating_${projectId}`)
          }
        }
      } catch (error) {
        console.error('Failed to load rating:', error)
      }
    }

    loadSavedRating()
    fetchRatingCount()
  }, [projectId])

  const handleRatingChange = async (value: string) => {
    setSelectedRating(value)
    setIsLoading(true)
    setIsSaved(false)

    try {
      const userFingerprint = getUserFingerprint()

      // Save to local storage immediately
      localStorage.setItem(`rating_${projectId}`, value)

      // Save to backend
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          rating: parseInt(value),
          userFingerprint,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save rating')
      }

      const data = await response.json()
      setIsSaved(true)

      // Refresh rating count
      await fetchRatingCount()

      // Show success message briefly
      setTimeout(() => setIsSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save rating:', error)
      // Rating is still saved in local storage even if backend fails
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Rate this project</h3>
        {ratingCount > 0 && (
          <p className="text-sm text-muted-foreground">
            {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'}
          </p>
        )}
      </div>

      <RatingScaleGroup value={selectedRating || undefined} onValueChange={handleRatingChange}>
        {Array.from({ length: 10 }).map((_, i) => (
          <RatingScaleItem
            key={i}
            value={(i + 1).toString()}
            label={(i + 1).toString()}
            disabled={isLoading}
          />
        ))}
      </RatingScaleGroup>

      {isSaved && (
        <p className="text-center text-sm text-green-400 animate-in fade-in">
          ✓ Rating saved successfully!
        </p>
      )}

      {isLoading && (
        <p className="text-center text-sm text-muted-foreground animate-pulse">
          Saving your rating...
        </p>
      )}
    </div>
  )
}

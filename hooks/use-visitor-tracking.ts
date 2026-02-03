import { useEffect, useRef } from 'react'

// Client-side visitor tracking hook
export function useVisitorTracking() {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Only track once per session
    if (hasTracked.current) return
    hasTracked.current = true

    const trackVisitor = async () => {
      try {
        // Get visitor information
        const visitorData = {
          user_agent: navigator.userAgent,
          referer: document.referrer,
          page_url: window.location.href,
          timestamp: new Date().toISOString(),
          screen_resolution: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }

        // Send to our API route for server-side processing
        const response = await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData),
        })

        if (!response.ok) {
          // Silently handle tracking failures - don't log errors
          return
        }
        
        const data = await response.json()
        // Silently handle if tracking is disabled
        if (data.tracked === false) {
          // Tracking disabled, no action needed
          return
        }
      } catch (error) {
        // Silently fail - don't show errors to users for tracking
        console.log('Visitor tracking unavailable:', error instanceof Error ? error.message : 'Unknown error')
      }
    }

    // Track after a short delay to avoid blocking page load
    const timer = setTimeout(trackVisitor, 1000)

    return () => clearTimeout(timer)
  }, [])

  return null // This hook doesn't return anything, just tracks
}
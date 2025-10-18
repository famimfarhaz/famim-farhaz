"use client"

import { useVisitorTracking } from '@/hooks/use-visitor-tracking'

export function VisitorTracker() {
  // This hook automatically tracks visitors when the component mounts
  useVisitorTracking()
  
  // This component doesn't render anything visible
  return null
}
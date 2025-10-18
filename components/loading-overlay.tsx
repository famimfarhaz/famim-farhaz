"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setFadeOut(true)
      // Remove overlay after fade animation
      setTimeout(() => setIsLoading(false), 500)
    }, 1000) // Show loading for 1 second

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo animation */}
        <div className="relative">
          <Image 
            src="/portfolio-logo.png" 
            alt="Portfolio Logo" 
            width={48} 
            height={48} 
            className="h-12 w-12 animate-pulse"
          />
          <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Famim Farhaz
          </h2>
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Loading</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
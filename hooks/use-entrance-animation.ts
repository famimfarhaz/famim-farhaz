"use client"

import { useEffect, useRef, useState } from "react"

interface EntranceAnimationOptions {
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  stagger?: number
}

export function useEntranceAnimation(options: EntranceAnimationOptions = {}) {
  const {
    delay = 0,
    duration = 800,
    direction = 'up',
    stagger = 100
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set initial state
    element.style.opacity = '0'
    element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    
    // Set initial transform based on direction
    switch (direction) {
      case 'up':
        element.style.transform = 'translateY(60px)'
        break
      case 'down':
        element.style.transform = 'translateY(-60px)'
        break
      case 'left':
        element.style.transform = 'translateX(60px)'
        break
      case 'right':
        element.style.transform = 'translateX(-60px)'
        break
      case 'fade':
        element.style.transform = 'scale(0.95)'
        break
      default:
        element.style.transform = 'translateY(60px)'
    }

    // Trigger animation after delay
    const timer = setTimeout(() => {
      element.style.opacity = '1'
      element.style.transform = direction === 'fade' ? 'scale(1)' : 'translate(0, 0)'
      setIsLoaded(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, duration, direction])

  return { ref, isLoaded }
}

export function useStaggeredEntranceAnimation(options: EntranceAnimationOptions = {}) {
  const {
    delay = 0,
    duration = 800,
    direction = 'up',
    stagger = 100
  } = options

  const containerRef = useRef<HTMLElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Find all elements with data-animate attribute
    const animateElements = container.querySelectorAll('[data-animate]')
    
    animateElements.forEach((element, index) => {
      const el = element as HTMLElement
      
      // Set initial state
      el.style.opacity = '0'
      el.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
      
      // Set initial transform based on direction
      switch (direction) {
        case 'up':
          el.style.transform = 'translateY(60px)'
          break
        case 'down':
          el.style.transform = 'translateY(-60px)'
          break
        case 'left':
          el.style.transform = 'translateX(60px)'
          break
        case 'right':
          el.style.transform = 'translateX(-60px)'
          break
        case 'fade':
          el.style.transform = 'scale(0.95)'
          break
        default:
          el.style.transform = 'translateY(60px)'
      }

      // Trigger animation with staggered delay
      const timer = setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = direction === 'fade' ? 'scale(1)' : 'translate(0, 0)'
        
        // Mark as loaded when last element animates
        if (index === animateElements.length - 1) {
          setIsLoaded(true)
        }
      }, delay + (index * stagger))
    })

  }, [delay, duration, direction, stagger])

  return { containerRef, isLoaded }
}
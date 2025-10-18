"use client"

import React from 'react'
import { useStepTransition } from '@/hooks/use-step-transition'

interface StepTransitionProps {
  currentStep: number
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  duration?: number
  minHeight?: string
}

export function StepTransition({ 
  currentStep, 
  children, 
  className = '',
  direction = 'vertical',
  duration = 400,
  minHeight = 'auto'
}: StepTransitionProps) {
  const { isTransitioning } = useStepTransition(currentStep, {
    direction,
    duration
  })

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight, transition: `min-height ${duration}ms ease-in-out` }}
    >
      <div 
        className={`transition-all duration-300 ${isTransitioning ? 'pointer-events-none' : 'pointer-events-auto'}`}
        style={{
          opacity: isTransitioning ? 0.8 : 1,
          transform: isTransitioning 
            ? direction === 'horizontal' 
              ? 'translateX(-10px)' 
              : 'translateY(-5px)'
            : 'translate(0, 0)'
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface AnimatedStepProps {
  stepNumber: number
  currentStep: number
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  duration?: number
}

export function AnimatedStep({ 
  stepNumber, 
  currentStep, 
  children, 
  className = '',
  direction = 'vertical',
  duration = 400
}: AnimatedStepProps) {
  const { getStepStyles } = useStepTransition(currentStep, {
    direction,
    duration
  })

  const isActive = stepNumber === currentStep

  return (
    <div 
      className={className}
      style={{
        ...getStepStyles(stepNumber),
        willChange: 'transform, opacity'
      }}
    >
      {/* Only render content for active step to optimize performance */}
      {isActive && children}
    </div>
  )
}

// Enhanced step container with stagger animations for child elements
interface StaggeredStepProps {
  stepNumber: number
  currentStep: number
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  childSelector?: string
}

export function StaggeredStep({ 
  stepNumber, 
  currentStep, 
  children, 
  className = '',
  staggerDelay = 100,
  childSelector = '[data-animate-child]'
}: StaggeredStepProps) {
  const isActive = stepNumber === currentStep
  const wasActive = React.useRef(isActive)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (isActive && !wasActive.current && containerRef.current) {
      const childElements = containerRef.current.querySelectorAll(childSelector)
      
      childElements.forEach((element, index) => {
        const el = element as HTMLElement
        
        // Set initial state
        el.style.opacity = '0'
        el.style.transform = 'translateY(20px)'
        el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        
        // Animate with stagger
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, index * staggerDelay + 100)
      })
    }
    
    wasActive.current = isActive
  }, [isActive, staggerDelay, childSelector])

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: isActive ? 'static' : 'absolute',
        top: isActive ? 'auto' : 0,
        left: isActive ? 'auto' : 0,
        right: isActive ? 'auto' : 0,
        visibility: isActive ? 'visible' : 'hidden',
        pointerEvents: isActive ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  )
}
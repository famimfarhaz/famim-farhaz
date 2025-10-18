"use client"

import { useEffect, useState } from "react"

interface StepTransitionOptions {
  direction?: 'horizontal' | 'vertical'
  duration?: number
  easing?: string
}

export function useStepTransition(
  currentStep: number,
  options: StepTransitionOptions = {}
) {
  const {
    direction = 'horizontal',
    duration = 500,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)'
  } = options

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayStep, setDisplayStep] = useState(currentStep)

  useEffect(() => {
    if (currentStep !== displayStep) {
      setIsTransitioning(true)
      
      const timer = setTimeout(() => {
        setDisplayStep(currentStep)
        
        const endTimer = setTimeout(() => {
          setIsTransitioning(false)
        }, duration / 2)
        
        return () => clearTimeout(endTimer)
      }, duration / 2)
      
      return () => clearTimeout(timer)
    }
  }, [currentStep, displayStep, duration])

  const getStepStyles = (stepNumber: number) => {
    const isActive = stepNumber === displayStep
    const isNext = stepNumber > displayStep
    const isPrev = stepNumber < displayStep
    
    let transform = ''
    
    if (direction === 'horizontal') {
      if (isNext) transform = 'translateX(100%)'
      else if (isPrev) transform = 'translateX(-100%)'
      else transform = 'translateX(0%)'
    } else {
      if (isNext) transform = 'translateY(50px)'
      else if (isPrev) transform = 'translateY(-50px)'
      else transform = 'translateY(0px)'
    }
    
    return {
      opacity: isActive ? 1 : 0,
      transform,
      transition: `all ${duration}ms ${easing}`,
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      visibility: isActive ? 'visible' as const : 'hidden' as const,
      pointerEvents: isActive ? 'auto' as const : 'none' as const
    }
  }

  return {
    isTransitioning,
    displayStep,
    getStepStyles
  }
}

// Progressive step transition with stagger effect
export function useProgressiveStepTransition(
  currentStep: number,
  totalSteps: number,
  options: StepTransitionOptions = {}
) {
  const {
    duration = 600,
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  } = options

  const [animationStage, setAnimationStage] = useState<'idle' | 'exiting' | 'entering'>('idle')

  useEffect(() => {
    if (animationStage === 'idle') {
      setAnimationStage('exiting')
      
      const enterTimer = setTimeout(() => {
        setAnimationStage('entering')
        
        const idleTimer = setTimeout(() => {
          setAnimationStage('idle')
        }, duration)
        
        return () => clearTimeout(idleTimer)
      }, duration / 2)
      
      return () => clearTimeout(enterTimer)
    }
  }, [currentStep, duration, animationStage])

  const getProgressiveStyles = (stepNumber: number) => {
    const isActive = stepNumber === currentStep
    
    if (!isActive) {
      return {
        opacity: 0,
        transform: 'translateY(30px) scale(0.95)',
        transition: `all ${duration / 2}ms ${easing}`,
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        visibility: 'hidden' as const,
        pointerEvents: 'none' as const
      }
    }
    
    return {
      opacity: animationStage === 'exiting' ? 0 : 1,
      transform: animationStage === 'entering' 
        ? 'translateY(0px) scale(1)' 
        : animationStage === 'exiting'
        ? 'translateY(-30px) scale(0.95)'
        : 'translateY(0px) scale(1)',
      transition: `all ${duration / 2}ms ${easing}`,
      position: 'relative' as const,
      visibility: 'visible' as const,
      pointerEvents: 'auto' as const
    }
  }

  return {
    animationStage,
    getProgressiveStyles
  }
}
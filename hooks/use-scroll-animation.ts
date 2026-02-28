"use client"

import { useEffect, useRef } from "react"

export function useScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement
              target.style.opacity = '1'
              target.style.transform = 'translateY(0px)'
            }
          })
        },
        { threshold: 0.15 },
      )

      const elements = sectionRef.current?.querySelectorAll(".scroll-animate")

      elements?.forEach((el, index) => {
        const element = el as HTMLElement
        element.style.opacity = '0'
        element.style.transform = 'translateY(40px)'
        element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1)`
        element.style.transitionDelay = `${index * 100}ms`

        // Check if element is already in view and animate immediately
        const rect = element.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0

        if (isInView) {
          // Animate immediately for elements already in view
          setTimeout(() => {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0px)'
          }, index * 100 + 200)
        }

        observer?.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer?.disconnect()
    }
  }, [])

  return sectionRef
}
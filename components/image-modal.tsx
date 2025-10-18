"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryItem {
  image: string
  title: string
  description: string
}

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: GalleryItem[]
  currentIndex: number
  onIndexChange: (index: number) => void
}

export function ImageModal({ isOpen, onClose, images, currentIndex, onIndexChange }: ImageModalProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'ArrowRight':
          handleNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleNext = () => {
    setIsLoaded(false)
    onIndexChange((currentIndex + 1) % images.length)
  }

  const handlePrevious = () => {
    setIsLoaded(false)
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white text-black hover:bg-white/90 h-10 w-10"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Previous button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white text-black hover:bg-white/90 h-12 w-12"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white text-black hover:bg-white/90 h-12 w-12"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}

      {/* Main content */}
      <div className="max-w-7xl max-h-full w-full flex flex-col items-center justify-center">
        {/* Image container */}
        <div className="relative w-full max-h-[80vh] flex items-center justify-center">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          
          <div className="relative max-w-full max-h-full">
            <Image
              src={currentImage.image}
              alt={currentImage.title}
              width={1200}
              height={800}
              className={`max-w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsLoaded(true)}
              priority
            />
          </div>
        </div>

        {/* Image info */}
        <div className="mt-6 text-center max-w-2xl">
          <h3 className="text-xl font-semibold text-white mb-2">
            {currentImage.title}
          </h3>
          <p className="text-gray-300 text-sm">
            {currentImage.description}
          </p>
          
          {/* Image counter */}
          {images.length > 1 && (
            <div className="mt-4 text-gray-400 text-sm">
              {currentIndex + 1} of {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail navigation */}
        {images.length > 1 && (
          <div className="mt-6 flex gap-2 max-w-full overflow-x-auto scrollbar-hide">
            {images.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsLoaded(false)
                  onIndexChange(index)
                }}
                className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-white' 
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThumbnailCarousel from "@/components/ui/thumbnail-carousel"

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
  // Close on Escape; keep body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  const items = images.map((it, i) => ({ id: i + 1, url: it.image, title: it.title }))

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
        className="absolute top-4 right-4 z-10 bg-black/70 text-white hover:bg-black/90 h-10 w-10"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* New thumbnail carousel */}
      <div className="w-full max-w-6xl">
        <ThumbnailCarousel
          items={items}
          initialIndex={currentIndex}
          onIndexChange={onIndexChange}
        />
      </div>
    </div>
  )
}

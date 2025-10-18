'use client'

import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || "/video.mp4"
    
    const handleCanPlayThrough = () => {
      setIsLoading(false)
      video.play().catch(console.error)
    }

    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
    }

    const handleEnded = () => {
      video.currentTime = 0
      video.play().catch(console.error)
    }

    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('error', handleError)
    video.addEventListener('ended', handleEnded)

    video.src = videoUrl
    video.load()

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('error', handleError)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black">
      <div className="relative w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
        
        {isLoading && !hasError && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg">
            Loading animation...
          </div>
        )}
        
        {hasError && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg">
            Animation unavailable
          </div>
        )}
      </div>
    </div>
  )
}

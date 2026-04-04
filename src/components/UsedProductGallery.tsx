'use client'

import { useState } from 'react'

interface Props {
  images: string[]
  name: string
}

export default function UsedProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="w-full rounded-3xl lg:sticky lg:top-24"
        style={{ aspectRatio: '1/1', background: 'var(--color-bg-section)' }} />
    )
  }

  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-3">
      {/* Main image */}
      <div className="w-full rounded-3xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <img src={images[active]} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={url}
              onClick={() => setActive(i)}
              className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all"
              style={{
                border: i === active ? '2px solid var(--color-primary)' : '2px solid transparent',
                opacity: i === active ? 1 : 0.6,
              }}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

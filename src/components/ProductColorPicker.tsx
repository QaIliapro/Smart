'use client'

import { useState } from 'react'

interface Color {
  name: string
  hex: string
}

export default function ProductColorPicker({ colors }: { colors: Color[] }) {
  const [selectedColor, setSelectedColor] = useState(0)

  if (!colors.length) return null

  return (
    <div>
      <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
        Цвет: <span style={{ color: 'var(--text-primary)' }}>{colors[selectedColor]?.name}</span>
      </p>
      <div className="flex gap-3">
        {colors.map((color, i) => (
          <button key={i} onClick={() => setSelectedColor(i)}
            className="w-8 h-8 rounded-full transition-transform hover:scale-110"
            style={{
              background: color.hex,
              border: selectedColor === i ? '3px solid var(--accent)' : '2px solid var(--border-color)',
              outline: selectedColor === i ? '2px solid var(--bg-primary)' : 'none',
              outlineOffset: '1px',
            }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
}

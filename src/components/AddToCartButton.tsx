'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'

interface Props {
  product: {
    id: string
    name: string
    price: number
    type: 'new' | 'used'
    condition?: string
    imageUrl?: string
  }
  className?: string
  fullWidth?: boolean
}

export default function AddToCartButton({ product, className, fullWidth }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({ ...product, quantity: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      className={`btn-primary text-sm ${fullWidth ? 'w-full' : 'flex-1'} ${className || ''}`}
      style={added ? { background: '#34c759' } : {}}
    >
      {added ? '✓ Добавлено' : 'В корзину'}
    </button>
  )
}

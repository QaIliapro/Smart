'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  category: string
  tag: string
  specs: string
  gradient: string
  imageUrl?: string | null
  stock: number
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#ff3b3020', color: '#ff3b30' }}>Нет в наличии</span>
  }
  if (stock <= 3) {
    return <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#ff9f0a20', color: '#ff9f0a' }}>Осталось {stock} шт</span>
  }
  return <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#34c75920', color: '#34c759' }}>В наличии</span>
}

export default function NewPage() {
  const [filter] = useState<'All' | 'iPhone' | 'Mac'>('All')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/new-products')
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>Каталог</p>
        <h1 className="section-title mb-4">Новые устройства</h1>
        <p className="section-subtitle">Последние новинки Apple с официальной гарантией</p>
      </div>


      {loading ? (
        <div className="text-center py-24" style={{ color: 'var(--color-text-secondary)' }}>Загрузка...</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(product => {
            let specs: string[] = []
            try { specs = JSON.parse(product.specs) } catch {}
            return (
              <div key={product.id} className="card overflow-hidden flex flex-col">
                {/* Image Placeholder */}
                <div className="relative" style={{ aspectRatio: '1 / 1' }}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${product.gradient}`} />
                  )}
                  {product.tag ? (
                    <span className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.4)' }}>
                      {product.tag}
                    </span>
                  ) : null}
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-1" style={{ minHeight: '2.5rem' }}>
                    <h3 className="font-semibold text-base leading-tight" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h3>
                  </div>
                  <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)', minHeight: '3rem' }}>
                    {specs.slice(0, 2).join(' · ')}
                  </p>
                  <p className="text-xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
                    {product.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    {product.stock > 0 ? (
                      <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, type: 'new', imageUrl: product.imageUrl ?? undefined }} />
                    ) : (
                      <button disabled className="btn-primary w-full text-sm opacity-40 cursor-not-allowed">Нет в наличии</button>
                    )}
                    <Link href={`/product/${product.slug}`} className="btn-secondary w-full text-sm text-center">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

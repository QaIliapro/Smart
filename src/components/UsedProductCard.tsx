'use client'

import Link from 'next/link'
import AddToCartButton from './AddToCartButton'

interface UsedProduct {
  id: string
  name: string
  price: number
  condition: string
  description: string
  specs: string
  imageUrl?: string | null
  images?: string
}

interface Props {
  product: UsedProduct
  gradient: string
  conditionColor: string
}

export default function UsedProductCard({ product, gradient, conditionColor }: Props) {
  const vk = process.env.NEXT_PUBLIC_VK_URL
  const max = process.env.NEXT_PUBLIC_MAX_URL

  let specs: string[] = []
  let imagesList: string[] = []
  try { specs = JSON.parse(product.specs) } catch {}
  try { imagesList = JSON.parse(product.images || '[]') } catch {}
  const firstImage = imagesList[0] || product.imageUrl || null

  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative" style={{ aspectRatio: '1 / 1' }}>
        {firstImage ? (
          <img src={firstImage} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div style={{ minHeight: '2.8rem' }}>
          <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h3>
        </div>
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)', minHeight: '1.2rem' }}>{product.description.slice(0, 40)}…</p>
        <p className="text-lg font-bold mb-4" style={{ color: 'var(--color-primary)' }}>{product.price.toLocaleString('ru-RU')} ₽</p>
        <div className="mt-auto flex flex-col gap-2">
          <AddToCartButton
            product={{ id: product.id, name: product.name, price: product.price, type: 'used', condition: product.condition, imageUrl: firstImage ?? undefined }}
          />
          <Link href={`/trade-in/${product.id}`} className="btn-secondary w-full text-sm text-center">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import AddToCartButton from './AddToCartButton'

interface UsedProduct {
  id: string
  name: string
  price: number
  condition: string
  description: string
  specs: string
  imageUrl?: string | null
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
  try {
    specs = JSON.parse(product.specs)
  } catch {}

  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative" style={{ aspectRatio: '1 / 1' }}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name}
            className="w-full h-full object-cover" />
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
            product={{ id: product.id, name: product.name, price: product.price, type: 'used', condition: product.condition, imageUrl: product.imageUrl ?? undefined }}
          />
        </div>
      </div>
    </div>
  )
}

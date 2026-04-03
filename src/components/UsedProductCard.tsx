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
        <span className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: conditionColor }}>
          {product.condition}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h3>
        <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
          {specs.slice(0, 2).join(' · ')}
        </p>
        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{product.description}</p>
        <p className="text-2xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>{product.price.toLocaleString('ru-RU')} ₽</p>
        <div className="mt-auto flex flex-col gap-2">
          <AddToCartButton
            product={{ id: product.id, name: product.name, price: product.price, type: 'used', condition: product.condition }}
          />
          <div className="grid grid-cols-2 gap-2">
            {vk && (
              <a href={vk} target="_blank" rel="noopener noreferrer"
                className="text-center py-2 px-3 rounded-lg text-xs font-medium text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #0077FF, #0057CC)', boxShadow: '0 2px 8px rgba(0,119,255,0.3)' }}
              >ВКонтакте</a>
            )}
            {max && (
              <a href={max} target="_blank" rel="noopener noreferrer"
                className="text-center py-2 px-3 rounded-lg text-xs font-medium text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #56CCFA, #5472FF, #9040D0)', boxShadow: '0 2px 8px rgba(84,114,255,0.3)' }}
              >MAX</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

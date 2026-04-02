'use client'

import AddToCartButton from './AddToCartButton'

interface UsedProduct {
  id: string
  name: string
  price: number
  condition: string
  description: string
  specs: string
}

interface Props {
  product: UsedProduct
  gradient: string
  conditionColor: string
}

export default function UsedProductCard({ product, gradient, conditionColor }: Props) {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME
  const message = encodeURIComponent(`Здравствуйте! Интересует ${product.name} (Trade-in) за ${product.price} ₽`)

  let specs: string[] = []
  try {
    specs = JSON.parse(product.specs)
  } catch {}

  return (
    <div className="card overflow-hidden flex flex-col">
      <div className={`h-48 bg-gradient-to-br ${gradient} relative`}>
        <span className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: conditionColor }}>
          {product.condition}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
        <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
          {specs.slice(0, 2).join(' · ')}
        </p>
        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>{product.description}</p>
        <p className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>{product.price.toLocaleString('ru-RU')} ₽</p>
        <div className="mt-auto flex flex-col gap-2">
          <AddToCartButton
            product={{ id: product.id, name: product.name, price: product.price, type: 'used', condition: product.condition }}
          />
          <div className="grid grid-cols-2 gap-2">
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer"
                className="text-center py-2 px-3 rounded-full text-xs font-medium text-white"
                style={{ background: '#25D366' }}
              >WhatsApp</a>
            )}
            {telegram && (
              <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer"
                className="text-center py-2 px-3 rounded-full text-xs font-medium text-white"
                style={{ background: '#229ED9' }}
              >Telegram</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

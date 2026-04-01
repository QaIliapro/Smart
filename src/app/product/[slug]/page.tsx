import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AddToCartButton from '@/components/AddToCartButton'
import ProductColorPicker from '@/components/ProductColorPicker'

export const revalidate = 60

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.newProduct.findUnique({ where: { slug: params.slug, active: true } })
  if (!product) notFound()

  let specs: string[] = []
  let colors: { name: string; hex: string }[] = []
  try { specs = JSON.parse(product.specs) } catch {}
  try { colors = JSON.parse(product.colors) } catch {}

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME
  const message = encodeURIComponent(`Здравствуйте! Интересует ${product.name} за ${product.price.toLocaleString('ru-RU')} ₽`)

  const outOfStock = product.stock === 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image */}
        <div className={`rounded-3xl h-[500px] bg-gradient-to-br ${product.gradient} sticky top-24`} />

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--accent)', color: 'white' }}>
              {product.tag}
            </span>
          </div>
          <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{product.name}</h1>
          <p className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>{product.price.toLocaleString('ru-RU')} ₽</p>

          {/* Stock */}
          <div>
            {outOfStock ? (
              <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: '#ff3b3020', color: '#ff3b30' }}>Нет в наличии</span>
            ) : product.stock <= 3 ? (
              <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: '#ff9f0a20', color: '#ff9f0a' }}>Осталось {product.stock} шт</span>
            ) : (
              <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: '#34c75920', color: '#34c759' }}>В наличии</span>
            )}
          </div>

          {/* Colors */}
          <ProductColorPicker colors={colors} />

          {/* Specs */}
          <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-secondary)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Характеристики</h3>
            <div className="flex flex-col gap-2">
              {specs.map(spec => (
                <div key={spec} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed">{product.description}</p>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            {outOfStock ? (
              <button disabled className="btn-primary w-full py-4 text-base opacity-40 cursor-not-allowed">Нет в наличии</button>
            ) : (
              <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, type: 'new' }} fullWidth />
            )}
            <div className="grid grid-cols-2 gap-3">
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: '#25D366' }}
                >
                  <span>WhatsApp</span>
                </a>
              )}
              {telegram && (
                <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: '#229ED9' }}
                >
                  <span>Telegram</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      {!outOfStock && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-30"
          style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}
        >
          <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, type: 'new' }} fullWidth />
        </div>
      )}
    </div>
  )
}

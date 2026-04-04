import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import ProductColorPicker from '@/components/ProductColorPicker'

export const revalidate = 60

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'}/api/new-products`, { cache: 'no-store' })
  const products = res.ok ? await res.json() : []
  const product = products.find((p: { slug: string; active: boolean }) => p.slug === params.slug && p.active)
  if (!product) notFound()

  let specs: string[] = []
  let colors: { name: string; hex: string }[] = []
  try { specs = JSON.parse(product.specs) } catch {}
  try { colors = JSON.parse(product.colors) } catch {}

  const vk = process.env.NEXT_PUBLIC_VK_URL
  const max = process.env.NEXT_PUBLIC_MAX_URL
  const outOfStock = product.stock === 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image */}
        <div className={`rounded-3xl h-64 sm:h-[500px] bg-gradient-to-br ${product.gradient} sticky top-24`} />

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--color-primary)', color: 'white' }}>
              {product.tag}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h1>
          <p className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--color-primary)' }}>{product.price.toLocaleString('ru-RU')} ₽</p>

          {/* Stock */}
          <div>
            {outOfStock ? (
              <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: '#ff3b3020', color: '#ff3b30' }}>Нет в наличии</span>
            ) : product.stock <= 3 ? (
              <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(212,136,15,0.15)', color: 'var(--color-warning)' }}>Осталось {product.stock} шт</span>
            ) : (
              <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(27,140,61,0.15)', color: 'var(--color-success)' }}>В наличии</span>
            )}
          </div>

          {/* Colors */}
          <ProductColorPicker colors={colors} />

          {/* Specs */}
          <div className="p-6 rounded-2xl" style={{ background: 'var(--color-bg-section)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Характеристики</h3>
            <div className="flex flex-col gap-2">
              {specs.map(spec => (
                <div key={spec} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--color-primary)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">{product.description}</p>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            {outOfStock ? (
              <button disabled className="btn-primary w-full py-4 text-base opacity-40 cursor-not-allowed">Нет в наличии</button>
            ) : (
              <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, type: 'new' }} fullWidth />
            )}
            <div className="grid grid-cols-2 gap-3">
              {vk && (
                <a href={vk} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #0077FF, #0057CC)', boxShadow: '0 4px 15px rgba(0,119,255,0.3)' }}
                >
                  <span>ВКонтакте</span>
                </a>
              )}
              {max && (
                <a href={max} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #56CCFA, #5472FF, #9040D0)', boxShadow: '0 4px 15px rgba(84,114,255,0.3)' }}
                >
                  <span>MAX</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      {!outOfStock && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-30"
          style={{ background: 'var(--color-bg-page)', borderTop: '1px solid var(--color-border)' }}
        >
          <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, type: 'new' }} fullWidth />
        </div>
      )}
    </div>
  )
}

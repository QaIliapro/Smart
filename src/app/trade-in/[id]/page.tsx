import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import UsedProductGallery from '@/components/UsedProductGallery'
import AddToCartButton from '@/components/AddToCartButton'

export const revalidate = 60

export default async function UsedProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.usedProduct.findFirst({
    where: { id: params.id, active: true },
  })
  if (!product) notFound()

  let specs: string[] = []
  let images: string[] = []
  try { specs = JSON.parse(product.specs) } catch {}
  try { images = JSON.parse(product.images) } catch {}
  if (images.length === 0 && product.imageUrl) images = [product.imageUrl]

  const conditionColors: Record<string, string> = {
    'Отличное': '#34c759',
    'Хорошее': '#ff9f0a',
    'Удовлетворительное': '#ff6b35',
  }
  const conditionColor = conditionColors[product.condition] || '#86868b'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <UsedProductGallery images={images} name={product.name} />

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: conditionColor + '20', color: conditionColor }}>
              {product.condition}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{product.name}</h1>
          <p className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--color-primary)' }}>
            {product.price.toLocaleString('ru-RU')} ₽
          </p>

          {specs.length > 0 && (
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
          )}

          <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">{product.description}</p>

          <AddToCartButton
            product={{ id: product.id, name: product.name, price: product.price, type: 'used', condition: product.condition, imageUrl: images[0] }}
            fullWidth
          />
        </div>
      </div>
    </div>
  )
}

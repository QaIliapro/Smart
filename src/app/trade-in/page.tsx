import { prisma } from '@/lib/prisma'
import UsedProductCard from '@/components/UsedProductCard'

export const revalidate = 60

export default async function TradeInPage() {
  const products = await prisma.usedProduct.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  })

  const conditionColors: Record<string, string> = {
    'Отличное': '#34c759',
    'Хорошее': '#ff9f0a',
    'Удовлетворительное': '#ff6b35',
  }

  const gradients = [
    'from-emerald-400 to-teal-600',
    'from-violet-400 to-purple-600',
    'from-orange-400 to-red-500',
    'from-sky-400 to-blue-600',
    'from-pink-400 to-rose-600',
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>Trade-in</p>
        <h1 className="section-title mb-4">Проверенные устройства</h1>
        <p className="section-subtitle">Каждое устройство прошло проверку и продается с гарантией</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24" style={{ color: 'var(--text-secondary)' }}>
          <p className="text-lg">Нет доступных товаров</p>
          <p className="text-sm mt-2">Загляните позже или напишите нам</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: typeof products[number], i) => (
            <UsedProductCard
              key={product.id}
              product={product}
              gradient={gradients[i % gradients.length]}
              conditionColor={conditionColors[product.condition] || '#86868b'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

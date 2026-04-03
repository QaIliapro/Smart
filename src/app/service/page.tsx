import RepairForm from '@/components/RepairForm'
import RepairServiceCard from '@/components/RepairServiceCard'
import { prisma } from '@/lib/prisma'

export const revalidate = 0

export default async function ServicePage() {
  const dbServices = await prisma.repairService.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
    include: { prices: true },
  })

  // Преобразуем плоский массив цен в формат { iphone: [], ipad: [], macbook: [], android: [] }
  const services = dbServices.map(s => ({
    id: s.id,
    icon: s.icon,
    title: s.title,
    free: s.free,
    prices: s.free ? undefined : {
      iphone: s.prices.filter(p => p.category === 'iphone').map(p => ({ model: p.model, price: p.price, free: p.free })),
      ipad: s.prices.filter(p => p.category === 'ipad').map(p => ({ model: p.model, price: p.price, free: p.free })),
      macbook: s.prices.filter(p => p.category === 'macbook').map(p => ({ model: p.model, price: p.price, free: p.free })),
      android: s.prices.filter(p => p.category === 'android').map(p => ({ model: p.model, price: p.price, free: p.free })),
    },
  }))

  const mainServices = services.filter(s => !s.free)
  const freeServices = services.filter(s => s.free)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--color-bg-page)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #D73711 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
          />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #D73711 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--color-primary)' }}>
            Профессиональный ремонт Apple
          </p>
          <h1 className="section-title mb-8 max-w-4xl mx-auto">
            Сервисный центр :smart
          </h1>
          <p className="section-subtitle mb-12 max-w-2xl mx-auto">
            Ремонт iPhone, MacBook и iPad с гарантией. Оригинальные запчасти. Диагностика — бесплатно.
          </p>
          <a href="#repair-form" className="btn-primary text-base px-8 py-4 inline-block">
            Оставить заявку
          </a>
        </div>
      </section>

      {/* Services List */}
      <section style={{ background: 'var(--color-bg-section)' }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center mb-4">Виды ремонта</h2>
          <p className="section-subtitle text-center mb-16">Нажмите на вид ремонта, чтобы увидеть цены</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainServices.map(service => (
              <RepairServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                prices={service.prices}
                free={service.free}
              />
            ))}
          </div>
          {freeServices.length > 0 && (
            <div className="flex justify-center mt-4">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                {freeServices.map(service => (
                  <RepairServiceCard
                    key={service.id}
                    icon={service.icon}
                    title={service.title}
                    free={service.free}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Repair Form */}
      <section id="repair-form" style={{ background: 'var(--color-bg-section)' }} className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center mb-4">Оставить заявку</h2>
          <p className="section-subtitle text-center mb-12">Не нашли решение своей проблемы? Оставьте заявку — мы перезвоним вам, чтобы помочь</p>
          <RepairForm />
        </div>
      </section>
    </div>
  )
}

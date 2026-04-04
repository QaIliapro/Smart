import RepairForm from '@/components/RepairForm'
import ServicePageClient from './ServicePageClient'

export default function ServicePage() {
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
      <ServicePageClient />

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

import RepairForm from '@/components/RepairForm'
import ServicePageClient from './ServicePageClient'

export default function ServicePage() {
  return (
    <div>
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

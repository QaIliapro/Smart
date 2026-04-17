'use client'

import { useEffect, useState } from 'react'
import RepairServiceCard from '@/components/RepairServiceCard'

interface RepairPrice {
  category: string
  model: string
  price: number | null
  free: boolean
}

interface RepairService {
  id: string
  icon: string
  title: string
  free: boolean
  active: boolean
  prices: RepairPrice[]
}

export default function ServicePageClient() {
  const [services, setServices] = useState<RepairService[]>([])

  useEffect(() => {
    fetch('/api/admin/repair-services')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setServices(data.filter((s: RepairService) => s.active)) })
      .catch(() => {})
  }, [])

  const formatted = services.map(s => ({
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

  const mainServices = formatted.filter(s => !s.free)
  const freeServices = formatted.filter(s => s.free)

  return (
    <section style={{ background: 'var(--color-bg-section)' }} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title text-center mb-16">Ремонт</h2>
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
  )
}

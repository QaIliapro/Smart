'use client'

import { useState } from 'react'
import {
  MonitorSmartphone, Battery, Smartphone, Zap, Camera,
  Droplets, CircuitBoard, ToggleLeft, Unlock, ScanSearch, X,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  MonitorSmartphone,
  Battery,
  Smartphone,
  Zap,
  Camera,
  Droplets,
  CircuitBoard,
  ToggleLeft,
  Unlock,
  ScanSearch,
}

interface PriceItem {
  model: string
  price: number | null
  free?: boolean
}

interface ServicePrices {
  iphone: PriceItem[]
  ipad: PriceItem[]
  macbook: PriceItem[]
  android: PriceItem[]
}

interface RepairServiceCardProps {
  icon: string
  title: string
  prices?: ServicePrices
  free?: boolean
}

const categories = [
  { key: 'iphone', label: 'iPhone' },
  { key: 'ipad', label: 'iPad' },
  { key: 'macbook', label: 'MacBook' },
  { key: 'android', label: 'Android и другие' },
] as const

export default function RepairServiceCard({ icon, title, prices, free }: RepairServiceCardProps) {
  const Icon = iconMap[icon] ?? Smartphone
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<keyof ServicePrices>('iphone')

  const hasModal = !!prices && !free

  return (
    <>
      <div
        className="card p-6 flex items-center gap-4 transition-all duration-200"
        style={{ cursor: hasModal ? 'pointer' : 'default' }}
        onClick={() => hasModal && setOpen(true)}
      >
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          <Icon size={24} style={{ color: 'var(--color-primary)' }} />
        </div>
        <span className="font-medium flex-1" style={{ color: 'var(--color-text-primary)' }}>{title}</span>
        {free ? (
          <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ background: 'rgba(27,140,61,0.1)', color: 'var(--color-success)' }}>
            Бесплатно
          </span>
        ) : hasModal && (
          <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            Цены →
          </span>
        )}
      </div>

      {open && prices && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: 'var(--color-bg-card)', maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'var(--color-bg-section)', color: 'var(--color-text-secondary)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className="flex-1 py-3 text-sm font-medium transition-all duration-200"
                  style={{
                    color: activeTab === cat.key ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    borderBottom: activeTab === cat.key ? '2px solid var(--color-primary)' : '2px solid transparent',
                    background: 'transparent',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Prices */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: '50vh' }}>
              <div className="flex flex-col gap-3">
                {prices[activeTab].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 px-4 rounded-xl"
                    style={{ background: 'var(--color-bg-section)' }}
                  >
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.model}</span>
                    <span className="text-base font-bold" style={{ color: item.free ? 'var(--color-success)' : 'var(--color-primary)' }}>
                      {item.free ? 'Бесплатно' : item.price ? `от ${item.price.toLocaleString('ru-RU')} ₽` : '—'}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4 text-center" style={{ color: 'var(--color-text-muted)' }}>
                Точная стоимость определяется после диагностики
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

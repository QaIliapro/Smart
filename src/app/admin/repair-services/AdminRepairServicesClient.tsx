'use client'

import { useState } from 'react'

const CATEGORIES = [
  { key: 'iphone', label: 'iPhone' },
  { key: 'ipad', label: 'iPad' },
  { key: 'macbook', label: 'MacBook' },
  { key: 'android', label: 'Android и другие' },
]

const ICONS = [
  'MonitorSmartphone', 'Battery', 'Smartphone', 'Zap',
  'Camera', 'Droplets', 'CircuitBoard', 'ToggleLeft',
  'Unlock', 'ScanSearch',
]

interface RepairPrice {
  id: string
  serviceId: string
  category: string
  model: string
  price: number | null
  free: boolean
}

interface RepairService {
  id: string
  title: string
  icon: string
  order: number
  free: boolean
  active: boolean
  prices: RepairPrice[]
}

export default function AdminRepairServicesClient({ initialServices }: { initialServices: RepairService[] }) {
  const [services, setServices] = useState<RepairService[]>(initialServices)
  const [selected, setSelected] = useState<RepairService | null>(null)
  const [activeTab, setActiveTab] = useState('iphone')
  const [saving, setSaving] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newIcon, setNewIcon] = useState('Smartphone')

  // Редактирование цен
  const getPrices = (category: string) =>
    selected?.prices.filter(p => p.category === category) ?? []

  const updatePrice = (category: string, model: string, value: string) => {
    if (!selected) return
    const updated = selected.prices.map(p =>
      p.category === category && p.model === model
        ? { ...p, price: value === '' ? null : parseFloat(value) }
        : p
    )
    setSelected({ ...selected, prices: updated })
  }

  const addPriceRow = (category: string) => {
    if (!selected) return
    const newRow: RepairPrice = {
      id: `new-${Date.now()}`,
      serviceId: selected.id,
      category,
      model: '',
      price: null,
      free: selected.free,
    }
    setSelected({ ...selected, prices: [...selected.prices, newRow] })
  }

  const updateModel = (category: string, id: string, value: string) => {
    if (!selected) return
    const updated = selected.prices.map(p =>
      p.id === id ? { ...p, model: value } : p
    )
    setSelected({ ...selected, prices: updated })
  }

  const removeRow = (id: string) => {
    if (!selected) return
    setSelected({ ...selected, prices: selected.prices.filter(p => p.id !== id) })
  }

  const savePrices = async () => {
    if (!selected) return
    setSaving(true)
    try {
      // Сохранить название/иконку
      await fetch(`/api/admin/repair-services/${selected.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: selected.title, icon: selected.icon, order: selected.order, free: selected.free, active: selected.active }),
      })
      // Сохранить цены
      await fetch(`/api/admin/repair-services/${selected.id}/prices`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected.prices.map(p => ({
          category: p.category,
          model: p.model,
          price: p.free ? null : p.price,
          free: p.free,
        }))),
      })
      // Обновить список
      const res = await fetch('/api/admin/repair-services')
      setServices(await res.json())
      alert('Сохранено!')
    } finally {
      setSaving(false)
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm('Удалить вид ремонта?')) return
    await fetch(`/api/admin/repair-services/${id}`, { method: 'DELETE' })
    setServices(services.filter(s => s.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const createService = async () => {
    if (!newTitle.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/repair-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, icon: newIcon, order: services.length }),
      })
      const service = await res.json()
      setServices([...services, { ...service, prices: [] }])
      setNewTitle('')
      setShowNewForm(false)
      setSelected({ ...service, prices: [] })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <a href="/admin/dashboard" className="text-sm mb-2 inline-block" style={{ color: 'var(--color-primary)' }}>← Назад</a>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Виды ремонта</h1>
        </div>
        <button onClick={() => setShowNewForm(true)} className="btn-primary px-5 py-2.5 text-sm">
          + Добавить
        </button>
      </div>

      {/* Форма нового сервиса */}
      {showNewForm && (
        <div className="card p-6 mb-6 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs font-medium block mb-1" style={{ color: 'var(--color-text-secondary)' }}>Название</label>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Замена экрана / дисплея"
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: 'var(--color-text-secondary)' }}>Иконка</label>
            <select
              value={newIcon}
              onChange={e => setNewIcon(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
            >
              {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={createService} disabled={saving} className="btn-primary px-4 py-2 text-sm">Создать</button>
            <button onClick={() => setShowNewForm(false)} className="btn-secondary px-4 py-2 text-sm">Отмена</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список сервисов */}
        <div className="flex flex-col gap-2">
          {services.map(s => (
            <div
              key={s.id}
              onClick={() => { setSelected(s); setActiveTab('iphone') }}
              className="card p-4 flex items-center justify-between cursor-pointer transition-all"
              style={{
                borderColor: selected?.id === s.id ? 'var(--color-primary)' : 'var(--color-border)',
                borderWidth: '2px',
              }}
            >
              <div>
                <p className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{s.title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {s.free ? 'Бесплатно' : `${s.prices.length} позиций`}
                </p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); deleteService(s.id) }}
                className="text-xs px-2 py-1 rounded"
                style={{ color: '#ff3b30', background: 'rgba(255,59,48,0.08)' }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        {/* Редактор цен */}
        {selected ? (
          <div className="lg:col-span-2 card p-6">
            {/* Заголовок */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="text-xs font-medium block mb-1" style={{ color: 'var(--color-text-secondary)' }}>Название</label>
                <input
                  value={selected.title}
                  onChange={e => setSelected({ ...selected, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: 'var(--color-text-secondary)' }}>Иконка</label>
                <select
                  value={selected.icon}
                  onChange={e => setSelected({ ...selected, icon: e.target.value })}
                  className="px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                >
                  {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm cursor-pointer pb-2">
                  <input
                    type="checkbox"
                    checked={selected.free}
                    onChange={e => setSelected({ ...selected, free: e.target.checked })}
                  />
                  <span style={{ color: 'var(--color-text-secondary)' }}>Бесплатно</span>
                </label>
              </div>
            </div>

            {!selected.free && (
              <>
                {/* Табы категорий */}
                <div className="flex border-b mb-4" style={{ borderColor: 'var(--color-border)' }}>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveTab(cat.key)}
                      className="px-4 py-2 text-sm font-medium transition-all"
                      style={{
                        color: activeTab === cat.key ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        borderBottom: activeTab === cat.key ? '2px solid var(--color-primary)' : '2px solid transparent',
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Строки цен */}
                <div className="flex flex-col gap-2 mb-4 max-h-96 overflow-y-auto">
                  {getPrices(activeTab).map(p => (
                    <div key={p.id} className="flex gap-2 items-center">
                      <input
                        value={p.model}
                        onChange={e => updateModel(activeTab, p.id, e.target.value)}
                        placeholder="Модель"
                        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                        style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                      />
                      <input
                        value={p.price ?? ''}
                        onChange={e => updatePrice(activeTab, p.model, e.target.value)}
                        placeholder="Цена ₽"
                        type="number"
                        className="w-28 px-3 py-2 rounded-lg text-sm outline-none"
                        style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                      />
                      <button
                        onClick={() => removeRow(p.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                        style={{ background: 'rgba(255,59,48,0.08)', color: '#ff3b30' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addPriceRow(activeTab)}
                  className="text-sm mb-6"
                  style={{ color: 'var(--color-primary)' }}
                >
                  + Добавить модель
                </button>
              </>
            )}

            <button onClick={savePrices} disabled={saving} className="btn-primary w-full py-3">
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        ) : (
          <div className="lg:col-span-2 card p-12 flex items-center justify-center">
            <p style={{ color: 'var(--color-text-muted)' }}>Выберите вид ремонта слева</p>
          </div>
        )}
      </div>
    </div>
  )
}

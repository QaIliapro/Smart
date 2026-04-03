'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  condition: string
  description: string
  specs: string
  imageUrl: string | null
  active: boolean
}

const emptyForm = { name: '', price: '', condition: 'Отличное', description: '', specs: '', imageUrl: '' }

export default function AdminProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        alert('URL фото: ' + data.url)
        setForm(f => ({ ...f, imageUrl: data.url }))
      } else {
        alert('Ответ сервера: ' + JSON.stringify(data))
      }
    } catch (err) {
      alert('Ошибка: ' + String(err))
    } finally {
      setUploading(false)
    }
  }

  const reload = async () => {
    const res = await fetch('/api/admin/products', { credentials: 'include' })
    const data = await res.json()
    if (Array.isArray(data)) setProducts(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const specs = JSON.stringify(form.specs.split(',').map(s => s.trim()).filter(Boolean))
    const body = { ...form, price: parseFloat(form.price), specs }

    await fetch('/api/admin/products' + (editId ? `/${editId}` : ''), {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    setLoading(false)
    await reload()
  }

  const handleEdit = (p: Product) => {
    let specs = ''
    try { specs = JSON.parse(p.specs).join(', ') } catch {}
    setForm({ name: p.name, price: String(p.price), condition: p.condition, description: p.description, specs, imageUrl: p.imageUrl || '' })
    setEditId(p.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить товар?')) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    await reload()
  }

  const handleToggle = async (id: string, active: boolean) => {
    await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    })
    await reload()
  }

  const conditionColors: Record<string, string> = {
    'Отличное': '#34c759', 'Хорошее': '#ff9f0a', 'Удовлетворительное': '#ff6b35',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm" style={{ color: 'var(--accent)' }}>← Назад</Link>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Trade-in товары</h1>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm) }}
          className="btn-primary text-sm px-6 py-2.5">
          {showForm ? 'Отмена' : '+ Добавить'}
        </button>
      </div>

      {showForm && (
        <div className="card p-8 mb-8">
          <h2 className="font-semibold text-lg mb-6" style={{ color: 'var(--text-primary)' }}>
            {editId ? 'Редактировать товар' : 'Новый товар'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Название *</label>
              <input type="text" required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Цена (₽) *</label>
              <input type="number" required value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Фото</label>
              <div className="flex items-center gap-3">
                <label className="flex-1 px-4 py-3 rounded-xl text-sm cursor-pointer text-center font-medium transition-opacity hover:opacity-80"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {uploading ? 'Загрузка...' : form.imageUrl ? '✅ Фото загружено' : '📷 Выбрать фото'}
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
                {form.imageUrl?.startsWith('http') && (
                  <img src={form.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Состояние *</label>
              <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option>Отличное</option><option>Хорошее</option><option>Удовлетворительное</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Характеристики (через запятую)</label>
              <input type="text" value={form.specs}
                onChange={e => setForm({ ...form, specs: e.target.value })}
                placeholder="16GB RAM, 512GB SSD, M3 chip"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Описание *</label>
              <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary px-8 py-3">
                {loading ? 'Сохранение...' : (editId ? 'Сохранить' : 'Добавить')}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }}
                className="btn-secondary px-8 py-3">Отмена</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {products.map(p => (
          <div key={p.id} className="card p-6 flex items-center gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                  style={{ background: conditionColors[p.condition] || '#86868b' }}>
                  {p.condition}
                </span>
                {!p.active && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>Скрыт</span>
                )}
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.price} ₽</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleToggle(p.id, p.active)}
                className="text-sm px-4 py-2 rounded-full font-medium transition-colors"
                style={{ background: 'var(--bg-secondary)', color: p.active ? '#ff9f0a' : '#34c759' }}>
                {p.active ? 'Скрыть' : 'Показать'}
              </button>
              <button onClick={() => handleEdit(p)}
                className="text-sm px-4 py-2 rounded-full font-medium"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                Редактировать
              </button>
              <button onClick={() => handleDelete(p.id)}
                className="text-sm px-4 py-2 rounded-full font-medium"
                style={{ background: 'var(--bg-secondary)', color: '#ff3b30' }}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

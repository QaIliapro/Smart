'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NewProduct {
  id: string
  slug: string
  name: string
  price: number
  category: string
  tag: string
  specs: string
  description: string
  colors: string
  gradient: string
  imageUrl: string | null
  stock: number
  active: boolean
}

const emptyForm = {
  slug: '',
  name: '',
  price: '',
  category: 'iPhone',
  tag: '',
  specs: '',
  description: '',
  colors: '',
  gradient: 'from-blue-400 to-purple-600',
  stock: '',
  imageUrl: '',
}

export default function AdminNewProductsClient({ initialProducts }: { initialProducts: NewProduct[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const toSlug = (str: string) =>
    str.toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/-+/g, '-')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setForm(f => ({ ...f, name, slug: f.slug && f.slug !== toSlug(f.name) ? f.slug : toSlug(name) }))
  }

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
        setForm(f => ({ ...f, imageUrl: data.url }))
      } else {
        alert('Ошибка: ' + JSON.stringify(data))
      }
    } catch (err) {
      alert('Ошибка: ' + String(err))
    } finally {
      setUploading(false)
    }
  }

  const reload = async () => {
    const res = await fetch('/api/admin/new-products', { credentials: 'include' })
    const data = await res.json()
    if (Array.isArray(data)) setProducts(data)
  }

  useEffect(() => { reload() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const specs = JSON.stringify(form.specs.split(',').map(s => s.trim()).filter(Boolean))
    const body = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock) || 0,
      specs,
      colors: form.colors || JSON.stringify([]),
    }

    await fetch('/api/admin/new-products' + (editId ? `/${editId}` : ''), {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    })

    setForm(emptyForm)
    setEditId(null)
    setShowForm(false)
    setLoading(false)
    await reload()
  }

  const handleEdit = (p: NewProduct) => {
    let specsStr = ''
    try { specsStr = JSON.parse(p.specs).join(', ') } catch {}
    setForm({
      slug: p.slug,
      name: p.name,
      price: String(p.price),
      category: p.category,
      tag: p.tag,
      specs: specsStr,
      description: p.description,
      colors: p.colors,
      gradient: p.gradient,
      stock: String(p.stock),
      imageUrl: p.imageUrl || '',
    })
    setEditId(p.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить товар?')) return
    await fetch(`/api/admin/new-products/${id}`, { method: 'DELETE' })
    await reload()
  }

  const handleToggle = async (id: string, active: boolean) => {
    await fetch(`/api/admin/new-products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    })
    await reload()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm" style={{ color: 'var(--accent)' }}>← Назад</Link>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Новые товары</h1>
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
              <input type="text" required value={form.name} onChange={handleNameChange}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Slug (URL) — генерируется автоматически
              </label>
              <input type="text" required value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-tertiary)' }}
              />
            </div>
            {[
              { name: 'tag', label: 'Тег (Новинка, Pro...)', type: 'text', required: false },
              { name: 'price', label: 'Цена (₽) *', type: 'number', required: true },
              { name: 'stock', label: 'Остаток на складе *', type: 'number', required: true },
              { name: 'gradient', label: 'Gradient CSS классы', type: 'text', required: false },
            ].map(field => (
              <div key={field.name}>
                <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
                <input type={field.type} required={field.required}
                  value={(form as Record<string, string>)[field.name]}
                  onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Фото товара</label>
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
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Категория *</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option value="iPhone">iPhone</option>
                <option value="Mac">Mac</option>
                <option value="iPad">iPad</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Характеристики (через запятую)</label>
              <input type="text" value={form.specs}
                onChange={e => setForm({ ...form, specs: e.target.value })}
                placeholder="A19 chip, 48MP camera, 6.1&quot; OLED"
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
            {p.imageUrl
              ? <img src={p.imageUrl!} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              : <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex-shrink-0`} />
            }
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                  style={{ background: 'var(--accent)' }}>{p.tag}</span>
                {!p.active && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>Скрыт</span>
                )}
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {p.price.toLocaleString('ru-RU')} ₽ · Склад: {p.stock} шт
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
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

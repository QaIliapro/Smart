'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  condition: string
  description: string
  specs: string
  imageUrl: string | null
  images: string
  active: boolean
}

const emptyForm = { name: '', price: '', condition: 'Отличное', description: '', specs: '', imageUrl: '', images: '[]' }

export default function AdminProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imagesList, setImagesList] = useState<string[]>([])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (data.url) uploaded.push(data.url)
      }
      const newList = [...imagesList, ...uploaded]
      setImagesList(newList)
      setForm(f => ({
        ...f,
        images: JSON.stringify(newList),
        imageUrl: newList[0] || f.imageUrl,
      }))
    } catch (err) {
      alert('Ошибка: ' + String(err))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const removeImage = (url: string) => {
    const newList = imagesList.filter(u => u !== url)
    setImagesList(newList)
    setForm(f => ({
      ...f,
      images: JSON.stringify(newList),
      imageUrl: newList[0] || '',
    }))
  }

  const reload = async () => {
    const res = await fetch('/api/admin/products', { credentials: 'include' })
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
      specs,
      images: JSON.stringify(imagesList),
      imageUrl: imagesList[0] || form.imageUrl || null,
    }

    await fetch('/api/admin/products' + (editId ? `/${editId}` : ''), {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setForm(emptyForm)
    setImagesList([])
    setEditId(null)
    setShowForm(false)
    setLoading(false)
    await reload()
  }

  const handleEdit = (p: Product) => {
    let specs = ''
    let imgs: string[] = []
    try { specs = JSON.parse(p.specs).join(', ') } catch {}
    try { imgs = JSON.parse(p.images) } catch {}
    setImagesList(imgs)
    setForm({ name: p.name, price: String(p.price), condition: p.condition, description: p.description, specs, imageUrl: p.imageUrl || '', images: p.images || '[]' })
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
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); setImagesList([]) }}
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
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Состояние *</label>
              <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option>Отличное</option><option>Хорошее</option><option>Удовлетворительное</option>
              </select>
            </div>

            {/* Фото */}
            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Фото (можно выбрать несколько)
              </label>
              <label className="block px-4 py-3 rounded-xl text-sm cursor-pointer text-center font-medium transition-opacity hover:opacity-80 mb-3"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {uploading ? 'Загрузка...' : '📷 Добавить фото'}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" multiple onChange={handleUpload} disabled={uploading} />
              </label>
              {imagesList.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {imagesList.map((url, i) => (
                    <div key={url} className="relative">
                      <img src={url} alt="" className="w-20 h-20 rounded-xl object-cover" />
                      {i === 0 && (
                        <span className="absolute top-1 left-1 text-white text-xs px-1.5 py-0.5 rounded-md font-medium"
                          style={{ background: 'var(--color-primary)', fontSize: '10px' }}>Гл.</span>
                      )}
                      <button type="button" onClick={() => removeImage(url)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: '#ff3b30' }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Характеристики (через запятую)</label>
              <input type="text" value={form.specs}
                onChange={e => setForm({ ...form, specs: e.target.value })}
                placeholder="128GB, Face ID, A15 Bionic"
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
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); setImagesList([]) }}
                className="btn-secondary px-8 py-3">Отмена</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {products.map(p => {
          let imgs: string[] = []
          try { imgs = JSON.parse(p.images) } catch {}
          return (
            <div key={p.id} className="card p-6 flex items-center gap-6">
              {imgs[0] ? (
                <img src={imgs[0]} alt={p.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-xl flex-shrink-0" style={{ background: 'var(--bg-secondary)' }} />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium flex-shrink-0"
                    style={{ background: conditionColors[p.condition] || '#86868b' }}>
                    {p.condition}
                  </span>
                  {!p.active && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                      style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>Скрыт</span>
                  )}
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {p.price.toLocaleString('ru-RU')} ₽ · {imgs.length} фото
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
          )
        })}
      </div>
    </div>
  )
}

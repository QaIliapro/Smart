'use client'

import { useState } from 'react'

export default function RepairForm() {
  const [form, setForm] = useState({ device: 'iPhone', problem: '', name: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [waLink, setWaLink] = useState('')
  const [error, setError] = useState('')

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Ошибка')

      const msg = encodeURIComponent(
        `Заявка на ремонт:\nУстройство: ${form.device}\nПроблема: ${form.problem}\nИмя: ${form.name}\nТелефон: ${form.phone}`
      )
      if (whatsapp) {
        setWaLink(`https://wa.me/${whatsapp}?text=${msg}`)
      }
      setSubmitted(true)
    } catch {
      setError('Произошла ошибка. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="card p-10 text-center">
        <div className="text-5xl mb-6">✅</div>
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Заявка принята!</h3>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          Мы свяжемся с вами в ближайшее время. Вы также можете написать нам напрямую:
        </p>
        {waLink && (
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full text-white font-semibold transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            Написать в WhatsApp
          </a>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Тип устройства *</label>
        <select value={form.device} onChange={e => setForm({ ...form, device: e.target.value })}
          required className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        >
          <option value="iPhone">iPhone</option>
          <option value="MacBook">MacBook</option>
          <option value="iPad">iPad</option>
          <option value="Другое">Другое</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Описание проблемы *</label>
        <textarea
          required value={form.problem}
          onChange={e => setForm({ ...form, problem: e.target.value })}
          rows={4} placeholder="Опишите неисправность подробнее..."
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Имя *</label>
        <input
          type="text" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Телефон *</label>
        <input
          type="tel" required value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          placeholder="+7 (999) 000-00-00"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      {error && <p className="text-sm" style={{ color: '#ff3b30' }}>{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary py-4 text-base mt-2">
        {loading ? 'Отправляем...' : 'Отправить заявку'}
      </button>
    </form>
  )
}

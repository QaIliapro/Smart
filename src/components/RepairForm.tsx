'use client'

import { useState, useEffect } from 'react'

interface RepairFormProps {
  prefill?: { device: string; problem: string } | null
}

export default function RepairForm({ prefill }: RepairFormProps) {
  const [form, setForm] = useState({ device: 'iPhone', problem: '', name: '' })

  useEffect(() => {
    if (prefill) {
      setForm(prev => ({ ...prev, device: prefill.device, problem: prefill.problem }))
    }
  }, [prefill])
  const [phoneDigits, setPhoneDigits] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const formatPhone = (digits: string) => {
    if (!digits) return ''
    let f = '+7'
    if (digits.length > 0) f += ' (' + digits.slice(0, 3)
    if (digits.length >= 3) f += ') ' + digits.slice(3, 6)
    if (digits.length >= 6) f += '-' + digits.slice(6, 8)
    if (digits.length >= 8) f += '-' + digits.slice(8, 10)
    return f
  }

  const vk = process.env.NEXT_PUBLIC_VK_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: formatPhone(phoneDigits) }),
      })
      if (!res.ok) throw new Error('Ошибка')
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
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>Заявка принята!</h3>
        <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          Мы свяжемся с вами в ближайшее время. Вы также можете написать нам напрямую:
        </p>
        {vk && (
          <a href={vk} target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-lg text-white font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #0077FF, #0057CC)', boxShadow: '0 4px 15px rgba(0,119,255,0.3)' }}
          >
            Написать во ВКонтакте
          </a>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Тип устройства *</label>
        <select value={form.device} onChange={e => setForm({ ...form, device: e.target.value })}
          required className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
        >
          <option value="iPhone">iPhone</option>
          <option value="MacBook">MacBook</option>
          <option value="iPad">iPad</option>
          <option value="Другое">Другое</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Описание проблемы *</label>
        <textarea
          required value={form.problem}
          onChange={e => setForm({ ...form, problem: e.target.value })}
          rows={4} placeholder="Опишите неисправность подробнее..."
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Имя *</label>
        <input
          type="text" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Телефон *</label>
        <input
          type="tel" required value={formatPhone(phoneDigits)}
          onChange={e => {
            const raw = e.target.value.replace(/\D/g, '')
            const stripped = raw.startsWith('7') ? raw.slice(1) : raw.startsWith('8') ? raw.slice(1) : raw
            setPhoneDigits(stripped.slice(0, 10))
          }}
          placeholder="+7 (999) 000-00-00"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
        />
      </div>

      {error && <p className="text-sm" style={{ color: '#ff3b30' }}>{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary py-4 text-base mt-2">
        {loading ? 'Отправляем...' : 'Отправить заявку'}
      </button>
    </form>
  )
}

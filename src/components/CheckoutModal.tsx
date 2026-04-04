'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', email: '', comment: '' })

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11)
    let formatted = ''
    if (digits.length === 0) {
      formatted = ''
    } else {
      const d = digits.startsWith('8') || digits.startsWith('7') ? digits.slice(1) : digits
      const trimmed = d.slice(0, 10)
      formatted = '+7'
      if (trimmed.length > 0) formatted += ' (' + trimmed.slice(0, 3)
      if (trimmed.length >= 3) formatted += ') ' + trimmed.slice(3, 6)
      if (trimmed.length >= 6) formatted += '-' + trimmed.slice(6, 8)
      if (trimmed.length >= 8) formatted += '-' + trimmed.slice(8, 10)
    }
    setForm({ ...form, phone: formatted })
  }
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const vk = process.env.NEXT_PUBLIC_VK_URL
  const max = process.env.NEXT_PUBLIC_MAX_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, method: 'pickup', items: JSON.stringify(items), total }),
      })
      if (!res.ok) throw new Error('Ошибка')
      const data = await res.json()
      setOrderId(data.id)
      clearCart()
    } catch {
      setError('Произошла ошибка. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="w-full max-w-lg rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {orderId ? 'Заказ оформлен!' : 'Оформление заказа'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'var(--color-bg-section)', color: 'var(--color-text-primary)' }}>
            ✕
          </button>
        </div>

        {orderId ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-6">✅</div>
            <p className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Заказ принят!</p>
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>Номер заказа: #{orderId.slice(-6).toUpperCase()}</p>
            <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>Мы свяжемся с вами в ближайшее время.</p>
            <p className="text-sm font-medium mb-4" style={{ color: 'var(--color-text-secondary)' }}>Или напишите нам напрямую:</p>
            <div className="flex gap-3 justify-center">
              {vk && (
                <a href={vk} target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #0077FF, #0057CC)', boxShadow: '0 4px 15px rgba(0,119,255,0.3)' }}>
                  ВКонтакте
                </a>
              )}
              {max && (
                <a href={max} target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #56CCFA, #5472FF, #9040D0)', boxShadow: '0 4px 15px rgba(84,114,255,0.3)' }}>
                  MAX
                </a>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Имя *</label>
              <input type="text" required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Телефон *</label>
              <input type="tel" required value={form.phone}
                onChange={handlePhoneChange}
                placeholder="+7 (___) ___-__-__"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Email</label>
              <input type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              />
            </div>

            <div className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
              Способ получения: <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Самовывоз</span>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Комментарий</label>
              <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'var(--color-bg-section)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
              />
            </div>

            {error && <p className="text-sm" style={{ color: '#ff3b30' }}>{error}</p>}

            <div className="pt-2 flex flex-col gap-2">
              <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                <span>Итого:</span>
                <span className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>{total} ₽</span>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base">
                {loading ? 'Оформляем...' : 'Подтвердить заказ'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

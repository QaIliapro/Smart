'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', email: '', comment: '' })
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME

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
      <div className="w-full max-w-lg rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {orderId ? 'Заказ оформлен!' : 'Оформление заказа'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            ✕
          </button>
        </div>

        {orderId ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-6">✅</div>
            <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Заказ принят!</p>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Номер заказа: #{orderId.slice(-6).toUpperCase()}</p>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>Мы свяжемся с вами в ближайшее время.</p>
            <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>Или напишите нам напрямую:</p>
            <div className="flex gap-3 justify-center">
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-sm font-medium text-white" style={{ background: '#25D366' }}>
                  WhatsApp
                </a>
              )}
              {telegram && (
                <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-sm font-medium text-white" style={{ background: '#229ED9' }}>
                  Telegram
                </a>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { name: 'name', label: 'Имя *', type: 'text', required: true },
              { name: 'phone', label: 'Телефон *', type: 'tel', required: true },
              { name: 'email', label: 'Email', type: 'email', required: false },
            ].map(field => (
              <div key={field.name}>
                <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
                <input
                  type={field.type}
                  required={field.required}
                  value={(form as Record<string, string>)[field.name]}
                  onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
            ))}

            <div className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              Способ получения: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Самовывоз</span>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Комментарий</label>
              <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            {error && <p className="text-sm" style={{ color: '#ff3b30' }}>{error}</p>}

            <div className="pt-2 flex flex-col gap-2">
              <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                <span>Итого:</span>
                <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>{total} ₽</span>
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

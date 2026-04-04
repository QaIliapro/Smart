'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useState } from 'react'
import CheckoutModal from '@/components/CheckoutModal'

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE
  const cartText = items.map(i => `${i.name} x${i.quantity} — ${i.price * i.quantity} ₽`).join('\n')
  const waMessage = encodeURIComponent(`Хочу оформить заказ:\n${cartText}\n\nИтого: ${total} ₽`)

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Корзина пуста</h1>
        <p style={{ color: 'var(--text-secondary)' }} className="mb-8">Добавьте товары из каталога</p>
        <div className="flex gap-4 justify-center">
          <Link href="/new" className="btn-primary">Новые устройства</Link>
          <Link href="/trade-in" className="btn-secondary">Trade-in</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="section-title mb-12">Корзина</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="card p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--border-color))' }}
              />
              <div className="flex-1 overflow-hidden">
                <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)', wordBreak: 'break-word' }}>{item.name}</h3>
                {item.condition && (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.condition}</p>
                )}
              </div>
              <button onClick={() => removeItem(item.id)}
                className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 transition-colors hover:opacity-70"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >−</button>
                <span className="w-6 text-center font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >+</button>
              </div>
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card p-8">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Итого</span>
          <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{total.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => setCheckoutOpen(true)} className="btn-primary flex-1 py-4 text-base">
            Оформить заказ
          </button>
          {whatsapp && (
            <a href={`https://wa.me/${whatsapp}?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-4 text-base rounded-full text-center font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              Написать в WhatsApp
            </a>
          )}
        </div>
      </div>

      {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
    </div>
  )
}

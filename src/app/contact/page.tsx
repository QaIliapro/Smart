'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const vk = process.env.NEXT_PUBLIC_VK_URL
  const max = process.env.NEXT_PUBLIC_MAX_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="section-title mb-4">Контакты</h1>
        <p className="section-subtitle">Мы всегда рады помочь вам</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div className="flex flex-col gap-6">
          <div className="card p-8">
            <h2 className="font-semibold text-xl mb-6" style={{ color: 'var(--text-primary)' }}>Магазин :smart</h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: '📍', label: 'Адрес', value: 'ул. Примерная, 1, Москва' },
                { icon: '📞', label: 'Телефон', value: '+7 (999) 123-45-67' },
                { icon: '🕐', label: 'Часы работы', value: 'Пн-Сб: 10:00–20:00, Вс: 11:00–18:00' },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.label}</p>
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-8">
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Написать напрямую</h3>
            <div className="flex gap-3">
              {vk && (
                <a href={vk} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-full text-center text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #0077FF, #0057CC)',
                    boxShadow: '0 4px 15px rgba(0, 119, 255, 0.4)',
                  }}>ВКонтакте</a>
              )}
              {max && (
                <a href={max} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-full text-center text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #56CCFA, #5472FF, #9040D0)',
                    boxShadow: '0 4px 15px rgba(84, 114, 255, 0.4)',
                  }}>MAX</a>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card p-8">
          <h2 className="font-semibold text-xl mb-6" style={{ color: 'var(--text-primary)' }}>Написать нам</h2>
          {sent ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Сообщение отправлено!</p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Мы ответим вам в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Имя *</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Сообщение *</label>
                <textarea required value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={5} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary py-3">
                {loading ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

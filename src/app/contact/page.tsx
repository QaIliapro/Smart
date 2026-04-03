'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Info */}
        <div className="flex flex-col gap-6">
          <div className="card p-8">
            <h2 className="font-semibold text-xl mb-6" style={{ color: 'var(--text-primary)' }}>Магазин :smart</h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: <MapPin size={18} />, label: 'Адрес', content: <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Автозаводское шоссе, 6, офис 315, 3 этаж</p> },
                { icon: <Phone size={18} />, label: 'Телефон', content: <>
                  <a href="tel:+79033320101" className="text-sm block hover:underline" style={{ color: 'var(--text-primary)' }}>+7‒903‒332‒01‒01</a>
                  <a href="tel:+78482421693" className="text-sm block hover:underline" style={{ color: 'var(--text-primary)' }}>+7 (8482) 42‒16‒93</a>
                </> },
                { icon: <Mail size={18} />, label: 'Email', content: <a href="mailto:service.store@icloud.com" className="text-sm hover:underline" style={{ color: 'var(--text-primary)' }}>service.store@icloud.com</a> },
                { icon: <Clock size={18} />, label: 'Часы работы', content: <p className="text-sm" style={{ color: 'var(--text-primary)' }}>Пн — Вс: 10:00–19:00</p> },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--color-primary)', color: '#fff' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.label}</p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-8">
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Написать напрямую</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://2gis.ru/togliatti/firm/3096753025186134"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-full text-center text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #00B140, #008C30)',
                  boxShadow: '0 4px 15px rgba(0, 177, 64, 0.4)',
                }}
              >
                2GIS — маршрут и отзывы
              </a>
              <div className="flex gap-3">
                {vk && (
                  <a href={vk} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full text-center text-sm font-medium text-white transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                    style={{
                      background: '#0077FF',
                      boxShadow: '0 4px 15px rgba(0, 119, 255, 0.4)',
                    }}>
                    <svg width="20" height="20" viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M41.2 13.5c.3-1 0-1.7-1.3-1.7h-4.4c-1.1 0-1.6.6-1.9 1.2 0 0-2.2 5.5-5.4 9.1-.7.7-1 1-1.4 1-.2 0-.5-.3-.5-1.3V13.5c0-1.1-.3-1.7-1.2-1.7h-7c-.7 0-1.1.5-1.1 1 0 1.1 1.6 1.3 1.7 4.3v6.5c0 1.4-.2 1.6-.7 1.6-1.3 0-4.4-5.5-6.3-11.8-.4-1.1-.7-1.5-1.8-1.5H5.5c-1.2 0-1.5.6-1.5 1.2 0 1.1 1.3 6.7 6.1 14.1 3.2 4.9 7.7 7.5 11.8 7.5 2.5 0 2.8-.6 2.8-1.6v-3.9c0-1.2.3-1.5 1.1-1.5.6 0 1.7.3 4.2 2.8 2.9 2.9 3.3 4.2 4.9 4.2h4.4c1.2 0 1.8-.6 1.5-1.8-.4-1.2-1.6-2.9-3.2-4.9-.9-1-2.2-2.2-2.6-2.8-.6-.8-.4-1.1 0-1.8 0 0 4.8-6.9 5.2-9.2z"/>
                    </svg>
                    ВКонтакте
                  </a>
                )}
                {max && (
                  <a href={max} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full text-center text-sm font-medium text-white transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #56CCFA, #5472FF, #9040D0)',
                      boxShadow: '0 4px 15px rgba(84, 114, 255, 0.4)',
                    }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
                    </svg>
                    MAX
                  </a>
                )}
              </div>
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
      {/* Map full width */}
      <div className="card overflow-hidden" style={{ height: '420px' }}>
        <iframe
          src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A53.5068%2C%22lon%22%3A49.4206%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22togliatti%22%7D%2C%22org%22%3A%223096753025186134%22%7D"
          width="100%"
          height="420"
          style={{ border: 'none' }}
          title="2GIS карта"
        />
      </div>
    </div>
  )
}

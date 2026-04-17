'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  const vk = process.env.NEXT_PUBLIC_VK_URL
  const max = process.env.NEXT_PUBLIC_MAX_URL

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="section-title mb-4">Контакты</h1>
        <p className="section-subtitle">Мы всегда рады помочь вам</p>
      </div>

      <div className="card p-8 mb-12">
        <h2 className="font-semibold text-xl mb-6" style={{ color: 'var(--color-text-primary)' }}>Магазин :smart</h2>
        <div className="flex flex-col gap-4 mb-8">
          {[
            { icon: <MapPin size={18} />, label: 'Адрес', content: <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>Автозаводское шоссе, 6, офис 315, 3 этаж</p> },
            { icon: <Phone size={18} />, label: 'Телефон', content: <>
              <a href="tel:+79033320101" className="text-sm block hover:underline" style={{ color: 'var(--color-text-primary)' }}>+7‒903‒332‒01‒01</a>
              <a href="tel:+78482421693" className="text-sm block hover:underline" style={{ color: 'var(--color-text-primary)' }}>+7 (8482) 42‒16‒93</a>
            </> },
            { icon: <Mail size={18} />, label: 'Email', content: <a href="mailto:service.store@icloud.com" className="text-sm hover:underline" style={{ color: 'var(--color-text-primary)' }}>service.store@icloud.com</a> },
            { icon: <Clock size={18} />, label: 'Часы работы', content: <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>Пн — Вс: 10:00–19:00</p> },
          ].map(item => (
            <div key={item.label} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-primary)', color: '#fff' }}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>{item.label}</p>
                {item.content}
              </div>
            </div>
          ))}
        </div>

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
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.54 34.5801C14.6 34.5801 8.3601 27.0801 8.1001 14.6001H13.5801C13.7601 23.7601 17.8 27.6401 21 28.4401V14.6001H26.1602V22.5001C29.3202 22.1601 32.6398 18.5601 33.7598 14.6001H38.9199C38.0599 19.4801 34.4599 23.0801 31.8999 24.5601C34.4599 25.7601 38.5601 28.9001 40.1201 34.5801H34.4399C33.2199 30.7801 30.1802 27.8401 26.1602 27.4401V34.5801H25.54Z" fill="white"/>
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
                <img src="/max-icon.png" alt="MAX" className="w-5 h-5 rounded" />
                MAX
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
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

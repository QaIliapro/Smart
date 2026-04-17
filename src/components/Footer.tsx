import Link from 'next/link'
import { MapPin, Phone, Clock } from 'lucide-react'

export default function Footer() {
  const vk = process.env.NEXT_PUBLIC_VK_URL
  const max = process.env.NEXT_PUBLIC_MAX_URL

  return (
    <footer style={{ background: 'var(--color-footer-bg)' }} className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-footer-accent)' }}>:smart</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-footer-text)' }}>
              Магазин техники Apple. Сервис, Trade-in и новые устройства.
            </p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Контакты</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-footer-accent)' }} />
                <p className="text-sm" style={{ color: 'var(--color-footer-text)' }}>Автозаводское шоссе, 6, офис 315, 3 этаж</p>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-footer-accent)' }} />
                <div>
                  <a href="tel:+79033320101" className="text-sm block hover:opacity-70" style={{ color: 'var(--color-footer-text)' }}>+7‒903‒332‒01‒01</a>
                  <a href="tel:+78482421693" className="text-sm block hover:opacity-70" style={{ color: 'var(--color-footer-text)' }}>+7 (8482) 42‒16‒93</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="flex-shrink-0" style={{ color: 'var(--color-footer-accent)' }} />
                <p className="text-sm" style={{ color: 'var(--color-footer-text)' }}>Пн — Вс: 10:00–19:00</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Навигация</h4>
            <div className="flex flex-col gap-2">
              {[['/', 'Главная'], ['/service', 'Сервис'], ['/trade-in', 'Trade-in'], ['/new', 'Новые устройства'], ['/contact', 'Контакты']].map(([href, label]) => (
                <Link key={href} href={href} className="text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--color-footer-text)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Мы в соцсетях</h4>
            <div className="flex flex-col gap-3">
              {vk && (
                <a href={vk} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-footer-text)' }}
                >
                  <span className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: '#0077FF' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M41.2 13.5c.3-1 0-1.7-1.3-1.7h-4.4c-1.1 0-1.6.6-1.9 1.2 0 0-2.2 5.5-5.4 9.1-.7.7-1 1-1.4 1-.2 0-.5-.3-.5-1.3V13.5c0-1.1-.3-1.7-1.2-1.7h-7c-.7 0-1.1.5-1.1 1 0 1.1 1.6 1.3 1.7 4.3v6.5c0 1.4-.2 1.6-.7 1.6-1.3 0-4.4-5.5-6.3-11.8-.4-1.1-.7-1.5-1.8-1.5H5.5c-1.2 0-1.5.6-1.5 1.2 0 1.1 1.3 6.7 6.1 14.1 3.2 4.9 7.7 7.5 11.8 7.5 2.5 0 2.8-.6 2.8-1.6v-3.9c0-1.2.3-1.5 1.1-1.5.6 0 1.7.3 4.2 2.8 2.9 2.9 3.3 4.2 4.9 4.2h4.4c1.2 0 1.8-.6 1.5-1.8-.4-1.2-1.6-2.9-3.2-4.9-.9-1-2.2-2.2-2.6-2.8-.6-.8-.4-1.1 0-1.8 0 0 4.8-6.9 5.2-9.2z"/>
                    </svg>
                  </span>
                  ВКонтакте
                </a>
              )}
              {max && (
                <a href={max} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-footer-text)' }}
                >
                  <img src="/max-icon.png" alt="MAX" className="w-8 h-8 rounded-lg" />
                  MAX
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid #2E2E2E' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-footer-text)' }}>
            © {new Date().getFullYear()} :smart. Все права защищены.
          </p>
          <Link href="/admin" className="text-xs transition-opacity opacity-0 hover:opacity-30" style={{ color: 'var(--color-footer-text)' }}>
            ·
          </Link>
        </div>
      </div>
    </footer>
  )
}

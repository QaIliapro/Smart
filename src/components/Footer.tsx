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
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-lg flex-shrink-0">
                    <path d="M0 23.04C0 12.1788 0 6.74826 3.37413 3.37413C6.74826 0 12.1788 0 23.04 0H24.96C35.8212 0 41.2517 0 44.6259 3.37413C48 6.74826 48 12.1788 48 23.04V24.96C48 35.8212 48 41.2517 44.6259 44.6259C41.2517 48 35.8212 48 24.96 48H23.04C12.1788 48 6.74826 48 3.37413 44.6259C0 41.2517 0 35.8212 0 24.96V23.04Z" fill="#0077FF"/>
                    <path d="M25.54 34.5801C14.6 34.5801 8.3601 27.0801 8.1001 14.6001H13.5801C13.7601 23.7601 17.8 27.6401 21 28.4401V14.6001H26.1602V22.5001C29.3202 22.1601 32.6398 18.5601 33.7598 14.6001H38.9199C38.0599 19.4801 34.4599 23.0801 31.8999 24.5601C34.4599 25.7601 38.5601 28.9001 40.1201 34.5801H34.4399C33.2199 30.7801 30.1802 27.8401 26.1602 27.4401V34.5801H25.54Z" fill="white"/>
                  </svg>
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
          <Link href="/admin" className="transition-opacity opacity-20 hover:opacity-50 px-3 py-1" style={{ color: 'var(--color-footer-text)' }}>
            ★
          </Link>
        </div>
      </div>
    </footer>
  )
}

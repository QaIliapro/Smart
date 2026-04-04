import Link from 'next/link'
import { Wrench, RefreshCw, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero + Categories */}
      <section className="relative overflow-hidden" style={{ background: 'var(--color-bg-page)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #D73711 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
          />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #D73711 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24">
          {/* Текст и кнопки */}
          <div className="text-center mb-16">
            <h1 className="section-title mb-6 max-w-4xl mx-auto">
              <span style={{ color: 'var(--color-primary)' }}>Сервисный центр :smart</span><br />ремонт, выкуп и продажа техники
            </h1>
            <p className="section-subtitle mb-12 max-w-2xl mx-auto">
              Работаем с 2006 года. Оригинальные запчасти. Гарантия до 90 дней.
            </p>
          </div>

          {/* Карточки категорий */}
          <style>{`
            .category-card {
              transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s cubic-bezier(0.4,0,0.2,1);
            }
            .category-card:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 24px rgba(215,55,17,0.15);
              border-color: var(--color-primary) !important;
            }
          `}</style>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/service', Icon: Wrench, title: 'Сервисный центр', desc: 'Ремонт iPhone, MacBook и iPad. Диагностика бесплатно', cta: 'Записаться →' },
              { href: '/trade-in', Icon: RefreshCw, title: 'Trade-in', desc: 'Проверенные устройства в отличном состоянии с гарантией', cta: 'Смотреть →' },
              { href: '/new', Icon: Sparkles, title: 'Новые устройства', desc: 'iPhone 17, MacBook Air M4 и другие новинки Apple', cta: 'Смотреть →' },
            ].map(({ href, Icon, title, desc, cta }) => (
              <Link key={href} href={href} className="category-card card group p-10 flex flex-col items-start gap-6 no-underline" style={{ minHeight: '260px' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                </div>
                <span className="mt-auto text-sm font-medium" style={{ color: 'var(--color-primary)' }}>{cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'

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
            <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--color-primary)' }}>
              Новое. Проверенное. Ваше.
            </p>
            <h1 className="section-title mb-8 max-w-4xl mx-auto">
              :smart — техника,<br />которой доверяют
            </h1>
            <p className="section-subtitle mb-12 max-w-2xl mx-auto">
              Новые Apple устройства и Trade-in с гарантией качества. Лучшие цены, быстрая доставка.
            </p>
          </div>

          {/* Карточки категорий */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/service" className="card group p-10 flex flex-col items-start gap-6 no-underline" style={{ minHeight: '260px' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: 'var(--color-primary)' }}
              >🔧</div>
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Сервисный центр</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>Ремонт iPhone, MacBook и iPad. Диагностика бесплатно</p>
              </div>
              <span className="mt-auto text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                Записаться →
              </span>
            </Link>
            <Link href="/trade-in" className="card group p-10 flex flex-col items-start gap-6 no-underline" style={{ minHeight: '260px' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: 'var(--color-primary)' }}
              >T</div>
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Trade-in</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>Проверенные устройства в отличном состоянии с гарантией</p>
              </div>
              <span className="mt-auto text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                Смотреть →
              </span>
            </Link>
            <Link href="/new" className="card group p-10 flex flex-col items-start gap-6 no-underline" style={{ minHeight: '260px' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: 'var(--color-primary)' }}
              >N</div>
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Новые устройства</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>iPhone 17, MacBook Air M4 и другие новинки Apple</p>
              </div>
              <span className="mt-auto text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                Смотреть →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

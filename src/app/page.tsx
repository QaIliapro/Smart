import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--bg-primary)', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #0071e3 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
          />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #5e5ce6 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
            Новое. Проверенное. Ваше.
          </p>
          <h1 className="section-title mb-8 max-w-4xl mx-auto">
            Smart — техника,<br />которой доверяют
          </h1>
          <p className="section-subtitle mb-12 max-w-2xl mx-auto">
            Новые Apple устройства и Trade-in с гарантией качества. Лучшие цены, быстрая доставка.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/new" className="btn-primary text-base px-8 py-4">
              Смотреть каталог
            </Link>
            <Link href="/trade-in" className="btn-secondary text-base px-8 py-4">
              Trade-in
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <h2 className="section-title text-center mb-4">Выберите категорию</h2>
        <p className="section-subtitle text-center mb-16">Новые устройства и проверенная техника Trade-in</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/new" className="card group p-10 flex flex-col items-start gap-6 no-underline" style={{ minHeight: '280px' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
              style={{ background: 'linear-gradient(135deg, #0071e3, #2997ff)' }}
            >N</div>
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Новые устройства</h3>
              <p style={{ color: 'var(--text-secondary)' }}>iPhone 17, MacBook Air M4 и другие новинки Apple</p>
            </div>
            <span className="mt-auto text-sm font-medium" style={{ color: 'var(--accent)' }}>
              Смотреть →
            </span>
          </Link>
          <Link href="/trade-in" className="card group p-10 flex flex-col items-start gap-6 no-underline" style={{ minHeight: '280px' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
              style={{ background: 'linear-gradient(135deg, #5e5ce6, #bf5af2)' }}
            >T</div>
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Trade-in</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Проверенные устройства в отличном состоянии с гарантией</p>
            </div>
            <span className="mt-auto text-sm font-medium" style={{ color: 'var(--accent)' }}>
              Смотреть →
            </span>
          </Link>
        </div>
      </section>

      {/* Service Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="card p-12 flex flex-col md:flex-row items-center gap-10"
          style={{ background: 'linear-gradient(135deg, #0071e310, #bf5af210)' }}
        >
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 text-4xl"
            style={{ background: 'linear-gradient(135deg, #0071e3, #bf5af2)' }}>
            🔧
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Сервисный центр</h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Профессиональный ремонт iPhone, MacBook и iPad. Оригинальные запчасти, опытные мастера, гарантия на работы.
              Диагностика — бесплатно.
            </p>
            <Link href="/service" className="btn-primary inline-block">
              Записаться на ремонт →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ background: 'var(--bg-secondary)' }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center mb-4">Почему Smart?</h2>
          <p className="section-subtitle text-center mb-16">Мы заботимся о каждом покупателе</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🛡️', title: 'Гарантия качества', desc: 'Каждое Trade-in устройство проходит 50-точечную проверку перед продажей' },
              { icon: '✅', title: 'Оригинальные товары', desc: 'Только официальные устройства Apple. Никаких подделок' },
              { icon: '🚀', title: 'Быстрая доставка', desc: 'Доставка в течение 1-2 дней по всей стране' },
              { icon: '💬', title: 'Поддержка 24/7', desc: 'Всегда на связи в WhatsApp и Telegram' },
            ].map(item => (
              <div key={item.title} className="card p-8 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

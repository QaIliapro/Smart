import RepairForm from '@/components/RepairForm'

const repairServices = [
  { icon: '📱', title: 'Замена экрана / дисплея' },
  { icon: '🔋', title: 'Замена батареи' },
  { icon: '🔲', title: 'Замена корпуса' },
  { icon: '⚡', title: 'Ремонт разъёма зарядки' },
  { icon: '📷', title: 'Замена камеры' },
  { icon: '💧', title: 'Восстановление после воды' },
  { icon: '🔌', title: 'Ремонт материнской платы' },
  { icon: '🔘', title: 'Замена кнопок' },
  { icon: '🔓', title: 'Разблокировка устройств' },
  { icon: '🔍', title: 'Диагностика (бесплатно)' },
]

const prices = [
  { service: 'Замена экрана iPhone', from: 3500, to: null },
  { service: 'Замена батареи iPhone', from: 1500, to: null },
  { service: 'Замена экрана MacBook', from: 8000, to: null },
  { service: 'Замена батареи MacBook', from: 3500, to: null },
  { service: 'Замена экрана iPad', from: 4500, to: null },
  { service: 'Диагностика', from: null, to: null, free: true },
  { service: 'Ремонт разъёма зарядки', from: 1200, to: null },
  { service: 'Восстановление после воды', from: 2500, to: null },
]

export default function ServicePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--bg-primary)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #bf5af2 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
          />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #0071e3 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
            Профессиональный ремонт Apple
          </p>
          <h1 className="section-title mb-8 max-w-4xl mx-auto">
            Сервисный центр Smart
          </h1>
          <p className="section-subtitle mb-12 max-w-2xl mx-auto">
            Ремонт iPhone, MacBook и iPad с гарантией. Оригинальные запчасти. Диагностика — бесплатно.
          </p>
          <a href="#repair-form" className="btn-primary text-base px-8 py-4 inline-block">
            Оставить заявку
          </a>
        </div>
      </section>

      {/* Why Us */}
      <section style={{ background: 'var(--bg-secondary)' }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center mb-4">Почему мы?</h2>
          <p className="section-subtitle text-center mb-16">Сервис, которому доверяют</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-8 text-center">
              <div className="text-5xl mb-6">🏪</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Большой склад запчастей</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Держим в наличии тысячи оригинальных запчастей для всех моделей iPhone, MacBook и iPad.
                Большинство ремонтов выполняем в день обращения.
              </p>
            </div>
            <div className="card p-8 text-center">
              <div className="text-5xl mb-6">⚙️</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Профессиональное оборудование</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Используем редкое профессиональное оборудование для микросхемного ремонта, пайки и диагностики.
                То, что другие сервисы не берутся починить — мы чиним.
              </p>
            </div>
            <div className="card p-8 text-center">
              <div className="text-5xl mb-6">👨‍🔧</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Опытные мастера</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Наши специалисты имеют более 5 лет опыта работы с техникой Apple.
                Сертифицированы и постоянно проходят обучение.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-3xl overflow-hidden h-64"
            style={{ background: 'linear-gradient(135deg, #0071e3, #2997ff, #5e5ce6)' }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
              <div className="text-5xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold mb-2">Мастерская Smart</h3>
              <p className="text-white/80">Современное оборудование для точного и качественного ремонта</p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden h-64"
            style={{ background: 'linear-gradient(135deg, #bf5af2, #ff375f, #ff9f0a)' }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Гарантия на работы</h3>
              <p className="text-white/80">Гарантия 90 дней на все виды ремонта и замены запчастей</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section style={{ background: 'var(--bg-secondary)' }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center mb-4">Виды ремонта</h2>
          <p className="section-subtitle text-center mb-16">Работаем со всеми моделями Apple</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repairServices.map((service, i) => (
              <div key={i} className="card p-6 flex items-center gap-4">
                <span className="text-3xl">{service.icon}</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{service.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <h2 className="section-title text-center mb-4">Примерные цены</h2>
        <p className="section-subtitle text-center mb-16">Точная стоимость определяется после диагностики</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prices.map((item, i) => (
            <div key={i} className="card p-6 flex flex-col gap-2">
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.service}</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                {item.free ? 'Бесплатно' : `от ${item.from?.toLocaleString('ru-RU')} ₽`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Repair Form */}
      <section id="repair-form" style={{ background: 'var(--bg-secondary)' }} className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center mb-4">Оставить заявку</h2>
          <p className="section-subtitle text-center mb-12">Заполните форму и мы свяжемся с вами</p>
          <RepairForm />
        </div>
      </section>
    </div>
  )
}

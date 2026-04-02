import Link from 'next/link'

export default function Footer() {
  const vk = process.env.NEXT_PUBLIC_VK_URL
  const max = process.env.NEXT_PUBLIC_MAX_URL

  return (
    <footer style={{ background: 'var(--color-footer-bg)' }} className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-footer-accent)' }}>:smart</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-footer-text)' }}>
              Магазин техники Apple. Сервис, Trade-in и новые устройства.
            </p>
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
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #0077FF, #0057CC)' }}
                  >VK</span>
                  ВКонтакте
                </a>
              )}
              {max && (
                <a href={max} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-footer-text)' }}
                >
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #56CCFA, #5472FF, #9040D0)' }}
                  >M</span>
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
          <Link href="/admin" className="text-xs hover:opacity-70" style={{ color: 'var(--color-footer-text)' }}>
            Админ
          </Link>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'

export default function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME

  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }} className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Smart</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Магазин техники Apple. Сервис, Trade-in и новые устройства.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Навигация</h4>
            <div className="flex flex-col gap-2">
              {[['/', 'Главная'], ['/service', 'Сервис'], ['/trade-in', 'Trade-in'], ['/new', 'Новые устройства'], ['/contact', 'Контакты']].map(([href, label]) => (
                <Link key={href} href={href} className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Контакты</h4>
            <div className="flex flex-col gap-3">
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: '#25D366' }}
                  >W</span>
                  WhatsApp
                </a>
              )}
              {telegram && (
                <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: '#229ED9' }}
                  >T</span>
                  Telegram
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} Smart. Все права защищены.
          </p>
          <Link href="/admin" className="text-xs hover:opacity-70" style={{ color: 'var(--text-tertiary)' }}>
            Админ
          </Link>
        </div>
      </div>
    </footer>
  )
}

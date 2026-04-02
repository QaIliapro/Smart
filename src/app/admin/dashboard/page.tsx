import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminDashboard() {
  const [orders, usedProducts, newProducts, repairRequests] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.usedProduct.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.newProduct.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.repairRequest.findMany({ orderBy: { createdAt: 'desc' } }),
  ])

  const total = orders.reduce((sum, o) => sum + o.total, 0)
  const newOrders = orders.filter(o => o.status === 'new').length
  const newRepairs = repairRequests.filter(r => r.status === 'new').length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Панель управления</h1>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="btn-secondary text-sm px-5 py-2.5">Выйти</button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Всего заказов', value: orders.length, color: 'var(--accent)' },
          { label: 'Новых заказов', value: newOrders, color: '#ff9f0a' },
          { label: 'Общая выручка', value: `${total.toFixed(0)} ₽`, color: '#34c759' },
          { label: 'Новых заявок на ремонт', value: newRepairs, color: '#bf5af2' },
        ].map(stat => (
          <div key={stat.label} className="card p-8 text-center">
            <p className="text-4xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <Link href="/admin/products" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #5e5ce6, #bf5af2)' }}>T</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Управление Trade-in товарами</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{usedProducts.length} товаров</p>
          </div>
        </Link>
        <Link href="/admin/new-products" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #0071e3, #2997ff)' }}>N</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Новые товары</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{newProducts.length} товаров</p>
          </div>
        </Link>
        <Link href="/admin/orders" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #ff9f0a, #ff6b35)' }}>З</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Управление заказами</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{newOrders} новых заказов</p>
          </div>
        </Link>
        <Link href="/admin/repairs" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #bf5af2, #ff375f)' }}>С</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Заявки на ремонт</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{newRepairs} новых заявок</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

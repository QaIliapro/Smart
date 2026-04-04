'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Stats = {
  orders: number
  usedProducts: number
  newProducts: number
  repairRequests: number
  newOrders: number
  newRepairs: number
  total: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/dashboard-stats', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data.ok) setStats(data.stats)
        else setError(data.error)
      })
      .catch(e => setError(e.message))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Панель управления</h1>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="btn-secondary text-sm px-5 py-2.5">Выйти</button>
        </form>
      </div>

      {error && <div style={{background:'red',color:'white',padding:'16px',marginBottom:'16px',borderRadius:'8px'}}>{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Всего заказов', value: stats?.orders ?? '—', color: 'var(--accent)' },
          { label: 'Новых заказов', value: stats?.newOrders ?? '—', color: '#ff9f0a' },
          { label: 'Общая выручка', value: stats ? `${stats.total.toFixed(0)} ₽` : '—', color: '#34c759' },
          { label: 'Новых заявок на ремонт', value: stats?.newRepairs ?? '—', color: '#bf5af2' },
        ].map(stat => (
          <div key={stat.label} className="card p-8 text-center">
            <p className="text-4xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <Link href="/admin/products" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #5e5ce6, #bf5af2)' }}>T</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Управление Trade-in товарами</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stats?.usedProducts ?? '—'} товаров</p>
          </div>
        </Link>
        <Link href="/admin/new-products" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #0071e3, #2997ff)' }}>N</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Новые товары</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stats?.newProducts ?? '—'} товаров</p>
          </div>
        </Link>
        <Link href="/admin/orders" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #ff9f0a, #ff6b35)' }}>З</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Управление заказами</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stats?.newOrders ?? '—'} новых заказов</p>
          </div>
        </Link>
        <Link href="/admin/repairs" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #bf5af2, #ff375f)' }}>С</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Заявки на ремонт</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stats?.newRepairs ?? '—'} новых заявок</p>
          </div>
        </Link>
        <Link href="/admin/repair-services" className="card p-8 flex items-center gap-4 no-underline">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #D73711, #E8512F)' }}>В</div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Виды ремонта и цены</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Управление прайс-листом</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

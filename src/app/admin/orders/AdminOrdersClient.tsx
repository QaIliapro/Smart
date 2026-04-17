'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  name: string
  phone: string
  email: string | null
  method: string
  address: string | null
  comment: string | null
  items: string
  total: number
  status: string
  createdAt: string | Date
}

const statusLabels: Record<string, string> = {
  new: 'Новый', processing: 'В обработке', done: 'Выполнен',
}

const statusColors: Record<string, string> = {
  new: '#ff9f0a', processing: 'var(--accent)', done: '#34c759',
}

export default function AdminOrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/orders', { credentials: 'include' })
      .then(r => r.json()).then(data => { if (Array.isArray(data)) setOrders(data) })
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Удалить заказ?')) return
    await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' })
    setOrders(orders.filter(o => o.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="text-sm" style={{ color: 'var(--accent)' }}>← Назад</Link>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Заказы</h1>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <div key={order.id} className="card overflow-hidden">
            <div className="p-6 flex items-start gap-4 cursor-pointer"
              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{order.name}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                    style={{ background: statusColors[order.status] }}>
                    {statusLabels[order.status] || order.status}
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{order.total} ₽</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {order.phone} · {order.method === 'pickup' ? 'Самовывоз' : 'Доставка'} ·{' '}
                  {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <span style={{ color: 'var(--text-tertiary)' }}>{expandedId === order.id ? '▲' : '▼'}</span>
            </div>

            {expandedId === order.id && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="pt-4 flex flex-col gap-3">
                  {order.email && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Email: {order.email}</p>}
                  {order.address && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Адрес: {order.address}</p>}
                  {order.comment && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Комментарий: {order.comment}</p>}
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Товары:</p>
                    {JSON.parse(order.items).map((item: { name: string; quantity: number; price: number }, i: number) => (
                      <p key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {item.name} × {item.quantity} = {item.price * item.quantity} ₽
                      </p>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <button key={key} onClick={() => updateStatus(order.id, key)}
                        disabled={order.status === key}
                        className="text-sm px-4 py-2 rounded-full font-medium transition-all"
                        style={{
                          background: order.status === key ? statusColors[key] : 'var(--bg-secondary)',
                          color: order.status === key ? 'white' : 'var(--text-primary)',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                    <button onClick={() => deleteOrder(order.id)}
                      className="text-sm px-4 py-2 rounded-full font-medium transition-all ml-auto"
                      style={{ background: '#ff3b3020', color: '#ff3b30' }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>Заказов пока нет</p>
        )}
      </div>
    </div>
  )
}

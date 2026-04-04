'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface RepairRequest {
  id: string
  device: string
  problem: string
  name: string
  phone: string
  status: string
  createdAt: string | Date
}

const statusLabels: Record<string, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  done: 'Выполнена',
}

const statusColors: Record<string, string> = {
  new: '#ff9f0a',
  in_progress: 'var(--accent)',
  done: '#34c759',
}

export default function AdminRepairsClient({ initialRequests }: { initialRequests: RepairRequest[] }) {
  const [requests, setRequests] = useState(initialRequests)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/repairs', { credentials: 'include' })
      .then(r => r.json()).then(data => { if (Array.isArray(data)) setRequests(data) })
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/repairs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить заявку?')) return
    await fetch(`/api/admin/repairs/${id}`, { method: 'DELETE' })
    setRequests(requests.filter(r => r.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="text-sm" style={{ color: 'var(--accent)' }}>← Назад</Link>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Заявки на ремонт</h1>
      </div>

      <div className="flex flex-col gap-4">
        {requests.map(req => (
          <div key={req.id} className="card overflow-hidden">
            <div className="p-6 flex items-start gap-4 cursor-pointer"
              onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{req.name}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                    style={{ background: statusColors[req.status] || '#86868b' }}>
                    {statusLabels[req.status] || req.status}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    {req.device}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {req.phone} · {new Date(req.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <span style={{ color: 'var(--text-tertiary)' }}>{expandedId === req.id ? '▲' : '▼'}</span>
            </div>

            {expandedId === req.id && (
              <div className="px-6 pb-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="pt-4 flex flex-col gap-3">
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Проблема: </span>
                    {req.problem}
                  </p>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <button key={key} onClick={() => updateStatus(req.id, key)}
                        disabled={req.status === key}
                        className="text-sm px-4 py-2 rounded-full font-medium transition-all"
                        style={{
                          background: req.status === key ? statusColors[key] : 'var(--bg-secondary)',
                          color: req.status === key ? 'white' : 'var(--text-primary)',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                    <button onClick={() => handleDelete(req.id)}
                      className="text-sm px-4 py-2 rounded-full font-medium"
                      style={{ background: 'var(--bg-secondary)', color: '#ff3b30' }}>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>Заявок пока нет</p>
        )}
      </div>
    </div>
  )
}

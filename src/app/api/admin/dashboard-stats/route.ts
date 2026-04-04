import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  if (req.cookies.get('admin-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [orders, usedProducts, newProducts, repairRequests] = await Promise.all([
      prisma.order.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.usedProduct.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.newProduct.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.repairRequest.findMany({ orderBy: { createdAt: 'desc' } }),
    ])

    return NextResponse.json({
      ok: true,
      stats: {
        orders: orders.length,
        usedProducts: usedProducts.length,
        newProducts: newProducts.length,
        repairRequests: repairRequests.length,
        newOrders: orders.filter(o => o.status === 'new').length,
        newRepairs: repairRequests.filter(r => r.status === 'new').length,
        total: orders.reduce((sum, o) => sum + o.total, 0),
      }
    })
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

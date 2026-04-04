import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function checkAuth(req: NextRequest) {
  return req.cookies.get('admin-auth')?.value === 'true'
}

// Полная замена всех цен для сервиса
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json() // массив { category, model, price, free }

  await prisma.repairPrice.deleteMany({ where: { serviceId: params.id } })

  const prices = await prisma.repairPrice.createMany({
    data: body.map((p: { category: string; model: string; price: number | null; free?: boolean }) => ({
      serviceId: params.id,
      category: p.category,
      model: p.model,
      price: p.price ?? null,
      free: p.free ?? false,
    })),
  })

  return NextResponse.json(prices)
}

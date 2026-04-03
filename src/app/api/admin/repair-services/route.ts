import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function isAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_session')?.value === 'authenticated'
}

export async function GET() {
  const services = await prisma.repairService.findMany({
    orderBy: { order: 'asc' },
    include: { prices: true },
  })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  if (!isAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const service = await prisma.repairService.create({
    data: {
      title: body.title,
      icon: body.icon,
      order: body.order ?? 0,
      free: body.free ?? false,
      active: body.active ?? true,
    },
  })
  return NextResponse.json(service)
}

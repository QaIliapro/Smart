import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const services = await prisma.repairService.findMany({
      orderBy: { order: 'asc' },
      include: { prices: true },
    })
    return NextResponse.json(services)
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (req.cookies.get('admin-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const service = await prisma.repairService.create({
      data: {
        title: body.title,
        icon: body.icon,
        order: body.order ?? 0,
        free: body.free ?? false,
        active: body.active !== false,
      },
    })
    return NextResponse.json(service)
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}

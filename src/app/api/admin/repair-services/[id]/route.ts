import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (req.cookies.get('admin-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const service = await prisma.repairService.update({
    where: { id: params.id },
    data: { title: body.title, icon: body.icon, order: body.order, free: body.free, active: body.active },
  })
  return NextResponse.json(service)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (req.cookies.get('admin-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await prisma.repairService.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}

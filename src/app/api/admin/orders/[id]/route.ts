import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

function checkAuth() {
  const cookieStore = cookies()
  return cookieStore.get('admin-auth')?.value === 'true'
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { status } = await req.json()
  const order = await prisma.order.update({ where: { id: params.id }, data: { status } })
  return NextResponse.json(order)
}

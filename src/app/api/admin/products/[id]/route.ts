import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin-auth')?.value === 'true'
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const product = await prisma.usedProduct.update({ where: { id: params.id }, data: body })
  return NextResponse.json(product)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.usedProduct.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}

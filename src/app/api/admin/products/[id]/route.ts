import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

function checkAuth() {
  const cookieStore = cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const product = await prisma.usedProduct.update({ where: { id: params.id }, data: body })
  return NextResponse.json(product)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.usedProduct.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}

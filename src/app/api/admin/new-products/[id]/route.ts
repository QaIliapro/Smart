import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function checkAuth(req: NextRequest) {
  return req.cookies.get('admin-auth')?.value === 'true'
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const product = await prisma.newProduct.update({ where: { id: params.id }, data: body })
  return NextResponse.json(product)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.newProduct.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}

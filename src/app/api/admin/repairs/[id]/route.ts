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
  const request = await prisma.repairRequest.update({ where: { id: params.id }, data: body })
  return NextResponse.json(request)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.repairRequest.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}

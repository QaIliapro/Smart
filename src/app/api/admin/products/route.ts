import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

function checkAuth() {
  const cookieStore = cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export async function GET() {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const products = await prisma.usedProduct.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const product = await prisma.usedProduct.create({ data: body })
  return NextResponse.json(product)
}

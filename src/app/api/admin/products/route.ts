import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin-auth')?.value === 'true'
}

export async function GET() {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const products = await prisma.usedProduct.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const product = await prisma.usedProduct.create({ data: body })
  return NextResponse.json(product)
}

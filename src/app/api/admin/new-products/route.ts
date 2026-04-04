import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function checkAuth(req: NextRequest) {
  return req.cookies.get('admin-auth')?.value === 'true'
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const products = await prisma.newProduct.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const product = await prisma.newProduct.create({ data: body })
  return NextResponse.json(product)
}

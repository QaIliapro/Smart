import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const products = await prisma.newProduct.findMany({
    where: { active: true },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(products)
}

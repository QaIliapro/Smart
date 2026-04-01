import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, method, address, comment, items, total } = body

    if (!name || !phone || !method || !items || total === undefined) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: { name, phone, email, method, address, comment, items, total },
    })

    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

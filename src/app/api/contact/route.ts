import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json()
    if (!name || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    await prisma.contactMessage.create({ data: { name, message } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

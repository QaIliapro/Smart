import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { device, problem, name, phone } = body

    if (!device || !problem || !name || !phone) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const request = await prisma.repairRequest.create({
      data: { device, problem, name, phone },
    })

    return NextResponse.json(request)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

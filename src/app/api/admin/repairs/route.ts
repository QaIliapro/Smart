import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function checkAuth(req: NextRequest) {
  return req.cookies.get('admin-auth')?.value === 'true'
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const requests = await prisma.repairRequest.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(requests)
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

function checkAuth() {
  const cookieStore = cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export async function GET() {
  if (!checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const requests = await prisma.repairRequest.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(requests)
}

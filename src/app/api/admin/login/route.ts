import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (password === adminPassword) {
    const cookieStore = cookies()
    cookieStore.set('admin-auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 24h
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}

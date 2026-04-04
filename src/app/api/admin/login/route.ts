import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (password === adminPassword) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 24h
    })
    return response
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}

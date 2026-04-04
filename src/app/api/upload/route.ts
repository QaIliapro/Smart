import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (req.cookies.get('admin-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const token = process.env.BLOB_READ_WRITE_TOKEN || process.env.SMART_BLOB_READ_WRITE_TOKEN
    const blob = await put(`products/${Date.now()}-${file.name}`, file, { access: 'public', token })
    return NextResponse.json({ url: blob.url })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

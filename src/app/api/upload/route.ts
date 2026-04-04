import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import sharp from 'sharp'

async function toJpegBuffer(inputBuffer: Buffer, mimeType: string): Promise<Buffer> {
  if (mimeType === 'image/heic' || mimeType === 'image/heif') {
    const heicConvert = (await import('heic-convert')).default
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.85,
    })
    return Buffer.from(outputBuffer)
  }
  return sharp(inputBuffer).rotate().jpeg({ quality: 85 }).toBuffer()
}

export async function POST(req: NextRequest) {
  if (req.cookies.get('admin-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const inputBuffer = Buffer.from(bytes)

    const uploadDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const filename = `${Date.now()}.jpg`
    const filepath = join(uploadDir, filename)

    const jpegBuffer = await toJpegBuffer(inputBuffer, file.type)
    await writeFile(filepath, jpegBuffer)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
    const url = `${siteUrl}/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

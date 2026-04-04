import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import sharp from 'sharp'

function isHeicBuffer(buf: Buffer): boolean {
  if (buf.length < 12) return false
  const ftyp = buf.slice(4, 8).toString('ascii')
  if (ftyp !== 'ftyp') return false
  const brand = buf.slice(8, 12).toString('ascii')
  return ['heic', 'heix', 'hevc', 'hevx', 'mif1', 'msf1'].includes(brand)
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

    const baseName = `${Date.now()}`

    if (isHeicBuffer(inputBuffer)) {
      // Сохраняем как есть с правильным расширением
      const filename = `${baseName}.heic`
      await writeFile(join(uploadDir, filename), inputBuffer)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
      return NextResponse.json({ url: `${siteUrl}/uploads/${filename}` })
    }

    // Для остальных форматов конвертируем в JPEG через sharp
    const filename = `${baseName}.jpg`
    await sharp(inputBuffer).rotate().jpeg({ quality: 85 }).toFile(join(uploadDir, filename))
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
    return NextResponse.json({ url: `${siteUrl}/uploads/${filename}` })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

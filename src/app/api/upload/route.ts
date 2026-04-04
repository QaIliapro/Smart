import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import sharp from 'sharp'

const execAsync = promisify(exec)

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
    const filename = `${baseName}.jpg`
    const filepath = join(uploadDir, filename)

    const isHeic = file.type === 'image/heic' || file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')

    if (isHeic) {
      const tmpInput = join(uploadDir, `${baseName}_tmp.heic`)
      await writeFile(tmpInput, inputBuffer)
      await execAsync(`ffmpeg -i "${tmpInput}" -q:v 2 "${filepath}"`)
      await unlink(tmpInput)
    } else {
      await sharp(inputBuffer).rotate().jpeg({ quality: 85 }).toFile(filepath)
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
    const url = `${siteUrl}/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

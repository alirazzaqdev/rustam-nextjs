import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WebP, GIF allowed' }, { status: 400 })
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const bytes = await file.arrayBuffer()
    await writeFile(join(uploadDir, filename), Buffer.from(bytes))

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (err) {
    console.error('Upload failed:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

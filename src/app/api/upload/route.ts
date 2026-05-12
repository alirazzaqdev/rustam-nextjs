import { NextRequest, NextResponse } from 'next/server'

const MAX_SIZE    = 5 * 1024 * 1024
const ALLOWED     = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(req: NextRequest) {
  const cloudName    = process.env.CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    return NextResponse.json({ error: 'Image upload not configured' }, { status: 503 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WebP, GIF allowed' }, { status: 400 })
    }

    const bytes  = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    const fd = new FormData()
    fd.append('file', dataUri)
    fd.append('upload_preset', uploadPreset)
    fd.append('folder', 'rustam-products')

    const res  = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body:   fd,
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('[upload] Cloudinary error:', err)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ url: data.secure_url })
  } catch (err) {
    console.error('[upload] failed:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

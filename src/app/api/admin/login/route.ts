import { NextRequest, NextResponse } from 'next/server'
import { createSessionCookie, COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json() as { email: string; password: string }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@rustambattery.com'
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const session = createSessionCookie()
    const res = NextResponse.json({ success: true })
    res.cookies.set(session.name, session.value, session.options as Parameters<typeof res.cookies.set>[2])
    return res
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createSessionCookie, COOKIE_NAME } from '@/lib/auth'

interface RateEntry { attempts: number; lockUntil: number }
const rateMap = new Map<string, RateEntry>()

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000 // 15 minutes

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  const ip = getIP(req)
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (entry && now < entry.lockUntil) {
    const remaining = Math.ceil((entry.lockUntil - now) / 60000)
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${remaining} minute${remaining === 1 ? '' : 's'}.` },
      { status: 429 }
    )
  }

  try {
    const { email, password } = await req.json() as { email: string; password: string }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@rustambattery.com'
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
    }

    if (email !== adminEmail || password !== adminPassword) {
      const prev = rateMap.get(ip) ?? { attempts: 0, lockUntil: 0 }
      const attempts = prev.attempts + 1
      rateMap.set(ip, {
        attempts,
        lockUntil: attempts >= MAX_ATTEMPTS ? now + LOCKOUT_MS : prev.lockUntil,
      })
      const remaining = MAX_ATTEMPTS - attempts
      const msg = remaining <= 0
        ? 'Too many failed attempts. Locked out for 15 minutes.'
        : `Invalid credentials. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
      return NextResponse.json({ error: msg }, { status: 401 })
    }

    // Successful login — clear rate limit
    rateMap.delete(ip)

    const session = createSessionCookie()
    const res = NextResponse.json({ success: true })
    res.cookies.set(session.name, session.value, session.options as Parameters<typeof res.cookies.set>[2])
    return res
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

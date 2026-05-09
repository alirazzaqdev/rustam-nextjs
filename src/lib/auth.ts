import crypto from 'crypto'
import { cookies } from 'next/headers'

const SECRET = process.env.NEXTAUTH_SECRET || 'rustam-battery-secret-2024'
const COOKIE_NAME = 'admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 hours

export function signToken(payload: string): string {
  const hmac = crypto.createHmac('sha256', SECRET)
  hmac.update(payload)
  const sig = hmac.digest('hex')
  return `${payload}.${sig}`
}

export function verifyToken(token: string): string | null {
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return null
  const payload = token.slice(0, lastDot)
  const sig = token.slice(lastDot + 1)
  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  return payload
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  const payload = verifyToken(token)
  if (!payload) return false
  // payload = "admin:timestamp" — check it's within 8h
  const [role, ts] = payload.split(':')
  if (role !== 'admin') return false
  if (Date.now() - Number(ts) > COOKIE_MAX_AGE * 1000) return false
  return true
}

export function createSessionCookie(): { name: string; value: string; options: object } {
  const payload = `admin:${Date.now()}`
  const token = signToken(payload)
  return {
    name: COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    },
  }
}

export const COOKIE_MAX_AGE_EXPORT = COOKIE_MAX_AGE
export { COOKIE_NAME }

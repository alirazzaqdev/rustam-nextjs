import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenEdge } from '@/lib/authEdge'

const COOKIE_NAME = 'admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 8 * 1000 // 8h in ms

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const token = req.cookies.get(COOKIE_NAME)?.value
  let sessionValid = false

  if (token) {
    const payload = await verifyTokenEdge(token)
    if (payload) {
      const [role, ts] = payload.split(':')
      sessionValid = role === 'admin' && Date.now() - Number(ts) <= COOKIE_MAX_AGE
    }
  }

  if (pathname === '/admin/login') {
    // Already logged in — send to dashboard
    if (sessionValid) return NextResponse.redirect(new URL('/admin', req.url))

    // Allow if valid secret key present in URL
    const keyParam = req.nextUrl.searchParams.get('key')
    const accessKey = process.env.ADMIN_ACCESS_KEY
    if (accessKey && keyParam === accessKey) return NextResponse.next()

    // No valid key — block access
    return NextResponse.redirect(new URL('/', req.url))
  }

  // All other /admin/* routes require valid session
  if (!sessionValid) return NextResponse.redirect(new URL('/', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

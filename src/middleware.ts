import { NextRequest, NextResponse } from 'next/server'
import { verifyTokenEdge } from '@/lib/authEdge'

const COOKIE_NAME = 'admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 8 * 1000 // 8h in ms

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return NextResponse.redirect(new URL('/admin/login', req.url))

  const payload = await verifyTokenEdge(token)
  if (!payload) return NextResponse.redirect(new URL('/admin/login', req.url))

  const [role, ts] = payload.split(':')
  if (role !== 'admin' || Date.now() - Number(ts) > COOKIE_MAX_AGE) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

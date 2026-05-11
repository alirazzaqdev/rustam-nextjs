import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const [messages, quotes] = await Promise.all([
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }),
    ])
    return NextResponse.json({ messages, quotes })
  } catch {
    // DB not available — return empty arrays so admin panel doesn't crash
    return NextResponse.json({ messages: [], quotes: [] })
  }
}

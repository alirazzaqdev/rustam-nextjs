import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const [messages, quotes] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }),
  ])
  return NextResponse.json({ messages, quotes })
}

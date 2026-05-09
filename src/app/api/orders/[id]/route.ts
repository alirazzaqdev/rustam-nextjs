import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json() as {
      orderStatus?: string
      paymentStatus?: string
      paymentRef?: string
    }

    const order = await prisma.order.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(order)
  } catch (err) {
    console.error('Order update failed:', err)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await prisma.order.findUnique({ where: { id } })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

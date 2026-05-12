import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWhatsApp, msgOrderConfirmed, msgOrderRejected } from '@/lib/whatsapp'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body   = await req.json() as {
      orderStatus?:     string
      paymentStatus?:   string
      paymentRef?:      string
      rejectionReason?: string
    }

    const { rejectionReason, ...dbFields } = body

    // If confirming, also mark payment status appropriately
    if (dbFields.orderStatus === 'confirmed' && !dbFields.paymentStatus) {
      dbFields.paymentStatus = 'pending_verification'
    }

    const order = await prisma.order.update({
      where: { id },
      data:  dbFields,
    })

    // Auto-send WhatsApp to customer on status change
    if (body.orderStatus === 'confirmed') {
      await sendWhatsApp(
        order.phone,
        msgOrderConfirmed(order.customerName, order.orderNumber, order.total, order.paymentMethod)
      )
    } else if (body.orderStatus === 'cancelled') {
      await sendWhatsApp(
        order.phone,
        msgOrderRejected(order.customerName, order.orderNumber, rejectionReason || 'Order process nahi ho saka')
      )
    }

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
    const { id }  = await params
    const order   = await prisma.order.findUnique({ where: { id } })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

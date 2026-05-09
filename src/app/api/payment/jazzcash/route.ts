import { NextRequest, NextResponse } from 'next/server'
import { buildJazzCashPayload, JAZZCASH_URL } from '@/lib/payment'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { orderId, mobileNumber } = await req.json() as {
      orderId: string
      mobileNumber?: string
    }

    const merchantId = process.env.JAZZCASH_MERCHANT_ID
    const password = process.env.JAZZCASH_PASSWORD
    const salt = process.env.JAZZCASH_INTEGRITY_SALT

    if (!merchantId || !password || !salt) {
      return NextResponse.json(
        { error: 'JazzCash not configured. Please contact the store.' },
        { status: 503 }
      )
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rustam-nextjs.vercel.app'
    const returnUrl = `${baseUrl}/api/payment/jazzcash/callback`

    const payload = buildJazzCashPayload({
      merchantId,
      password,
      integritySalt: salt,
      amount: order.total,
      billRef: order.orderNumber,
      description: `Order ${order.orderNumber} - Rustam Battery`,
      returnUrl,
      mobileNumber,
    })

    return NextResponse.json({
      url: JAZZCASH_URL,
      payload,
    })
  } catch (err) {
    console.error('JazzCash initiation failed:', err)
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
  }
}

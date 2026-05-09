import { NextRequest, NextResponse } from 'next/server'
import { buildEasyPaisaPayload, EASYPAISA_URL } from '@/lib/payment'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { orderId, mobileNumber } = await req.json() as {
      orderId: string
      mobileNumber: string
    }

    const storeId = process.env.EASYPAISA_STORE_ID
    const hashKey = process.env.EASYPAISA_HASH_KEY

    if (!storeId || !hashKey) {
      return NextResponse.json(
        { error: 'EasyPaisa not configured. Please contact the store.' },
        { status: 503 }
      )
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rustam-nextjs.vercel.app'
    const returnUrl = `${baseUrl}/api/payment/easypaisa/callback`

    const payload = buildEasyPaisaPayload({
      storeId,
      hashKey,
      amount: order.total,
      orderRef: order.orderNumber,
      mobileNumber,
      emailAddress: order.email,
      returnUrl,
    })

    return NextResponse.json({ url: EASYPAISA_URL, payload })
  } catch (err) {
    console.error('EasyPaisa initiation failed:', err)
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
  }
}

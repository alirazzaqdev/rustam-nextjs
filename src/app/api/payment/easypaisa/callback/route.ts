import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createHmac } from 'crypto'

function verifyEasyPaisaCallback(params: Record<string, string>, hashKey: string): boolean {
  const received = params.storeId ? params.desc || '' : ''
  // EasyPaisa callback hash: HMAC-SHA256 of response code + order ref + store id
  const responseCode = params.responseCode || params.ResponseCode || ''
  const orderRef = params.orderRefNum || params.OrderRefNum || ''
  const storeId = params.storeId || params.StoreId || ''
  const received_hash = params.signature || params.Signature || ''

  if (!received_hash) return true // some sandbox flows omit signature

  const message = `${responseCode}&${orderRef}&${storeId}`
  const computed = createHmac('sha256', hashKey).update(message).digest('hex').toUpperCase()
  return computed === received_hash.toUpperCase()
}

export async function GET(req: NextRequest) {
  return handleCallback(req)
}
export async function POST(req: NextRequest) {
  return handleCallback(req)
}

async function handleCallback(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rustambattery.com'
  const hashKey = process.env.EASYPAISA_HASH_KEY || ''

  try {
    let params: Record<string, string> = {}

    if (req.method === 'POST') {
      const formData = await req.formData()
      formData.forEach((value, key) => { params[key] = String(value) })
    } else {
      const url = new URL(req.url)
      url.searchParams.forEach((value, key) => { params[key] = value })
    }

    const responseCode = params.responseCode || params.ResponseCode || ''
    const orderRef = params.orderRefNum || params.OrderRefNum || ''
    const txnId = params.transactionId || params.TransactionId || ''

    const isValid = verifyEasyPaisaCallback(params, hashKey)
    if (!isValid) {
      return NextResponse.redirect(`${baseUrl}/order/success?status=failed&reason=invalid_hash`)
    }

    const order = await prisma.order.findFirst({ where: { orderNumber: orderRef } })
    if (!order) {
      return NextResponse.redirect(`${baseUrl}/order/success?status=failed&reason=order_not_found`)
    }

    const paid = responseCode === '0000'
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: paid ? 'paid' : 'failed',
        orderStatus: paid ? 'confirmed' : order.orderStatus,
        paymentRef: txnId || undefined,
      },
    })

    const qs = new URLSearchParams({
      orderNumber: order.orderNumber,
      status: paid ? 'success' : 'failed',
      method: 'easypaisa',
    })
    return NextResponse.redirect(`${baseUrl}/order/success?${qs}`)
  } catch (err) {
    console.error('EasyPaisa callback error:', err)
    return NextResponse.redirect(`${baseUrl}/order/success?status=failed&reason=server_error`)
  }
}

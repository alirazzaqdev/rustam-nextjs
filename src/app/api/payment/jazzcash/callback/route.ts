import { NextRequest, NextResponse } from 'next/server'
import { verifyJazzCashCallback } from '@/lib/payment'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  return handleCallback(req)
}
export async function GET(req: NextRequest) {
  return handleCallback(req)
}

async function handleCallback(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rustambattery.com'

  try {
    let params: Record<string, string> = {}

    if (req.method === 'POST') {
      const formData = await req.formData()
      formData.forEach((value, key) => { params[key] = String(value) })
    } else {
      const url = new URL(req.url)
      url.searchParams.forEach((value, key) => { params[key] = value })
    }

    const salt = process.env.JAZZCASH_INTEGRITY_SALT || ''
    const isValid = verifyJazzCashCallback(params, salt)
    const responseCode = params.pp_ResponseCode
    const billRef = params.pp_BillReference
    const txnRef = params.pp_TxnRefNo

    if (!isValid) {
      console.warn('JazzCash: invalid hash for billRef', billRef)
      return NextResponse.redirect(`${baseUrl}/order/success?status=failed&reason=invalid_hash`)
    }

    // Find order by orderNumber = billRef
    const order = await prisma.order.findFirst({ where: { orderNumber: billRef } })
    if (!order) {
      return NextResponse.redirect(`${baseUrl}/order/success?status=failed&reason=order_not_found`)
    }

    const paid = responseCode === '000'
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: paid ? 'paid' : 'failed',
        orderStatus: paid ? 'confirmed' : order.orderStatus,
        paymentRef: txnRef,
      },
    })

    const qs = new URLSearchParams({
      orderNumber: order.orderNumber,
      status: paid ? 'success' : 'failed',
      method: 'jazzcash',
    })
    return NextResponse.redirect(`${baseUrl}/order/success?${qs}`)
  } catch (err) {
    console.error('JazzCash callback error:', err)
    return NextResponse.redirect(`${baseUrl}/order/success?status=failed&reason=server_error`)
  }
}

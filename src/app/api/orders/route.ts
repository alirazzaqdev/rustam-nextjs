import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.customerName || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const orderNumber = `RB-${Date.now().toString(36).toUpperCase()}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: body.customerName || '',
        phone:        body.phone || '',
        whatsapp:     body.whatsapp || body.phone || '',
        email:        body.email || '',
        address:      body.address || '',
        city:         body.city || '',
        items:        body.items || body.product ? [{ name: body.product, price: body.price }] : [],
        subtotal:     Number(body.price || body.subtotal || 0),
        total:        Number(body.price || body.total || 0),
        paymentMethod: body.paymentMethod || 'Cash on Delivery',
        paymentStatus: 'pending',
        orderStatus:   'pending',
        notes:         body.notes || '',
      },
    })

    return NextResponse.json({
      success:   true,
      orderId:   order.id,
      orderNumber: order.orderNumber,
      message:   'Order received successfully',
    })
  } catch (error) {
    console.error('Order API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process order. Please try WhatsApp.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || ''

    const orders = await prisma.order.findMany({
      where: status ? { orderStatus: status } : {},
      orderBy: { createdAt: 'desc' },
      take: 200,
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json([], { status: 200 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

// In-memory store — persists for the lifetime of this server instance
const orders: Record<string, unknown>[] = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.customerName || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const order = {
      id: `RB-${Date.now()}`,
      customerName: body.customerName || '',
      phone: body.phone || '',
      email: body.email || '',
      address: body.address || '',
      city: body.city || '',
      projectType: body.projectType || '',
      notes: body.notes || '',
      product: body.product || '',
      price: body.price || 0,
      paymentMethod: body.paymentMethod || 'Cash on Delivery',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    orders.push(order)
    console.log('New Order:', JSON.stringify(order, null, 2))

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Order received successfully',
    })
  } catch (error) {
    console.error('Order API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process order. Please try WhatsApp.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Also try to pull from DB if available
  let dbOrders: unknown[] = []
  try {
    const { prisma } = await import('@/lib/prisma')
    dbOrders = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
  } catch {
    // DB not available — return in-memory orders only
  }

  return NextResponse.json({
    success: true,
    orders: [...orders, ...dbOrders],
    total: orders.length + dbOrders.length,
  })
}

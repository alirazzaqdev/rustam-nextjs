import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@rustambattery.com'
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@rustambattery.com'

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `RB-${ts}-${rand}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      customerName: string
      phone: string
      whatsapp?: string
      email: string
      address: string
      city: string
      items: Array<{ id: string; name: string; price: number; quantity: number; category: string }>
      subtotal: number
      total: number
      paymentMethod: string
      notes?: string
    }

    const required = ['customerName', 'phone', 'email', 'address', 'city', 'items', 'total', 'paymentMethod']
    for (const field of required) {
      if (!body[field as keyof typeof body]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: body.customerName,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        address: body.address,
        city: body.city,
        items: body.items,
        subtotal: body.subtotal,
        total: body.total,
        paymentMethod: body.paymentMethod,
        notes: body.notes,
      },
    })

    const itemsHtml = body.items
      .map((i) => `<tr><td style="padding:6px 12px;border:1px solid #e2e8f0">${i.name}</td><td style="padding:6px 12px;border:1px solid #e2e8f0;text-align:center">${i.quantity}</td><td style="padding:6px 12px;border:1px solid #e2e8f0;text-align:right">PKR ${(i.price * i.quantity).toLocaleString()}</td></tr>`)
      .join('')

    const resend = getResend()
    if (!resend) {
      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        warning: 'Email not configured',
      })
    }

    // Customer email
    await resend.emails.send({
      from: EMAIL_FROM,
      to: body.email,
      subject: `Order Confirmed — ${order.orderNumber}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
          <div style="background:#F59E0B;padding:24px;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="color:white;margin:0;font-size:24px">Order Received!</h1>
          </div>
          <div style="background:white;padding:24px;border:1px solid #e2e8f0;border-radius:0 0 12px 12px">
            <p>Hi <strong>${body.customerName}</strong>,</p>
            <p>Your order <strong>${order.orderNumber}</strong> has been received. Our team will confirm within 2–4 hours.</p>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
              <thead><tr style="background:#f8fafc">
                <th style="padding:8px 12px;border:1px solid #e2e8f0;text-align:left">Item</th>
                <th style="padding:8px 12px;border:1px solid #e2e8f0">Qty</th>
                <th style="padding:8px 12px;border:1px solid #e2e8f0;text-align:right">Amount</th>
              </tr></thead>
              <tbody>${itemsHtml}</tbody>
              <tfoot><tr style="background:#fffbeb">
                <td colspan="2" style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:700">Total</td>
                <td style="padding:8px 12px;border:1px solid #e2e8f0;text-align:right;font-weight:700;color:#F59E0B">PKR ${body.total.toLocaleString()}</td>
              </tr></tfoot>
            </table>
            <p><strong>Payment Method:</strong> ${body.paymentMethod.replace('_', ' ').toUpperCase()}</p>
            <p style="color:#64748b;font-size:13px">Questions? Call/WhatsApp: <a href="tel:+923001234567">+92 300 1234567</a></p>
            <p style="color:#64748b;font-size:13px">Rustam Battery & Solar Energy House — Kahna Nau, Lahore</p>
          </div>
        </div>
      `,
    }).catch(() => {}) // Non-fatal

    // Admin email
    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Order ${order.orderNumber} — PKR ${body.total.toLocaleString()}`,
      html: `
        <h2>New Order: ${order.orderNumber}</h2>
        <p><strong>Customer:</strong> ${body.customerName}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Address:</strong> ${body.address}, ${body.city}</p>
        <p><strong>Payment:</strong> ${body.paymentMethod}</p>
        <p><strong>Total:</strong> PKR ${body.total.toLocaleString()}</p>
        <table style="border-collapse:collapse;width:100%">${itemsHtml}</table>
      `,
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
    })
  } catch (err) {
    console.error('Order creation failed:', err)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Admin only — checked in admin layout
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const limit = Number(searchParams.get('limit') || '50')

  const orders = await prisma.order.findMany({
    where: status ? { orderStatus: status } : undefined,
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return NextResponse.json(orders)
}

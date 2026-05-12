'use server'

import { sendWhatsApp, msgOrderReceived } from '@/lib/whatsapp'

export type OrderData = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  projectType: string
  paymentMethod: string
  products: string
  totalAmount?: string
  notes?: string
}

function generateOrderId(): string {
  return `RB-${Date.now().toString(36).toUpperCase()}`
}

async function saveToDb(data: OrderData, orderId: string): Promise<void> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const total = Number((data.totalAmount || '0').replace(/[^\d.]/g, '')) || 0

    await prisma.order.create({
      data: {
        orderNumber:   orderId,
        customerName:  data.name,
        phone:         data.phone,
        whatsapp:      data.phone,
        email:         data.email,
        address:       data.address,
        city:          data.city || 'Lahore',
        items:         [{ name: data.products, price: total }],
        subtotal:      total,
        total:         total,
        paymentMethod: data.paymentMethod,
        paymentStatus: 'pending',
        orderStatus:   'pending',
        notes: [
          data.projectType ? `Type: ${data.projectType}` : '',
          data.notes || '',
        ].filter(Boolean).join(' | '),
      },
    })
  } catch (err) {
    console.error('[order] DB save failed:', (err as Error).message)
  }
}

async function sendConfirmationWhatsApp(data: OrderData, orderId: string): Promise<void> {
  const total = Number((data.totalAmount || '0').replace(/[^\d.]/g, '')) || 0
  const msg   = msgOrderReceived(data.name, orderId, data.products, total, data.paymentMethod)
  await sendWhatsApp(data.phone, msg)
}

async function sendEmails(data: OrderData, orderId: string): Promise<void> {
  try {
    const key = process.env.RESEND_API_KEY
    if (!key) return
    const { Resend } = await import('resend')
    const resend     = new Resend(key)
    const EMAIL_FROM  = process.env.EMAIL_FROM  || 'noreply@rustambattery.com'
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ia6969537@gmail.com'

    await resend.emails.send({
      from: EMAIL_FROM,
      to:   ADMIN_EMAIL,
      subject: `New Order ${orderId} — ${data.name}`,
      html: `<h2 style="color:#D97706">New Order</h2>
        <p><b>ID:</b> ${orderId}</p>
        <p><b>Name:</b> ${data.name} | <b>Phone:</b> ${data.phone}</p>
        <p><b>Address:</b> ${data.address}, ${data.city}</p>
        <p><b>Payment:</b> ${data.paymentMethod}</p>
        <p><b>Items:</b><br/><pre>${data.products}</pre></p>
        ${data.totalAmount ? `<p><b>Total:</b> PKR ${data.totalAmount}</p>` : ''}`,
    })
  } catch (err) {
    console.warn('[order] Email skipped:', (err as Error).message)
  }
}

export async function submitOrder(data: OrderData) {
  const orderId = generateOrderId()

  await Promise.allSettled([
    saveToDb(data, orderId),
    sendConfirmationWhatsApp(data, orderId),
    sendEmails(data, orderId),
  ])

  return { success: true, orderId }
}

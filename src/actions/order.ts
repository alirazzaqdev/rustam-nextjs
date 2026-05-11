'use server'

export type OrderData = {
  name: string
  email: string
  phone: string
  address: string
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
    const description = [
      `ORDER ID: ${orderId}`,
      `PAYMENT METHOD: ${data.paymentMethod}`,
      `ADDRESS: ${data.address}`,
      `PRODUCTS/PACKAGES: ${data.products}`,
      data.totalAmount ? `ESTIMATED TOTAL: PKR ${data.totalAmount}` : '',
      data.notes ? `NOTES: ${data.notes}` : '',
    ].filter(Boolean).join('\n')

    await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        description,
        status: 'pending',
      },
    })
  } catch (err) {
    console.warn('[order] DB save skipped:', (err as Error).message)
  }
}

async function sendEmails(data: OrderData, orderId: string): Promise<void> {
  try {
    const key = process.env.RESEND_API_KEY
    if (!key) return
    const { Resend } = await import('resend')
    const resend = new Resend(key)
    const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@rustambattery.com'
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ia6969537@gmail.com'

    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Order ${orderId} — ${data.name}`,
      html: `<h2 style="color:#059669">New Order</h2><p><b>ID:</b> ${orderId}</p><p><b>Name:</b> ${data.name}</p><p><b>Phone:</b> ${data.phone}</p><p><b>Address:</b> ${data.address}</p><p><b>Payment:</b> ${data.paymentMethod}</p><pre>${data.products}</pre>${data.totalAmount ? `<p><b>Total:</b> PKR ${data.totalAmount}</p>` : ''}`,
    })

    await resend.emails.send({
      from: EMAIL_FROM,
      to: data.email,
      subject: `Order Received — Ref ${orderId}`,
      html: `<h2 style="color:#059669">Order Received!</h2><p>Hi ${data.name},</p><p>Reference: <b>${orderId}</b>. Our team will call you at <b>${data.phone}</b> within 2 hours.</p><p>Rustam Battery & Solar Energy House — Kahna Nau, Lahore | +92 321 3770402</p>`,
    })
  } catch (err) {
    console.warn('[order] Email skipped:', (err as Error).message)
  }
}

export async function submitOrder(data: OrderData) {
  const orderId = generateOrderId()

  // Best-effort side effects — never block the user
  await Promise.allSettled([
    saveToDb(data, orderId),
    sendEmails(data, orderId),
  ])

  // Always succeeds — WhatsApp redirect guarantees the order reaches us
  return { success: true, orderId }
}

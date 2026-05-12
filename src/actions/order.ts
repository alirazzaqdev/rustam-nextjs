'use server'

export type OrderData = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  projectType: string
  paymentMethod: string
  products: string   // free-text list of products
  totalAmount?: string
  notes?: string
}

function generateOrderId(): string {
  return `RB-${Date.now().toString(36).toUpperCase()}`
}

async function saveToDb(data: OrderData, orderId: string): Promise<void> {
  try {
    const { prisma } = await import('@/lib/prisma')

    // Parse total from string like "50,000" or "PKR 50000" or bare number
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
    // Log but never block the user — WhatsApp is the guaranteed fallback
    console.error('[order] DB save failed:', (err as Error).message)
  }
}

async function sendEmails(data: OrderData, orderId: string): Promise<void> {
  try {
    const key = process.env.RESEND_API_KEY
    if (!key) return
    const { Resend } = await import('resend')
    const resend = new Resend(key)
    const EMAIL_FROM  = process.env.EMAIL_FROM  || 'noreply@rustambattery.com'
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ia6969537@gmail.com'

    await resend.emails.send({
      from: EMAIL_FROM,
      to:   ADMIN_EMAIL,
      subject: `New Order ${orderId} — ${data.name}`,
      html: `<h2 style="color:#D97706">New Order Received</h2>
        <p><b>Order ID:</b> ${orderId}</p>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Address:</b> ${data.address}, ${data.city}</p>
        <p><b>Project Type:</b> ${data.projectType}</p>
        <p><b>Payment:</b> ${data.paymentMethod}</p>
        <p><b>Items:</b><br/><pre>${data.products}</pre></p>
        ${data.totalAmount ? `<p><b>Total:</b> PKR ${data.totalAmount}</p>` : ''}
        ${data.notes ? `<p><b>Notes:</b> ${data.notes}</p>` : ''}`,
    })

    await resend.emails.send({
      from:    EMAIL_FROM,
      to:      data.email,
      subject: `Order Received — Ref ${orderId}`,
      html: `<h2 style="color:#D97706">Order Received!</h2>
        <p>Assalam o Alaikum ${data.name},</p>
        <p>Aapka order receive ho gaya. Reference number: <b>${orderId}</b></p>
        <p>Hamari team aapko <b>${data.phone}</b> pe 2 ghantay ke andar call karegi.</p>
        <br/>
        <p>— Rustam Battery & Solar Energy House<br/>Kahna Nau, Lahore | +92 321 3770402</p>`,
    })
  } catch (err) {
    console.warn('[order] Email skipped:', (err as Error).message)
  }
}

export async function submitOrder(data: OrderData) {
  const orderId = generateOrderId()

  // Run DB save + email in parallel — never block the user
  await Promise.allSettled([
    saveToDb(data, orderId),
    sendEmails(data, orderId),
  ])

  return { success: true, orderId }
}

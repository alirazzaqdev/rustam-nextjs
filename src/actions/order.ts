'use server'

import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@rustambattery.com'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@rustambattery.com'

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

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  try {
    return new Resend(key)
  } catch {
    return null
  }
}

// Best-effort DB save — never blocks success
async function saveToDb(data: OrderData, orderId: string): Promise<void> {
  try {
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
    console.warn('[order] DB save failed (non-fatal):', err)
  }
}

// Best-effort emails — never blocks success
async function sendEmails(data: OrderData, orderId: string): Promise<void> {
  const resend = getResend()
  if (!resend) return

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Order Request ${orderId} — ${data.name}`,
      html: `
        <h2 style="color:#f59e0b">New Order Request</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        <p><strong>Products/Packages:</strong></p>
        <pre style="background:#f8fafc;padding:12px;border-radius:8px">${data.products}</pre>
        ${data.totalAmount ? `<p><strong>Estimated Total:</strong> PKR ${data.totalAmount}</p>` : ''}
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
      `,
    })

    await resend.emails.send({
      from: EMAIL_FROM,
      to: data.email,
      subject: `Order Confirmed — Ref ${orderId}`,
      html: `
        <h2 style="color:#f59e0b">Your order has been received!</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for your order. Reference: <strong>${orderId}</strong></p>
        <p>Our team will contact you at <strong>${data.phone}</strong> within 24 hours.</p>
        <p>Best regards,<br><strong>Rustam Battery & Solar Energy House</strong><br>Kahna Nau, Lahore | +92 300 1234567</p>
      `,
    })
  } catch (err) {
    console.warn('[order] Email send failed (non-fatal):', err)
  }
}

export async function submitOrder(data: OrderData) {
  const orderId = generateOrderId()

  // Run side effects in background — never block the user
  await Promise.allSettled([
    saveToDb(data, orderId),
    sendEmails(data, orderId),
  ])

  // Always success — WhatsApp redirect on the client guarantees the order reaches us
  return { success: true, orderId }
}

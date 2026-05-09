'use server'

import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@rustambattery.com'
const ADMIN_EMAIL = 'admin@rustambattery.com'

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

export async function submitOrder(data: OrderData) {
  try {
    const description = `
PAYMENT METHOD: ${data.paymentMethod}
ADDRESS: ${data.address}
PRODUCTS/PACKAGES: ${data.products}
${data.totalAmount ? `ESTIMATED TOTAL: PKR ${data.totalAmount}` : ''}
${data.notes ? `NOTES: ${data.notes}` : ''}
    `.trim()

    const order = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        description,
        status: 'pending',
      },
    })

    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Order Request #${order.id.slice(-6).toUpperCase()} — ${data.name}`,
      html: `
        <h2 style="color:#f59e0b">New Order Request</h2>
        <p><strong>Order ID:</strong> ${order.id.slice(-6).toUpperCase()}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        <p><strong>Products/Packages:</strong></p>
        <p>${data.products}</p>
        ${data.totalAmount ? `<p><strong>Estimated Total:</strong> PKR ${data.totalAmount}</p>` : ''}
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
      `,
    })

    await resend.emails.send({
      from: EMAIL_FROM,
      to: data.email,
      subject: `Order Confirmed — Ref #${order.id.slice(-6).toUpperCase()}`,
      html: `
        <h2 style="color:#f59e0b">Your order has been received!</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for your order. Here are your details:</p>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #e2e8f0"><strong>Order Reference</strong></td><td style="padding:8px;border:1px solid #e2e8f0">#${order.id.slice(-6).toUpperCase()}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e2e8f0"><strong>Payment Method</strong></td><td style="padding:8px;border:1px solid #e2e8f0">${data.paymentMethod}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e2e8f0"><strong>Products</strong></td><td style="padding:8px;border:1px solid #e2e8f0">${data.products}</td></tr>
        </table>
        <br>
        <p>Our team will contact you at <strong>${data.phone}</strong> within 24 hours to confirm and arrange delivery/installation.</p>
        <p>Best regards,<br><strong>Rustam Battery & Solar Energy House</strong><br>Kahna Nau, Lahore | +92 300 1234567</p>
      `,
    })

    return { success: true, orderId: order.id.slice(-6).toUpperCase() }
  } catch (error) {
    console.error('Order submission failed:', error)
    return { success: false, error: 'Failed to place order. Please try again.' }
  }
}

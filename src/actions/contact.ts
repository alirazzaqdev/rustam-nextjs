'use server'

import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@rustambattery.com'
const ADMIN_EMAIL = 'admin@rustambattery.com'

export async function submitContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    // Save to database
    const contact = await prisma.contactMessage.create({
      data,
    })

    // Send notification email to admin
    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Send confirmation to user
    await resend.emails.send({
      from: EMAIL_FROM,
      to: data.email,
      subject: 'We received your message',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${data.name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Rustam Battery & Solar Energy House</p>
      `,
    })

    return { success: true, data: contact }
  } catch (error) {
    console.error('Failed to submit contact form:', error)
    return { success: false, error: 'Failed to submit form' }
  }
}

export async function submitQuoteRequest(data: {
  name: string
  email: string
  phone: string
  projectType: string
  estimatedBudget?: string | number
  description?: string
}) {
  try {
    const quote = await prisma.quoteRequest.create({
      data,
    })

    // Send notification to admin
    await resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Quote Request: ${data.name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Budget:</strong> ${data.estimatedBudget ? `PKR ${data.estimatedBudget}` : 'Not specified'}</p>
        <p><strong>Description:</strong></p>
        <p>${data.description?.replace(/\n/g, '<br>') || 'N/A'}</p>
      `,
    })

    // Send confirmation to user
    await resend.emails.send({
      from: EMAIL_FROM,
      to: data.email,
      subject: 'Quote Request Received',
      html: `
        <h2>Thank you for your quote request!</h2>
        <p>Hi ${data.name},</p>
        <p>We've received your quote request and our team will review it shortly.</p>
        <p>We'll contact you at ${data.phone} or ${data.email} with a detailed quote.</p>
        <p>Best regards,<br>Rustam Battery & Solar Energy House</p>
      `,
    })

    return { success: true, data: quote }
  } catch (error) {
    console.error('Failed to submit quote request:', error)
    return { success: false, error: 'Failed to submit quote request' }
  }
}

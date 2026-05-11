'use server'

export async function submitContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  // Best-effort DB save — never blocks success
  try {
    const { prisma } = await import('@/lib/prisma')
    await prisma.contactMessage.create({ data })
  } catch (err) {
    console.warn('[contact] DB save skipped:', (err as Error).message)
  }

  // Best-effort email — never blocks success
  try {
    const key = process.env.RESEND_API_KEY
    if (key) {
      const { Resend } = await import('resend')
      const resend = new Resend(key)
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@rustambattery.com',
        to: 'ia6969537@gmail.com',
        subject: `New Contact: ${data.subject}`,
        html: `<h2>New Contact Message</h2><p><b>Name:</b> ${data.name}</p><p><b>Email:</b> ${data.email}</p><p><b>Subject:</b> ${data.subject}</p><p><b>Message:</b><br>${data.message.replace(/\n/g, '<br>')}</p>`,
      })
    }
  } catch (err) {
    console.warn('[contact] Email skipped:', (err as Error).message)
  }

  return { success: true as const, error: undefined }
}

export async function submitQuoteRequest(data: {
  name: string
  email: string
  phone: string
  projectType: string
  estimatedBudget?: string | number
  description?: string
}) {
  // Best-effort DB save
  try {
    const { prisma } = await import('@/lib/prisma')
    await prisma.quoteRequest.create({ data })
  } catch (err) {
    console.warn('[quote] DB save skipped:', (err as Error).message)
  }

  // Best-effort email
  try {
    const key = process.env.RESEND_API_KEY
    if (key) {
      const { Resend } = await import('resend')
      const resend = new Resend(key)
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@rustambattery.com',
        to: 'ia6969537@gmail.com',
        subject: `New Quote Request: ${data.name}`,
        html: `<h2>New Quote Request</h2><p><b>Name:</b> ${data.name}</p><p><b>Phone:</b> ${data.phone}</p><p><b>Email:</b> ${data.email}</p><p><b>Project:</b> ${data.projectType}</p><p><b>Budget:</b> ${data.estimatedBudget ? `PKR ${data.estimatedBudget}` : 'Not specified'}</p><p><b>Description:</b><br>${(data.description || 'N/A').replace(/\n/g, '<br>')}</p>`,
      })
    }
  } catch (err) {
    console.warn('[quote] Email skipped:', (err as Error).message)
  }

  return { success: true as const, error: undefined }
}

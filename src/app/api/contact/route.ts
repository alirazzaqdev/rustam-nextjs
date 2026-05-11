import { NextRequest, NextResponse } from 'next/server'

const messages: Record<string, unknown>[] = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    const message = {
      id: `MSG-${Date.now()}`,
      name: body.name || '',
      email: body.email || '',
      subject: body.subject || 'General Inquiry',
      message: body.message || '',
      createdAt: new Date().toISOString(),
    }

    messages.push(message)
    console.log('New Message:', JSON.stringify(message, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Message received. We will respond within 24 hours.',
    })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please WhatsApp us.' },
      { status: 500 }
    )
  }
}

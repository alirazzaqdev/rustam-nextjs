import { NextRequest, NextResponse } from 'next/server'

const quotes: Record<string, unknown>[] = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const quote = {
      id: `QT-${Date.now()}`,
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      projectType: body.projectType || '',
      budget: body.budget || '',
      description: body.description || '',
      createdAt: new Date().toISOString(),
    }

    quotes.push(quote)
    console.log('New Quote Request:', JSON.stringify(quote, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Quote request received. We will contact you within 24 hours.',
    })
  } catch (error) {
    console.error('Quote API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit quote. Please WhatsApp us.' },
      { status: 500 }
    )
  }
}

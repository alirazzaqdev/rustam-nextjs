import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Market fallbacks if DB has no priced products yet
const DEFAULTS = {
  batteryPrice:  24_000,  // PKR per 150Ah tubular battery
  panelPrice:    18_500,  // PKR per 580W panel
}

export async function GET() {
  try {
    const [batteries, panels] = await Promise.all([
      prisma.product.aggregate({
        where: { category: 'Battery', inStock: true, price: { gt: 1000 } },
        _avg: { price: true },
        _min: { price: true },
      }),
      prisma.product.aggregate({
        where: { category: 'Solar Panel', inStock: true, price: { gt: 1000 } },
        _avg: { price: true },
        _min: { price: true },
      }),
    ])

    const batteryPrice = batteries._avg.price
      ? Math.round(batteries._avg.price)
      : DEFAULTS.batteryPrice

    const panelPrice = panels._avg.price
      ? Math.round(panels._avg.price)
      : DEFAULTS.panelPrice

    return NextResponse.json({
      batteryPrice,
      panelPrice,
      source: (batteries._avg.price || panels._avg.price) ? 'live' : 'market',
      updatedAt: new Date().toISOString(),
    }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } })

  } catch {
    return NextResponse.json({
      batteryPrice: DEFAULTS.batteryPrice,
      panelPrice:   DEFAULTS.panelPrice,
      source: 'market',
      updatedAt: new Date().toISOString(),
    })
  }
}

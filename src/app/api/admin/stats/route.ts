import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export async function GET() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const now        = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const yearAgo    = new Date(now.getFullYear() - 1, now.getMonth(), 1)

  const ACTIVE = { in: ['confirmed', 'processing', 'shipped', 'delivered'] }

  const [
    totalOrders, pendingOrders, confirmedOrders, cancelledOrders,
    thisMonthOrders, revenueAll, revenueConfirmed, revenueThisMonth,
    recentPending, allMonthly,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { orderStatus: 'pending' } }),
    prisma.order.count({ where: { orderStatus: { in: ['confirmed', 'delivered'] } } }),
    prisma.order.count({ where: { orderStatus: 'cancelled' } }),
    prisma.order.count({ where: { createdAt: { gte: monthStart } } }),
    // All non-cancelled orders total
    prisma.order.aggregate({
      where: { orderStatus: { not: 'cancelled' } },
      _sum: { total: true },
    }),
    // Confirmed/active orders revenue
    prisma.order.aggregate({
      where: { orderStatus: ACTIVE },
      _sum: { total: true },
    }),
    // This month all orders
    prisma.order.aggregate({
      where: { createdAt: { gte: monthStart }, orderStatus: { not: 'cancelled' } },
      _sum: { total: true },
    }),
    prisma.order.findMany({
      where: { orderStatus: 'pending' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.order.findMany({
      where: { createdAt: { gte: yearAgo }, orderStatus: { not: 'cancelled' } },
      select: { createdAt: true, total: true, orderStatus: true },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  // Build last 12 months map
  const monthMap: Record<string, { label: string; orders: number; revenue: number }> = {}
  for (let i = 11; i >= 0; i--) {
    const d     = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key   = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleString('en', { month: 'short' }) + " '" + d.getFullYear().toString().slice(2)
    monthMap[key] = { label, orders: 0, revenue: 0 }
  }

  for (const o of allMonthly) {
    const key = `${o.createdAt.getFullYear()}-${String(o.createdAt.getMonth() + 1).padStart(2, '0')}`
    if (monthMap[key]) {
      monthMap[key].orders++
      monthMap[key].revenue += o.total
    }
  }

  const monthly = Object.entries(monthMap).map(([key, v]) => ({ key, ...v }))

  return NextResponse.json({
    counts: {
      total:     totalOrders,
      pending:   pendingOrders,
      confirmed: confirmedOrders,
      cancelled: cancelledOrders,
      thisMonth: thisMonthOrders,
    },
    revenue: {
      total:     revenueAll._sum.total       || 0,
      confirmed: revenueConfirmed._sum.total || 0,
      thisMonth: revenueThisMonth._sum.total || 0,
    },
    monthly,
    recentPending,
  })
}

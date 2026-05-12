import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export async function GET() {
  const ok = await getAdminSession()
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const now       = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const yearAgo    = new Date(now.getFullYear() - 1, now.getMonth(), 1)

  const [
    totalOrders, pendingOrders, confirmedOrders, cancelledOrders,
    thisMonthOrders, revenueAll, revenuePaid, revenueThisMonth,
    recentPending, allMonthly,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { orderStatus: 'pending' } }),
    prisma.order.count({ where: { orderStatus: 'confirmed' } }),
    prisma.order.count({ where: { orderStatus: 'cancelled' } }),
    prisma.order.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.aggregate({ where: { paymentStatus: 'paid' }, _sum: { total: true } }),
    prisma.order.aggregate({ where: { createdAt: { gte: monthStart } }, _sum: { total: true } }),
    prisma.order.findMany({
      where: { orderStatus: 'pending' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.order.findMany({
      where: { createdAt: { gte: yearAgo } },
      select: { createdAt: true, total: true, orderStatus: true },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  // Aggregate last 12 months
  const monthMap: Record<string, { orders: number; revenue: number }> = {}
  for (let i = 11; i >= 0; i--) {
    const d   = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleString('en', { month: 'short' }) + ' ' + d.getFullYear().toString().slice(2)
    monthMap[key] = { orders: 0, revenue: 0 }
    ;(monthMap as Record<string, { orders: number; revenue: number; label: string }>)[key].label = label
  }

  for (const o of allMonthly) {
    const key = `${o.createdAt.getFullYear()}-${String(o.createdAt.getMonth() + 1).padStart(2, '0')}`
    if (monthMap[key]) {
      monthMap[key].orders++
      monthMap[key].revenue += o.total
    }
  }

  const monthly = Object.entries(monthMap).map(([key, v]) => ({
    key,
    label: (v as { orders: number; revenue: number; label?: string }).label || key,
    orders: v.orders,
    revenue: v.revenue,
  }))

  return NextResponse.json({
    counts: {
      total:     totalOrders,
      pending:   pendingOrders,
      confirmed: confirmedOrders,
      cancelled: cancelledOrders,
      thisMonth: thisMonthOrders,
    },
    revenue: {
      total:     revenueAll._sum.total     || 0,
      paid:      revenuePaid._sum.total    || 0,
      thisMonth: revenueThisMonth._sum.total || 0,
    },
    monthly,
    recentPending,
  })
}

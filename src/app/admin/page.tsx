'use client'

import { useEffect, useState, useCallback } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import {
  ShoppingBag, Clock, CheckCircle2, XCircle,
  TrendingUp, RefreshCw, MessageSquare, X, Send, Smartphone,
  Phone, MapPin, CreditCard, ShoppingCart, PackageCheck,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  phone: string
  email: string
  city: string
  items: unknown
  total: number
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  notes?: string
  createdAt: string
}

interface Stats {
  counts: { total: number; pending: number; confirmed: number; cancelled: number; thisMonth: number }
  revenue: { total: number; confirmed: number; thisMonth: number }
  monthly: { key: string; label: string; orders: number; revenue: number }[]
  recentPending: Order[]
}

function formatPKR(n: number) {
  if (n >= 1000000) return `PKR ${(n / 1000000).toFixed(1)}M`
  if (n >= 1000)    return `PKR ${(n / 1000).toFixed(0)}K`
  return `PKR ${n.toLocaleString()}`
}

// Bar chart — uses ORDER COUNT for bar height so chart is never flat
// Revenue shown in tooltip. When revenue > 0, amber tint on bars.
function BarChart({ data }: { data: { label: string; revenue: number; orders: number }[] }) {
  const maxOrders  = Math.max(...data.map(d => d.orders), 1)
  const hasRevenue = data.some(d => d.revenue > 0)
  return (
    <div className="flex items-end gap-1 h-40 w-full">
      {data.map((d, i) => {
        const h      = Math.round((d.orders / maxOrders) * 100)
        const isLast = i === data.length - 1
        const active = d.orders > 0
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] rounded-lg px-2 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
              <p className="font-bold">{d.label}</p>
              <p>{d.orders} order{d.orders !== 1 ? 's' : ''}</p>
              {hasRevenue && <p>{formatPKR(d.revenue)}</p>}
            </div>
            <div
              className={`w-full rounded-t-sm transition-all duration-500 ${
                isLast && active ? 'bg-amber-500' :
                active           ? 'bg-amber-400 group-hover:bg-amber-500' :
                                   'bg-slate-100'
              }`}
              style={{ height: `${Math.max(h, active ? 8 : 2)}%` }}
            />
            <span className="text-[9px] text-gray-400 rotate-45 origin-left translate-x-1 whitespace-nowrap">
              {d.label.slice(0, 3)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending:    'bg-amber-50 text-amber-700 border-amber-200',
    confirmed:  'bg-green-50 text-green-700 border-green-200',
    processing: 'bg-blue-50 text-blue-700 border-blue-200',
    shipped:    'bg-cyan-50 text-cyan-700 border-cyan-200',
    delivered:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled:  'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${map[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  )
}

export default function AdminDashboard() {
  const [stats, setStats]         = useState<Stats | null>(null)
  const [loading, setLoading]     = useState(true)
  const [apiError, setApiError]   = useState<string | null>(null)

  // Approve modal — admin sets the final price before confirming
  const [approveModal, setApproveModal]   = useState<Order | null>(null)
  const [approvePrice, setApprovePrice]   = useState('')

  // Reject modal
  const [rejectModal, setRejectModal]     = useState<Order | null>(null)
  const [rejectReason, setRejectReason]   = useState('')

  const [acting, setActing]   = useState<string | null>(null)
  const [toast, setToast]     = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setApiError(null)
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        setStats(await res.json())
      } else {
        const err = await res.json().catch(() => ({}))
        setApiError(`Error ${res.status}: ${err.error || res.statusText}${err.detail ? ` — ${err.detail}` : ''}`)
      }
    } catch (e) {
      setApiError(`Network error: ${e instanceof Error ? e.message : String(e)}`)
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  function openApprove(order: Order) {
    setApprovePrice(order.total > 0 ? String(order.total) : '')
    setApproveModal(order)
  }

  async function confirmApprove() {
    if (!approveModal) return
    setActing(approveModal.id)
    const price = Number(approvePrice) || 0
    await fetch(`/api/orders/${approveModal.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        orderStatus: 'confirmed',
        ...(price > 0 && { total: price, subtotal: price }),
      }),
    })
    setApproveModal(null)
    setApprovePrice('')
    setActing(null)
    showToast(`Order confirmed — WhatsApp sent to ${approveModal.customerName} ✓`)
    load()
  }

  async function reject(order: Order) {
    if (!rejectReason.trim()) return
    setActing(order.id)
    await fetch(`/api/orders/${order.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ orderStatus: 'cancelled', rejectionReason: rejectReason }),
    })
    setRejectModal(null)
    setRejectReason('')
    setActing(null)
    showToast(`Order rejected — WhatsApp sent to ${order.customerName} ✓`)
    load()
  }

  const s = stats

  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={load}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* API error banner */}
        {apiError && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <XCircle size={16} className="shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Dashboard could not load</p>
              <p className="text-red-600 text-xs mt-0.5 font-mono">{apiError}</p>
            </div>
            <button onClick={load} className="text-xs underline whitespace-nowrap">Retry</button>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Total Orders',
              value: s?.counts.total ?? '—',
              sub:   `${s?.counts.thisMonth ?? 0} this month`,
              icon:  ShoppingBag,
              iconBg: 'bg-emerald-600',
              highlight: false,
            },
            {
              label:     'Pending',
              value:     s?.counts.pending ?? '—',
              sub:       'Waiting for approval',
              icon:      Clock,
              iconBg:    'bg-amber-500',
              highlight: (s?.counts.pending ?? 0) > 0,
            },
            {
              label:  'Confirmed',
              value:  s?.counts.confirmed ?? '—',
              sub:    `${s?.counts.cancelled ?? 0} cancelled`,
              icon:   PackageCheck,
              iconBg: 'bg-emerald-500',
              highlight: false,
            },
            {
              label:  'Revenue',
              value:  s ? formatPKR(s.revenue.confirmed) : '—',
              sub:    `${s ? formatPKR(s.revenue.thisMonth) : '—'} this month`,
              icon:   TrendingUp,
              iconBg: 'bg-amber-600',
              highlight: false,
            },
          ].map(({ label, value, sub, icon: Icon, iconBg, highlight }) => (
            <div
              key={label}
              className={`bg-white rounded-2xl p-5 border shadow-sm transition-all ${highlight ? 'border-amber-300 ring-1 ring-amber-200' : 'border-gray-100'}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
                <Icon size={20} strokeWidth={2} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-slate-900 tabular-nums">{loading ? '…' : value}</p>
              <p className="text-sm font-medium text-slate-600 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Chart + breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Monthly Chart — bars = order count */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-slate-900">Monthly Orders</h2>
                <p className="text-xs text-gray-400 mt-0.5">Last 12 months · hover for revenue</p>
              </div>
              {s && (
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-600">{formatPKR(s.revenue.total)}</p>
                  <p className="text-xs text-gray-400">All-time revenue</p>
                </div>
              )}
            </div>
            {loading ? (
              <div className="h-40 flex items-center justify-center text-gray-300 text-sm">Loading chart…</div>
            ) : s?.monthly.some(m => m.orders > 0) ? (
              <BarChart data={s.monthly} />
            ) : (
              <div className="h-40 flex items-center justify-center text-gray-300 text-sm">
                No orders yet — chart will fill as orders come in
              </div>
            )}
          </div>

          {/* Order Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-bold text-slate-900">Order Breakdown</h2>
            {s && [
              { label: 'Pending',   val: s.counts.pending,   bar: s.counts.total, color: 'bg-amber-400' },
              { label: 'Confirmed', val: s.counts.confirmed, bar: s.counts.total, color: 'bg-green-400' },
              { label: 'Cancelled', val: s.counts.cancelled, bar: s.counts.total, color: 'bg-red-300' },
            ].map(({ label, val, bar, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-bold text-slate-900">{val}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-500`}
                    style={{ width: bar > 0 ? `${Math.round((val / bar) * 100)}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
            {!s && <p className="text-gray-400 text-sm">Loading…</p>}
          </div>
        </div>

        {/* Pending orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900">Pending Orders</h2>
              {(s?.counts.pending ?? 0) > 0 && (
                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {s?.counts.pending}
                </span>
              )}
            </div>
            <a href="/admin/orders" className="text-sm text-amber-600 hover:text-amber-700 font-medium">View all →</a>
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-400 text-sm">Loading…</div>
          ) : !s?.recentPending.length ? (
            <div className="py-10 text-center">
              <CheckCircle2 size={32} className="mx-auto text-green-200 mb-2" />
              <p className="text-gray-400 text-sm">No pending orders — all clear!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {s.recentPending.map(order => {
                const itemList = Array.isArray(order.items)
                  ? (order.items as { name?: string }[]).map(i => i.name || '').filter(Boolean).join(', ')
                  : ''
                return (
                  <div key={order.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">{order.orderNumber}</span>
                          <StatusBadge status={order.orderStatus} />
                          <span className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium mt-1">{order.customerName}</p>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Phone size={10} className="text-gray-400" /> {order.phone}</span>
                          <span className="flex items-center gap-1"><MapPin size={10} className="text-gray-400" /> {order.city}</span>
                          {order.paymentMethod && <span className="flex items-center gap-1"><CreditCard size={10} className="text-gray-400" /> {order.paymentMethod}</span>}
                        </div>
                        {itemList && <p className="text-xs text-gray-400 mt-1 truncate flex items-center gap-1"><ShoppingCart size={10} className="text-gray-400 shrink-0" /> {itemList}</p>}
                        {order.notes && (
                          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            <MessageSquare size={10} /> {order.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className={`font-bold text-sm ${order.total > 0 ? 'text-slate-900' : 'text-amber-500'}`}>
                          {order.total > 0 ? `PKR ${order.total.toLocaleString()}` : 'Price not set'}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setRejectModal(order); setRejectReason('') }}
                            disabled={acting === order.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                          >
                            <XCircle size={13} /> Reject
                          </button>
                          <button
                            onClick={() => openApprove(order)}
                            disabled={acting === order.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500 hover:bg-green-600 text-white transition-colors disabled:opacity-40"
                          >
                            {acting === order.id
                              ? <RefreshCw size={13} className="animate-spin" />
                              : <CheckCircle2 size={13} />}
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Approve Modal ── */}
      {approveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Approve Order</h3>
              <button onClick={() => setApproveModal(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-sm">
              <p className="font-semibold text-slate-900">{approveModal.orderNumber} — {approveModal.customerName}</p>
              <p className="text-gray-500 text-xs mt-0.5">{approveModal.phone} · {approveModal.city}</p>
              {Array.isArray(approveModal.items) && (
                <p className="text-gray-500 text-xs mt-0.5">
                  {(approveModal.items as { name?: string }[]).map(i => i.name || '').filter(Boolean).join(', ')}
                </p>
              )}
            </div>

            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Final Price (PKR) — this amount will be sent to the customer via WhatsApp
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">PKR</span>
              <input
                type="number"
                min={0}
                autoFocus
                value={approvePrice}
                onChange={e => setApprovePrice(e.target.value)}
                placeholder="e.g. 25000"
                className="w-full pl-12 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
              />
            </div>
            {!approvePrice && (
              <p className="text-xs text-amber-600 mt-1.5">⚠ Without a price, revenue will be recorded as PKR 0</p>
            )}

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setApproveModal(null)}
                className="flex-1 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                disabled={acting === approveModal.id}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {acting === approveModal.id
                  ? <RefreshCw size={14} className="animate-spin" />
                  : <Send size={14} />}
                Approve & WhatsApp Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reject Modal ── */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Reject Order?</h3>
              <button onClick={() => setRejectModal(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-sm">
              <p className="font-semibold text-slate-900">{rejectModal.orderNumber} — {rejectModal.customerName}</p>
              <p className="text-gray-500">{rejectModal.phone}</p>
            </div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Reason for rejection (will be sent to customer via WhatsApp):
            </label>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="e.g. Item is currently out of stock. Please try again later..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 resize-none"
            />
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setRejectModal(null)}
                className="flex-1 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => reject(rejectModal)}
                disabled={!rejectReason.trim() || acting === rejectModal.id}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                <Send size={14} />
                Reject & WhatsApp Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl">
          <Smartphone size={15} className="text-green-400 shrink-0" />
          {toast}
        </div>
      )}
    </AdminShell>
  )
}

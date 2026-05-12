'use client'

import { useEffect, useState, useCallback } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import {
  RefreshCw, CheckCircle2, XCircle, Send, X,
  MessageSquare, Search, Smartphone,
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  phone: string
  whatsapp?: string
  email: string
  city: string
  address: string
  items: unknown
  total: number
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  notes?: string
  createdAt: string
}

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_STYLE: Record<string, string> = {
  pending:    'bg-amber-50 text-amber-700 border-amber-200',
  confirmed:  'bg-green-50 text-green-700 border-green-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  shipped:    'bg-cyan-50 text-cyan-700 border-cyan-200',
  delivered:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled:  'bg-red-50 text-red-700 border-red-200',
}

const PAY_STYLE: Record<string, string> = {
  pending:              'bg-yellow-50 text-yellow-700',
  paid:                 'bg-green-50 text-green-700',
  failed:               'bg-red-50 text-red-600',
  pending_verification: 'bg-blue-50 text-blue-700',
}

function whatsappUrl(phone: string, message: string) {
  let num = phone.replace(/\D/g, '')
  if (num.startsWith('0')) num = '92' + num.slice(1)
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`
}

export default function AdminOrdersPage() {
  const [orders, setOrders]   = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('')
  const [search, setSearch]   = useState('')
  const [acting, setActing]   = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<Order | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [toast, setToast]       = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const url = filter ? `/api/orders?status=${filter}` : '/api/orders'
    const res = await fetch(url)
    if (res.ok) setOrders(await res.json())
    setLoading(false)
  }, [filter])

  useEffect(() => { load() }, [load])

  const filtered = orders.filter(o =>
    !search ||
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName.toLowerCase().includes(search.toLowerCase()) ||
    o.phone.includes(search)
  )

  async function updateStatus(id: string, orderStatus: string) {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus }),
    })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, orderStatus } : o))
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  async function approve(order: Order) {
    setActing(order.id)
    await fetch(`/api/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus: 'confirmed' }),
    })
    setActing(null)
    showToast(`WhatsApp sent to ${order.customerName} ✓`)
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, orderStatus: 'confirmed' } : o))
  }

  async function reject(order: Order) {
    if (!rejectReason.trim()) return
    setActing(order.id)
    await fetch(`/api/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus: 'cancelled', rejectionReason: rejectReason }),
    })
    setRejectModal(null)
    setRejectReason('')
    setActing(null)
    showToast(`Order rejected — WhatsApp sent to ${order.customerName} ✓`)
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, orderStatus: 'cancelled' } : o))
  }

  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
            <p className="text-sm text-gray-400 mt-0.5">{orders.length} total orders</p>
          </div>
          <button onClick={load} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin text-amber-600' : 'text-gray-500'} />
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order #, name, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {['', ...ORDER_STATUSES].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  filter === s
                    ? 'bg-slate-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s || 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-3">
          {loading && <div className="py-10 text-center text-gray-400 text-sm">Loading orders…</div>}
          {!loading && filtered.length === 0 && (
            <div className="py-10 text-center text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
              No orders found
            </div>
          )}
          {filtered.map(order => {
            const itemList = Array.isArray(order.items)
              ? (order.items as { name?: string; price?: number }[]).map(i => `${i.name || ''} — PKR ${(i.price || 0).toLocaleString()}`).filter(Boolean).join('; ')
              : ''
            const isExpanded = expanded === order.id
            const isPending  = order.orderStatus === 'pending'

            return (
              <div
                key={order.id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${isPending ? 'border-amber-200' : 'border-gray-100'}`}
              >
                {/* Main row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50"
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                >
                  {/* Order info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{order.orderNumber}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLE[order.orderStatus] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {order.orderStatus}
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${PAY_STYLE[order.paymentStatus] || 'bg-gray-50 text-gray-600'}`}>
                        {order.paymentStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{order.customerName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {order.phone} · {order.city} · {order.paymentMethod} · {new Date(order.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Total + actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="font-bold text-slate-900">PKR {order.total.toLocaleString()}</p>
                    {isPending && (
                      <div className="flex gap-2">
                        <button
                          onClick={e => { e.stopPropagation(); setRejectModal(order); setRejectReason('') }}
                          disabled={acting === order.id}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                        >
                          <XCircle size={13} /> Reject
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); approve(order) }}
                          disabled={acting === order.id}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-green-500 hover:bg-green-600 text-white transition-colors disabled:opacity-40"
                        >
                          {acting === order.id
                            ? <RefreshCw size={13} className="animate-spin" />
                            : <CheckCircle2 size={13} />}
                          Approve
                        </button>
                      </div>
                    )}
                    {!isPending && (
                      <select
                        value={order.orderStatus}
                        onClick={e => e.stopPropagation()}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-amber-200"
                      >
                        {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-gray-100 bg-slate-50">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Email</p>
                        <p className="font-medium text-slate-800">{order.email || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Address</p>
                        <p className="font-medium text-slate-800">{order.address || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Notes</p>
                        <p className="font-medium text-slate-800">{order.notes || '—'}</p>
                      </div>
                    </div>
                    {itemList && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-400 mb-1">Items</p>
                        <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-gray-100">{itemList}</p>
                      </div>
                    )}
                    <div className="flex gap-3 mt-4">
                      <a
                        href={whatsappUrl(order.phone, `Assalam o Alaikum ${order.customerName}! Aapke order #${order.orderNumber} ke baare mein kuch poochna tha.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        <MessageSquare size={13} /> WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <Smartphone size={15} className="text-green-400 shrink-0" />
          {toast}
        </div>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Order Reject karna?</h3>
              <button onClick={() => setRejectModal(null)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <p className="font-semibold text-slate-900 text-sm">{rejectModal.orderNumber} — {rejectModal.customerName}</p>
              <p className="text-gray-500 text-xs mt-0.5">PKR {rejectModal.total.toLocaleString()} · {rejectModal.phone}</p>
            </div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Rejection ki wajah (customer ko WhatsApp pe jaayegi):
            </label>
            <textarea
              rows={3}
              autoFocus
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="e.g. Is waqt stock available nahi hai, baad mein dobara try karein..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 resize-none"
            />
            <div className="flex gap-3 mt-4">
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
                {acting === rejectModal.id
                  ? <RefreshCw size={14} className="animate-spin" />
                  : <Send size={14} />}
                Reject & Send WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}

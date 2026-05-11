'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { MessageSquare, FileText, RefreshCw } from 'lucide-react'

interface ContactMsg {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

interface QuoteReq {
  id: string
  name: string
  email: string
  phone: string
  projectType: string
  estimatedBudget?: number
  description?: string
  status: string
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMsg[]>([])
  const [quotes, setQuotes] = useState<QuoteReq[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'messages' | 'quotes'>('messages')

  async function load() {
    setLoading(true)
    const res = await fetch('/api/messages')
    if (res.ok) {
      const data = await res.json()
      setMessages(data.messages)
      setQuotes(data.quotes)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <button onClick={load} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin text-emerald-600' : 'text-gray-500'} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTab('messages')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === 'messages' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <MessageSquare size={16} />
            Contact Messages
            {messages.length > 0 && (
              <span className="bg-emerald-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{messages.length}</span>
            )}
          </button>
          <button
            onClick={() => setTab('quotes')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === 'quotes' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <FileText size={16} />
            Quote Requests
            {quotes.length > 0 && (
              <span className="bg-emerald-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{quotes.length}</span>
            )}
          </button>
        </div>

        {loading && <p className="text-gray-400 text-sm">Loading...</p>}

        {/* Contact Messages */}
        {!loading && tab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 && <p className="text-gray-400 text-sm">No messages yet.</p>}
            {messages.map(msg => (
              <div key={msg.id} className={`bg-white rounded-2xl border p-5 shadow-sm ${!msg.read ? 'border-emerald-300' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="font-semibold text-gray-900">{msg.name}</span>
                    <span className="text-gray-500 text-sm ml-2">— {msg.email}</span>
                    {!msg.read && <span className="ml-2 text-xs bg-emerald-100 text-amber-700 px-2 py-0.5 rounded-full">New</span>}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">{msg.subject}</p>
                <p className="text-sm text-gray-600">{msg.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Quote Requests */}
        {!loading && tab === 'quotes' && (
          <div className="space-y-4">
            {quotes.length === 0 && <p className="text-gray-400 text-sm">No quote requests yet.</p>}
            {quotes.map(q => (
              <div key={q.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="font-semibold text-gray-900">{q.name}</span>
                    <span className="text-gray-500 text-sm ml-2">— {q.email}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusChip status={q.status} />
                    <span className="text-xs text-gray-400">
                      {new Date(q.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                  <div><p className="text-xs text-gray-400">Phone</p><p>{q.phone}</p></div>
                  <div><p className="text-xs text-gray-400">Project Type</p><p className="capitalize">{q.projectType}</p></div>
                  {q.estimatedBudget && <div><p className="text-xs text-gray-400">Budget</p><p>PKR {q.estimatedBudget.toLocaleString()}</p></div>}
                </div>
                {q.description && <p className="text-sm text-gray-600 mt-3 border-t border-gray-100 pt-3">{q.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}

function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    quoted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

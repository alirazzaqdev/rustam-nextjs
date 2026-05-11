'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'
import { OrderForm } from '@/components/forms/OrderForm'
import { products } from '@/data/products'

function OrderPageContent() {
  const searchParams = useSearchParams()
  const prefilledName = searchParams.get('product')
  const prefilledPrice = searchParams.get('price')
  const prefilledProduct = prefilledName
    ? `${decodeURIComponent(prefilledName)}${prefilledPrice && Number(prefilledPrice) > 0 ? ` — PKR ${Number(prefilledPrice).toLocaleString('en-PK')}` : ''}`
    : undefined

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-2xl mb-3 shadow-lg shadow-emerald-300">
            <Zap size={26} className="text-white" fill="white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">Place Your Order</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Fill in your details — we will confirm your order via WhatsApp within 2 hours
          </p>
        </div>

        <OrderForm products={products} prefilledProduct={prefilledProduct} />
      </div>
    </main>
  )
}

function OrderPageSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-5 w-24 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-300 rounded-2xl mx-auto mb-3 animate-pulse" />
          <div className="h-8 w-64 bg-slate-200 rounded mx-auto mb-2 animate-pulse" />
          <div className="h-4 w-80 bg-slate-100 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 h-48 animate-pulse" />
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 h-72 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<OrderPageSkeleton />}>
      <OrderPageContent />
    </Suspense>
  )
}

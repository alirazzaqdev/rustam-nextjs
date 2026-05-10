'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'
import { OrderForm } from '@/components/forms/OrderForm'
import type { Product } from '@/types'

// Hardcoded fallback so the page renders instantly even if DB is slow/unreachable.
// Same shape as Prisma Product — fields not used by OrderForm are stubbed.
const FALLBACK_PRODUCTS: Product[] = [
  { id: 'p1', slug: 'longi-550w', name: 'LONGI 550W Mono Solar Panel', description: '', category: 'solar-panels', price: 28000, image: '', specs: {}, featured: true, inStock: true },
  { id: 'p2', slug: 'jinko-580w', name: 'JINKO 580W N-Type Panel', description: '', category: 'solar-panels', price: 32000, image: '', specs: {}, featured: false, inStock: true },
  { id: 'p3', slug: 'inverex-5kw', name: 'Inverex 5kW Hybrid Inverter', description: '', category: 'inverters', price: 185000, image: '', specs: {}, featured: true, inStock: true },
  { id: 'p4', slug: 'fronus-3kw', name: 'Fronus 3kW Solar Inverter', description: '', category: 'inverters', price: 92000, image: '', specs: {}, featured: false, inStock: true },
  { id: 'p5', slug: 'pylontech-48v', name: 'Pylontech 48V 100Ah Lithium', description: '', category: 'batteries', price: 245000, image: '', specs: {}, featured: true, inStock: true },
  { id: 'p6', slug: 'phoenix-lead-acid', name: 'Phoenix 200Ah Tubular Battery', description: '', category: 'batteries', price: 48000, image: '', specs: {}, featured: false, inStock: true },
  { id: 'p7', slug: 'mounting-kit', name: 'Roof Mounting Kit (Per kW)', description: '', category: 'accessories', price: 8500, image: '', specs: {}, featured: false, inStock: true },
  { id: 'p8', slug: 'mc4-cables', name: 'MC4 Cable Set + DC Breakers', description: '', category: 'accessories', price: 5500, image: '', specs: {}, featured: false, inStock: true },
]

function OrderPageContent() {
  const searchParams = useSearchParams()
  const prefilledProduct = searchParams.get('product')
    ? decodeURIComponent(searchParams.get('product') as string)
    : undefined

  // Lazy-load DB products in the background — fall back to hardcoded list if it doesn't return quickly
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS)

  useEffect(() => {
    let cancelled = false
    fetch('/api/products', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setProducts(data)
        }
      })
      .catch(() => { /* keep fallback */ })
    return () => { cancelled = true }
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-3 shadow-lg shadow-amber-200">
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
          <div className="w-14 h-14 bg-amber-200 rounded-2xl mx-auto mb-3 animate-pulse" />
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

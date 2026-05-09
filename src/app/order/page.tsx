import { OrderForm } from '@/components/forms/OrderForm'
import { getProducts } from '@/actions/products'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Place Order — Rustam Battery & Solar',
  description: 'Order solar panels, batteries, and inverters from Rustam Battery. Flexible payment options available.',
}

interface OrderPageProps {
  searchParams: Promise<{ product?: string }>
}

export default async function OrderPage({ searchParams }: OrderPageProps) {
  const products = await getProducts()
  const params = await searchParams
  const prefilledProduct = params.product ? decodeURIComponent(params.product) : undefined

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <span className="text-3xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Place Your Order</h1>
          <p className="text-slate-600">
            Fill in your details and our team will confirm your order within 24 hours
          </p>
        </div>

        <OrderForm products={products} prefilledProduct={prefilledProduct} />

        {/* Trust badges */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl mb-1">🔒</p>
            <p className="text-xs text-slate-600 font-medium">Secure Order</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl mb-1">⭐</p>
            <p className="text-xs text-slate-600 font-medium">19 Years Experience</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-2xl mb-1">📞</p>
            <p className="text-xs text-slate-600 font-medium">24/7 Support</p>
          </div>
        </div>
      </div>
    </main>
  )
}

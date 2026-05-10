'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, ShoppingCart, Zap, CheckCircle, Tag, Shield } from 'lucide-react'
import type { Product } from '@/types'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

const categoryLabels: Record<string, string> = {
  'solar-panels': 'Solar Panel',
  batteries: 'Battery',
  inverters: 'Inverter',
  accessories: 'Accessory',
}

const categoryColors: Record<string, string> = {
  'solar-panels': 'bg-amber-100 text-amber-700',
  batteries: 'bg-green-100 text-green-700',
  inverters: 'bg-blue-100 text-blue-700',
  accessories: 'bg-violet-100 text-violet-700',
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (product) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  const categoryLabel = categoryLabels[product.category] || product.category
  const categoryColor = categoryColors[product.category] || 'bg-slate-100 text-slate-700'
  const specs = product.specs as Record<string, string>

  const handleOrder = () => {
    const productLine = `${product.name} — PKR ${product.price.toLocaleString()}`
    router.push(`/order?product=${encodeURIComponent(productLine)}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
            {categoryLabel}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product image / placeholder */}
          <div className="w-full h-52 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
            {product.image && !product.image.startsWith('/images/') ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <Zap size={56} className="text-amber-300 mb-2" />
                <p className="text-sm font-medium capitalize">{product.category.replace('-', ' ')}</p>
              </div>
            )}
            {product.featured && (
              <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Featured
              </div>
            )}
          </div>

          {/* Name + price */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{product.name}</h2>
              <p className="text-slate-500 leading-relaxed">{product.description}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-3xl font-bold text-amber-600">
                PKR {product.price.toLocaleString()}
              </p>
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full mt-1">
                  <CheckCircle size={11} /> In Stock
                </span>
              ) : (
                <span className="inline-block text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded-full mt-1">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Specs */}
          {specs && Object.keys(specs).length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Tag size={14} /> Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-slate-400 capitalize mb-0.5">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm font-semibold text-slate-800">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warranty */}
          {product.warranty && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              <Shield size={18} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-green-600 font-medium">Warranty Included</p>
                <p className="text-sm font-bold text-green-800">{product.warranty}</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleOrder}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-base"
            >
              <ShoppingCart size={18} />
              Order This Product
            </button>
            <button
              onClick={() => {
                onClose()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex-1 border-2 border-slate-300 hover:border-amber-400 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors"
            >
              Ask for Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

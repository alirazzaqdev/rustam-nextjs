'use client'

import { useState } from 'react'
import { Zap, Eye, ShoppingCart, Check } from 'lucide-react'
import { ProductModal } from '@/components/ui/ProductModal'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/types'

interface ProductsSectionProps {
  products: Product[]
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  'solar-panels': { label: 'Solar Panel', color: 'bg-amber-100 text-amber-700' },
  batteries:      { label: 'Battery',     color: 'bg-green-100 text-green-700' },
  inverters:      { label: 'Inverter',    color: 'bg-blue-100 text-blue-700' },
  accessories:    { label: 'Accessory',   color: 'bg-violet-100 text-violet-700' },
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const addItem = useCartStore(s => s.addItem)

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'solar-panels', label: 'Solar Panels' },
    { id: 'batteries', label: 'Batteries' },
    { id: 'inverters', label: 'Inverters' },
    { id: 'accessories', label: 'Accessories' },
  ]

  const filtered = products.filter((p) => {
    const catMatch = !selectedCategory || selectedCategory === 'all' || p.category === selectedCategory
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
    return catMatch && priceMatch
  })

  const maxPrice = Math.max(...products.map((p) => p.price), 500000)

  return (
    <section id="products" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Product Catalogue
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Products</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Premium solar panels, batteries, inverters, and accessories — click any product to see full details
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => {
            const isActive = (selectedCategory === null && cat.id === 'all') || selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === 'all' ? null : cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Price Range */}
        <div className="mb-10 max-w-sm mx-auto">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>PKR 0</span>
            <span className="font-semibold text-amber-600">Max: PKR {priceRange[1].toLocaleString()}</span>
            <span>PKR {maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-amber-500"
          />
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const cfg = categoryConfig[product.category]
              return (
                <div
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                    {product.image && !product.image.startsWith('/images/') ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Zap size={44} className="text-amber-300 group-hover:scale-110 transition-transform" />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
                        <Eye size={12} /> View Details
                      </div>
                    </div>
                    {product.featured && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    {cfg && (
                      <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    )}
                    <h3 className="font-bold text-slate-900 mb-1 text-sm leading-snug group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2 flex-1">{product.description}</p>

                    {/* Top 2 specs */}
                    {product.specs && Object.keys(product.specs).length > 0 && (
                      <div className="flex gap-3 mb-3">
                        {Object.entries(product.specs as Record<string, string>).slice(0, 2).map(([k, v]) => (
                          <div key={k} className="bg-slate-50 rounded-lg px-2.5 py-1.5 flex-1 min-w-0">
                            <p className="text-xs text-slate-400 capitalize truncate">{k}</p>
                            <p className="text-xs font-bold text-slate-700 truncate">{String(v)}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-bold text-slate-900">
                          PKR {product.price.toLocaleString()}
                        </p>
                        {product.inStock ? (
                          <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">In Stock</span>
                        ) : (
                          <span className="text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Out of Stock</span>
                        )}
                      </div>
                      {product.inStock && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            addItem({ id: product.id, name: product.name, price: product.price, category: product.category, slug: product.slug })
                            setAddedIds(prev => new Set(prev).add(product.id))
                            setTimeout(() => setAddedIds(prev => { const s = new Set(prev); s.delete(product.id); return s }), 1500)
                          }}
                          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                            addedIds.has(product.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-amber-500 hover:bg-amber-600 text-white'
                          }`}
                        >
                          {addedIds.has(product.id) ? <><Check size={14} /> Added!</> : <><ShoppingCart size={14} /> Add to Cart</>}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Zap size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No products match your filters. Try adjusting the price range.</p>
          </div>
        )}

        <p className="text-center text-slate-400 text-sm mt-8">
          Showing {filtered.length} of {products.length} products — click any card to view details & order
        </p>
      </div>

      {/* Product Detail Modal */}
      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
    </section>
  )
}

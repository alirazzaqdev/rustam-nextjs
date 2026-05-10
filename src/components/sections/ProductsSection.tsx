'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sun, Battery, Zap, Plug, ShoppingCart, Check, ArrowRight
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProductModal } from '@/components/ui/ProductModal'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/types'

interface ProductsSectionProps {
  products: Product[]
}

const CATEGORIES = [
  { id: 'all',          label: 'All Products' },
  { id: 'solar-panels', label: 'Solar Panels' },
  { id: 'batteries',    label: 'Batteries' },
  { id: 'inverters',    label: 'Inverters' },
  { id: 'accessories',  label: 'Accessories' },
]

const CATEGORY_LABEL: Record<string, string> = {
  'solar-panels': 'Solar Panel',
  batteries:      'Battery',
  inverters:      'Inverter',
  accessories:    'Accessory',
}

function getCategoryIcon(category: string) {
  if (category === 'solar-panels') return Sun
  if (category === 'batteries') return Battery
  if (category === 'inverters') return Zap
  return Plug
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [selected, setSelected] = useState<string>('all')
  const [active, setActive] = useState<Product | null>(null)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const addItem = useCartStore((s) => s.addItem)

  const filtered = selected === 'all'
    ? products
    : products.filter((p) => p.category === selected)

  return (
    <section id="products" className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Product Catalogue"
          title="Premium solar equipment"
          description="Solar panels, batteries, inverters, and accessories from trusted global brands. Click any product to see specifications."
        />

        {/* Category filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const isActive = selected === c.id
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-600'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const Icon = getCategoryIcon(product.category)
              const wasAdded = addedIds.has(product.id)

              return (
                <article
                  key={product.id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  {/* Image area */}
                  <button
                    type="button"
                    onClick={() => setActive(product)}
                    className="relative h-48 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center"
                    aria-label={`View ${product.name}`}
                  >
                    <Icon size={56} className="text-amber-400 group-hover:scale-105 transition-transform" strokeWidth={1.5} />
                  </button>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1.5">
                      {CATEGORY_LABEL[product.category] || 'Product'}
                    </p>
                    <h3 className="text-base font-semibold text-slate-800 leading-snug mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Spec pills */}
                    {product.specs && Object.keys(product.specs).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {Object.entries(product.specs as Record<string, string>).slice(0, 2).map(([k, v]) => (
                          <span
                            key={k}
                            className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded"
                          >
                            {String(v)}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price */}
                    <div className="mt-auto">
                      <p className="text-2xl font-bold text-slate-900 mb-4">
                        PKR {product.price.toLocaleString()}
                      </p>

                      {/* Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setActive(product)}
                          className="text-sm font-semibold text-amber-600 border-2 border-amber-500 hover:bg-amber-50 py-2 rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                        {product.inStock ? (
                          <button
                            type="button"
                            onClick={() => {
                              addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                category: product.category,
                                slug: product.slug,
                              })
                              setAddedIds((prev) => new Set(prev).add(product.id))
                              setTimeout(() => {
                                setAddedIds((prev) => {
                                  const s = new Set(prev)
                                  s.delete(product.id)
                                  return s
                                })
                              }, 1200)
                            }}
                            className={`text-sm font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                              wasAdded
                                ? 'bg-emerald-500 text-white'
                                : 'bg-amber-500 hover:bg-amber-600 text-white'
                            }`}
                          >
                            {wasAdded ? (
                              <><Check size={14} /> Added</>
                            ) : (
                              <><ShoppingCart size={14} /> Order Now</>
                            )}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-500 bg-gray-100 py-2 rounded-lg flex items-center justify-center font-medium">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="mt-12 text-center bg-white border border-gray-100 rounded-2xl p-12">
            <p className="text-gray-500">No products in this category yet.</p>
          </div>
        )}

        {/* CTA strip */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Need a custom solution? Talk to our experts
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  )
}

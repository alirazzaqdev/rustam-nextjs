'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import ProductImage from '@/components/ui/ProductImage'
import type { Product } from '@/types'

interface ProductsSectionProps {
  products: Product[]
}

const TABS: Array<'All' | 'Batteries' | 'Solar Panels' | 'Inverters' | 'Accessories'> =
  ['All', 'Batteries', 'Solar Panels', 'Inverters', 'Accessories']

const BRANDS = ['All Brands', 'Osaka', 'Phoenix', 'AGS', 'Alaska']

const CATEGORY_MAP: Record<string, Product['category']> = {
  Batteries:      'Battery',
  'Solar Panels': 'Solar Panel',
  Inverters:      'Inverter',
  Accessories:    'Accessory',
}

const WHATSAPP_NUMBER = '923001234567'

function whatsappOrderUrl(product: Product): string {
  const msg = product.price > 0
    ? `Assalam o Alaikum! I want to order: ${product.name} - PKR ${product.price.toLocaleString('en-PK')}`
    : `Assalam o Alaikum! I want to inquire about: ${product.name}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

function whatsappOrderUrlLong(product: Product): string {
  const msg = product.price > 0
    ? `Assalam o Alaikum! I want to order:\n*${product.name}*\nPrice: PKR ${product.price.toLocaleString('en-PK')}\nPlease confirm availability.`
    : `Assalam o Alaikum! I want to inquire about:\n*${product.name}*\nPlease share pricing and availability.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export function ProductsSection({ products }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<typeof TABS[number]>('All')
  const [activeBrand, setActiveBrand] = useState<string>('All Brands')
  const [selected, setSelected] = useState<Product | null>(null)

  // ESC closes modal
  useEffect(() => {
    if (!selected) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [selected])

  const filtered = products.filter((p) => {
    if (activeCategory === 'All') return true
    if (p.category !== CATEGORY_MAP[activeCategory]) return false
    if (activeCategory === 'Batteries' && activeBrand !== 'All Brands') {
      return p.brand === activeBrand
    }
    return true
  })

  return (
    <section id="products" className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Product Catalogue"
          title="Premium batteries & solar equipment"
          description="50+ batteries from Osaka, Phoenix, AGS, and Alaska — plus solar panels, inverters, and accessories. Click any product for full specs and to order."
        />

        {/* Category tabs */}
        <div className="mt-12 flex flex-wrap gap-2 justify-center">
          {TABS.map((tab) => {
            const active = activeCategory === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => { setActiveCategory(tab); setActiveBrand('All Brands') }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-600'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Brand sub-filter (only for Batteries) */}
        {activeCategory === 'Batteries' && (
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {BRANDS.map((brand) => {
              const active = activeBrand === brand
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setActiveBrand(brand)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              )
            })}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Showing {filtered.length} of {products.length} products
          {activeCategory !== 'All' && ` · ${activeCategory}`}
          {activeCategory === 'Batteries' && activeBrand !== 'All Brands' && ` · ${activeBrand}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={setSelected} />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center bg-white border border-gray-100 rounded-2xl p-12">
            <p className="text-gray-500">No products in this category yet.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <ProductDetailModal product={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(product) }
      }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <ProductImage
        src={product.image}
        name={product.name}
        brand={product.brand}
        category={product.category}
        size="card"
      />

      <div className="p-5">
        {/* Brand + Category label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            {product.brand}
          </span>
          <span className="text-gray-300" aria-hidden>·</span>
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug mb-3">
          {product.name}
        </h3>

        {/* Spec pills */}
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[24px]">
          {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
            <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
              {value}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mb-4">
          {product.price > 0 ? (
            <span className="text-2xl font-black text-slate-900">
              PKR {product.price.toLocaleString('en-PK')}
            </span>
          ) : (
            <span className="text-base font-semibold text-amber-600">
              Contact for Price
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onSelect(product) }}
            className="flex-1 py-2 text-sm font-semibold text-slate-700 border border-gray-200 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-150"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              window.open(whatsappOrderUrl(product), '_blank', 'noopener,noreferrer')
            }}
            className="flex-1 py-2 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-all duration-150"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="md:flex">
          {/* LEFT — Image */}
          <div className="md:w-2/5">
            <ProductImage
              src={product.image}
              name={product.name}
              brand={product.brand}
              category={product.category}
              size="modal"
            />
            <div className="p-4 flex gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                product.inStock
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                {product.brand}
              </span>
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="md:w-3/5 p-6 md:p-8">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
              {product.category} · {product.brand}
            </p>

            <h2 id="product-modal-title" className="text-2xl font-black text-slate-900 leading-tight mb-3">
              {product.name}
            </h2>

            {product.price > 0 ? (
              <p className="text-3xl font-black text-amber-600 mb-4">
                PKR {product.price.toLocaleString('en-PK')}
              </p>
            ) : (
              <p className="text-lg font-bold text-amber-600 mb-4">
                Contact us for pricing
              </p>
            )}

            <hr className="border-gray-100 mb-4" />

            <p className="text-gray-600 leading-relaxed mb-5 text-sm">
              {product.description}
            </p>

            {/* Specs Table */}
            <div className="rounded-xl overflow-hidden border border-gray-100 mb-6">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <span className="font-semibold text-slate-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappOrderUrlLong(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.848L.057 23.704a.75.75 0 00.916.916l5.856-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.013-1.376l-.36-.214-3.731.933.999-3.642-.234-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
                Order on WhatsApp
              </a>
              <a
                href={`/order?product=${encodeURIComponent(product.name)}&price=${product.price}`}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors text-center"
                onClick={onClose}
              >
                Place Order Online
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

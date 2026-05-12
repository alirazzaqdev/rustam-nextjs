'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { X, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import ProductImage from '@/components/ui/ProductImage'
import SparkEffect from '@/components/ui/SparkEffect'
import ChargeEffect from '@/components/ui/ChargeEffect'
import type { Product } from '@/types'

interface ProductsSectionProps {
  products: Product[]
}

type TabLabel = 'All' | 'Batteries' | 'Solar Panels' | 'Inverters' | 'Accessories'

const TABS: TabLabel[] = ['All', 'Batteries', 'Solar Panels', 'Inverters', 'Accessories']

const CATEGORY_MAP: Record<TabLabel, string | null> = {
  All:            null,
  Batteries:      'Battery',
  'Solar Panels': 'Solar Panel',
  Inverters:      'Inverter',
  Accessories:    'Accessory',
}

const BATTERY_BRANDS   = ['All Brands', 'Osaka', 'Phoenix', 'AGS', 'Alaska', 'Knox']
const SOLAR_BRANDS     = ['All Brands', 'Canadian Solar', 'JinkoSolar', 'JA Solar', 'LONGi', 'Astro Energy', 'Risen', 'Trina', 'AIKO', 'Ronma', 'Inverex Jollywood', 'Coretech']
const INVERTER_FILTERS = ['All Brands', 'Knox Hybrid', 'Knox On-Grid']

const KNOX_HYBRID_IDS = new Set([
  'knox-eco-4000', 'knox-eco-5000', 'knox-eco-6600',
  'knox-6000', 'knox-6500', 'knox-9000', 'knox-9055',
  'knox-12002', 'knox-13002', 'knox-15002',
])

const WA_BATTERY        = '923213770402'
const WA_SOLAR_INVERTER = '923214130828'

function getWaNumber(product: Product): string {
  return (product.category === 'Solar Panel' || product.category === 'Inverter')
    ? WA_SOLAR_INVERTER
    : WA_BATTERY
}

function whatsappOrderUrl(product: Product): string {
  const msg = product.price > 0
    ? `Assalam o Alaikum! I want to order: ${product.name} - PKR ${product.price.toLocaleString('en-PK')}`
    : `Assalam o Alaikum! I want to inquire about: ${product.name}`
  return `https://wa.me/${getWaNumber(product)}?text=${encodeURIComponent(msg)}`
}

function whatsappOrderUrlLong(product: Product): string {
  const msg = product.price > 0
    ? `Assalam o Alaikum! I want to order:\n*${product.name}*\nPrice: PKR ${product.price.toLocaleString('en-PK')}\nPlease confirm availability.`
    : `Assalam o Alaikum! I want to inquire about:\n*${product.name}*\nPlease share pricing and availability.`
  return `https://wa.me/${getWaNumber(product)}?text=${encodeURIComponent(msg)}`
}

type SortOrder = 'none' | 'asc' | 'desc'

export function ProductsSection({ products }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<TabLabel>('All')
  const [activeBrand, setActiveBrand]       = useState<string>('All Brands')
  const [selected, setSelected]             = useState<Product | null>(null)
  const [search, setSearch]                 = useState('')
  const [sortOrder, setSortOrder]           = useState<SortOrder>('none')
  const searchRef                           = useRef<HTMLInputElement>(null)

  // Animation state
  const [sparkActive, setSparkActive]     = useState(false)
  const [chargeActive, setChargeActive]   = useState(false)
  const [effectPos, setEffectPos]         = useState({ x: 0, y: 0 })
  const [glowCardId, setGlowCardId]       = useState<string | null>(null)
  const [glowType, setGlowType]           = useState<'spark' | 'battery'>('spark')

  useEffect(() => {
    if (!selected) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected])

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [selected])

  function changeCategory(tab: TabLabel) {
    setActiveCategory(tab)
    setActiveBrand('All Brands')
    setSearch('')
  }

  function cycleSortOrder() {
    setSortOrder(prev =>
      prev === 'none' ? 'asc' : prev === 'asc' ? 'desc' : 'none'
    )
  }

  const handleCardClick = useCallback((
    e: React.MouseEvent,
    product: Product,
    action: () => void,
  ) => {
    setEffectPos({ x: e.clientX, y: e.clientY })

    if (product.category === 'Inverter') {
      setSparkActive(true)
      setGlowType('spark')
    } else if (product.category === 'Battery') {
      setChargeActive(true)
      setGlowType('battery')
    }

    setGlowCardId(product.id)
    setTimeout(() => setGlowCardId(null), 1000)
    setTimeout(() => action(), 200)
  }, [])

  const q = search.trim().toLowerCase()

  const filtered = products
    .filter((p) => {
      const cat = CATEGORY_MAP[activeCategory]
      if (cat !== null && p.category !== cat) return false

      if (activeCategory === 'Batteries' && activeBrand !== 'All Brands') {
        if (p.brand !== activeBrand) return false
      }
      if (activeCategory === 'Solar Panels' && activeBrand !== 'All Brands') {
        if (p.brand !== activeBrand) return false
      }
      if (activeCategory === 'Inverters' && activeBrand !== 'All Brands') {
        if (activeBrand === 'Knox Hybrid')  return KNOX_HYBRID_IDS.has(p.id)
        if (activeBrand === 'Knox On-Grid') return !KNOX_HYBRID_IDS.has(p.id) && p.brand === 'Knox'
      }

      if (q) {
        const haystack = `${p.name} ${p.brand} ${p.category}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }

      return true
    })
    .sort((a, b) => {
      if (sortOrder === 'none') return 0
      // Items with price=0 ("contact for price") always go to the end
      if (a.price === 0 && b.price === 0) return 0
      if (a.price === 0) return 1
      if (b.price === 0) return -1
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    })

  const showBrandFilter =
    activeCategory === 'Batteries' ||
    activeCategory === 'Solar Panels' ||
    activeCategory === 'Inverters'

  const brandOptions =
    activeCategory === 'Batteries'    ? BATTERY_BRANDS :
    activeCategory === 'Solar Panels' ? SOLAR_BRANDS :
    activeCategory === 'Inverters'    ? INVERTER_FILTERS : []

  return (
    <section id="products" className="bg-slate-50 py-20 md:py-24">
      <SparkEffect
        trigger={sparkActive}
        x={effectPos.x}
        y={effectPos.y}
        onComplete={() => setSparkActive(false)}
      />
      <ChargeEffect
        trigger={chargeActive}
        x={effectPos.x}
        y={effectPos.y}
        onComplete={() => setChargeActive(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Product Catalogue"
          title="Solar Panels, Batteries & Inverters in Lahore"
          description="Osaka, AGS, Phoenix, Alaska batteries · Canadian Solar, JinkoSolar, LONGi panels · Knox hybrid inverters. Click any product for full specs."
        />

        {/* Category tabs */}
        <div className="mt-12 flex flex-wrap gap-2 justify-center">
          {TABS.map((tab) => {
            const active = activeCategory === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => changeCategory(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-400 hover:text-emerald-700'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Brand sub-filter */}
        {showBrandFilter && (
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {brandOptions.map((brand) => {
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

        {/* Search + Sort — unified premium bar */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className={`flex items-center bg-white rounded-2xl shadow-lg border transition-all duration-200 overflow-hidden ${
            search ? 'border-emerald-400 shadow-emerald-100' : 'border-gray-200 hover:border-gray-300'
          }`}>
            {/* Search icon */}
            <div className="pl-4 pr-2 flex-shrink-0">
              <Search size={16} className={`transition-colors ${search ? 'text-emerald-500' : 'text-gray-400'}`} />
            </div>

            {/* Input */}
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by product name or brand…"
              className="flex-1 py-3.5 text-sm text-slate-800 placeholder-gray-400 bg-transparent outline-none min-w-0"
            />

            {/* Clear button */}
            {search && (
              <button
                onClick={() => setSearch('')}
                className="flex-shrink-0 mr-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={12} className="text-gray-500" />
              </button>
            )}

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 flex-shrink-0 mx-1" />

            {/* Sort button */}
            <button
              onClick={cycleSortOrder}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
                sortOrder === 'none'
                  ? 'text-gray-500 hover:text-emerald-700'
                  : 'text-emerald-600'
              }`}
            >
              {sortOrder === 'asc'  ? <ArrowUp   size={13} /> :
               sortOrder === 'desc' ? <ArrowDown  size={13} /> :
                                      <ArrowUpDown size={13} />}
              <span className="hidden sm:inline">
                {sortOrder === 'asc'  ? 'Low → High' :
                 sortOrder === 'desc' ? 'High → Low' :
                                        'Price'}
              </span>
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Showing {filtered.length} of {products.length} products
          {activeCategory !== 'All' && ` · ${activeCategory}`}
          {activeBrand !== 'All Brands' && ` · ${activeBrand}`}
          {search && ` · "${search}"`}
          {sortOrder !== 'none' && ` · Price ${sortOrder === 'asc' ? '↑' : '↓'}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                glowing={glowCardId === product.id}
                glowType={glowType}
                onSelect={(e) => handleCardClick(e, product, () => setSelected(product))}
                onOrder={(e) => {
                  e.stopPropagation()
                  handleCardClick(e, product, () => {
                    window.location.href = `/order?product=${encodeURIComponent(product.name)}&price=${product.price}`
                  })
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center bg-white border border-gray-100 rounded-2xl p-12">
            <Search size={32} className="mx-auto text-gray-200 mb-3" />
            <p className="text-gray-500 font-medium">No products found</p>
            {search && (
              <button onClick={() => setSearch('')} className="mt-2 text-sm text-emerald-600 hover:underline">
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {selected && (
        <ProductDetailModal product={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

interface ProductCardProps {
  product: Product
  glowing: boolean
  glowType: 'spark' | 'battery'
  onSelect: (e: React.MouseEvent) => void
  onOrder:  (e: React.MouseEvent) => void
}

function ProductCard({ product, glowing, glowType, onSelect, onOrder }: ProductCardProps) {
  const perWatt = product.category === 'Solar Panel' ? product.specs['Per Watt'] : null

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(e as unknown as React.MouseEvent) }
      }}
      className={`product-card bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 group ${
        glowing && glowType === 'spark'   ? 'card-spark-glow' :
        glowing && glowType === 'battery' ? 'card-battery-glow' : ''
      }`}
    >
      <div className="card-image-wrap overflow-hidden rounded-t-2xl">
        <ProductImage
          src={product.image}
          name={product.name}
          brand={product.brand}
          category={product.category}
          size="card"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
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

        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[24px]">
          {Object.entries(product.specs).filter(([k]) => k !== 'Per Watt').slice(0, 2).map(([key, value]) => (
            <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
              {value}
            </span>
          ))}
        </div>

        <div className="mb-4">
          {product.price > 0 ? (
            <>
              <span className="text-2xl font-black text-slate-900">
                PKR {product.price.toLocaleString('en-PK')}
              </span>
              {perWatt && (
                <p className="text-xs text-gray-500 mt-0.5">{perWatt}</p>
              )}
            </>
          ) : (
            <span className="text-base font-semibold text-emerald-600">
              Contact for Price
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSelect}
            className="flex-1 py-2 text-sm font-semibold text-slate-700 border border-gray-200 rounded-xl hover:border-emerald-500 hover:text-emerald-700 transition-all duration-150"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={onOrder}
            className="flex-1 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-150"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const perWatt = product.category === 'Solar Panel' ? product.specs['Per Watt'] : null

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
                product.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                {product.brand}
              </span>
            </div>
          </div>

          <div className="md:w-3/5 p-6 md:p-8">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
              {product.category} · {product.brand}
            </p>

            <h2 id="product-modal-title" className="text-2xl font-black text-slate-900 leading-tight mb-3">
              {product.name}
            </h2>

            {product.price > 0 ? (
              <div className="mb-4">
                <p className="text-3xl font-black text-emerald-600">
                  PKR {product.price.toLocaleString('en-PK')}
                </p>
                {perWatt && (
                  <p className="text-sm text-gray-500 mt-0.5">{perWatt}</p>
                )}
              </div>
            ) : (
              <p className="text-lg font-bold text-emerald-600 mb-4">
                Contact us for pricing
              </p>
            )}

            <hr className="border-gray-100 mb-4" />

            <p className="text-gray-600 leading-relaxed mb-5 text-sm">
              {product.description}
            </p>

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
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-center"
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

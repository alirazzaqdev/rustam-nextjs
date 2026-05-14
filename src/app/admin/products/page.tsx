'use client'

import { useEffect, useState, useCallback } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import {
  Plus, Pencil, Trash2, Search, RefreshCw,
  Package, Upload, X, Check, ChevronLeft, ChevronRight,
  ToggleLeft, ToggleRight, Star, StarOff, Database,
} from 'lucide-react'

interface Product {
  id: string
  slug: string
  name: string
  category: string
  brand: string
  price: number
  image: string
  description: string
  specs: Record<string, string>
  featured: boolean
  inStock: boolean
  createdAt: string
}

const CATEGORIES = ['Battery', 'Solar Panel', 'Inverter', 'Accessory']
const BRANDS = ['Osaka', 'Phoenix', 'AGS', 'Alaska', 'Lithium', 'Canadian Solar', 'JinkoSolar', 'JA Solar', 'LONGi', 'Astro Energy', 'Risen', 'Trina', 'AIKO', 'Ronma', 'Other']

const EMPTY: Partial<Product> = { name: '', category: 'Battery', brand: '', price: 0, image: '', description: '', specs: {}, featured: false, inStock: true }

export default function AdminProductsPage() {
  const [products, setProducts]   = useState<Product[]>([])
  const [total, setTotal]         = useState(0)
  const [page, setPage]           = useState(1)
  const [pages, setPages]         = useState(1)
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [seeding, setSeeding]     = useState(false)
  const [seedMsg, setSeedMsg]     = useState('')

  const [modal, setModal]         = useState<'add' | 'edit' | null>(null)
  const [form, setForm]           = useState<Partial<Product>>(EMPTY)
  const [saving, setSaving]       = useState(false)
  const [deleting, setDeleting]   = useState<string | null>(null)
  const [specsInput, setSpecsInput] = useState('')
  const [imgUploading, setImgUploading] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const q = new URLSearchParams({ page: String(page), limit: '20' })
    if (search)    q.set('search', search)
    if (catFilter) q.set('category', catFilter)
    const res  = await fetch(`/api/admin/products?${q}`)
    const data = await res.json()
    setProducts(data.products || [])
    setTotal(data.total || 0)
    setPages(data.pages || 1)
    setLoading(false)
  }, [page, search, catFilter])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // Re-search from page 1 when filter changes
  useEffect(() => { setPage(1) }, [search, catFilter])

  function openAdd() {
    setForm(EMPTY)
    setSpecsInput('')
    setModal('add')
  }

  function openEdit(p: Product) {
    setForm(p)
    setSpecsInput(Object.entries(p.specs || {}).map(([k, v]) => `${k}: ${v}`).join('\n'))
    setModal('edit')
  }

  function parseSpecs(raw: string): Record<string, string> {
    const out: Record<string, string> = {}
    for (const line of raw.split('\n')) {
      const [k, ...rest] = line.split(':')
      if (k?.trim() && rest.length) out[k.trim()] = rest.join(':').trim()
    }
    return out
  }

  async function handleSave() {
    setSaving(true)
    const payload = { ...form, specs: parseSpecs(specsInput) }
    const isEdit  = modal === 'edit'
    const url     = isEdit ? `/api/admin/products/${form.id}` : '/api/admin/products'
    const method  = isEdit ? 'PATCH' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setSaving(false)
    setModal(null)
    fetchProducts()
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return
    setDeleting(id)
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    setDeleting(null)
    fetchProducts()
  }

  async function toggleField(id: string, field: 'inStock' | 'featured', val: boolean) {
    await fetch(`/api/admin/products/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !val }),
    })
    fetchProducts()
  }

  async function handleSeed() {
    if (!confirm('Import missing products from catalog? (existing products will be skipped)')) return
    setSeeding(true)
    const res  = await fetch('/api/admin/seed-products', { method: 'POST' })
    const data = await res.json()
    setSeedMsg(`✓ ${data.inserted} inserted, ${data.skipped} already existed`)
    setSeeding(false)
    fetchProducts()
  }

  async function handleReseed() {
    if (!confirm('All products will be deleted and re-imported from catalog. Are you sure?')) return
    setSeeding(true)
    const res  = await fetch('/api/admin/seed-products', { method: 'DELETE' })
    const data = await res.json()
    setSeedMsg(`✓ Full re-import: ${data.inserted} products loaded`)
    setSeeding(false)
    fetchProducts()
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImgUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res  = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setForm(f => ({ ...f, image: data.url }))
    setImgUploading(false)
  }

  const catColors: Record<string, string> = {
    'Battery':     'bg-amber-50 text-amber-700 border-amber-200',
    'Solar Panel': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Inverter':    'bg-slate-50 text-slate-600 border-slate-200',
    'Accessory':   'bg-gray-50 text-gray-500 border-gray-200',
  }

  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Products</h1>
            <p className="text-sm text-gray-400 mt-0.5">{total} products in database</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeed}
              disabled={seeding}
              title="Import missing products from catalog"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Database size={14} />
              {seeding ? 'Importing...' : 'Import Catalog'}
            </button>
            <button
              onClick={handleReseed}
              disabled={seeding}
              title="Delete all and re-import full catalog"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-100 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={seeding ? 'animate-spin' : ''} />
              Re-import All
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <Plus size={15} />
              Add Product
            </button>
          </div>
        </div>

        {seedMsg && (
          <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-lg">
            <Check size={14} />
            {seedMsg}
            <button onClick={() => setSeedMsg('')} className="ml-auto"><X size={13} /></button>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
            />
          </div>
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-amber-200"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={fetchProducts} className="p-1.5 text-gray-500 hover:text-gray-700">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left w-16">Image</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Brand</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-center">Stock</th>
                  <th className="px-4 py-3 text-center">Featured</th>
                  <th className="px-4 py-3 text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading && (
                  <tr><td colSpan={8} className="py-12 text-center text-gray-400">Loading...</td></tr>
                )}
                {!loading && products.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <Package size={32} className="mx-auto text-gray-200 mb-2" />
                      <p className="text-gray-400 text-sm">No products found</p>
                      <button onClick={handleSeed} className="mt-3 text-amber-600 text-sm font-semibold hover:underline">
                        Import from product catalog →
                      </button>
                    </td>
                  </tr>
                )}
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50 border border-gray-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Package size={14} className="text-gray-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900 leading-tight">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 font-mono">{p.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${catColors[p.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.brand}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800">
                      {p.price > 0 ? `PKR ${p.price.toLocaleString()}` : <span className="text-amber-600 font-medium">Contact</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleField(p.id, 'inStock', p.inStock)} title="Toggle stock">
                        {p.inStock
                          ? <ToggleRight size={20} className="text-emerald-500 mx-auto" />
                          : <ToggleLeft  size={20} className="text-gray-300 mx-auto" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleField(p.id, 'featured', p.featured)} title="Toggle featured">
                        {p.featured
                          ? <Star    size={16} className="text-amber-500 fill-amber-400 mx-auto" />
                          : <StarOff size={16} className="text-gray-300 mx-auto" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <span>{total} products</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 disabled:opacity-30 hover:text-gray-900">
                  <ChevronLeft size={16} />
                </button>
                <span>Page {page} / {pages}</span>
                <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages} className="p-1 disabled:opacity-30 hover:text-gray-900">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-900">
                {modal === 'add' ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button onClick={() => setModal(null)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Name *</label>
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Osaka HT115 Plus-A"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
                />
              </div>

              {/* Category + Brand */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category *</label>
                  <select
                    value={form.category || 'Battery'}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-200"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Brand</label>
                  <input
                    type="text"
                    list="brands-list"
                    value={form.brand || ''}
                    onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                    placeholder="e.g. Osaka"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-200"
                  />
                  <datalist id="brands-list">{BRANDS.map(b => <option key={b} value={b} />)}</datalist>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price (PKR) — leave 0 for "Contact for price"</label>
                <input
                  type="number"
                  min={0}
                  value={form.price || 0}
                  onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={form.image || ''}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="/products/brand/filename.jpg"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-200"
                  />
                  <label className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <Upload size={13} />
                    {imgUploading ? 'Uploading...' : 'Upload'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                {form.image && (
                  <img src={form.image} alt="preview" className="mt-2 h-20 w-20 object-contain rounded-lg border border-gray-100 bg-gray-50" />
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea
                  rows={2}
                  value={form.description || ''}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief product description..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-200 resize-none"
                />
              </div>

              {/* Specs */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Specifications</label>
                <p className="text-xs text-gray-400 mb-1.5">One per line, format: Key: Value</p>
                <textarea
                  rows={4}
                  value={specsInput}
                  onChange={e => setSpecsInput(e.target.value)}
                  placeholder={"Capacity: 100Ah\nVoltage: 12V\nWarranty: 1 Year"}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-amber-200 resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.inStock !== false}
                    onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))}
                    className="w-4 h-4 accent-amber-600"
                  />
                  <span className="text-sm font-medium text-slate-700">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(form.featured)}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 accent-amber-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Featured</span>
                </label>
              </div>
            </div>

            <div className="px-6 pb-6 flex items-center justify-end gap-3">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.category}
                className="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                {saving ? 'Saving...' : modal === 'add' ? 'Add Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}

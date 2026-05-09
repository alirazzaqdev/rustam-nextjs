'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react'
import type { Product } from '@/types'

const CATEGORIES = ['solar-panels', 'batteries', 'inverters', 'accessories']

const BLANK: Omit<Product, 'id'> = {
  name: '', slug: '', description: '', category: 'batteries',
  price: 0, image: '/placeholder.jpg', specs: {}, warranty: '',
  featured: false, inStock: true,
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<Partial<Product> | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/products')
    if (res.ok) setProducts(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    if (!modal) return
    setSaving(true)
    const isNew = !modal.id
    const url = isNew ? '/api/products' : `/api/products/${modal.id}`
    const method = isNew ? 'POST' : 'PATCH'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modal),
    })
    if (res.ok) {
      const saved = await res.json()
      if (isNew) setProducts(prev => [saved, ...prev])
      else setProducts(prev => prev.map(p => p.id === saved.id ? saved : p))
      setModal(null)
    }
    setSaving(false)
  }

  async function toggleStock(product: Product) {
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: !product.inStock }),
    })
    if (res.ok) {
      const updated = await res.json()
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p))
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  function field(key: keyof Product, label: string, type = 'text') {
    return (
      <div key={key}>
        <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
        <input
          type={type}
          value={String(modal?.[key] ?? '')}
          onChange={e => setModal(prev => ({
            ...prev!,
            [key]: type === 'number' ? Number(e.target.value) : e.target.value,
          }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-200"
        />
      </div>
    )
  }

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <button
            onClick={() => setModal({ ...BLANK })}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-600 transition-colors"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Featured</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>}
                {!loading && products.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No products yet</td></tr>}
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500 capitalize">{p.category.replace('-', ' ')}</td>
                    <td className="px-4 py-3 text-gray-900">PKR {p.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStock(p)} className={`flex items-center gap-1 text-xs font-medium ${p.inStock ? 'text-green-600' : 'text-red-500'}`}>
                        {p.inStock ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${p.featured ? 'text-amber-600' : 'text-gray-400'}`}>
                        {p.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <button
                        onClick={() => setModal(p)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">{modal.id ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              {field('name', 'Name *')}
              {field('slug', 'Slug *')}
              {field('description', 'Description *')}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                <select
                  value={modal.category || 'batteries'}
                  onChange={e => setModal(prev => ({ ...prev!, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-200"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {field('price', 'Price (PKR) *', 'number')}
              {field('image', 'Image URL')}
              {field('warranty', 'Warranty')}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!modal.featured}
                    onChange={e => setModal(prev => ({ ...prev!, featured: e.target.checked }))}
                    className="rounded"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modal.inStock !== false}
                    onChange={e => setModal(prev => ({ ...prev!, inStock: e.target.checked }))}
                    className="rounded"
                  />
                  In Stock
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModal(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 bg-amber-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-amber-600 transition-colors disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}

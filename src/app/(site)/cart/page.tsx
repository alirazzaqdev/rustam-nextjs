'use client'

import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingCart className="mx-auto mb-4 text-gray-300" size={64} />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add some products to get started.</p>
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </main>
    )
  }

  const subtotal = getTotalPrice()
  const total = subtotal

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-20 h-20 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <ShoppingCart className="text-emerald-500" size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-emerald-700 font-medium uppercase tracking-wide">{item.category}</p>
                  <h3 className="font-semibold text-gray-900 mt-0.5 leading-snug">{item.name}</h3>
                  <p className="text-emerald-700 font-bold mt-1">PKR {item.price.toLocaleString()}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-gray-900">PKR {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium text-gray-900">PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span className="text-emerald-700">PKR {total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/#products"
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors mt-3 block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

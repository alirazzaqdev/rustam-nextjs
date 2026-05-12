'use client'

import { useState, useRef } from 'react'
import { useCartStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  CreditCard, Smartphone, Building2, Truck,
  ChevronRight, AlertCircle, Upload, X
} from 'lucide-react'

type PaymentMethod = 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'cod'

interface CustomerForm {
  customerName: string
  phone: string
  whatsapp: string
  email: string
  address: string
  city: string
  mobileNumber: string
  notes: string
}

const CITIES = [
  'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Gujranwala', 'Sialkot', 'Peshawar', 'Quetta',
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod')
  const [form, setForm] = useState<CustomerForm>({
    customerName: '', phone: '', whatsapp: '', email: '',
    address: '', city: 'Lahore', mobileNumber: '', notes: '',
  })
  const [errors, setErrors] = useState<Partial<CustomerForm>>({})
  const [loading, setLoading] = useState(false)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const subtotal = getTotalPrice()
  const total = subtotal

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <Link href="/#products" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors inline-block">
            Browse Products
          </Link>
        </div>
      </main>
    )
  }

  function updateForm(field: keyof CustomerForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function validate(): boolean {
    const e: Partial<CustomerForm> = {}
    if (!form.customerName.trim()) e.customerName = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city) e.city = 'City is required'
    if ((paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && !form.mobileNumber.trim()) {
      e.mobileNumber = 'Mobile number is required for this payment method'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    try {
      // 1. Create order
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          whatsapp: form.whatsapp || form.phone,
          email: form.email,
          address: form.address,
          city: form.city,
          items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, category: i.category })),
          subtotal,
          total,
          paymentMethod,
          notes: form.notes,
        }),
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.error || 'Order failed')

      const { orderId, orderNumber } = orderData

      // 2. Payment routing
      if (paymentMethod === 'cod') {
        clearCart()
        router.push(`/order/success?orderNumber=${orderNumber}&status=success&method=cod`)
        return
      }

      if (paymentMethod === 'bank_transfer') {
        let screenshotUrl: string | undefined
        if (screenshot) {
          const fd = new FormData()
          fd.append('file', screenshot)
          const upRes = await fetch('/api/upload', { method: 'POST', body: fd })
          const upData = await upRes.json()
          if (upRes.ok) screenshotUrl = upData.url
        }
        if (screenshotUrl) {
          await fetch(`/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentStatus: 'pending_verification', screenshotUrl }),
          })
        }
        clearCart()
        router.push(`/order/success?orderNumber=${orderNumber}&status=success&method=bank_transfer`)
        return
      }

      if (paymentMethod === 'jazzcash') {
        const jRes = await fetch('/api/payment/jazzcash', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, mobileNumber: form.mobileNumber }),
        })
        const jData = await jRes.json()
        if (!jRes.ok) throw new Error(jData.error)
        clearCart()
        // Submit a form to redirect to JazzCash gateway
        submitGatewayForm(jData.url, jData.payload)
        return
      }

      if (paymentMethod === 'easypaisa') {
        const epRes = await fetch('/api/payment/easypaisa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, mobileNumber: form.mobileNumber }),
        })
        const epData = await epRes.json()
        if (!epRes.ok) throw new Error(epData.error)
        clearCart()
        submitGatewayForm(epData.url, epData.payload)
        return
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function submitGatewayForm(action: string, fields: Record<string, string>) {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = action
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = k
      input.value = v
      form.appendChild(input)
    })
    document.body.appendChild(form)
    form.submit()
  }

  function handleFile(file: File | null) {
    if (!file) return
    setScreenshot(file)
    const reader = new FileReader()
    reader.onload = (e) => setScreenshotPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const paymentTabs: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    { id: 'jazzcash', label: 'JazzCash', icon: <Smartphone size={18} /> },
    { id: 'easypaisa', label: 'EasyPaisa', icon: <CreditCard size={18} /> },
    { id: 'bank_transfer', label: 'Bank Transfer', icon: <Building2 size={18} /> },
    { id: 'cod', label: 'Cash on Delivery', icon: <Truck size={18} /> },
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8">Complete your order details below</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">

              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" error={errors.customerName}>
                    <input
                      type="text"
                      placeholder="Muhammad Ali"
                      value={form.customerName}
                      onChange={e => updateForm('customerName', e.target.value)}
                      className={input(!!errors.customerName)}
                    />
                  </Field>
                  <Field label="Phone *" error={errors.phone}>
                    <input
                      type="tel"
                      placeholder="03xx-xxxxxxx"
                      value={form.phone}
                      onChange={e => updateForm('phone', e.target.value)}
                      className={input(!!errors.phone)}
                    />
                  </Field>
                  <Field label="WhatsApp (optional)">
                    <input
                      type="tel"
                      placeholder="03xx-xxxxxxx"
                      value={form.whatsapp}
                      onChange={e => updateForm('whatsapp', e.target.value)}
                      className={input(false)}
                    />
                  </Field>
                  <Field label="Email *" error={errors.email}>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={e => updateForm('email', e.target.value)}
                      className={input(!!errors.email)}
                    />
                  </Field>
                  <Field label="City *" error={errors.city} className="sm:col-span-2">
                    <select value={form.city} onChange={e => updateForm('city', e.target.value)} className={input(!!errors.city)}>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Delivery Address *" error={errors.address} className="sm:col-span-2">
                    <textarea
                      rows={2}
                      placeholder="House #, Street, Area"
                      value={form.address}
                      onChange={e => updateForm('address', e.target.value)}
                      className={input(!!errors.address) + ' resize-none'}
                    />
                  </Field>
                  <Field label="Order Notes (optional)" className="sm:col-span-2">
                    <textarea
                      rows={2}
                      placeholder="Any special instructions..."
                      value={form.notes}
                      onChange={e => updateForm('notes', e.target.value)}
                      className={input(false) + ' resize-none'}
                    />
                  </Field>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Payment Method</h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {paymentTabs.map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPaymentMethod(tab.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        paymentMethod === tab.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* JazzCash */}
                {paymentMethod === 'jazzcash' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-blue-50 text-blue-800 rounded-xl p-4 text-sm">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <p>You will be redirected to JazzCash to complete your payment. Make sure your mobile wallet is active.</p>
                    </div>
                    <Field label="JazzCash Mobile Number *" error={errors.mobileNumber}>
                      <input
                        type="tel"
                        placeholder="03xx-xxxxxxx"
                        value={form.mobileNumber}
                        onChange={e => updateForm('mobileNumber', e.target.value)}
                        className={input(!!errors.mobileNumber)}
                      />
                    </Field>
                  </div>
                )}

                {/* EasyPaisa */}
                {paymentMethod === 'easypaisa' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-green-50 text-green-800 rounded-xl p-4 text-sm">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <p>You will be redirected to EasyPaisa to complete your payment. Make sure your EasyPaisa account is active.</p>
                    </div>
                    <Field label="EasyPaisa Mobile Number *" error={errors.mobileNumber}>
                      <input
                        type="tel"
                        placeholder="03xx-xxxxxxx"
                        value={form.mobileNumber}
                        onChange={e => updateForm('mobileNumber', e.target.value)}
                        className={input(!!errors.mobileNumber)}
                      />
                    </Field>
                  </div>
                )}

                {/* Bank Transfer */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm space-y-1">
                      <p className="font-semibold text-slate-800 mb-2">Bank Account Details</p>
                      <p className="text-gray-600">Bank: <span className="font-medium text-gray-900">Meezan Bank</span></p>
                      <p className="text-gray-600">Account Title: <span className="font-medium text-gray-900">NEW FAST SOLAR ENERGY</span></p>
                      <p className="text-gray-600">Account #: <span className="font-medium text-gray-900">02730114866808</span></p>
                      <p className="text-gray-600">IBAN: <span className="font-medium text-gray-900">PK78MEZN0002730114866808</span></p>
                      <p className="text-gray-600">Branch: <span className="font-medium text-gray-900">Kahna Nau Br, Lahore</span></p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Payment Screenshot (optional)</label>
                      {screenshotPreview ? (
                        <div className="relative w-40 h-40">
                          <img src={screenshotPreview} alt="Screenshot" className="w-full h-full object-cover rounded-xl border" />
                          <button
                            type="button"
                            onClick={() => { setScreenshot(null); setScreenshotPreview(null) }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="flex items-center gap-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl px-4 py-3 hover:border-emerald-500 hover:text-emerald-700 transition-colors text-sm"
                        >
                          <Upload size={16} />
                          Choose screenshot
                        </button>
                      )}
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                )}

                {/* COD */}
                {paymentMethod === 'cod' && (
                  <div className="flex items-start gap-3 bg-emerald-50 text-emerald-800 rounded-xl p-4 text-sm">
                    <Truck size={16} className="mt-0.5 shrink-0" />
                    <p>Pay in cash when your order is delivered. Our team will contact you to confirm delivery time.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate mr-2">{item.name} × {item.quantity}</span>
                      <span className="font-medium text-gray-900 shrink-0">PKR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-gray-900 border-t pt-3">
                    <span>Total</span>
                    <span className="text-emerald-700">PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-5 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : (
                    <>
                      Place Order
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  By placing your order, you agree to our terms of service.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

function input(hasError: boolean) {
  return `w-full border rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:ring-red-200 bg-red-50'
      : 'border-gray-200 focus:ring-emerald-300 focus:border-emerald-500 bg-white'
  }`
}

function Field({
  label,
  error,
  children,
  className = '',
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} />{error}</p>}
    </div>
  )
}

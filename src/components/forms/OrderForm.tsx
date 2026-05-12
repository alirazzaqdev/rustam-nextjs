'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, Loader2 } from 'lucide-react'
import { submitOrder } from '@/actions/order'
import type { Product } from '@/types'

const orderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(2, 'Please select your city'),
  projectType: z.enum(['residential', 'commercial', 'industrial']),
  paymentMethod: z.enum(['Bank Transfer', 'Cash on Delivery']),
  selectedProducts: z.string().min(1, 'Please describe what you want to order'),
  totalAmount: z.string().optional(),
  notes: z.string().optional(),
})

type OrderFormData = z.infer<typeof orderSchema>

const CITIES = ['Kahna Nau', 'DHA', 'Gulberg', 'Johar Town', 'Model Town', 'Bahria Town', 'Other']

const PAYMENT_METHODS = [
  {
    id: 'Bank Transfer' as const,
    label: 'Bank Transfer',
    description: 'Transfer to our bank account',
    color: 'border-slate-200 hover:border-emerald-400 bg-slate-50',
    selectedColor: 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400',
    labelColor: 'text-emerald-700',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <rect x="4" y="12" width="40" height="28" rx="4" fill="#1a365d" stroke="#2b4c8c" strokeWidth="1"/>
        <rect x="4" y="18" width="40" height="8" fill="#2b4c8c"/>
        <circle cx="18" cy="32" r="6" fill="#EB001B" opacity="0.9"/>
        <circle cx="26" cy="32" r="6" fill="#F79E1B" opacity="0.9"/>
        <circle cx="22" cy="32" r="6" fill="#FF5F00" opacity="0.7"/>
        <rect x="8" y="22" width="8" height="6" rx="1" fill="#FFD700" opacity="0.8"/>
        <rect x="8" y="36" width="14" height="1.5" rx="0.5" fill="#ffffff" opacity="0.4"/>
        <rect x="8" y="39" width="10" height="1.5" rx="0.5" fill="#ffffff" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'Cash on Delivery' as const,
    label: 'Cash on Delivery',
    description: 'Pay cash when we deliver',
    color: 'border-slate-200 hover:border-amber-400 bg-slate-50',
    selectedColor: 'border-amber-500 bg-amber-50 ring-2 ring-amber-400',
    labelColor: 'text-amber-700',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <rect x="2" y="20" width="28" height="20" rx="3" fill="#2d5a27" stroke="#3a7a32" strokeWidth="1"/>
        <path d="M30 26 L30 36 L46 36 L46 30 L40 20 L30 20 Z" fill="#3a7a32" stroke="#4a9a42" strokeWidth="1"/>
        <rect x="32" y="22" width="10" height="10" rx="1" fill="#87CEEB" opacity="0.7"/>
        <circle cx="10" cy="40" r="5" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
        <circle cx="10" cy="40" r="2" fill="#666"/>
        <circle cx="36" cy="40" r="5" fill="#1a1a1a" stroke="#444" strokeWidth="1"/>
        <circle cx="36" cy="40" r="2" fill="#666"/>
        <rect x="8" y="24" width="18" height="10" rx="2" fill="#85bb65" stroke="#6da050" strokeWidth="0.5"/>
        <rect x="10" y="26" width="14" height="6" rx="1" fill="#71a354" opacity="0.8"/>
        <circle cx="17" cy="29" r="2.5" fill="#5c8a42" opacity="0.9"/>
      </svg>
    ),
  },
]

interface OrderFormProps {
  products: Product[]
  prefilledProduct?: string
}

export function OrderForm({ products, prefilledProduct }: OrderFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'Bank Transfer' | 'Cash on Delivery'>('Cash on Delivery')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      paymentMethod: 'Cash on Delivery',
      city: 'Kahna Nau',
      selectedProducts: prefilledProduct || '',
    },
  })

  const watchedProducts = watch('selectedProducts')
  const watchedAmount = watch('totalAmount')

  const estimatedTotal = useMemo(() => {
    if (watchedAmount) return Number(watchedAmount.replace(/[^\d]/g, '')) || 0
    return 0
  }, [watchedAmount])

  function pickTab(id: 'Bank Transfer' | 'Cash on Delivery') {
    setActiveTab(id)
    setValue('paymentMethod', id, { shouldValidate: true })
  }

  function whatsappUrl(orderId: string, data: OrderFormData): string {
    const lines = [
      `*New Order — ${orderId}*`,
      ``,
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Email:* ${data.email}`,
      `*Address:* ${data.address}, ${data.city}`,
      `*Project:* ${data.projectType}`,
      ``,
      `*Items:*`,
      data.selectedProducts,
      ``,
      `*Payment:* ${data.paymentMethod}`,
      data.totalAmount ? `*Estimated:* PKR ${data.totalAmount}` : '',
      data.notes ? `*Notes:* ${data.notes}` : '',
    ].filter(Boolean).join('\n')

    return `https://wa.me/923213770402?text=${encodeURIComponent(lines)}`
  }

  const onSubmit = async (data: OrderFormData) => {
    setLoading(true)
    setError(null)

    try {
      // Always succeeds — server action does best-effort DB+email saves
      const result = await submitOrder({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        projectType: data.projectType,
        paymentMethod: data.paymentMethod,
        products: data.selectedProducts,
        totalAmount: data.totalAmount,
        notes: data.notes,
      })

      const orderId = result.orderId

      // Open WhatsApp in a new tab — guaranteed reach to the business
      const wa = whatsappUrl(orderId, data)
      window.open(wa, '_blank')

      // Navigate to success
      router.push(
        `/order/success?ref=${orderId}&payment=${encodeURIComponent(data.paymentMethod)}&name=${encodeURIComponent(data.name)}`
      )
    } catch {
      setError('Something went wrong opening WhatsApp. Please call +92 321 3770402 directly.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* LEFT: Form (60%) */}
      <div className="lg:col-span-3 space-y-6">

        {/* Step indicator */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-xs sm:text-sm">
          {[
            { n: 1, label: 'Your Details' },
            { n: 2, label: 'Your Order' },
            { n: 3, label: 'Payment' },
          ].map((s, i, arr) => (
            <div key={s.n} className="flex-1 flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">{s.n}</div>
                <span className="font-medium text-slate-700 hidden sm:inline">{s.label}</span>
              </div>
              {i < arr.length - 1 && <div className="flex-1 h-0.5 bg-emerald-300 mx-2" />}
            </div>
          ))}
        </div>

        {/* Section 1 */}
        <Section title="1. Your Details">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name *" error={errors.name?.message}>
              <input {...register('name')} placeholder="Muhammad Ali" className={inp(!!errors.name)} disabled={loading} />
            </Field>
            <Field label="Phone / WhatsApp *" error={errors.phone?.message}>
              <input {...register('phone')} type="tel" placeholder="03001234567" className={inp(!!errors.phone)} disabled={loading} />
            </Field>
            <Field label="Email Address *" error={errors.email?.message} className="sm:col-span-2">
              <input {...register('email')} type="email" placeholder="you@example.com" className={inp(!!errors.email)} disabled={loading} />
            </Field>
            <Field label="Address *" error={errors.address?.message}>
              <input {...register('address')} placeholder="House #, Street, Area" className={inp(!!errors.address)} disabled={loading} />
            </Field>
            <Field label="City *" error={errors.city?.message}>
              <select {...register('city')} className={inp(!!errors.city)} disabled={loading}>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Project Type *" error={errors.projectType?.message} className="sm:col-span-2">
              <select {...register('projectType')} className={inp(!!errors.projectType)} disabled={loading}>
                <option value="">Select project type</option>
                <option value="residential">Residential (Home)</option>
                <option value="commercial">Commercial (Shop / Office)</option>
                <option value="industrial">Industrial (Factory / Warehouse)</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* Section 2 */}
        <Section title="2. What to Order">
          {products.length > 0 && (
            <div className="mb-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-sm font-medium text-amber-800 mb-3">Quick add from our catalog:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                {products.filter(p => p.price > 0).slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      const current = watchedProducts || ''
                      const line = `${p.name} — PKR ${p.price.toLocaleString('en-PK')}`
                      setValue('selectedProducts', current ? `${current}\n${line}` : line, { shouldValidate: true })
                    }}
                    className="text-left text-xs px-3 py-2 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors text-slate-700"
                  >
                    <span className="font-medium block">{p.name}</span>
                    <span className="text-amber-700">PKR {p.price.toLocaleString('en-PK')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Field label="Order Details *" error={errors.selectedProducts?.message}>
            <textarea
              {...register('selectedProducts')}
              rows={4}
              placeholder="e.g. LONGI 550W Solar Panel x2, Hybrid Inverter 5kW x1"
              className={inp(!!errors.selectedProducts) + ' resize-none'}
              disabled={loading}
            />
          </Field>

          <div className="mt-4">
            <Field label="Estimated Budget (PKR) — Optional">
              <input
                {...register('totalAmount')}
                placeholder="e.g. 500000"
                className={inp(false)}
                disabled={loading}
              />
            </Field>
          </div>
        </Section>

        {/* Section 3 */}
        <Section title="3. Payment Method">
          <input type="hidden" {...register('paymentMethod')} />

          <div className="grid grid-cols-2 gap-4">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                type="button"
                onClick={() => pickTab(method.id)}
                disabled={loading}
                className={`relative p-5 rounded-2xl border-2 transition-all duration-200 text-center flex flex-col items-center gap-3 ${
                  activeTab === method.id ? method.selectedColor : method.color
                }`}
              >
                {activeTab === method.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                )}
                {method.icon}
                <span className={`text-sm font-bold ${method.labelColor}`}>{method.label}</span>
                <span className="text-xs text-gray-400">{method.description}</span>
              </button>
            ))}
          </div>

          {activeTab === 'Bank Transfer' && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-sm font-bold text-slate-800 mb-2">Bank Transfer Details:</p>
              <div className="space-y-1 text-sm text-slate-600">
                <p><span className="font-semibold">Bank:</span> Meezan Bank</p>
                <p><span className="font-semibold">Account Title:</span> NEW FAST SOLAR ENERGY</p>
                <p><span className="font-semibold">Account #:</span> 02730114866808</p>
                <p><span className="font-semibold">IBAN:</span> PK78MEZN0002730114866808</p>
                <p><span className="font-semibold">Branch:</span> Kahna Nau Br, Lahore</p>
              </div>
              <p className="text-xs text-blue-500 mt-2">Send payment screenshot on WhatsApp after transfer.</p>
            </div>
          )}

          {activeTab === 'Cash on Delivery' && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-sm font-bold text-amber-800 mb-1">Cash on Delivery</p>
              <p className="text-sm text-amber-700">
                Available in Lahore. Pay in cash when our team delivers your order. We will call to confirm delivery time.
              </p>
            </div>
          )}
        </Section>

        {/* Notes */}
        <Section title="Additional Notes (Optional)">
          <textarea
            {...register('notes')}
            rows={3}
            placeholder="Any special requirements, preferred delivery time, etc."
            className={inp(false) + ' resize-none'}
            disabled={loading}
          />
        </Section>
      </div>

      {/* RIGHT: Sticky Summary (40%) */}
      <div className="lg:col-span-2">
        <div className="sticky top-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-orange-500" />
            <div className="p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Order Summary</h3>

              <div className="bg-slate-50 rounded-xl p-4 mb-4 min-h-[80px]">
                {watchedProducts ? (
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{watchedProducts}</pre>
                ) : (
                  <p className="text-sm text-slate-400 italic">Your selected items will appear here</p>
                )}
              </div>

              <div className="space-y-2 text-sm border-t border-slate-100 pt-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>PKR {estimatedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery</span>
                  <span className="text-emerald-600 font-semibold">Free in Lahore</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-base border-t border-slate-100 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-emerald-700">PKR {estimatedTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-base font-bold rounded-xl shadow-md shadow-emerald-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 size={20} className="animate-spin" /> Placing Order...</>
                ) : (
                  <>Place Order →</>
                )}
              </button>

              <p className="text-xs text-slate-400 text-center mt-3">
                Your order opens WhatsApp to confirm with our team
              </p>
            </div>
          </div>

          {/* Trust section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-xs font-bold tracking-[3px] text-gray-400 uppercase mb-5 text-center">
              WHY CUSTOMERS TRUST US
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: '500+', label: 'Orders Completed', sub: 'Since 2016' },
                { number: '10yr', label: 'Experience',       sub: 'Established 2016' },
                { number: '24hr', label: 'Support',          sub: 'WhatsApp always' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black text-emerald-600 leading-tight">{item.number}</div>
                  <div className="text-xs font-bold text-slate-700 mt-0.5">{item.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-xs text-gray-500">Verified business · Kahna Nau, Lahore since 2016</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

function inp(hasError: boolean) {
  return `w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 text-slate-900 bg-white transition-colors ${
    hasError
      ? 'border-red-300 focus:ring-red-200 bg-red-50'
      : 'border-slate-200 focus:ring-emerald-300 focus:border-emerald-500'
  }`
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">{title}</h2>
      {children}
    </div>
  )
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
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  )
}


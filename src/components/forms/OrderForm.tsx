'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  AlertCircle, Loader2, Smartphone, CreditCard,
  Building2, Truck, Check, Phone, Shield, Wrench
} from 'lucide-react'
import { submitOrder } from '@/actions/order'
import type { Product } from '@/types'

const orderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(2, 'Please select your city'),
  projectType: z.enum(['residential', 'commercial', 'industrial']),
  paymentMethod: z.enum(['Bank Transfer', 'EasyPaisa', 'JazzCash', 'Cash on Delivery']),
  paymentMobile: z.string().optional(),
  selectedProducts: z.string().min(1, 'Please describe what you want to order'),
  totalAmount: z.string().optional(),
  notes: z.string().optional(),
})

type OrderFormData = z.infer<typeof orderSchema>

const CITIES = ['Kahna Nau', 'DHA', 'Gulberg', 'Johar Town', 'Model Town', 'Bahria Town', 'Other']

const PAYMENT_TABS = [
  { id: 'JazzCash' as const, label: 'JazzCash', icon: Smartphone, gradient: 'from-orange-500 to-red-500', text: 'text-orange-600' },
  { id: 'EasyPaisa' as const, label: 'EasyPaisa', icon: CreditCard, gradient: 'from-emerald-500 to-green-600', text: 'text-emerald-600' },
  { id: 'Bank Transfer' as const, label: 'Bank Transfer', icon: Building2, gradient: 'from-slate-700 to-slate-900', text: 'text-slate-700' },
  { id: 'Cash on Delivery' as const, label: 'Cash on Delivery', icon: Truck, gradient: 'from-amber-400 to-amber-600', text: 'text-amber-600' },
]

interface OrderFormProps {
  products: Product[]
  prefilledProduct?: string
}

export function OrderForm({ products, prefilledProduct }: OrderFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<typeof PAYMENT_TABS[number]['id']>('Cash on Delivery')

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

  function pickTab(id: typeof PAYMENT_TABS[number]['id']) {
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
      data.paymentMobile ? `*Wallet #:* ${data.paymentMobile}` : '',
      data.totalAmount ? `*Estimated:* PKR ${data.totalAmount}` : '',
      data.notes ? `*Notes:* ${data.notes}` : '',
    ].filter(Boolean).join('\n')

    return `https://wa.me/923001234567?text=${encodeURIComponent(lines)}`
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
        address: `${data.address}, ${data.city}`,
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
      setError('Something went wrong opening WhatsApp. Please call +92 300 1234567 directly.')
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
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">{s.n}</div>
                <span className="font-medium text-slate-700 hidden sm:inline">{s.label}</span>
              </div>
              {i < arr.length - 1 && <div className="flex-1 h-0.5 bg-amber-200 mx-2" />}
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
            <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
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
                    className="text-left text-xs px-3 py-2 bg-white border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-slate-700"
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

          {/* Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {PAYMENT_TABS.map(t => {
              const Icon = t.icon
              const active = activeTab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => pickTab(t.id)}
                  disabled={loading}
                  className={`relative p-3 rounded-xl border-2 text-center transition-all ${
                    active
                      ? `border-amber-500 bg-amber-50 shadow-md`
                      : 'border-slate-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-2`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <p className={`text-xs font-semibold ${active ? 'text-amber-700' : 'text-slate-700'}`}>{t.label}</p>
                  {active && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          {activeTab === 'JazzCash' && (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="px-3 py-1.5 bg-orange-600 text-white rounded-lg font-bold text-sm">JazzCash</div>
                <p className="text-sm text-orange-800">Mobile Wallet</p>
              </div>
              <Field label="Your JazzCash Mobile Number">
                <input
                  {...register('paymentMobile')}
                  placeholder="03001234567"
                  className={inp(false)}
                  disabled={loading}
                />
              </Field>
              <p className="text-xs text-orange-700 mt-3 flex items-start gap-1.5">
                <AlertCircle size={12} className="mt-0.5 shrink-0" />
                JazzCash gateway integration is being activated. Our team will call you within 2 hours to complete payment.
              </p>
            </div>
          )}

          {activeTab === 'EasyPaisa' && (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-sm">easypaisa</div>
                <p className="text-sm text-emerald-800">Mobile Account</p>
              </div>
              <Field label="Your EasyPaisa Mobile Number">
                <input
                  {...register('paymentMobile')}
                  placeholder="03001234567"
                  className={inp(false)}
                  disabled={loading}
                />
              </Field>
              <p className="text-xs text-emerald-700 mt-3 flex items-start gap-1.5">
                <AlertCircle size={12} className="mt-0.5 shrink-0" />
                EasyPaisa gateway integration is being activated. Our team will call you within 2 hours to complete payment.
              </p>
            </div>
          )}

          {activeTab === 'Bank Transfer' && (
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-5">
              <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Building2 size={16} /> Bank Account Details
              </p>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-200">
                  <tr><td className="py-2 text-slate-500 pr-4">Bank</td><td className="py-2 font-semibold text-slate-900">Meezan Bank</td></tr>
                  <tr><td className="py-2 text-slate-500 pr-4">Account Title</td><td className="py-2 font-semibold text-slate-900">Rustam Battery & Solar Energy House</td></tr>
                  <tr><td className="py-2 text-slate-500 pr-4">Account #</td><td className="py-2 font-mono font-semibold text-slate-900">0123456789</td></tr>
                  <tr><td className="py-2 text-slate-500 pr-4">IBAN</td><td className="py-2 font-mono font-semibold text-slate-900">PK00MEZN0001234567890</td></tr>
                  <tr><td className="py-2 text-slate-500 pr-4">Branch</td><td className="py-2 font-semibold text-slate-900">Kahna Nau, Lahore</td></tr>
                </tbody>
              </table>
              <p className="text-xs text-slate-600 mt-3">
                Send the screenshot via WhatsApp after transfer (button below). Order is reserved for 24 hours.
              </p>
            </div>
          )}

          {activeTab === 'Cash on Delivery' && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
              <Truck size={20} className="text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Cash on Delivery</p>
                <p className="text-sm text-amber-800">Available in Lahore. Pay in cash when our team delivers your order. We will call to confirm delivery time.</p>
              </div>
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
            <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
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
                  <span className="text-amber-600">PKR {estimatedTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-4 text-base font-bold rounded-xl shadow-md shadow-amber-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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

          {/* Trust badges */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wide">Why customers trust us</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Trust icon={<Shield size={16} className="text-emerald-500" />} label="Secure Order" />
              <Trust icon={<Phone size={16} className="text-amber-500" />} label="24h Support" />
              <Trust icon={<Wrench size={16} className="text-blue-500" />} label="19yr Experience" />
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
      : 'border-slate-200 focus:ring-amber-200 focus:border-amber-400'
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

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">{icon}</div>
      <span className="text-xs font-medium text-slate-600 leading-tight">{label}</span>
    </div>
  )
}

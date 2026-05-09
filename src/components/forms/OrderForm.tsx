'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitOrder } from '@/actions/order'
import type { Product } from '@/types'

const orderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Please enter your full address'),
  projectType: z.enum(['residential', 'commercial', 'industrial']),
  paymentMethod: z.enum(['Bank Transfer', 'EasyPaisa', 'JazzCash', 'Cash on Visit', 'Installments']),
  selectedProducts: z.string().min(1, 'Please describe what you want to order'),
  totalAmount: z.string().optional(),
  notes: z.string().optional(),
})

type OrderFormData = z.infer<typeof orderSchema>

const PAYMENT_METHODS = [
  { id: 'Bank Transfer', label: 'Bank Transfer', icon: '🏦' },
  { id: 'EasyPaisa', label: 'EasyPaisa', icon: '📱' },
  { id: 'JazzCash', label: 'JazzCash', icon: '💜' },
  { id: 'Cash on Visit', label: 'Cash on Visit', icon: '💵' },
  { id: 'Installments', label: 'Installments', icon: '📅' },
]

interface OrderFormProps {
  products: Product[]
}

export function OrderForm({ products }: OrderFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<string>('Bank Transfer')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { paymentMethod: 'Bank Transfer' },
  })

  const onSubmit = async (data: OrderFormData) => {
    setLoading(true)
    setError(null)

    try {
      const result = await submitOrder({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        projectType: data.projectType,
        paymentMethod: data.paymentMethod,
        products: data.selectedProducts,
        totalAmount: data.totalAmount,
        notes: data.notes,
      })

      if (result.success) {
        router.push(
          `/order/success?ref=${result.orderId}&payment=${encodeURIComponent(data.paymentMethod)}&name=${encodeURIComponent(data.name)}`
        )
      } else {
        setError(result.error || 'Failed to place order. Please try again.')
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-900 bg-white'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Personal Details */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          1. Your Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
            <input {...register('name')} type="text" className={inputClass} placeholder="Muhammad Ali" disabled={loading} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone / WhatsApp *</label>
            <input {...register('phone')} type="tel" className={inputClass} placeholder="03001234567" disabled={loading} />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
          <input {...register('email')} type="email" className={inputClass} placeholder="you@example.com" disabled={loading} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Delivery / Installation Address *</label>
          <input {...register('address')} type="text" className={inputClass} placeholder="House #, Street, Area, City" disabled={loading} />
          {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Type *</label>
          <select {...register('projectType')} className={inputClass} disabled={loading}>
            <option value="">Select project type</option>
            <option value="residential">Residential (Home)</option>
            <option value="commercial">Commercial (Shop / Office)</option>
            <option value="industrial">Industrial (Factory / Warehouse)</option>
          </select>
          {errors.projectType && <p className="mt-1 text-xs text-red-600">{errors.projectType.message}</p>}
        </div>
      </div>

      {/* Product Selection */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          2. What Would You Like to Order?
        </h2>

        {products.length > 0 && (
          <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm font-medium text-amber-800 mb-3">Quick select from our products:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    const current = (document.getElementById('selectedProducts') as HTMLTextAreaElement)?.value || ''
                    const line = `${p.name} — PKR ${p.price.toLocaleString()}`
                    setValue('selectedProducts', current ? `${current}\n${line}` : line, { shouldValidate: true })
                  }}
                  className="text-left text-xs px-3 py-2 bg-white border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-slate-700"
                >
                  <span className="font-medium">{p.name}</span>
                  <br />
                  <span className="text-amber-700">PKR {p.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Order Details *
          </label>
          <textarea
            id="selectedProducts"
            {...register('selectedProducts')}
            rows={4}
            className={inputClass}
            placeholder="e.g. LONGI 550W Solar Panel x2, Hybrid Inverter 5kW x1, Lithium Battery 48V 100Ah x1"
            disabled={loading}
          />
          {errors.selectedProducts && <p className="mt-1 text-xs text-red-600">{errors.selectedProducts.message}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Estimated Budget (PKR) — Optional
          </label>
          <input
            {...register('totalAmount')}
            type="text"
            className={inputClass}
            placeholder="e.g. 500,000"
            disabled={loading}
          />
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          3. Payment Method
        </h2>
        <input type="hidden" {...register('paymentMethod')} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => {
                setSelectedPayment(method.id)
                setValue('paymentMethod', method.id as OrderFormData['paymentMethod'], { shouldValidate: true })
              }}
              disabled={loading}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                selectedPayment === method.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-200 bg-white hover:border-amber-300'
              }`}
            >
              <p className="text-2xl mb-1">{method.icon}</p>
              <p className={`text-sm font-medium ${selectedPayment === method.id ? 'text-amber-700' : 'text-slate-700'}`}>
                {method.label}
              </p>
            </button>
          ))}
        </div>
        {errors.paymentMethod && <p className="mt-1 text-xs text-red-600">{errors.paymentMethod.message}</p>}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional Notes — Optional</label>
        <textarea
          {...register('notes')}
          rows={3}
          className={inputClass}
          placeholder="Any special requirements, preferred delivery time, etc."
          disabled={loading}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 text-lg font-semibold rounded-xl"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={20} className="animate-spin" />
            Placing Order...
          </span>
        ) : (
          'Confirm Order →'
        )}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        By placing an order, our team will contact you within 24 hours to finalize and arrange delivery.
      </p>
    </form>
  )
}

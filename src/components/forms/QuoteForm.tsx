'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, CheckCircle, FileText, Loader2 } from 'lucide-react'
import { submitQuoteRequest } from '@/actions/contact'

const quoteSchema = z.object({
  name:            z.string().min(2, 'Name must be at least 2 characters'),
  email:           z.string().email('Please enter a valid email address'),
  phone:           z.string().regex(/^\d{10,}/, 'Phone must be at least 10 digits'),
  projectType:     z.enum(['residential', 'commercial', 'industrial']),
  estimatedBudget: z.string().optional(),
  description:     z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const inputCls = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-slate-800 bg-slate-50 placeholder-gray-400 outline-none transition-all duration-150 ${
    hasError
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100'
  }`

const PROJECT_TYPES = [
  { value: 'residential', label: 'Residential', sub: 'Home / House' },
  { value: 'commercial',  label: 'Commercial',  sub: 'Shop / Office / Plaza' },
  { value: 'industrial',  label: 'Industrial',  sub: 'Factory / Warehouse' },
]

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [loading,   setLoading]   = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  })

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true); setError(null)
    try {
      const result = await submitQuoteRequest({
        name: data.name, email: data.email, phone: data.phone,
        projectType: data.projectType, estimatedBudget: data.estimatedBudget, description: data.description,
      })
      if (result.success) { setSubmitted(true); reset(); setTimeout(() => setSubmitted(false), 6000) }
      else setError(result.error || 'Failed to submit quote request')
    } catch { setError('Something went wrong — please try again') }
    finally { setLoading(false) }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>
        <div>
          <p className="font-black text-xl text-slate-900 mb-1">Quote Request Received!</p>
          <p className="text-gray-500 text-sm">Our experts will send a detailed quote within 24 hours.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Name + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Full Name *</label>
          <input {...register('name')} type="text" placeholder="Your full name" disabled={loading} className={inputCls(!!errors.name)} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Phone *</label>
          <input {...register('phone')} type="tel" placeholder="03001234567" disabled={loading} className={inputCls(!!errors.phone)} />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Email *</label>
        <input {...register('email')} type="email" placeholder="email@example.com" disabled={loading} className={inputCls(!!errors.email)} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Project type — styled radio buttons */}
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Project Type *</label>
        <div className="grid grid-cols-1 gap-2">
          {PROJECT_TYPES.map((t) => (
            <label key={t.value} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
              <input {...register('projectType')} type="radio" value={t.value} disabled={loading} className="accent-emerald-600" />
              <div>
                <span className="text-sm text-slate-800 font-semibold">{t.label}</span>
                <span className="text-xs text-slate-400 ml-2">{t.sub}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.projectType && <p className="mt-1 text-xs text-red-500">Please select a project type</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
          Estimated Budget <span className="text-gray-400 normal-case font-normal">(optional)</span>
        </label>
        <input {...register('estimatedBudget')} type="text" placeholder="e.g. PKR 500,000" disabled={loading} className={inputCls(false)} />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
          Project Details <span className="text-gray-400 normal-case font-normal">(optional)</span>
        </label>
        <textarea {...register('description')} rows={3} placeholder="Property size, current electricity bill, any specific requirements..." disabled={loading} className={inputCls(false)} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3.5 rounded-2xl transition-colors text-sm mt-2"
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><FileText size={16} /> Request Free Quote</>}
      </button>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, CheckCircle, Send, Loader2 } from 'lucide-react'
import { submitContactForm } from '@/actions/contact'

const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const inputCls = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-slate-800 bg-slate-50 placeholder-gray-400 outline-none transition-all duration-150 ${
    hasError
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100'
  }`

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [loading,   setLoading]   = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true); setError(null)
    try {
      const result = await submitContactForm(data)
      if (result.success) { setSubmitted(true); reset(); setTimeout(() => setSubmitted(false), 6000) }
      else setError(result.error || 'Failed to submit — please try again')
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
          <p className="font-black text-xl text-slate-900 mb-1">Message Sent!</p>
          <p className="text-gray-500 text-sm">We will respond within 24 hours. Thank you!</p>
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

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Full Name *</label>
          <input {...register('name')} type="text" placeholder="Your full name" disabled={loading} className={inputCls(!!errors.name)} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Email *</label>
          <input {...register('email')} type="email" placeholder="email@example.com" disabled={loading} className={inputCls(!!errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Subject *</label>
        <input {...register('subject')} type="text" placeholder="What would you like to ask?" disabled={loading} className={inputCls(!!errors.subject)} />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Message *</label>
        <textarea {...register('message')} rows={5} placeholder="Write your message here..." disabled={loading} className={inputCls(!!errors.message)} />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3.5 rounded-2xl transition-colors text-sm mt-2"
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
      </button>
    </form>
  )
}

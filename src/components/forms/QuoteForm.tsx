'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitQuoteRequest } from '@/actions/contact'

const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10,}/, 'Phone must be at least 10 digits'),
  projectType: z.enum(['residential', 'commercial', 'industrial'], {
    errorMap: () => ({ message: 'Please select a project type' }),
  }),
  estimatedBudget: z.coerce
    .number()
    .optional()
    .refine((val) => !val || val >= 100000, 'Budget must be at least PKR 100,000'),
  description: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  })

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true)
    setError(null)

    try {
      const result = await submitQuoteRequest({
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        estimatedBudget: data.estimatedBudget,
        description: data.description,
      })

      if (result.success) {
        setSubmitted(true)
        reset()
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(result.error || 'Failed to submit quote request')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
      {/* Success Message */}
      {submitted && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-900">Quote request received!</p>
            <p className="text-sm text-green-700">Our team will contact you with a detailed quote within 24 hours.</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Full Name *
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Your name"
          disabled={loading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email Address *
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="your@email.com"
          disabled={loading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Phone Number *
        </label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="+92 300 1234567"
          disabled={loading}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Project Type Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Project Type *
        </label>
        <select
          {...register('projectType')}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          disabled={loading}
        >
          <option value="">Select project type</option>
          <option value="residential">Residential (Home)</option>
          <option value="commercial">Commercial (Shop/Office)</option>
          <option value="industrial">Industrial (Factory/Warehouse)</option>
        </select>
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
        )}
      </div>

      {/* Budget Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Estimated Budget (PKR) - Optional
        </label>
        <input
          {...register('estimatedBudget')}
          type="number"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="e.g., 500000"
          disabled={loading}
        />
        {errors.estimatedBudget && (
          <p className="mt-1 text-sm text-red-600">{errors.estimatedBudget.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Project Description - Optional
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Tell us about your project..."
          disabled={loading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 font-semibold rounded-lg"
      >
        {loading ? 'Submitting...' : 'Get Free Quote'}
      </Button>

      <p className="text-xs text-slate-500 text-center">
        We'll respond with a detailed quote within 24 hours
      </p>
    </form>
  )
}

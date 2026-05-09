'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { QuoteForm } from '@/components/forms/QuoteForm'

export function QuoteModal() {
  const { isQuoteModalOpen, setQuoteModalOpen } = useAppStore()

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuoteModalOpen(false)
    }
    if (isQuoteModalOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isQuoteModalOpen, setQuoteModalOpen])

  if (!isQuoteModalOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setQuoteModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Get a Free Quote</h2>
            <p className="text-sm text-slate-500">We'll respond within 24 hours</p>
          </div>
          <button
            onClick={() => setQuoteModalOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form — remove its own card wrapper padding since modal provides it */}
        <div className="p-6">
          <QuoteForm />
        </div>
      </div>
    </div>
  )
}

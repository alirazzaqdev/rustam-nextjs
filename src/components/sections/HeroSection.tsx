'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingDown, Clock, Leaf } from 'lucide-react'
import { useAppStore } from '@/lib/store'

const heroStats = [
  { value: '70%', label: 'Avg. bill reduction', icon: TrendingDown, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { value: '4 yrs', label: 'System payback', icon: Clock, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { value: '2.4 t', label: 'CO₂ saved per year', icon: Leaf, color: 'text-sky-600', bg: 'bg-sky-50' },
]


export function HeroSection() {
  const { setQuoteModalOpen } = useAppStore()

  return (
    <section id="hero" className="relative bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-4">
              Solar Energy Specialists · Lahore
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05] mb-6">
              Lahore&apos;s most<br />
              trusted{' '}
              <span className="text-emerald-600">solar energy</span><br />
              company
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              19 years serving Lahore homes and businesses.
              Solar panels, batteries, and inverters from world&apos;s top brands.
              Free site visit and consultation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Get Free Quote
                <ArrowRight size={18} />
              </button>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Explore Products
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-gray-100">
              {[
                'Est. 2006',
                '500+ Installations',
                'Kahna Nau, Lahore',
                'Free Site Visit',
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-xs text-gray-500 font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-2">
                What you save
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mb-6">
                Real numbers from our installations
              </h3>

              <div className="space-y-4">
                {heroStats.map(({ value, label, icon: Icon, color, bg }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={color} strokeWidth={2.25} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
                      <p className="text-sm text-gray-500 mt-1">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Based on a typical 5kW residential system in Lahore. Actual savings vary
                  by household consumption.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

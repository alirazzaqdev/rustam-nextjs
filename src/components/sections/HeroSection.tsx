'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingDown, Clock, Leaf } from 'lucide-react'
import { useAppStore } from '@/lib/store'

const heroStats = [
  { value: '70%', label: 'Avg. bill reduction', icon: TrendingDown, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { value: '4 yrs', label: 'System payback',    icon: Clock,        color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { value: '2.4 t', label: 'CO₂ saved / year',  icon: Leaf,         color: 'text-sky-600',    bg: 'bg-sky-50'    },
]

export function HeroSection() {
  const { setQuoteModalOpen } = useAppStore()

  return (
    <section id="hero" className="relative bg-white border-b border-gray-100 overflow-hidden">
      {/* Subtle background depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-white pointer-events-none" aria-hidden />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-100/25 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] bg-sky-100/20 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-[0.14em] uppercase">Solar Energy Specialists · Lahore</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.04] mb-6">
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

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5"
              >
                Get Free Quote
                <ArrowRight size={17} />
              </button>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center border border-gray-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
              >
                Explore Products
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-7 border-t border-gray-100">
              {[
                'Est. 2006',
                '500+ Installations',
                'Kahna Nau, Lahore',
                'Free Site Visit',
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-xs text-gray-500 font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Premium top accent */}
              <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

              <div className="p-8">
                <p className="text-emerald-600 text-xs font-bold tracking-[0.18em] uppercase mb-2">
                  What you save
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">
                  Real numbers from our installations
                </h3>

                <div className="space-y-3">
                  {heroStats.map(({ value, label, icon: Icon, color, bg }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/70 hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-200"
                    >
                      <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                        <Icon size={19} className={color} strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-2xl font-black text-slate-900 leading-none tracking-tight">{value}</p>
                        <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Based on a typical 5kW residential system in Lahore. Actual savings vary
                    by household consumption.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'

const heroStats = [
  { value: '70%',   label: 'Avg. bill reduction' },
  { value: '4 yrs', label: 'System payback'       },
  { value: '2.4 t', label: 'CO₂ saved / year'     },
]

export function HeroSection() {
  const { setQuoteModalOpen } = useAppStore()

  return (
    <section id="hero" aria-label="Hero section" className="relative bg-white border-b border-gray-100 overflow-hidden">

      {/* Thin premium amber accent at very top */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500 to-transparent pointer-events-none" aria-hidden />

      {/* Dot-grid texture — subtle, elegant */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.55,
        }}
        aria-hidden
      />

      {/* Warm amber orb — top right (sun glow) */}
      <div
        className="absolute -top-20 -right-20 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.13) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Cool blue orb — bottom left (contrast balance) */}
      <div
        className="absolute -bottom-16 -left-16 w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(186,230,253,0.22) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Label pill */}
            <div className="inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200/70 text-amber-700 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-[0.14em] uppercase">Solar Energy Specialists · Lahore</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.04] mb-6">
              Lahore&apos;s most<br />
              trusted{' '}
              <span className="text-amber-600">solar energy</span><br />
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
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-amber-200 hover:shadow-lg hover:shadow-amber-300 hover:-translate-y-0.5"
              >
                Get Free Quote
                <ArrowRight size={17} />
              </button>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center border border-gray-200 text-slate-700 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/60 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
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
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  <span className="text-xs text-gray-500 font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: 'easeOut' }}
            className="relative"
          >
            {/* Subtle warm glow behind card */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(251,191,36,0.10) 0%, transparent 70%)' }}
              aria-hidden
            />

            <div className="relative bg-white rounded-2xl border border-gray-200/80 shadow-[0_12px_48px_rgba(0,0,0,0.10)] overflow-hidden">
              {/* Amber → sky gradient top accent */}
              <div className="h-[3px] w-full bg-gradient-to-r from-amber-600 via-amber-400 to-sky-400" />

              <div className="p-8">
                <p className="text-amber-600 text-xs font-bold tracking-[0.18em] uppercase mb-2">
                  What you save
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">
                  Real numbers from our installations
                </h3>

                <div className="space-y-3">
                  {heroStats.map(({ value, label }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-200"
                    >
                      <p className="text-sm text-gray-500 font-medium">{label}</p>
                      <p className="text-2xl font-black text-slate-900 leading-none tracking-tight">{value}</p>
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

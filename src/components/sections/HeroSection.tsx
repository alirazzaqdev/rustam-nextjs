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

const trustStats = [
  { value: '19', label: 'Years' },
  { value: '500+', label: 'Installs' },
  { value: 'Lahore', label: 'Based' },
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

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.05] mb-6">
              Power your life with clean solar energy
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
              Trusted solar panels, batteries, and inverters from Pakistan&apos;s most
              experienced installer. Reduce your electricity bill by up to 70% with
              systems built to last.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
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

            {/* Trust stats */}
            <div className="flex items-center gap-8">
              {trustStats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div>
                    <p className="text-2xl font-black text-slate-900 leading-none">{s.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                  </div>
                  {i < trustStats.length - 1 && (
                    <div className="w-px h-10 bg-gray-200 ml-5" aria-hidden />
                  )}
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

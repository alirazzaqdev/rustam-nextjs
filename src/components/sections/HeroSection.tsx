'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { ArrowRight, CheckCircle, Star, MapPin, Wrench } from 'lucide-react'

const trustBadges = [
  { icon: CheckCircle, color: 'text-emerald-500', text: '500+ Installations' },
  { icon: Star,         color: 'text-amber-500',  text: '5-Star Reviews' },
  { icon: Wrench,       color: 'text-sky-500',    text: '19 Years Experience' },
  { icon: MapPin,       color: 'text-rose-500',   text: 'Lahore Based' },
]

/* ── Animated Solar Illustration ── */
function SolarIllustration() {
  return (
    <svg viewBox="0 0 500 500" className="w-full h-full" aria-hidden>
      {/* Sky gradient */}
      <defs>
        <radialGradient id="sun-glow" cx="50%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="panel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="cell-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.5"/>
        </linearGradient>
        <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D1FAE5"/>
          <stop offset="100%" stopColor="#A7F3D0"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="500" height="500" fill="#F0F9FF" rx="24"/>

      {/* Sun glow */}
      <circle cx="360" cy="120" r="120" fill="url(#sun-glow)" />

      {/* Sun */}
      <motion.circle
        cx="360" cy="120" r="44"
        fill="#F59E0B"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Sun rays */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 360 + 52 * Math.cos(rad)
        const y1 = 120 + 52 * Math.sin(rad)
        const x2 = 360 + 70 * Math.cos(rad)
        const y2 = 120 + 70 * Math.sin(rad)
        return (
          <motion.line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        )
      })}

      {/* Ground */}
      <rect x="0" y="380" width="500" height="120" fill="url(#ground)" rx="0"/>

      {/* House body */}
      <rect x="60" y="260" width="180" height="130" fill="#FAFAFA" stroke="#E2E8F0" strokeWidth="1.5"/>
      {/* Roof */}
      <polygon points="40,260 150,180 260,260" fill="#CBD5E1"/>
      {/* Door */}
      <rect x="125" y="330" width="50" height="60" fill="#94A3B8" rx="3"/>
      {/* Window */}
      <rect x="75" y="285" width="45" height="40" fill="#BAE6FD" rx="3"/>
      <rect x="170" y="285" width="45" height="40" fill="#BAE6FD" rx="3"/>

      {/* Solar Panels on roof */}
      {[0,1,2].map((i) => (
        <g key={i} transform={`translate(${70 + i * 44}, 210) rotate(-33)`}>
          <rect width="38" height="26" fill="url(#panel-grad)" rx="2"/>
          {/* Grid lines */}
          <line x1="12.6" y1="0" x2="12.6" y2="26" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.5"/>
          <line x1="25.2" y1="0" x2="25.2" y2="26" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.5"/>
          <line x1="0" y1="8.6" x2="38" y2="8.6" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.5"/>
          <line x1="0" y1="17.2" x2="38" y2="17.2" stroke="#3B82F6" strokeWidth="0.5" strokeOpacity="0.5"/>
          {/* Shine */}
          <motion.rect
            width="38" height="26" rx="2"
            fill="url(#cell-grad)"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
          />
        </g>
      ))}

      {/* Energy flow line house → battery */}
      <motion.path
        d="M240 340 Q310 340 320 320 Q330 300 360 295"
        fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="8 4"
        animate={{ strokeDashoffset: [0, -24] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Battery unit */}
      <rect x="340" y="270" width="110" height="70" fill="white" stroke="#E2E8F0" strokeWidth="1.5" rx="12"/>
      <rect x="445" y="292" width="8" height="26" fill="#E2E8F0" rx="2"/>
      {/* Battery fill */}
      <motion.rect
        x="348" y="278" height="54" rx="8"
        fill="#10B981"
        animate={{ width: [30, 90, 30] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Battery label */}
      <text x="395" y="310" textAnchor="middle" fill="#0F172A" fontSize="10" fontFamily="system-ui" fontWeight="700">BATTERY</text>
      <text x="395" y="325" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="system-ui">Charging</text>

      {/* Energy flow sun → panels (animated dots) */}
      {[0,1,2].map((i) => (
        <motion.circle
          key={i} r="4" fill="#F59E0B"
          animate={{
            cx: [340, 200, 150],
            cy: [120, 160, 210],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      {/* Savings badge */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="300" y="155" width="130" height="52" rx="12" fill="#0F172A"/>
        <text x="365" y="177" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="700" fontFamily="system-ui">Bill Reduced by</text>
        <text x="365" y="197" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="system-ui">70%</text>
      </motion.g>
    </svg>
  )
}

export function HeroSection() {
  const { setQuoteModalOpen } = useAppStore()

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-amber-50/60 rounded-bl-[80px]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-emerald-200/20 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Text */}
          <div>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                Lahore's Most Trusted Solar Company
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.05]"
            >
              Power Your Life<br />
              with{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Clean Solar
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-amber-200/60 rounded-full -z-0"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>{' '}
              Energy
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed"
            >
              19 years of trusted solar expertise in Lahore. Reduce your electricity bill by up to <strong className="text-slate-700">70%</strong> with our premium solar systems.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg shadow-amber-200 hover:shadow-amber-300 transition-all duration-200"
              >
                Get Free Quote
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200"
              >
                Explore Products
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {trustBadges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                  <b.icon size={16} className={b.color} />
                  <span className="text-sm font-semibold text-slate-700">{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[540px] flex items-center justify-center"
          >
            <SolarIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

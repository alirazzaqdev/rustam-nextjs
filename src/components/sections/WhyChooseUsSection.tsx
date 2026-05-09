'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ShieldCheck, Award, PackageCheck, HeadphonesIcon,
  Lightbulb, Clock, Wrench, Leaf
} from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: '19 Years of Expertise',
    desc: 'Since 2006, we have powered hundreds of homes and businesses across Lahore with reliable solar solutions.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: PackageCheck,
    title: 'Original Products Only',
    desc: 'We stock genuine, certified solar panels, batteries, and inverters — no counterfeits, ever.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: ShieldCheck,
    title: 'Full Warranty Support',
    desc: 'Every product comes with manufacturer warranty. We handle all warranty claims on your behalf.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
  {
    icon: Lightbulb,
    title: 'Free Expert Consultation',
    desc: 'Our engineers assess your site and design the perfect system — no cost, no obligation.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    icon: Wrench,
    title: 'Licensed Engineers',
    desc: 'Every installation is done by certified technicians following NEPRA safety standards.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
  {
    icon: HeadphonesIcon,
    title: 'After-Sales Service',
    desc: '24/7 WhatsApp support and scheduled AMC visits to keep your system running at peak performance.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    icon: Clock,
    title: 'Fast Installation',
    desc: 'Residential systems installed in 3–5 days. We handle permits, net metering, and inspections.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Impact',
    desc: 'Every system we install reduces Pakistan\'s carbon footprint. Go green, save money, help the planet.',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
]

export function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why-us" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-slate-900 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Why Rustam Battery?
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Built on Trust,<br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Backed by 19 Years
            </span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            We don't just sell solar — we build long-term energy partnerships with every customer in Lahore
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group border ${r.border} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
            >
              <div className={`w-12 h-12 ${r.bg} rounded-xl flex items-center justify-center mb-4`}>
                <r.icon size={22} className={r.color} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-base">{r.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 mb-4">Ready to switch to solar?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg shadow-amber-100 transition-all"
          >
            Book Free Consultation →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

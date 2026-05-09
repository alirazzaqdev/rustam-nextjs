'use client'

import type { ElementType } from 'react'
import { Compass, Wrench, Shield, BarChart3, BatteryCharging, ArrowRight } from 'lucide-react'
import type { Service } from '@/types'

interface ServicesSectionProps {
  services: Service[]
}

const iconConfig: Record<string, { icon: ElementType; gradient: string; iconColor: string; bgLight: string }> = {
  'system-design-consultation': {
    icon: Compass,
    gradient: 'from-amber-400 to-orange-500',
    iconColor: 'text-amber-600',
    bgLight: 'bg-amber-50',
  },
  'professional-installation': {
    icon: Wrench,
    gradient: 'from-sky-400 to-blue-600',
    iconColor: 'text-sky-600',
    bgLight: 'bg-sky-50',
  },
  'maintenance-support': {
    icon: Shield,
    gradient: 'from-emerald-400 to-green-600',
    iconColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
  },
  'performance-monitoring': {
    icon: BarChart3,
    gradient: 'from-violet-400 to-purple-600',
    iconColor: 'text-violet-600',
    bgLight: 'bg-violet-50',
  },
  'battery-backup': {
    icon: BatteryCharging,
    gradient: 'from-rose-400 to-red-600',
    iconColor: 'text-rose-600',
    bgLight: 'bg-rose-50',
  },
}

const defaultConfig: { icon: ElementType; gradient: string; iconColor: string; bgLight: string } = {
  icon: Wrench,
  gradient: 'from-slate-400 to-slate-600',
  iconColor: 'text-slate-600',
  bgLight: 'bg-slate-50',
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            End-to-end solar solutions — from expert design to installation, monitoring, and lifetime support
          </p>
        </div>

        {services.length > 0 ? (
          <>
            {/* Featured first service — wide banner */}
            {(() => {
              const first = services[0]
              const cfg = iconConfig[first.slug] || defaultConfig
              const Icon = cfg.icon
              return (
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${cfg.gradient} p-8 md:p-10 mb-8 text-white`}>
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold">{first.name}</h3>
                        {first.featured && (
                          <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <p className="text-white/85 text-lg leading-relaxed max-w-2xl">{first.description}</p>
                    </div>
                    <button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex-shrink-0 flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
                    >
                      Get Started <ArrowRight size={16} />
                    </button>
                  </div>
                  {/* Decorative circle */}
                  <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full" />
                  <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
                </div>
              )
            })()}

            {/* Remaining services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.slice(1).map((service) => {
                const cfg = iconConfig[service.slug] || defaultConfig
                const Icon = cfg.icon
                return (
                  <div
                    key={service.id}
                    className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className={`w-12 h-12 ${cfg.bgLight} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon size={22} className={cfg.iconColor} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-base">{service.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                    {service.featured && (
                      <span className={`inline-block mt-4 text-xs font-semibold ${cfg.iconColor} ${cfg.bgLight} px-2.5 py-1 rounded-full`}>
                        ⭐ Popular
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench size={28} className="text-amber-600" />
            </div>
            <p className="text-slate-500">Services will appear once database is seeded.</p>
          </div>
        )}

        {/* Bottom CTA strip */}
        <div className="mt-10 bg-slate-900 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-lg">Need a custom solution?</p>
            <p className="text-slate-400 text-sm">We design systems for every budget and requirement</p>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  )
}

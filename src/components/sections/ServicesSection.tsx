'use client'

import type { ElementType } from 'react'
import { Compass, Wrench, Shield, BarChart3, BatteryCharging, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Service } from '@/types'

interface ServicesSectionProps {
  services: Service[]
}

const iconMap: Record<string, ElementType> = {
  'system-design-consultation': Compass,
  'professional-installation': Wrench,
  'maintenance-support': Shield,
  'performance-monitoring': BarChart3,
  'battery-backup': BatteryCharging,
}

// Static fallback so the section always looks complete
const FALLBACK_SERVICES: Service[] = [
  { id: 's1', name: 'System Design & Consultation', slug: 'system-design-consultation', description: 'Custom solar system sizing for your home or business based on actual usage and roof area.', featured: true },
  { id: 's2', name: 'Professional Installation', slug: 'professional-installation', description: 'Certified technicians install your system in 1–2 days with quality wiring and structural mounting.', featured: false },
  { id: 's3', name: 'Maintenance & Support', slug: 'maintenance-support', description: 'Annual cleaning, inspection, and 24/7 support to keep your system running at peak performance.', featured: false },
  { id: 's4', name: 'Performance Monitoring', slug: 'performance-monitoring', description: 'Track real-time output and savings via smartphone — get alerted before any issue.', featured: false },
  { id: 's5', name: 'Battery Backup Solutions', slug: 'battery-backup', description: 'Run your home through load-shedding with lithium battery backup tailored to your needs.', featured: false },
]

export function ServicesSection({ services }: ServicesSectionProps) {
  const items = services.length > 0 ? services : FALLBACK_SERVICES

  return (
    <section id="services" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="What we offer"
          title="End-to-end solar solutions"
          description="From expert design to installation, monitoring, and lifetime support — everything you need from a single trusted team."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 6).map((service, idx) => {
            const Icon = iconMap[service.slug] || Wrench
            const isFirst = idx === 0
            return (
              <div
                key={service.id}
                className={`group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${
                  isFirst ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                }`}
              >
                <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-emerald-700" strokeWidth={2.25} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                  {service.name}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed line-clamp-2 mb-5">
                  {service.description}
                </p>

                <button
                  type="button"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-amber-700 transition-colors"
                >
                  Learn more
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

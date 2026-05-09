'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Service } from '@/types'

interface ServicesSectionProps {
  services: Service[]
}

const iconMap: Record<string, string> = {
  '📐': '📐',
  '🔧': '🔧',
  '🛠️': '🛠️',
  '📊': '📊',
  '🔋': '🔋',
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Services</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Complete solutions from design to installation and ongoing support
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-shadow flex flex-col"
              >
                <CardHeader>
                  <div className="text-5xl mb-4">
                    {iconMap[service.icon || '📐'] || '⚡'}
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-slate-600">{service.description}</p>
                </CardContent>

                {service.featured && (
                  <div className="px-6 py-3 bg-amber-50 border-t border-slate-200">
                    <p className="text-sm font-semibold text-amber-700">
                      ⭐ Popular Service
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">
              Services will appear here once database is configured and seeded.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

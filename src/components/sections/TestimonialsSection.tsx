'use client'

import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const featured = testimonials.filter((t) => t.featured)

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            What Our Customers Say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real experiences from satisfied customers across Lahore
          </p>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                      <Star
                        key={i + testimonial.rating}
                        size={18}
                        className="text-slate-300"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 mb-4 italic">"{testimonial.content}"</p>

                  {/* Author */}
                  <div className="border-t border-slate-200 pt-4">
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    {testimonial.title && (
                      <p className="text-sm text-slate-600">{testimonial.title}</p>
                    )}
                    {testimonial.company && (
                      <p className="text-sm text-slate-500">{testimonial.company}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">
              Testimonials will appear here once database is configured and seeded.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

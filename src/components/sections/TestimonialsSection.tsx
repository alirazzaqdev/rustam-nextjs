'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const avatarColors = [
  'from-amber-400 to-orange-500',
  'from-sky-400 to-blue-500',
  'from-emerald-400 to-green-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-500',
]

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const featured = testimonials.filter((t) => t.featured)
  const all = featured.length > 0 ? featured : testimonials
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i === 0 ? all.length - 1 : i - 1))
  const next = () => setActive((i) => (i === all.length - 1 ? 0 : i + 1))

  const totalRatings = all.length
  const avgRating = all.length
    ? (all.reduce((s, t) => s + t.rating, 0) / all.length).toFixed(1)
    : '5.0'

  if (all.length === 0) return null

  return (
    <section id="testimonials" className="py-24 px-4 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Customer Reviews
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            Real experiences from homeowners, businesses, and factories across Lahore
          </p>

          {/* Rating summary */}
          <div className="inline-flex items-center gap-3 mt-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
            <div className="flex gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">{avgRating}</span>
            <span className="text-slate-400 text-sm">from {totalRatings} reviews</span>
          </div>
        </div>

        {/* Featured large card — active */}
        <div className="relative mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative">
              {/* Big quote icon */}
              <Quote size={56} className="text-amber-500/30 absolute top-6 right-8" />

              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {Array.from({ length: all[active].rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                ))}
                {Array.from({ length: 5 - all[active].rating }).map((_, i) => (
                  <Star key={i} size={20} className="text-slate-600" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white text-xl md:text-2xl leading-relaxed font-light mb-8">
                &ldquo;{all[active].content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarColors[active % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">
                    {getInitials(all[active].name)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{all[active].name}</p>
                  <p className="text-amber-400 text-sm font-medium">{all[active].title}</p>
                  {all[active].company && (
                    <p className="text-slate-400 text-sm">{all[active].company}</p>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                <div className="flex gap-2">
                  {all.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`rounded-full transition-all ${
                        i === active
                          ? 'w-8 h-2.5 bg-amber-500'
                          : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-amber-500 text-white transition-colors flex items-center justify-center"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-amber-500 text-white transition-colors flex items-center justify-center"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small thumbnail cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {all.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`text-left p-4 rounded-2xl border transition-all ${
                i === active
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-xs">{getInitials(t.name)}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{t.name}</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-xs line-clamp-2">{t.content}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

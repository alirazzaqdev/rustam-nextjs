import { Star } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const avatarColors = [
  'from-amber-500 to-orange-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
]

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ahmad Hassan',
    title: 'Homeowner',
    company: 'DHA Phase 5, Lahore',
    content: 'Best decision we made. Our electricity bill dropped from PKR 22,000 to PKR 4,000 a month. Installation was done in two days and the team explained everything clearly.',
    rating: 5,
    featured: true,
  },
  {
    id: 't2',
    name: 'Fatima Khan',
    title: 'Business Owner',
    company: 'Gulberg, Lahore',
    content: 'I run a small office and the load-shedding was hurting business. The hybrid system Rustam installed kept us running through every outage. Highly professional team.',
    rating: 5,
    featured: true,
  },
  {
    id: 't3',
    name: 'Sohail Malik',
    title: 'Factory Owner',
    company: 'Kahna Nau Industrial',
    content: 'Installed a 25kW commercial system for our factory. The savings paid back the cost in three years. Quality of components and workmanship is excellent.',
    rating: 5,
    featured: true,
  },
]

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const featured = testimonials.filter((t) => t.featured)
  const items = (featured.length > 0 ? featured : testimonials).slice(0, 3)
  const list = items.length > 0 ? items : FALLBACK_TESTIMONIALS

  return (
    <section id="testimonials" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Customer Reviews"
          title="What our customers say"
          description="Real experiences from homeowners, businesses, and factories across Lahore."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((t, i) => (
            <article
              key={t.id}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={18}
                    className={s < t.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-200'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-gray-700 italic leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-bold text-sm">{initials(t.name)}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{t.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {t.title}{t.company ? ` · ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

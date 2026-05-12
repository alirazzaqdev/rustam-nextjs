import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

const STATIC_TESTIMONIALS = [
  {
    name: 'Haji Muhammad Akram',
    role: 'Homeowner',
    location: 'DHA Phase 5, Lahore',
    initials: 'HA',
    color: 'bg-emerald-700',
    text: 'Rustam Battery ne hamara 10kW ka solar system install kiya. Bijli ka bill PKR 25,000 se seedha PKR 2,500 per aa gaya. Kaam bilkul perfect tha aur team ne 2 din mein sab complete kar diya. Bohat khush hun.',
    system: '10kW Hybrid System',
    saving: '90% bill reduction',
  },
  {
    name: 'Ch. Naveed Ahmed',
    role: 'Factory Owner',
    location: 'Kot Lakhpat Industrial Area, Lahore',
    initials: 'CN',
    color: 'bg-emerald-600',
    text: 'Our factory was spending PKR 4 lakh monthly on electricity. After installing a 50kW system from Rustam Battery, we now pay under PKR 40,000. ROI achieved in under 3 years. Highly professional team, original products, and excellent after-sales support.',
    system: '50kW Commercial System',
    saving: 'PKR 3.6L monthly savings',
  },
  {
    name: 'Dr. Fatima Siddiqui',
    role: 'Clinic Owner',
    location: 'Gulberg III, Lahore',
    initials: 'FS',
    color: 'bg-slate-700',
    text: 'For my clinic, uninterrupted power is critical. Rustam Battery installed a hybrid system with Knox batteries. Even during 8 hours of load-shedding, our clinic runs perfectly. The team was professional, clean, and completed work without any disruption to patients.',
    system: '7kW Hybrid + Knox Batteries',
    saving: 'Zero downtime during outages',
  },
  {
    name: 'Rana Kashif Mahmood',
    role: 'Property Developer',
    location: 'Bahria Town, Lahore',
    initials: 'RK',
    color: 'bg-amber-600',
    text: 'We installed solar systems in 12 houses of our housing project through Rustam Battery. Muhammad Rustam personally supervised everything. All systems working perfectly after 2 years. Residents are saving 70-80% on bills. Best decision for our project.',
    system: '12 Units — 5kW each',
    saving: 'Complete housing project',
  },
  {
    name: 'Muhammad Tariq',
    role: 'Shop Owner',
    location: 'Kahna Nau Market, Lahore',
    initials: 'MT',
    color: 'bg-emerald-600',
    text: 'Hamare area mein Rustam Battery ka naam sab jaante hain. Maine unse AGS batteries li hain 3 saal pehle — abhi bhi perfectly kaam kar rahi hain. Service bohat acha hai, genuine products dete hain aur price bhi fair hai. Seedha in se lena chahiye.',
    system: 'AGS Battery Backup',
    saving: '3 years trouble-free',
  },
  {
    name: 'Engr. Salman Rauf',
    role: 'Solar Consultant',
    location: 'Model Town, Lahore',
    initials: 'SR',
    color: 'bg-slate-700',
    text: 'As a solar engineer myself, I refer all my residential clients to Rustam Battery for supply. Their product quality is genuine, pricing is transparent, and the team actually knows what they are doing. Muhammad Shahbaz handles technical queries excellently. Strongly recommended.',
    system: 'Multiple Projects Referred',
    saving: 'Trusted supplier',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection({ testimonials: _ }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background texture hint */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-50 pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-emerald-500 inline-block" />
            <p className="text-emerald-600 text-xs font-bold tracking-[0.18em] uppercase">
              Customer Reviews
            </p>
            <span className="h-px w-6 bg-emerald-500 inline-block" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            What Lahore Customers Say About Our Solar Systems
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Real experiences from homeowners, businesses, and factories across Lahore — since 2006.
          </p>

          {/* Rating summary */}
          <div className="inline-flex items-center gap-3 mt-7 bg-white border border-amber-100 rounded-full px-5 py-2.5 shadow-sm">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xl font-black text-slate-900">5.0</span>
            <span className="text-gray-400 text-sm font-medium">· 500+ happy customers</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STATIC_TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Top row: stars */}
              <div className="flex items-center justify-between mb-4">
                <Stars />
                {/* Decorative quotation mark */}
                <svg className="w-8 h-8 text-emerald-100 group-hover:text-emerald-200 transition-colors fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                {t.text}
              </p>

              {/* System + saving badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-lg border border-emerald-100">
                  {t.system}
                </span>
                <span className="text-[11px] bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-lg border border-amber-100">
                  {t.saving}
                </span>
              </div>

              <div className="h-px bg-gray-100 mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white font-black text-xs flex-shrink-0 ring-2 ring-white ring-offset-1`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-tight">{t.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

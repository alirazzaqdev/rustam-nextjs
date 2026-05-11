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
    color: 'bg-blue-600',
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
    color: 'bg-purple-600',
    text: 'For my clinic, uninterrupted power is critical. Rustam Battery installed a hybrid system with Knox batteries. Even during 8 hours of load-shedding, our clinic runs perfectly. The team was professional, clean, and completed work without any disruption to patients.',
    system: '7kW Hybrid + Knox Batteries',
    saving: 'Zero downtime during outages',
  },
  {
    name: 'Rana Kashif Mahmood',
    role: 'Property Developer',
    location: 'Bahria Town, Lahore',
    initials: 'RK',
    color: 'bg-orange-600',
    text: 'We installed solar systems in 12 houses of our housing project through Rustam Battery. Muhammad Rustam personally supervised everything. All systems working perfectly after 2 years. Residents are saving 70-80% on bills. Best decision for our project.',
    system: '12 Units — 5kW each',
    saving: 'Complete housing project',
  },
  {
    name: 'Muhammad Tariq',
    role: 'Shop Owner',
    location: 'Kahna Nau Market, Lahore',
    initials: 'MT',
    color: 'bg-teal-600',
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
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection({ testimonials: _ }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[5px] text-emerald-600 uppercase mb-3">
            CUSTOMER REVIEWS
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            What our customers say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real experiences from homeowners, businesses, and factories across Lahore — since 2006.
          </p>

          {/* Star rating summary */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-6 h-6 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-2xl font-black text-slate-900">5.0</span>
            <span className="text-gray-400 text-sm">· 500+ happy customers</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATIC_TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Stars />

              <p className="text-gray-600 text-sm leading-relaxed my-4 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-lg border border-emerald-100">
                  {t.system}
                </span>
                <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-lg border border-amber-100">
                  {t.saving}
                </span>
              </div>

              <div className="h-px bg-gray-100 mb-4" />

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

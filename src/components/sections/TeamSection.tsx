import { Award, Wrench, HeadphonesIcon, TrendingUp } from 'lucide-react'
import type { ElementType } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface Member {
  name: string
  initials: string
  title: string
  bio: string
  icon: ElementType
  experience?: string
}

const owner: Member = {
  name: 'Muhammad Rustam',
  initials: 'MR',
  title: 'Founder & Owner',
  experience: '19 Years Experience',
  bio: 'Muhammad Rustam founded Rustam Battery & Solar Energy House with a vision to bring reliable, affordable solar solutions to Lahore. With 19 years of hands-on expertise, he personally oversees every project to ensure the highest quality standards.',
  icon: Award,
}

const staff: Member[] = [
  {
    name: 'Ahmad Khan',
    initials: 'AK',
    title: 'Senior Installation Engineer',
    bio: 'Specialist in residential and commercial solar system installation with over 8 years of field experience across Lahore.',
    icon: Wrench,
  },
  {
    name: 'Sohail Malik',
    initials: 'SM',
    title: 'Technical Advisor',
    bio: 'Expert in system design, inverter configuration, and battery management. Ensures every installation is optimized for maximum efficiency.',
    icon: TrendingUp,
  },
  {
    name: 'Usman Farooq',
    initials: 'UF',
    title: 'Customer Support Manager',
    bio: 'Dedicated to after-sales service, warranty support, and maintenance. Available 6 days a week to resolve any customer issue.',
    icon: HeadphonesIcon,
  },
]

export function TeamSection() {
  return (
    <section id="team" className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Team"
          title="The people behind Rustam Battery"
          description="A dedicated team of solar energy professionals committed to powering Lahore with clean, reliable energy."
        />

        {/* Owner — featured */}
        <div className="mt-12 bg-white border border-gray-100 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-600 to-orange-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-2xl select-none">{owner.initials}</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                {owner.experience}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{owner.name}</h3>
            <p className="text-emerald-700 font-semibold text-sm mb-4">{owner.title}</p>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl">{owner.bio}</p>
          </div>
        </div>

        {/* Staff grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {staff.map((member) => {
            const Icon = member.icon
            return (
              <div
                key={member.name}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-600 to-orange-600 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-2xl select-none">{member.initials}</span>
                  </div>
                  <div className="bg-emerald-100 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-emerald-700" strokeWidth={2.25} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 tracking-tight">{member.name}</h3>
                <p className="text-emerald-700 font-semibold text-sm mb-3">{member.title}</p>
                <p className="text-base text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

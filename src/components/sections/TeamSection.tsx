import { Award, Wrench, HeadphonesIcon, TrendingUp } from 'lucide-react'

const owner = {
  name: 'Muhammad Rustam',
  title: 'Founder & Owner',
  experience: '19 Years Experience',
  bio: 'Muhammad Rustam founded Rustam Battery & Solar Energy House with a vision to bring reliable, affordable solar solutions to Lahore. With 19 years of hands-on expertise, he personally oversees every project to ensure the highest quality standards.',
  photo: '/team/owner.svg',
  icon: Award,
  iconColor: 'text-amber-600',
  iconBg: 'bg-amber-100',
}

const staff = [
  {
    name: 'Ahmad Khan',
    title: 'Senior Installation Engineer',
    bio: 'Specialist in residential and commercial solar system installation with over 8 years of field experience across Lahore.',
    photo: '/team/staff1.svg',
    icon: Wrench,
    iconColor: 'text-sky-600',
    iconBg: 'bg-sky-100',
  },
  {
    name: 'Sohail Malik',
    title: 'Technical Advisor',
    bio: 'Expert in system design, inverter configuration, and battery management. Ensures every installation is optimized for maximum efficiency.',
    photo: '/team/staff2.svg',
    icon: TrendingUp,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
  },
  {
    name: 'Usman Farooq',
    title: 'Customer Support Manager',
    bio: 'Dedicated to after-sales service, warranty support, and maintenance. Available 6 days a week to resolve any customer issue.',
    photo: '/team/staff3.svg',
    icon: HeadphonesIcon,
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-100',
  },
]

export function TeamSection() {
  return (
    <section id="team" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            The People Behind Rustam Battery
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A dedicated team of solar energy professionals committed to powering Lahore with clean, reliable energy
          </p>
        </div>

        {/* Owner — featured full-width card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center gap-8">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden ring-4 ring-amber-200 shadow-xl">
              <img
                src={owner.photo}
                alt={owner.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className={`w-9 h-9 ${owner.iconBg} rounded-lg flex items-center justify-center`}>
                <owner.icon size={18} className={owner.iconColor} />
              </div>
              <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                {owner.experience}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{owner.name}</h3>
            <p className="text-amber-600 font-semibold mb-4">{owner.title}</p>
            <p className="text-slate-600 leading-relaxed max-w-xl">{owner.bio}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-6">
              {['Solar Systems', 'Battery Storage', 'System Design', 'Quality Assurance'].map((tag) => (
                <span key={tag} className="text-xs font-medium bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Staff — 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staff.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              {/* Photo */}
              <div className="w-32 h-32 rounded-xl overflow-hidden ring-2 ring-slate-100 mb-5 shadow">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Role icon */}
              <div className={`w-9 h-9 ${member.iconBg} rounded-lg flex items-center justify-center mb-3`}>
                <member.icon size={18} className={member.iconColor} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-0.5">{member.name}</h3>
              <p className={`text-sm font-semibold mb-3 ${member.iconColor}`}>{member.title}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-400 text-sm mt-10">
          📸 Team photos coming soon — replacing placeholders with real portraits
        </p>
      </div>
    </section>
  )
}

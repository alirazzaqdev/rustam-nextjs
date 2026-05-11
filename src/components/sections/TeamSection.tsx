'use client'

const teamMembers = [
  {
    id: 1,
    name: 'Muhammad Rustam',
    role: 'Founder & Owner',
    since: 'Est. 2006',
    experience: '19 Years',
    badge: 'Founder',
    image: '/team/rustam.png',
    initials: 'MR',
    description:
      'Founded Rustam Battery & Solar Energy House in 2006. With 19 years of hands-on expertise, he personally oversees every project to guarantee quality and customer satisfaction.',
    tags: ['Leadership', 'Quality Assurance', 'Client Relations'],
    isFounder: true,
  },
  {
    id: 2,
    name: 'Muhammad Shahbaz Ahmad',
    role: 'Solar & Inverter Specialist',
    since: '',
    experience: 'Solar Expert',
    badge: 'Solar Expert',
    image: '/team/shahbaz.png',
    initials: 'MS',
    description:
      'Expert in solar panel and Knox inverter sales, installation, and technical support. Go-to person for system sizing and configuration.',
    tags: ['Solar Panels', 'Knox Inverters', 'Knox Batteries'],
    isFounder: false,
  },
  {
    id: 3,
    name: 'Muhammad Nawaz',
    role: 'Battery Solutions Expert',
    since: '',
    experience: 'Battery Expert',
    badge: 'Battery Expert',
    image: '/team/nawaz.png',
    initials: 'MN',
    description:
      'Specialist in lead-acid and tubular batteries. Handles Osaka, Phoenix, AGS and Alaska brand sales and after-sales service.',
    tags: ['Osaka', 'Phoenix', 'AGS', 'Alaska'],
    isFounder: false,
  },
  {
    id: 4,
    name: 'Muhammad Ijaz',
    role: 'Battery Solutions Expert',
    since: '',
    experience: 'Battery Expert',
    badge: 'Battery Expert',
    image: null,
    initials: 'MI',
    description:
      'Helps customers find the right battery solution. Manages sales, support, and maintenance coordination for all battery brands.',
    tags: ['Osaka', 'Phoenix', 'AGS', 'Alaska'],
    isFounder: false,
  },
]

export function TeamSection() {
  const founder = teamMembers.filter((m) => m.isFounder)
  const staff   = teamMembers.filter((m) => !m.isFounder)

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs font-bold tracking-[5px] text-emerald-600 uppercase mb-4">
            OUR TEAM
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              The people powering<br />
              <span className="text-emerald-600">Lahore&apos;s solar future</span>
            </h2>
            <p className="text-gray-500 max-w-sm leading-relaxed text-sm md:text-right">
              A dedicated team with decades of combined experience in solar energy, batteries and inverter solutions.
            </p>
          </div>
          <div className="mt-8 h-px bg-gray-100 w-full" />
        </div>

        {/* Founder card */}
        {founder.map((member) => (
          <div
            key={member.id}
            className="mb-10 grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl"
          >
            {/* Photo */}
            <div className="lg:col-span-3 bg-slate-50 flex items-center justify-center p-10 min-h-[280px]">
              <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-600 flex items-center justify-center text-white font-black text-5xl tracking-tight">
                    {member.initials}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-9 bg-white p-8 lg:p-12 flex flex-col justify-center border-t border-gray-100 lg:border-t-0 lg:border-l">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-1 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-600 text-sm font-bold tracking-wide uppercase">
                    {member.role}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg">
                    {member.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                    {member.since} · {member.experience}
                  </span>
                </div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4">
                {member.name}
              </h3>

              <p className="text-gray-500 leading-relaxed text-base mb-7 max-w-2xl">
                {member.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {member.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-slate-500 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Staff grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {staff.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-gray-100 overflow-hidden hover:border-emerald-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white group"
            >
              {/* Photo area */}
              <div className="bg-slate-50 py-8 flex justify-center border-b border-gray-100">
                <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform duration-300">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white font-black text-2xl tracking-tight">
                      {member.initials}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3.5 w-0.5 bg-emerald-500 rounded-full" />
                    <span className="text-emerald-600 text-xs font-bold tracking-wide uppercase">
                      {member.role}
                    </span>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md">
                    {member.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight tracking-tight">
                  {member.name}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {member.description}
                </p>

                <div className="h-px bg-gray-100 mb-4" />

                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

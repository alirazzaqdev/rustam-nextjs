'use client'

import Image from 'next/image'
import { Award, Star, Users } from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: 'Muhammad Rustam',
    role: 'Founder & Owner',
    since: 'Est. 2016',
    experience: '10+ Years',
    badge: 'Founder',
    badgeColor: 'bg-amber-500 text-white',
    image: '/team/rustam.jpg',
    objectPos: 'center 25%',
    initials: 'MR',
    gradientFrom: 'from-emerald-700',
    gradientTo: 'to-slate-800',
    description:
      'Founded Rustam Battery & Solar Energy House in 2016. With 10 years of hands-on expertise, he personally oversees every project to guarantee quality and customer satisfaction.',
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
    badgeColor: 'bg-emerald-600 text-white',
    image: '/team/shahbaz.jpg',
    objectPos: 'center 15%',
    initials: 'MS',
    gradientFrom: 'from-slate-700',
    gradientTo: 'to-slate-800',
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
    badgeColor: 'bg-emerald-600 text-white',
    image: '/team/nawaz.png',
    objectPos: 'center 10%',
    initials: 'MN',
    gradientFrom: 'from-emerald-700',
    gradientTo: 'to-slate-700',
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
    badgeColor: 'bg-emerald-600 text-white',
    image: '/team/ijaz.png',
    objectPos: 'center 10%',
    initials: 'MI',
    gradientFrom: 'from-slate-700',
    gradientTo: 'to-emerald-800',
    description:
      'Helps customers find the right battery solution. Manages sales, support, and maintenance coordination for all battery brands.',
    tags: ['Osaka', 'Phoenix', 'AGS', 'Alaska'],
    isFounder: false,
  },
]

export function TeamSection() {
  const founder = teamMembers.filter((m) => m.isFounder)[0]
  const staff   = teamMembers.filter((m) => !m.isFounder)

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
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

        {/* Founder — horizontal card, photo fills left panel */}
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">

          {/* Photo fills the entire left column */}
          <div className="lg:col-span-4 relative min-h-[360px]">
            {founder.image ? (
              <>
                <Image
                  src={founder.image}
                  alt={`${founder.name} — ${founder.role}`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: founder.objectPos ?? 'center 20%' }}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                {/* Subtle gradient overlay at bottom for visual polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${founder.gradientFrom} ${founder.gradientTo} flex flex-col items-center justify-center`}>
                <span className="text-8xl font-black text-white/20 select-none">{founder.initials}</span>
              </div>
            )}

            {/* Badge pinned on photo */}
            <div className="absolute top-4 left-4">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${founder.badgeColor}`}>
                <Award className="inline w-3 h-3 mr-1" />{founder.badge}
              </span>
            </div>

            {/* Name overlay at bottom of photo */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white/70 text-xs font-bold tracking-widest uppercase">{founder.experience} · {founder.since}</p>
              <h3 className="text-white text-2xl font-black leading-tight drop-shadow-lg">{founder.name}</h3>
              <p className="text-emerald-300 text-sm font-semibold">{founder.role}</p>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-8 bg-white p-8 lg:p-12 flex flex-col justify-center border-t border-gray-100 lg:border-t-0 lg:border-l">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-5 w-1 bg-emerald-500 rounded-full" />
              <span className="text-emerald-600 text-sm font-bold tracking-wide uppercase">About {founder.name.split(' ')[1]}</span>
            </div>

            <p className="text-gray-600 leading-relaxed text-base mb-8 max-w-2xl">
              {founder.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-slate-50 rounded-2xl">
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-600">10+</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Years Experience</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-2xl font-black text-emerald-600">500+</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Installations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-600">2016</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Established</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {founder.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold text-slate-600 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Staff grid — photos fill card top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staff.map((member) => (
            <div
              key={member.id}
              className="rounded-3xl border border-gray-100 overflow-hidden hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-white group"
            >
              {/* Full-width photo area */}
              <div className="relative h-60 overflow-hidden">
                {member.image ? (
                  <>
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: member.objectPos ?? 'center 10%' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                  </>
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} flex flex-col items-center justify-center`}>
                    <span className="text-7xl font-black text-white/15 select-none">{member.initials}</span>
                    <Users className="w-10 h-10 text-white/30 mt-2" />
                  </div>
                )}

                {/* Badge on photo */}
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-lg ${member.badgeColor}`}>
                    {member.badge}
                  </span>
                </div>

                {/* Name overlay at bottom of photo */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-emerald-300 text-xs font-bold tracking-widest uppercase">{member.role}</p>
                  <h3 className="text-white text-lg font-black leading-tight drop-shadow">{member.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span key={tag} className="text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-400">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span>All team members are certified in solar installation and safety by relevant Pakistani authorities</span>
          <Star size={14} className="text-amber-400 fill-amber-400" />
        </div>
      </div>
    </section>
  )
}

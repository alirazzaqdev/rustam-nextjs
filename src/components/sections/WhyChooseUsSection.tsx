import {
  ShieldCheck, Award, PackageCheck, HeadphonesIcon,
  Lightbulb, Clock, Wrench, Leaf
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const reasons = [
  { icon: Award,         title: '19 Years of Expertise',     desc: 'Since 2006, we have powered hundreds of homes and businesses across Lahore.' },
  { icon: PackageCheck,  title: 'Original Products Only',    desc: 'Genuine, certified solar panels, batteries, and inverters from trusted brands.' },
  { icon: ShieldCheck,   title: 'Full Warranty Support',     desc: 'Manufacturer warranty on every product. We handle all warranty claims for you.' },
  { icon: Lightbulb,     title: 'Free Expert Consultation',  desc: 'Our engineers assess your site and design the perfect system — no obligation.' },
  { icon: Wrench,        title: 'Licensed Engineers',        desc: 'Certified technicians following NEPRA safety and installation standards.' },
  { icon: HeadphonesIcon, title: 'After-Sales Service',      desc: '24/7 WhatsApp support and scheduled AMC visits for ongoing peak performance.' },
  { icon: Clock,         title: 'Fast Installation',         desc: 'Residential systems in 3–5 days. We handle permits, net metering, and inspections.' },
  { icon: Leaf,          title: 'Eco-Friendly Impact',       desc: 'Every system reduces Pakistan’s carbon footprint. Go green, save money.' },
]

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Why Rustam Battery"
          title="Built on trust, backed by 19 years"
          description="We don't just sell solar — we build long-term energy partnerships with every customer in Lahore."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-emerald-400 hover:shadow-md transition-all duration-200"
            >
              <div className="bg-emerald-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Icon size={20} className="text-emerald-700" strokeWidth={2.25} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 tracking-tight mb-2">{title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { SectionHeader } from '@/components/ui/SectionHeader'

const reasons = [
  { num: '01', title: '19 Years of Expertise',    desc: 'Since 2006, we have powered hundreds of homes and businesses across Lahore.' },
  { num: '02', title: 'Original Products Only',   desc: 'Genuine, certified solar panels, batteries, and inverters from trusted brands.' },
  { num: '03', title: 'Full Warranty Support',    desc: 'Manufacturer warranty on every product. We handle all warranty claims for you.' },
  { num: '04', title: 'Free Expert Consultation', desc: 'Our engineers assess your site and design the perfect system — no obligation.' },
  { num: '05', title: 'Licensed Engineers',       desc: 'Certified technicians following NEPRA safety and installation standards.' },
  { num: '06', title: 'After-Sales Service',      desc: '24/7 WhatsApp support and scheduled AMC visits for ongoing peak performance.' },
  { num: '07', title: 'Fast Installation',        desc: 'Residential systems in 1–2 days. We handle permits, net metering, and inspections.' },
  { num: '08', title: 'Eco-Friendly Impact',      desc: 'Every system reduces Pakistan\'s carbon footprint. Go green, save money.' },
]

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Why Rustam Battery"
          title="Why Choose Rustam Battery for Solar in Lahore?"
          description="We don't just sell solar — we build long-term energy partnerships with every customer in Lahore."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map(({ num, title, desc }) => (
            <div
              key={num}
              className="flex items-start gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors duration-200"
            >
              <span className="text-3xl font-black text-amber-200 leading-none shrink-0 select-none">
                {num}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { SectionHeader } from '@/components/ui/SectionHeader'

const contactCards = [
  { icon: Phone,  title: 'Phone',    primary: '+92 300 1234567',          secondary: 'Call us anytime' },
  { icon: Mail,   title: 'Email',    primary: 'info@rustambattery.com',   secondary: 'Send us a message', href: 'mailto:info@rustambattery.com' },
  { icon: MapPin, title: 'Location', primary: 'Kahna Nau, Lahore',         secondary: 'Punjab, Pakistan' },
]

export function ContactSection() {
  return (
    <section id="contact" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Get in touch"
          title="We're here to help"
          description="Have questions about solar solutions? Reach out below or request a free quote — our team responds within 24 hours."
        />

        {/* Contact info cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactCards.map(({ icon: Icon, title, primary, secondary, href }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-amber-300 hover:shadow-md transition-all duration-200"
            >
              <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Icon size={20} className="text-amber-600" strokeWidth={2.25} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 tracking-tight mb-1">{title}</h3>
              <p className="text-sm text-gray-500 mb-2">{secondary}</p>
              {href ? (
                <a href={href} className="text-base font-medium text-slate-900 hover:text-amber-600 transition-colors break-all">
                  {primary}
                </a>
              ) : (
                <p className="text-base font-medium text-slate-900">{primary}</p>
              )}
            </div>
          ))}
        </div>

        {/* Business hours */}
        <div className="mt-6 bg-slate-50 border border-gray-100 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-amber-600" strokeWidth={2.25} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 tracking-tight">Business Hours</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
            <div className="space-y-1.5">
              <p className="text-gray-600"><span className="font-semibold text-slate-800">Mon – Fri:</span> 9:00 AM – 6:00 PM</p>
              <p className="text-gray-600"><span className="font-semibold text-slate-800">Saturday:</span> 10:00 AM – 4:00 PM</p>
              <p className="text-gray-600"><span className="font-semibold text-slate-800">Sunday:</span> Closed</p>
            </div>
            <div className="text-base text-gray-600">
              <p className="mb-1">For emergencies outside business hours:</p>
              <p className="font-semibold text-slate-900">+92 300 1234567 <span className="text-gray-500 font-normal">(24/7)</span></p>
            </div>
          </div>
        </div>

        {/* Forms */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-slate-800 tracking-tight mb-6">Send us a message</h3>
            <ContactForm />
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-slate-800 tracking-tight mb-6">Request a quote</h3>
            <QuoteForm />
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-slate-800 tracking-tight mb-6 text-center">Find us in Lahore</h3>
          <div className="rounded-2xl overflow-hidden border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=31.3739000,74.3675000&z=16&t=&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rustam Battery Location"
            />
          </div>
          <p className="text-center text-gray-500 mt-3 text-sm">
            Kahna Nau, Lahore, Punjab, Pakistan
          </p>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle, Star } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { QuoteForm } from '@/components/forms/QuoteForm'

const WA_NUMBER = '923213770402'

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<'contact' | 'quote'>('contact')

  return (
    <section id="contact" className="bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-emerald-600 text-xs font-bold tracking-[5px] uppercase mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Have a question about solar?<br />
            <span className="text-emerald-600">We are here to help — free.</span>
          </h2>
          <p className="mt-5 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Site visit, quote, or any technical question — our experts are available 24 hours a day.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── LEFT: Dark info panel ── */}
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl overflow-hidden flex flex-col">

            {/* Emerald top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />

            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-black text-white leading-tight mb-2">
                Contact Us
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                19 years of experience — always available for Lahore&apos;s solar energy needs.
              </p>

              {/* Contact items */}
              <div className="space-y-3 mb-5">

                {/* Phone — General */}
                <a href="tel:+923213770402" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <Phone size={16} className="text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">General</p>
                    <p className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">+92 321 3770402</p>
                  </div>
                </a>

                {/* Phone — Solar & Inverter */}
                <a href="tel:+923214130828" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <Phone size={16} className="text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Solar & Inverter</p>
                    <p className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">+92 321 4130828</p>
                  </div>
                </a>

                {/* Email — both in one block */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:ia6969537@gmail.com" className="block text-white font-semibold text-xs hover:text-emerald-400 transition-colors break-all">
                      ia6969537@gmail.com
                    </a>
                    <a href="mailto:shahbazahmedkhan35201@gmail.com" className="block text-white font-semibold text-xs hover:text-emerald-400 transition-colors break-all mt-1">
                      shahbazahmedkhan35201@gmail.com
                    </a>
                    <p className="text-slate-600 text-[10px] mt-0.5">Solar & Inverter — Shahbaz</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Location</p>
                    <p className="text-white font-bold text-sm">Kahna Nau, Lahore</p>
                    <p className="text-slate-500 text-xs">Punjab, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello! I need information about your solar systems.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-2xl transition-colors mb-4 text-sm"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>

              {/* Divider */}
              <div className="border-t border-slate-800 my-5" />

              {/* Business hours */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Business Hours</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-slate-300"><span className="text-white font-semibold">Mon – Fri:</span> 9:00 AM – 6:00 PM</p>
                    <p className="text-slate-300"><span className="text-white font-semibold">Saturday:</span> 10:00 AM – 4:00 PM</p>
                    <p className="text-slate-500">Sunday: Closed</p>
                    <p className="text-emerald-400 text-xs mt-1.5 font-semibold">Emergency: 24/7 available</p>
                  </div>
                </div>
              </div>

              {/* Trust chips */}
              <div className="mt-auto flex flex-wrap gap-2">
                {['19+ Years', '500+ Installations', 'Free Site Visit', '24/7 Support'].map(t => (
                  <span key={t} className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-900/40 border border-emerald-800 px-2.5 py-1 rounded-full font-semibold">
                    <CheckCircle size={10} />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form panel ── */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">

            {/* Tab switcher */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  activeTab === 'contact'
                    ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/50'
                    : 'text-gray-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Send a Message
              </button>
              <button
                onClick={() => setActiveTab('quote')}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  activeTab === 'quote'
                    ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/50'
                    : 'text-gray-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Request Free Quote
              </button>
            </div>

            {/* Tab description */}
            <div className="px-8 pt-6 pb-2">
              <p className="text-gray-500 text-sm">
                {activeTab === 'contact'
                  ? 'Any question — we will reply within 24 hours.'
                  : 'Tell us about your project — our experts will send a free quote.'}
              </p>
            </div>

            {/* Form */}
            <div className="px-8 pb-8 pt-4 flex-1">
              {activeTab === 'contact' ? <ContactForm /> : <QuoteForm />}
            </div>

            {/* Bottom trust bar */}
            <div className="border-t border-gray-50 bg-slate-50 px-8 py-4 flex items-center gap-6">
              {[
                { icon: Star, text: '4.9/5 Rating' },
                { icon: CheckCircle, text: 'Verified Business' },
                { icon: Clock, text: '< 24hr Response' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <Icon size={13} className="text-emerald-500" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=31.3739000,74.3675000&z=16&t=&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rustam Battery Location — Kahna Nau Lahore"
            />
          </div>
          <p className="text-center text-gray-400 mt-3 text-sm font-medium">
            Kahna Nau, Lahore, Punjab, Pakistan
          </p>
        </div>

      </div>
    </section>
  )
}

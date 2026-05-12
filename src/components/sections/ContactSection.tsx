'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle, Star, ShieldCheck, Timer } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { QuoteForm } from '@/components/forms/QuoteForm'

const WA_NUMBER = '923213770402'

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<'contact' | 'quote'>('contact')

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-emerald-600 text-xs font-bold tracking-[5px] uppercase mb-4">Contact Us</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Get in touch — we reply<br />
            <span className="text-emerald-600">within 24 hours</span>
          </h2>
          <p className="mt-5 text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Free site visit, custom quote, or any solar question — our experts are always here for you.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* ── LEFT: Dark info panel ── */}
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl overflow-hidden">

            {/* Emerald top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />

            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-1">Contact Information</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-7">
                19 years serving Lahore. Call, email, or WhatsApp us anytime.
              </p>

              {/* Contact items — all consistent style */}
              <div className="space-y-4 mb-7">

                {/* Phone — General */}
                <a href="tel:+923213770402" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                    <Phone size={16} className="text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-0.5">General Enquiries</p>
                    <p className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors">+92 321 3770402</p>
                  </div>
                </a>

                {/* Phone — Solar & Inverter */}
                <a href="tel:+923214130828" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                    <Phone size={16} className="text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Solar & Inverter (Shahbaz)</p>
                    <p className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors">+92 321 4130828</p>
                  </div>
                </a>

                {/* Email 1 */}
                <a href="mailto:ia6969537@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                    <Mail size={16} className="text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Email</p>
                    <p className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors truncate">ia6969537@gmail.com</p>
                  </div>
                </a>

                {/* Email 2 — Shahbaz */}
                <a href="mailto:shahbazahmedkhan35201@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                    <Mail size={16} className="text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Solar & Inverter Email</p>
                    <p className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors truncate">shahbazahmedkhan35201@gmail.com</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-0.5">Location</p>
                    <p className="text-white font-semibold text-sm">Kahna Nau, Lahore</p>
                    <p className="text-slate-500 text-xs">Punjab, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello! I need information about your solar systems.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fba5a] text-white font-bold py-3 rounded-2xl transition-colors text-sm mb-6"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>

              {/* Business hours */}
              <div className="border-t border-slate-800 pt-5 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={13} className="text-emerald-400" />
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Business Hours</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mon – Fri</span>
                    <span className="text-white font-medium">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saturday</span>
                    <span className="text-white font-medium">10:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sunday</span>
                    <span className="text-slate-500">Closed</span>
                  </div>
                  <p className="text-emerald-400 text-xs pt-1 font-semibold">Emergency support: 24/7</p>
                </div>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2">
                {['19+ Years', '500+ Installs', 'Free Site Visit', '24/7 Support'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-2.5 py-1.5 rounded-lg font-medium border border-slate-700">
                    <CheckCircle size={10} className="text-emerald-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form panel ── */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Tab switcher */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-4 text-sm font-semibold transition-all ${
                  activeTab === 'contact'
                    ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/40'
                    : 'text-gray-400 hover:text-slate-600 hover:bg-gray-50'
                }`}
              >
                Send a Message
              </button>
              <button
                onClick={() => setActiveTab('quote')}
                className={`flex-1 py-4 text-sm font-semibold transition-all ${
                  activeTab === 'quote'
                    ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/40'
                    : 'text-gray-400 hover:text-slate-600 hover:bg-gray-50'
                }`}
              >
                Get Free Quote
              </button>
            </div>

            {/* Form */}
            <div className="px-8 py-7">
              {activeTab === 'contact' ? <ContactForm /> : <QuoteForm />}
            </div>

            {/* Bottom trust bar */}
            <div className="border-t border-gray-100 bg-gray-50 px-8 py-4 flex items-center gap-6 flex-wrap">
              {[
                { icon: Star,        text: '4.9 / 5 Rating'     },
                { icon: ShieldCheck, text: 'Verified Business'   },
                { icon: Timer,       text: '< 24 hr Response'    },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Icon size={13} className="text-emerald-500" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10">

          {/* Map header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <MapPin size={17} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-800">Our Location</p>
                <p className="text-xs text-gray-400">Kahna Nau, Lahore — Punjab, Pakistan</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=31.3739000,74.3675000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors self-start sm:self-auto shadow-md shadow-emerald-600/25"
            >
              <MapPin size={14} />
              Get Directions
            </a>
          </div>

          {/* Map card — premium border treatment */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-400 to-slate-800 p-[3px] shadow-2xl shadow-slate-900/20">
            <div className="rounded-[22px] overflow-hidden relative">

              {/* Top accent bar inside map */}
              <div className="absolute top-0 left-0 right-0 z-10 h-10 bg-gradient-to-b from-slate-900/70 to-transparent flex items-center px-4 gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-xs font-semibold tracking-wide drop-shadow">Rustam Battery & Solar Energy House</span>
              </div>

              <iframe
                src="https://maps.google.com/maps?q=31.3739000,74.3675000&z=16&t=&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="440"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rustam Battery Location — Kahna Nau Lahore"
              />
            </div>
          </div>

          {/* Info cards below map */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                <MapPin size={15} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Address</p>
                <p className="text-sm text-slate-800 font-semibold">Kahna Nau, Lahore</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                <Phone size={15} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Call Us</p>
                <p className="text-sm text-slate-800 font-semibold">+92 321 3770402</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                <Clock size={15} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Open Today</p>
                <p className="text-sm text-slate-800 font-semibold">9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

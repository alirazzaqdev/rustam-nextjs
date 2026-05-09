'use client'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { QuoteForm } from '@/components/forms/QuoteForm'

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Get in Touch</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about solar solutions? Contact us or request a free quote
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Phone size={24} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
            </div>
            <p className="text-slate-600 mb-2">Call us anytime</p>
            <p className="text-xl font-semibold text-slate-900">+92 300 1234567</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Mail size={24} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Email</h3>
            </div>
            <p className="text-slate-600 mb-2">Send us a message</p>
            <p className="text-xl font-semibold text-slate-900">
              <a href="mailto:info@rustambattery.com" className="hover:text-amber-600">
                info@rustambattery.com
              </a>
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <MapPin size={24} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Location</h3>
            </div>
            <p className="text-slate-600 mb-2">Visit our office</p>
            <p className="text-lg font-semibold text-slate-900">Lahore, Punjab</p>
            <p className="text-sm text-slate-500">Pakistan</p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Clock size={24} className="text-amber-600" />
            <h3 className="text-lg font-semibold text-slate-900">Business Hours</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-700 mb-2">
                <span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM
              </p>
              <p className="text-slate-700 mb-2">
                <span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM
              </p>
              <p className="text-slate-700">
                <span className="font-semibold">Sunday:</span> Closed
              </p>
            </div>
            <div className="text-slate-600">
              <p className="mb-2">For emergency issues outside business hours:</p>
              <p>
                <span className="font-semibold text-slate-900">+92 300 1234567</span> (24/7)
              </p>
            </div>
          </div>
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
            <ContactForm />
          </div>

          {/* Quote Form */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Request a Quote</h3>
            <QuoteForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Find Us in Lahore</h3>
          <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              src="https://maps.google.com/maps?q=31.3739000,74.3675000&z=16&t=&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rustam Battery Location - Lahore, Pakistan"
            />
          </div>
          <p className="text-center text-slate-500 mt-3 text-sm">
            Kahna Nau, Lahore, Punjab, Pakistan — Call us at <span className="font-semibold text-slate-700">+92 300 1234567</span> for directions
          </p>
        </div>
      </div>
    </section>
  )
}

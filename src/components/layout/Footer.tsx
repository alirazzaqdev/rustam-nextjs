'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/#hero', label: 'Home' },
    { href: '/#products', label: 'Products' },
    { href: '/#services', label: 'Services' },
    { href: '/#team', label: 'Our Team' },
    { href: '/#calculator', label: 'Calculator' },
    { href: '/order', label: 'Order Now' },
    { href: '/#contact', label: 'Contact' },
  ]

  const socialLinks = [
    {
      href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-blue-600',
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    },
    {
      href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-pink-600',
      svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    },
    {
      href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-600',
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>,
    },
  ]

  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow">
                RB
              </div>
              <div>
                <p className="font-bold leading-tight">Rustam Battery</p>
                <p className="text-xs text-amber-400">& Solar Energy House</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              19 years of expertise in solar panels, batteries, and inverters. Proudly serving Lahore since 2006.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors ${s.color}`}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.label === 'Order Now'
                        ? 'text-amber-400 hover:text-amber-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {link.label === 'Order Now' ? '⚡ ' : ''}{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 flex-shrink-0 text-amber-400" />
                <div>
                  <a href="tel:+923001234567" className="text-slate-300 hover:text-white transition-colors block">+92 300 1234567</a>
                  <span className="text-slate-500 text-xs">Call / WhatsApp</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 flex-shrink-0 text-amber-400" />
                <div>
                  <a href="mailto:info@rustambattery.com" className="text-slate-300 hover:text-white transition-colors block">info@rustambattery.com</a>
                  <span className="text-slate-500 text-xs">Email us anytime</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-amber-400" />
                <div>
                  <p className="text-slate-300">Kahna Nau, Lahore</p>
                  <p className="text-slate-500 text-xs">Punjab, Pakistan</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Business Hours</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-400">Mon – Fri</span>
                <span className="text-slate-200">9:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Saturday</span>
                <span className="text-slate-200">10:00 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">Sunday</span>
                <span className="text-red-400">Closed</span>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-xs text-amber-300 font-medium mb-0.5">24/7 Emergency Support</p>
              <a href="tel:+923001234567" className="text-amber-400 text-sm font-semibold hover:text-amber-300">+92 300 1234567</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} Rustam Battery & Solar Energy House. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/order" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">Order Now</Link>
          </div>
        </div>

        {/* Made-with line */}
        <div className="text-center mt-6 pt-4 border-t border-slate-800/60 text-xs text-slate-500">
          Made with <span className="text-amber-400">☀️</span> in Lahore, Pakistan <span aria-label="Pakistan flag">🇵🇰</span>
        </div>
      </div>
    </footer>
  )
}

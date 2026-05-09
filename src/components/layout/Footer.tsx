'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

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
    { href: 'https://facebook.com', label: 'Facebook', icon: Facebook, color: 'hover:bg-blue-600' },
    { href: 'https://instagram.com', label: 'Instagram', icon: Instagram, color: 'hover:bg-pink-600' },
    { href: 'https://youtube.com', label: 'YouTube', icon: Youtube, color: 'hover:bg-red-600' },
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
                  <s.icon size={17} />
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
      </div>
    </footer>
  )
}

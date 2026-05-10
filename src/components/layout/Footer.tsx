import Link from 'next/link'
import { Mail, Phone, MapPin, Zap } from 'lucide-react'

const quickLinks = [
  { href: '/#hero',     label: 'Home' },
  { href: '/#products', label: 'Products' },
  { href: '/#services', label: 'Services' },
  { href: '/#team',     label: 'Our Team' },
  { href: '/#contact',  label: 'Contact' },
]

const serviceLinks = [
  { href: '/#services', label: 'System Design' },
  { href: '/#services', label: 'Installation' },
  { href: '/#services', label: 'Maintenance' },
  { href: '/#services', label: 'Battery Backup' },
  { href: '/#services', label: 'Monitoring' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" fill="white" strokeWidth={2} />
              </div>
              <div className="leading-none">
                <p className="font-bold text-white text-base tracking-tight">Rustam Battery</p>
                <p className="text-xs text-gray-500 mt-0.5">& Solar Energy House</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              19 years of trusted solar expertise in Lahore. Powering homes and
              businesses with clean, reliable energy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-tight mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-tight mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-tight mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 text-amber-500 shrink-0" strokeWidth={2} />
                <a href="tel:+923001234567" className="hover:text-white transition-colors">
                  +92 300 1234567
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 text-amber-500 shrink-0" strokeWidth={2} />
                <a href="mailto:info@rustambattery.com" className="hover:text-white transition-colors break-all">
                  info@rustambattery.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-amber-500 shrink-0" strokeWidth={2} />
                <span>Kahna Nau, Lahore<br />Punjab, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
          <p>&copy; {currentYear} Rustam Battery & Solar Energy House. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

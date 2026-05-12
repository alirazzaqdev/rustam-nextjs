import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

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
    <footer role="contentinfo" className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + tagline */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="bg-white rounded-2xl p-2.5 inline-block">
                <Image
                  src="/logo.png"
                  alt="Rustam Battery & Solar Energy House — Solar Energy Company Lahore Pakistan"
                  width={140}
                  height={56}
                  className="h-14 w-auto object-contain block"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              10 years of trusted solar expertise in Lahore. Powering homes and
              businesses with clean, reliable energy.
            </p>

            {/* Social icons — group-hover fixes Tailwind scoping */}
            <div className="flex items-center gap-2.5 mt-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="group w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors duration-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 group-hover:text-white transition-colors">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="group w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors duration-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-white transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="group w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors duration-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 group-hover:text-white transition-colors">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0f172a"/>
                </svg>
              </a>
            </div>
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
                <Phone size={15} className="mt-0.5 text-emerald-600 shrink-0" strokeWidth={2} />
                <a href="tel:+923213770402" className="hover:text-white transition-colors">
                  +92 321 3770402
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 text-emerald-600 shrink-0" strokeWidth={2} />
                <a href="mailto:ia6969537@gmail.com" className="hover:text-white transition-colors break-all">
                  ia6969537@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 text-emerald-600 shrink-0" strokeWidth={2} />
                <a href="mailto:shahbazahmedkhan35201@gmail.com" className="hover:text-white transition-colors break-all">
                  shahbazahmedkhan35201@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-emerald-600 shrink-0" strokeWidth={2} />
                <span>Kahna Nau, Lahore<br />Punjab, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Schema.org address markup — crawlable by Google */}
        <address
          className="not-italic text-xs text-gray-500 mt-8"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <span itemProp="name" className="hidden">Rustam Battery &amp; Solar Energy House</span>
          <span itemProp="telephone" className="hidden">+92-321-3770402</span>
          <span itemProp="email" className="hidden">ia6969537@gmail.com</span>
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="streetAddress" className="hidden">Kahna Nau</span>
            <span itemProp="addressLocality" className="hidden">Lahore</span>
            <span itemProp="addressRegion" className="hidden">Punjab</span>
            <span itemProp="addressCountry" className="hidden">Pakistan</span>
          </span>
        </address>

        {/* Bottom bar */}
        <div className="mt-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>&copy; {currentYear} Rustam Battery & Solar Energy House. All rights reserved.</p>
          <p className="text-gray-600">Serving Lahore since 2016 · Kahna Nau, Punjab, Pakistan</p>
          <p>
            Built by{' '}
            <a
              href="https://github.com/alirazzaqdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
            >
              Ali Razzaq
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

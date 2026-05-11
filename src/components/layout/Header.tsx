'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useAppStore, useCartStore } from '@/lib/store'

const navItems = [
  { href: '/#hero',       label: 'Home' },
  { href: '/#products',   label: 'Products' },
  { href: '/#services',   label: 'Services' },
  { href: '/#calculator', label: 'Calculator' },
  { href: '/#team',       label: 'Team' },
  { href: '/#contact',    label: 'Contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setQuoteModalOpen } = useAppStore()
  const totalItems = useCartStore((s) => s.getTotalItems())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <svg width="38" height="38" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="transition-transform duration-300 group-hover:scale-105">
              <defs>
                <linearGradient id="navgi" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff"/>
                  <stop offset="100%" stopColor="#A7F3D0"/>
                </linearGradient>
              </defs>
              <circle cx="160" cy="160" r="155" fill="#059669"/>
              <circle cx="160" cy="160" r="148" fill="#047857"/>
              <circle cx="160" cy="160" r="140" fill="none" stroke="#6EE7B7" strokeWidth="3"/>
              <polygon points="160,100 200,122 200,166 160,188 120,166 120,122" fill="none" stroke="#6EE7B7" strokeWidth="3.5"/>
              <path d="M168,108 L148,152 L162,152 L152,192 L180,145 L165,145 Z" fill="url(#navgi)"/>
              <path d="M118,130 Q100,144 100,160 Q100,176 118,190" fill="none" stroke="#A7F3D0" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M202,130 Q220,144 220,160 Q220,176 202,190" fill="none" stroke="#A7F3D0" strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="160" cy="97" r="4" fill="#6EE7B7"/>
              <circle cx="203" cy="120" r="4" fill="#6EE7B7"/>
              <circle cx="203" cy="200" r="4" fill="#6EE7B7"/>
              <circle cx="160" cy="223" r="4" fill="#6EE7B7"/>
              <circle cx="117" cy="200" r="4" fill="#6EE7B7"/>
              <circle cx="117" cy="120" r="4" fill="#6EE7B7"/>
            </svg>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[15px] font-black text-slate-900 tracking-tight">
                Rustam Battery
              </span>
              <span className="text-[10px] font-bold text-emerald-600 tracking-[0.15em] uppercase mt-0.5">
                & Solar Energy House
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-all duration-200"
            >
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="text-emerald-700 font-semibold text-sm px-4 py-2 border border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
            >
              Get Quote
            </button>
            <Link
              href="/order"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all duration-200 shadow-sm shadow-emerald-200 hover:shadow-md hover:shadow-emerald-200"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 text-gray-500 hover:text-emerald-700 transition-colors rounded-lg"
            >
              <ShoppingCart size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="px-4 pt-3 pb-5 space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 grid grid-cols-2 gap-2 border-t border-gray-100 mt-2">
              <button
                onClick={() => { setQuoteModalOpen(true); setIsOpen(false) }}
                className="text-center border border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Get Quote
              </button>
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm shadow-emerald-200"
              >
                Order Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

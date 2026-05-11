'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Zap, ShoppingCart } from 'lucide-react'
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
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm transition-shadow ${
        scrolled ? 'border-b border-gray-100 shadow-sm' : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white" fill="white" strokeWidth={2} />
            </div>
            <div className="hidden sm:block leading-none">
              <p className="font-bold text-slate-900 text-base tracking-tight">
                Rustam Battery
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                & Solar Energy House
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors"
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
              className="relative p-2 text-gray-600 hover:text-emerald-700 transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="text-sm font-semibold text-gray-700 hover:text-emerald-700 px-3 py-2 transition-colors"
            >
              Get Quote
            </button>
            <Link
              href="/order"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile cart + toggle */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 text-gray-600 hover:text-emerald-700 transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-gray-100 mt-3">
              <button
                onClick={() => { setQuoteModalOpen(true); setIsOpen(false) }}
                className="w-full text-center border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                Get Quote
              </button>
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
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

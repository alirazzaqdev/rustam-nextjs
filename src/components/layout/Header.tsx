'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  const totalItems = useCartStore(s => s.getTotalItems())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-200">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <div className="hidden sm:block">
              <p className="font-extrabold text-slate-900 leading-none text-base" style={{ fontFamily: 'var(--font-jakarta)' }}>
                Rustam Battery
              </p>
              <p className="text-[10px] text-amber-600 font-semibold leading-none mt-0.5 tracking-wide">
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
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            <Link
              href="/order"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md shadow-amber-100 transition-all hover:shadow-amber-200"
            >
              Order Now
            </Link>
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="border-2 border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-600 font-semibold px-5 py-2 rounded-xl text-sm transition-all"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile cart + toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/cart" className="relative p-2 text-slate-600 hover:text-amber-600 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link
                  href="/order"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  Order Now
                </Link>
                <button
                  onClick={() => { setQuoteModalOpen(true); setIsOpen(false) }}
                  className="block w-full text-center border-2 border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm"
                >
                  Get Quote
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

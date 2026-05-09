'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { setQuoteModalOpen } = useAppStore()

  const navItems = [
    { href: '#hero', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
              RB
            </div>
            <span className="font-bold text-lg text-slate-900 hidden sm:inline">
              Rustam Battery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setQuoteModalOpen(true)}
              className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-600"
            >
              Get Quote
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:bg-slate-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden border-t border-slate-200 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setQuoteModalOpen(true)
                setIsOpen(false)
              }}
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600"
            >
              Get Quote
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}

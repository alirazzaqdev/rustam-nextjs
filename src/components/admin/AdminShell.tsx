'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, Package,
  MessageSquare, LogOut, Menu, X, ExternalLink,
} from 'lucide-react'

const NAV = [
  { href: '/admin',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders',   label: 'Orders',    icon: ShoppingBag },
  { href: '/admin/products', label: 'Products',  icon: Package },
  { href: '/admin/messages', label: 'Messages',  icon: MessageSquare },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 bg-slate-900 flex flex-col transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo */}
        <div className="px-4 py-5 border-b border-slate-800">
          <div className="bg-white rounded-2xl px-4 py-3 inline-flex items-center justify-center w-full">
            <img
              src="/logo.png"
              alt="Rustam Battery & Solar Energy House"
              className="h-12 w-auto object-contain block"
              style={{ maxWidth: '160px' }}
            />
          </div>
          <p className="text-slate-500 text-[10px] mt-2.5 text-center font-bold uppercase tracking-widest">
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2.5 : 2} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-0.5 border-t border-slate-800 pt-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <ExternalLink size={15} />
            View Website
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <button onClick={() => setOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="hidden lg:block">
            <span className="text-sm text-gray-400">
              {NAV.find(n => n.href === pathname || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label || 'Admin'}
            </span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

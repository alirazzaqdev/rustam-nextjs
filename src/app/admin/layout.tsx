import type { ReactNode } from 'react'

export const metadata = {
  title: 'Admin — Rustam Battery & Solar',
  robots: 'noindex,nofollow',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

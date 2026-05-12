import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { QuoteModal } from '@/components/ui/QuoteModal'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <QuoteModal />
      <WhatsAppButton />
    </>
  )
}

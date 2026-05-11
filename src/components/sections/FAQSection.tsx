'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQ } from '@/types'

interface FAQSectionProps {
  faqs: FAQ[]
}

const STATIC_FAQS: { id: string; question: string; answer: string }[] = [
  {
    id: 'savings',
    question: 'How much can I save with solar panels?',
    answer:
      'Most of our Lahore customers save 60–80% on their electricity bills. A typical 5kW system reduces monthly bills from PKR 15,000–20,000 to just PKR 3,000–5,000. Your actual savings depend on your current usage, system size, and whether you choose hybrid or grid-tied.',
  },
  {
    id: 'warranty',
    question: 'What is the warranty on solar panels?',
    answer:
      'All solar panels we supply come with a 25-year performance warranty from the manufacturer. Inverters carry 2–5 year warranty depending on brand and model. Batteries: lithium batteries 5 years, lead-acid 1–2 years. We handle all warranty claims directly on your behalf.',
  },
  {
    id: 'cloudy',
    question: 'Do solar panels work in cloudy weather?',
    answer:
      'Yes. Solar panels produce 10–25% of their rated output on cloudy days. Lahore receives 300+ sunny days per year, so overall annual production remains excellent. Our hybrid systems also include battery backup so you always have power regardless of weather.',
  },
  {
    id: 'battery-life',
    question: 'How long do batteries last?',
    answer:
      'Lithium batteries (Knox Powerwall) last 8–12 years with 8000+ charge cycles. Quality lead-acid batteries (AGS, Osaka, Phoenix) last 3–5 years with proper maintenance. Tubular batteries last 5–7 years. We recommend lithium for best long-term value.',
  },
  {
    id: 'install-time',
    question: 'What is the installation time?',
    answer:
      'Residential systems (3–10kW) are fully installed in 1–2 days. Commercial systems (10–50kW) take 3–5 days. Industrial systems vary by size. We handle everything — site survey, installation, wiring, net metering application, and final testing.',
  },
  {
    id: 'expand',
    question: 'Can I expand my system later?',
    answer:
      'Absolutely. All systems we install are designed with future expansion in mind. You can add more panels, batteries, or upgrade your inverter at any time. We assess your roof space and electrical capacity during the initial site visit to plan for future growth.',
  },
  {
    id: 'maintenance',
    question: 'What about maintenance?',
    answer:
      'Solar systems require minimal maintenance — mainly panel cleaning every 2–3 months and annual inspection. We offer AMC (Annual Maintenance Contract) packages starting from PKR 8,000/year that include scheduled visits, panel cleaning, system health checks, and priority support.',
  },
  {
    id: 'financing',
    question: 'Is there financing available?',
    answer:
      'Yes. We offer installment plans for qualified customers. We also work with banks providing solar financing. Many customers use SBP\'s green financing scheme. Contact us to discuss what payment plan works best for your budget and system size.',
  },
  {
    id: 'outage',
    question: 'What happens during power outages?',
    answer:
      'With a hybrid or off-grid system and battery backup, your home or business runs completely uninterrupted during load-shedding. Your solar panels charge the batteries during the day, and the batteries power your home at night or during grid outages — no interruption at all.',
  },
  {
    id: 'start',
    question: 'How do I get started?',
    answer:
      'Simple — call or WhatsApp us at +92 321 3770402 or fill our quote form on this page. We\'ll schedule a FREE site visit within 24 hours. Our engineer assesses your roof, checks your electricity bills, and provides a detailed proposal with exact system size, cost, and expected savings — no obligation.',
  },
]

export function FAQSection({ faqs }: FAQSectionProps) {
  const items =
    faqs && faqs.length > 0
      ? [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0))
      : STATIC_FAQS

  return (
    <section id="faq" className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-3">FAQs</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions About Solar in Lahore
          </h2>
          <p className="mt-4 text-base text-gray-500 leading-relaxed">
            Find answers to common questions about our solar solutions
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left hover:text-emerald-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

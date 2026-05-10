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
    question: 'How much can I save on my electricity bill with solar?',
    answer:
      'Most customers save 60–80% on electricity bills. A 5kW system in Lahore typically reduces a monthly bill from PKR 15,000 to around PKR 3,000–5,000.',
  },
  {
    id: 'warranty',
    question: 'What warranty do you offer on solar panels?',
    answer:
      'We offer a 25-year performance warranty on solar panels, a 5-year warranty on inverters, and a 2-year warranty on batteries.',
  },
  {
    id: 'cloudy',
    question: 'Will solar panels work in cloudy weather?',
    answer:
      'Yes — panels still produce 10–25% of their rated power on cloudy days. Lahore receives 300+ sunny days per year, so overall output remains excellent year-round.',
  },
  {
    id: 'battery-life',
    question: 'How long do solar batteries last?',
    answer:
      'Lithium batteries typically last 8–12 years, while lead-acid batteries last 3–5 years. We recommend lithium for better long-term value and lower maintenance.',
  },
  {
    id: 'install-time',
    question: 'How long does installation take?',
    answer:
      'Residential systems (3–10kW) take 1–2 days. Commercial installations take 3–7 days depending on system size and roof complexity.',
  },
  {
    id: 'expand',
    question: 'Can I expand my system later?',
    answer:
      'Absolutely. All our systems are designed to be expandable — you can add more panels or batteries anytime as your energy needs grow.',
  },
  {
    id: 'maintenance',
    question: 'What maintenance does a solar system need?',
    answer:
      'Annual cleaning and inspection is recommended. We offer Annual Maintenance Contracts (AMC) starting from PKR 8,000/year that cover everything.',
  },
  {
    id: 'financing',
    question: 'Do you offer financing or installment plans?',
    answer:
      'Yes — we offer installment plans in partnership with local banks. 0% markup is available for 6 months on select products.',
  },
  {
    id: 'outage',
    question: 'What happens during power outages and load-shedding?',
    answer:
      'With a hybrid or off-grid system paired with battery backup, your home runs uninterrupted during load-shedding — no need for a separate UPS.',
  },
  {
    id: 'start',
    question: 'How do I get started?',
    answer:
      'Call or WhatsApp +92 300 1234567 or fill the quote form on this page. We will visit your site for a free assessment within 24 hours.',
  },
]

export function FAQSection({ faqs }: FAQSectionProps) {
  const items =
    faqs && faqs.length > 0
      ? [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0))
      : STATIC_FAQS

  return (
    <section id="faq" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            FAQs
          </span>
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Find answers to common questions about our solar solutions
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left hover:text-amber-600">
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

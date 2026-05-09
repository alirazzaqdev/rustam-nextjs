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

export function FAQSection({ faqs }: FAQSectionProps) {
  const sortedFaqs = [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <section id="faq" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Find answers to common questions about our solar solutions
          </p>
        </div>

        {sortedFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {sortedFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left hover:text-amber-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">
              FAQs will appear here once database is configured and seeded.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

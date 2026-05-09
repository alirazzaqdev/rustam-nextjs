import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CalculatorSection } from '@/components/sections/CalculatorSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { getProducts } from '@/actions/products'
import { getServices } from '@/actions/services'
import { getTestimonials } from '@/actions/testimonials'
import { getFAQs } from '@/actions/faqs'

export const revalidate = 3600

export default async function Home() {
  const [products, services, testimonials, faqs] = await Promise.all([
    getProducts(),
    getServices(),
    getTestimonials(),
    getFAQs(),
  ])

  return (
    <div>
      <HeroSection />
      <StatsSection />

      {products.length > 0 ? (
        <ProductsSection products={products} />
      ) : (
        <section id="products" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Products</h2>
            <p className="text-slate-500">Solar panels, batteries, inverters and more.</p>
          </div>
        </section>
      )}

      {services.length > 0 ? (
        <ServicesSection services={services} />
      ) : (
        <section id="services" className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Services</h2>
            <p className="text-slate-500">Installation, maintenance and consultation.</p>
          </div>
        </section>
      )}

      <WhyChooseUsSection />

      <TeamSection />

      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}

      <CalculatorSection />

      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}

      <ContactSection />
    </div>
  )
}

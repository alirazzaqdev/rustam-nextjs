import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { BrandsSection } from '@/components/sections/BrandsSection'
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

export const revalidate = 60

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
      <BrandsSection />
      <ProductsSection products={products} />
      <ServicesSection services={services} />
      <CalculatorSection />
      <WhyChooseUsSection />
      <TeamSection />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <ContactSection />
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
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
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900">
              Solar & Battery Solutions for{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Lahore
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              19 years of expertise providing reliable solar panels, batteries, and energy solutions for residential, commercial, and industrial customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a href="#contact">
                <Button className="px-8 py-6 text-lg bg-amber-500 hover:bg-amber-600 w-full sm:w-auto">
                  Get a Free Quote
                </Button>
              </a>
              <a href="#products">
                <Button variant="outline" className="px-8 py-6 text-lg w-full sm:w-auto">
                  Explore Products
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 ? (
        <ProductsSection products={products} />
      ) : (
        <section id="products" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-slate-600">Solar panels, batteries, inverters and more.</p>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 ? (
        <ServicesSection services={services} />
      ) : (
        <section id="services" className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-slate-600">Installation, maintenance and consultation.</p>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 ? (
        <TestimonialsSection testimonials={testimonials} />
      ) : null}

      {/* Solar Calculator Section */}
      <CalculatorSection />

      {/* FAQ Section */}
      {faqs.length > 0 ? (
        <FAQSection faqs={faqs} />
      ) : null}

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}

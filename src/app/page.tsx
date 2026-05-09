import { Button } from '@/components/ui/button'
import { CalculatorSection } from '@/components/sections/CalculatorSection'
import { ContactSection } from '@/components/sections/ContactSection'

export const revalidate = 3600

export default function Home() {
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
              <Button className="px-8 py-6 text-lg bg-amber-500 hover:bg-amber-600">
                Get a Free Quote
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg">
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-slate-600 mb-8">
            Products will appear here once database is configured and seeded.
          </p>
          <p className="text-sm text-slate-500">
            Follow the QUICK_START.md guide to set up your database
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-slate-600">
            Services will appear here once database is configured and seeded.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-slate-600">
            Testimonials will appear here once database is configured and seeded.
          </p>
        </div>
      </section>

      {/* Solar Calculator Section */}
      <CalculatorSection />

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">
            FAQs will appear here once database is configured and seeded.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}

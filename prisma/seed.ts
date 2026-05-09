import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  console.log('🌱 Starting database seed...\n')

  // Clear existing data
  await prisma.product.deleteMany()
  await prisma.service.deleteMany()
  await prisma.fAQ.deleteMany()
  await prisma.testimonial.deleteMany()

  // Products
  console.log('📦 Creating products...')
  const products = await prisma.product.createMany({
    data: [
      // Solar Panels
      {
        name: 'LONGI 550W Solar Panel',
        slug: 'longi-550w-panel',
        description: 'High-efficiency monocrystalline solar panel with excellent durability',
        category: 'solar-panels',
        price: 45000,
        image: '/images/solar-panel-1.jpg',
        specs: {
          wattage: '550W',
          efficiency: '22.3%',
          warranty: '25 years',
          dimensions: '2256 x 1128 x 35mm',
          weight: '24.5kg',
        },
        warranty: '25 years',
        featured: true,
        inStock: true,
      },
      {
        name: 'JinkoSolar 500W Panel',
        slug: 'jinkosolar-500w',
        description: 'Reliable and affordable solar panel for residential installations',
        category: 'solar-panels',
        price: 38000,
        image: '/images/solar-panel-2.jpg',
        specs: {
          wattage: '500W',
          efficiency: '20.8%',
          warranty: '25 years',
          dimensions: '2256 x 1128 x 35mm',
          weight: '22.5kg',
        },
        warranty: '25 years',
        featured: true,
        inStock: true,
      },
      {
        name: 'Canadian Solar 450W',
        slug: 'canadian-solar-450w',
        description: 'Proven performance in harsh weather conditions',
        category: 'solar-panels',
        price: 35000,
        image: '/images/solar-panel-3.jpg',
        specs: {
          wattage: '450W',
          efficiency: '19.9%',
          warranty: '25 years',
        },
        warranty: '25 years',
        featured: false,
        inStock: true,
      },

      // Batteries
      {
        name: 'Lithium-Ion Battery 48V 100Ah',
        slug: 'liion-battery-48v-100ah',
        description: 'High-performance lithium battery for solar energy storage',
        category: 'batteries',
        price: 280000,
        image: '/images/battery-liion.jpg',
        specs: {
          voltage: '48V',
          capacity: '100Ah',
          energy: '4.8kWh',
          warranty: '10 years',
          cycleLife: '6000+ cycles',
        },
        warranty: '10 years',
        featured: true,
        inStock: true,
      },
      {
        name: 'Lead-Acid Battery 150Ah',
        slug: 'lead-acid-150ah',
        description: 'Affordable battery solution for backup power',
        category: 'batteries',
        price: 65000,
        image: '/images/battery-lead.jpg',
        specs: {
          type: 'Lead-Acid',
          capacity: '150Ah',
          voltage: '12V',
          warranty: '3 years',
        },
        warranty: '3 years',
        featured: false,
        inStock: true,
      },
      {
        name: 'Lithium 5.12kWh Battery Pack',
        slug: 'liion-5-12kwh',
        description: 'Compact lithium battery for residential solar systems',
        category: 'batteries',
        price: 320000,
        image: '/images/battery-pack.jpg',
        specs: {
          capacity: '5.12kWh',
          voltage: '48V',
          warranty: '10 years',
        },
        warranty: '10 years',
        featured: true,
        inStock: true,
      },

      // Inverters
      {
        name: 'Hybrid Inverter 5kW',
        slug: 'hybrid-inverter-5kw',
        description: 'All-in-one inverter with MPPT charging and battery management',
        category: 'inverters',
        price: 120000,
        image: '/images/inverter-hybrid-5kw.jpg',
        specs: {
          power: '5kW',
          type: 'Hybrid',
          mppt: '80A',
          warranty: '5 years',
          efficiency: '97.8%',
        },
        warranty: '5 years',
        featured: true,
        inStock: true,
      },
      {
        name: 'Hybrid Inverter 3kW',
        slug: 'hybrid-inverter-3kw',
        description: 'Mid-range hybrid inverter for small to medium systems',
        category: 'inverters',
        price: 85000,
        image: '/images/inverter-3kw.jpg',
        specs: {
          power: '3kW',
          type: 'Hybrid',
          warranty: '5 years',
        },
        warranty: '5 years',
        featured: true,
        inStock: true,
      },
      {
        name: 'Pure Sine Wave Inverter 8kW',
        slug: 'sine-wave-8kw',
        description: 'Pure sine wave inverter for sensitive electronics',
        category: 'inverters',
        price: 95000,
        image: '/images/inverter-sine.jpg',
        specs: {
          power: '8kW',
          type: 'Pure Sine Wave',
          warranty: '2 years',
        },
        warranty: '2 years',
        featured: false,
        inStock: true,
      },

      // Accessories
      {
        name: 'MC4 Solar Connector Pair',
        slug: 'mc4-connector',
        description: 'Waterproof connectors for solar panel wiring',
        category: 'accessories',
        price: 800,
        image: '/images/mc4-connector.jpg',
        specs: {
          type: 'MC4',
          current: '30A',
          voltage: '1000V DC',
        },
        warranty: '1 year',
        featured: false,
        inStock: true,
      },
      {
        name: 'Solar Cable 6mm² (100m)',
        slug: 'solar-cable-6mm',
        description: 'UV-resistant cable for outdoor solar installations',
        category: 'accessories',
        price: 8500,
        image: '/images/solar-cable.jpg',
        specs: {
          size: '6mm²',
          length: '100m',
          voltage: '1000V',
          temperature: '-40 to +70°C',
        },
        warranty: '1 year',
        featured: false,
        inStock: true,
      },
      {
        name: 'Mounting Bracket Set (10 pieces)',
        slug: 'mounting-bracket-set',
        description: 'Aluminum mounting brackets for solar panels',
        category: 'accessories',
        price: 4500,
        image: '/images/mounting-brackets.jpg',
        specs: {
          material: 'Aluminum Alloy',
          quantity: '10 pieces',
          compatibility: 'All standard panels',
        },
        warranty: '2 years',
        featured: false,
        inStock: true,
      },
      {
        name: 'Charge Controller MPPT 100A',
        slug: 'mppt-controller-100a',
        description: 'Maximum Power Point Tracking controller',
        category: 'accessories',
        price: 35000,
        image: '/images/mppt-controller.jpg',
        specs: {
          type: 'MPPT',
          current: '100A',
          voltage: '48V',
          efficiency: '99.5%',
        },
        warranty: '2 years',
        featured: true,
        inStock: true,
      },
      {
        name: 'Battery Monitoring System',
        slug: 'battery-monitor',
        description: 'Real-time battery status monitoring device',
        category: 'accessories',
        price: 12000,
        image: '/images/battery-monitor.jpg',
        specs: {
          display: '3.7" LCD',
          voltage: '48V',
          wireless: 'WiFi enabled',
        },
        warranty: '2 years',
        featured: true,
        inStock: true,
      },
    ],
  })

  console.log(`✅ Created ${products.count} products\n`)

  // Services
  console.log('🔧 Creating services...')
  const services = await prisma.service.createMany({
    data: [
      {
        name: 'System Design & Consultation',
        slug: 'system-design-consultation',
        description:
          'Expert consultation to design the perfect solar system for your needs. We analyze your energy consumption and site conditions.',
        icon: '📐',
        featured: true,
      },
      {
        name: 'Professional Installation',
        slug: 'professional-installation',
        description:
          'Licensed technicians will install your solar system with precision and care. Full electrical safety compliance guaranteed.',
        icon: '🔧',
        featured: true,
      },
      {
        name: 'Maintenance & Support',
        slug: 'maintenance-support',
        description:
          'Annual maintenance, cleaning, and 24/7 technical support to keep your system running at peak efficiency.',
        icon: '🛠️',
        featured: false,
      },
      {
        name: 'Performance Monitoring',
        slug: 'performance-monitoring',
        description:
          'Real-time monitoring and detailed reports on your solar system performance and energy savings.',
        icon: '📊',
        featured: true,
      },
      {
        name: 'Battery Backup System',
        slug: 'battery-backup',
        description:
          'Complete battery storage solutions for uninterrupted power supply during outages.',
        icon: '🔋',
        featured: false,
      },
    ],
  })

  console.log(`✅ Created ${services.count} services\n`)

  // FAQs
  console.log('❓ Creating FAQs...')
  const faqs = await prisma.fAQ.createMany({
    data: [
      {
        question: 'How much can I save with solar panels?',
        answer:
          'Savings depend on your current electricity consumption and tariff rates. Most customers save 40-60% on electricity bills. We provide a free analysis for your specific situation.',
        category: 'general',
        order: 1,
      },
      {
        question: 'What is the warranty on solar panels?',
        answer:
          'Most quality panels come with 25-year performance warranty (80% capacity) and 10-year manufacturing warranty. We also offer extended service coverage.',
        category: 'warranty',
        order: 2,
      },
      {
        question: 'Do solar panels work in cloudy weather?',
        answer:
          'Yes, solar panels work in cloudy conditions, though output is reduced by 50-80%. Lahore gets 300+ sunny days per year, making it ideal for solar.',
        category: 'technical',
        order: 3,
      },
      {
        question: 'How long do batteries last?',
        answer:
          'Lithium batteries last 10+ years (5000-6000 cycles). Lead-acid batteries last 3-5 years. We recommend lithium for longer-term investment.',
        category: 'technical',
        order: 4,
      },
      {
        question: 'What is the installation time?',
        answer:
          'Standard residential installation takes 3-5 days depending on system size and roof conditions. We handle all permits and inspections.',
        category: 'installation',
        order: 5,
      },
      {
        question: 'Can I expand my system later?',
        answer:
          'Yes, our systems are designed to be scalable. You can add more panels or batteries in the future without replacing existing equipment.',
        category: 'technical',
        order: 6,
      },
      {
        question: 'What about maintenance?',
        answer:
          'Solar panels need minimal maintenance - just occasional cleaning. We offer annual maintenance packages to ensure optimal performance.',
        category: 'maintenance',
        order: 7,
      },
      {
        question: 'Is there financing available?',
        answer:
          'Yes, we work with major banks for flexible financing options. Speak with our team about payment plans.',
        category: 'pricing',
        order: 8,
      },
      {
        question: 'What happens during power outages?',
        answer:
          'With battery backup, your system continues working during outages. Without batteries, the system disconnects for safety reasons.',
        category: 'technical',
        order: 9,
      },
      {
        question: 'How do I get started?',
        answer:
          'Contact us for a free consultation. We will assess your property, analyze your energy needs, and provide a customized quote.',
        category: 'general',
        order: 10,
      },
    ],
  })

  console.log(`✅ Created ${faqs.count} FAQs\n`)

  // Testimonials
  console.log('⭐ Creating testimonials...')
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        name: 'Muhammad Hassan',
        company: 'Tech Startup Owner',
        title: 'Business Owner',
        content:
          'Rustam Battery installed a complete solar system for our office. The savings are remarkable - our electricity bill dropped by 70%. Highly professional team!',
        rating: 5,
        featured: true,
      },
      {
        name: 'Fatima Ahmad',
        company: 'Residential Customer',
        title: 'Homeowner',
        content:
          'After installing solar panels and battery backup, we rarely worry about load-shedding. Best investment for our home!',
        rating: 5,
        featured: true,
      },
      {
        name: 'Ali Khan',
        company: 'Manufacturing Business',
        title: 'Factory Manager',
        content:
          'We installed a 50kW industrial system. The team was professional and completed on time. ROI achieved in less than 4 years.',
        rating: 5,
        featured: true,
      },
      {
        name: 'Ayesha Malik',
        company: 'Small Business Owner',
        title: 'Shop Owner',
        content:
          'Excellent customer service and competitive pricing. I saved thousands of rupees. Highly recommend Rustam Battery!',
        rating: 4,
        featured: false,
      },
      {
        name: 'Dr. Abdullah',
        company: 'Medical Clinic',
        title: 'Doctor',
        content:
          'Reliable power supply is critical for our clinic. The hybrid system with battery ensures we never lose power.',
        rating: 5,
        featured: false,
      },
    ],
  })

  console.log(`✅ Created ${testimonials.count} testimonials\n`)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

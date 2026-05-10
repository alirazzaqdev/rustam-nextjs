import type { Product } from '@/types'

export const products: Product[] = [

  // ─── OSAKA BATTERIES ───────────────────────
  { id: 'osaka-ht55', name: 'Osaka HT55R', category: 'Battery', brand: 'Osaka', price: 6619, image: null,
    specs: { Plates: '7', Capacity: '32Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Reliable lead-acid battery for small UPS and backup systems. Perfect for small homes and offices with minimal power needs.',
    inStock: true, featured: false },

  { id: 'osaka-ht60', name: 'Osaka HT60R', category: 'Battery', brand: 'Osaka', price: 8007, image: null,
    specs: { Plates: '9', Capacity: '38Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Ideal for home UPS systems and small solar setups. Trusted by thousands of Lahore households.',
    inStock: true, featured: false },

  { id: 'osaka-ht115', name: 'Osaka HT115 Plus-A', category: 'Battery', brand: 'Osaka', price: 14214, image: null,
    specs: { Plates: '11', Capacity: '72Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: "Pakistan's most popular mid-range battery. Best value for home solar and UPS applications in Lahore.",
    inStock: true, featured: true },

  { id: 'osaka-ht135', name: 'Osaka HT135', category: 'Battery', brand: 'Osaka', price: 19096, image: null,
    specs: { Plates: '15', Capacity: '90Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'High capacity battery for medium solar systems. Handles 6-8 hours of daily load-shedding comfortably.',
    inStock: true, featured: false },

  { id: 'osaka-ht145', name: 'Osaka HT145', category: 'Battery', brand: 'Osaka', price: 20995, image: null,
    specs: { Plates: '17', Capacity: '105Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Heavy duty battery for residential solar. Supports ACs, refrigerators, and heavy appliances.',
    inStock: true, featured: false },

  { id: 'osaka-ht160', name: 'Osaka HT160', category: 'Battery', brand: 'Osaka', price: 23328, image: null,
    specs: { Plates: '19', Capacity: '115Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Premium battery for larger home setups. Deep cycle design for daily charge-discharge cycles.',
    inStock: true, featured: true },

  { id: 'osaka-ht200', name: 'Osaka HT200', category: 'Battery', brand: 'Osaka', price: 26311, image: null,
    specs: { Plates: '21', Capacity: '130Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'High performance battery for commercial solar. Handles heavy commercial loads with ease.',
    inStock: true, featured: false },

  { id: 'osaka-ht230', name: 'Osaka HT230', category: 'Battery', brand: 'Osaka', price: 30760, image: null,
    specs: { Plates: '23', Capacity: '150Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Industrial grade battery for heavy load requirements. Built for extreme Lahore summer temperatures.',
    inStock: true, featured: false },

  { id: 'osaka-ht270', name: 'Osaka HT270', category: 'Battery', brand: 'Osaka', price: 36565, image: null,
    specs: { Plates: '27', Capacity: '180Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Extra large capacity for industrial solar systems. Maximum backup duration for factories and warehouses.',
    inStock: true, featured: true },

  { id: 'osaka-ht1800', name: 'Osaka HT1800 Tubular', category: 'Battery', brand: 'Osaka', price: 39060, image: null,
    specs: { Plates: '5', Capacity: '185Ah', Type: 'Tall Tubular', Warranty: '24 Months' },
    description: 'Tall tubular technology for maximum backup duration. Ideal for areas with 8+ hours of daily load-shedding.',
    inStock: true, featured: false },

  { id: 'osaka-ht2500', name: 'Osaka HT2500 Tubular', category: 'Battery', brand: 'Osaka', price: 52080, image: null,
    specs: { Plates: '7', Capacity: '250Ah', Type: 'Tall Tubular', Warranty: '24 Months' },
    description: 'High capacity tubular for commercial backup. Runs complete offices through extended outages.',
    inStock: true, featured: false },

  { id: 'osaka-ht3000', name: 'Osaka HT3000 Tubular', category: 'Battery', brand: 'Osaka', price: 65100, image: null,
    specs: { Plates: '9', Capacity: '280Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: 'Premium tall tubular for large solar installations. 3-year warranty with exceptional cycle life.',
    inStock: true, featured: true },

  { id: 'osaka-ht3500', name: 'Osaka HT3500 Tubular', category: 'Battery', brand: 'Osaka', price: 65643, image: null,
    specs: { Plates: '9', Capacity: '330Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: "Osaka's flagship tubular battery. Maximum capacity for industrial and large commercial solar.",
    inStock: true, featured: false },

  // ─── PHOENIX BATTERIES ─────────────────────
  { id: 'phoenix-xp60', name: 'Phoenix XP60', category: 'Battery', brand: 'Phoenix', price: 9458, image: null,
    specs: { Plates: '9', Capacity: '35Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Compact Phoenix battery for small UPS and home backup. Reliable performance at an affordable price.',
    inStock: true, featured: false },

  { id: 'phoenix-xp100', name: 'Phoenix XP100', category: 'Battery', brand: 'Phoenix', price: 13928, image: null,
    specs: { Plates: '13', Capacity: '60Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Reliable mid-range battery for home solar. Phoenix quality with 12 months manufacturer warranty.',
    inStock: true, featured: false },

  { id: 'phoenix-xp115', name: 'Phoenix XP115', category: 'Battery', brand: 'Phoenix', price: 15019, image: null,
    specs: { Plates: '10', Capacity: '45Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Popular Phoenix battery for residential backup. Handles standard home loads through load-shedding.',
    inStock: true, featured: false },

  { id: 'phoenix-ext135', name: 'Phoenix EXT135', category: 'Battery', brand: 'Phoenix', price: 18523, image: null,
    specs: { Plates: '14', Capacity: '65Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Extended life design for medium solar installations. EXT series built for longer cycle performance.',
    inStock: true, featured: false },

  { id: 'phoenix-ext145', name: 'Phoenix EXT145', category: 'Battery', brand: 'Phoenix', price: 20301, image: null,
    specs: { Plates: '15', Capacity: '80Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Heavy duty Phoenix for home solar systems. EXT145 is our top selling Phoenix model in Lahore.',
    inStock: true, featured: true },

  { id: 'phoenix-xp150', name: 'Phoenix XP150', category: 'Battery', brand: 'Phoenix', price: 24138, image: null,
    specs: { Plates: '17', Capacity: '100Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'High performance Phoenix for residential solar. Handles ACs and heavy loads comfortably.',
    inStock: true, featured: false },

  { id: 'phoenix-xp165', name: 'Phoenix XP165', category: 'Battery', brand: 'Phoenix', price: 24615, image: null,
    specs: { Plates: '19', Capacity: '105Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Premium Phoenix for larger home solar setups. Deep cycle technology for daily solar charging.',
    inStock: true, featured: false },

  { id: 'phoenix-xp200', name: 'Phoenix XP200', category: 'Battery', brand: 'Phoenix', price: 27531, image: null,
    specs: { Plates: '21', Capacity: '120Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Commercial grade Phoenix for solar systems. Trusted by shops and offices across Lahore.',
    inStock: true, featured: false },

  { id: 'phoenix-xp220', name: 'Phoenix XP220', category: 'Battery', brand: 'Phoenix', price: 29532, image: null,
    specs: { Plates: '23', Capacity: '140Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'High capacity Phoenix for heavy backup needs. Industrial strength for demanding applications.',
    inStock: true, featured: false },

  { id: 'phoenix-ugs210', name: 'Phoenix UGS210', category: 'Battery', brand: 'Phoenix', price: 34449, image: null,
    specs: { Plates: '23', Capacity: '150Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Ultra Grade Series Phoenix for premium solar. UGS technology delivers superior performance.',
    inStock: true, featured: false },

  { id: 'phoenix-ugs235', name: 'Phoenix UGS235', category: 'Battery', brand: 'Phoenix', price: 38360, image: null,
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Top tier Phoenix UGS for industrial applications. Maximum power density in its class.',
    inStock: true, featured: true },

  { id: 'phoenix-xp260', name: 'Phoenix XP260', category: 'Battery', brand: 'Phoenix', price: 38604, image: null,
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Extra capacity Phoenix for large solar arrays. Commercial and industrial grade performance.',
    inStock: true, featured: false },

  { id: 'phoenix-tx1800', name: 'Phoenix TX1800 Tubular', category: 'Battery', brand: 'Phoenix', price: 28532, image: null,
    specs: { Capacity: '90Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: 'Phoenix tall tubular for extended backup duration. Tubular plates for 3x longer cycle life.',
    inStock: true, featured: false },

  { id: 'phoenix-tx2500', name: 'Phoenix TX2500 Tubular', category: 'Battery', brand: 'Phoenix', price: 36471, image: null,
    specs: { Capacity: '140Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: 'Large Phoenix tubular for commercial solar. Powers complete offices through extended outages.',
    inStock: true, featured: false },

  { id: 'phoenix-tx3500', name: 'Phoenix TX3500 Tubular', category: 'Battery', brand: 'Phoenix', price: 50517, image: null,
    specs: { Capacity: '210Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: 'Maximum capacity Phoenix tubular for industrial solar. Top performing tubular in Pakistan.',
    inStock: true, featured: false },

  // ─── AGS BATTERIES ─────────────────────────
  { id: 'ags-ap35', name: 'AGS AP35', category: 'Battery', brand: 'AGS', price: 5598, image: null,
    specs: { Plates: '5', Capacity: '20Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Entry level AGS battery for small UPS systems. Most affordable AGS option for basic backup.',
    inStock: true, featured: false },

  { id: 'ags-sp60', name: 'AGS SP60', category: 'Battery', brand: 'AGS', price: 9458, image: null,
    specs: { Plates: '9', Capacity: '35Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: "Standard AGS battery for home UPS and small solar. Pakistan's most trusted battery brand.",
    inStock: true, featured: false },

  { id: 'ags-sp100', name: 'AGS SP100', category: 'Battery', brand: 'AGS', price: 13928, image: null,
    specs: { Plates: '13', Capacity: '60Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: "Pakistan's number one selling battery. AGS SP100 is the benchmark for home solar reliability.",
    inStock: true, featured: true },

  { id: 'ags-sp130', name: 'AGS SP130', category: 'Battery', brand: 'AGS', price: 20379, image: null,
    specs: { Plates: '15', Capacity: '85Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Mid-range AGS for home solar installations. Handles full home loads with consistent performance.',
    inStock: true, featured: false },

  { id: 'ags-sp140', name: 'AGS SP140', category: 'Battery', brand: 'AGS', price: 21760, image: null,
    specs: { Plates: '17', Capacity: '100Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Heavy duty AGS battery for residential backup. Recommended for homes with AC and heavy loads.',
    inStock: true, featured: false },

  { id: 'ags-sp150', name: 'AGS SP150', category: 'Battery', brand: 'AGS', price: 24412, image: null,
    specs: { Plates: '19', Capacity: '105Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Premium AGS for larger home solar systems. Best in class cycle life for daily solar use.',
    inStock: true, featured: false },

  { id: 'ags-sp180', name: 'AGS SP180', category: 'Battery', brand: 'AGS', price: 27531, image: null,
    specs: { Plates: '21', Capacity: '120Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'High capacity AGS for commercial solar. Trusted by shops and factories across Pakistan.',
    inStock: true, featured: false },

  { id: 'ags-gx165', name: 'AGS GX165', category: 'Battery', brand: 'AGS', price: 27429, image: null,
    specs: { Plates: '23', Capacity: '140Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'AGS GX series — premium heavy duty battery. GX technology for extreme temperature performance.',
    inStock: true, featured: false },

  { id: 'ags-gx175', name: 'AGS GX175', category: 'Battery', brand: 'AGS', price: 29471, image: null,
    specs: { Plates: '23', Capacity: '140Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Reliable AGS GX175 for medium commercial installations. Superior heat resistance for Lahore summers.',
    inStock: true, featured: false },

  { id: 'ags-gx200', name: 'AGS GX200', category: 'Battery', brand: 'AGS', price: 38259, image: null,
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Premium AGS GX series for maximum backup. Top performing AGS model for commercial solar.',
    inStock: true, featured: true },

  { id: 'ags-sp250', name: 'AGS SP250', category: 'Battery', brand: 'AGS', price: 38360, image: null,
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Extra large AGS for industrial solar systems. Maximum capacity in the SP series lineup.',
    inStock: true, featured: false },

  // ─── ALASKA BATTERIES ──────────────────────
  { id: 'alaska-a60', name: 'Alaska A60', category: 'Battery', brand: 'Alaska', price: 8544, image: null,
    specs: { Plates: '9', Capacity: '30Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Alaska entry series for home UPS and backup. Excellent value for basic power backup needs.',
    inStock: true, featured: false },

  { id: 'alaska-a110', name: 'Alaska A110', category: 'Battery', brand: 'Alaska', price: 11398, image: null,
    specs: { Plates: '11', Capacity: '45Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: "Mid-range Alaska for residential solar. Consistent performance through Pakistan's harsh summers.",
    inStock: true, featured: false },

  { id: 'alaska-a130', name: 'Alaska A130', category: 'Battery', brand: 'Alaska', price: 16549, image: null,
    specs: { Plates: '13', Capacity: '75Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Popular Alaska battery for home solar installations. Strong performance at competitive pricing.',
    inStock: true, featured: false },

  { id: 'alaska-a140', name: 'Alaska A140', category: 'Battery', brand: 'Alaska', price: 20531, image: null,
    specs: { Plates: '15', Capacity: '85Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Heavy duty Alaska for larger backup systems. Handles full home loads through load-shedding.',
    inStock: true, featured: false },

  { id: 'alaska-a150', name: 'Alaska A150', category: 'Battery', brand: 'Alaska', price: 21954, image: null,
    specs: { Plates: '17', Capacity: '100Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Premium Alaska for residential solar setups. Our top recommended Alaska model for home use.',
    inStock: true, featured: true },

  { id: 'alaska-a160', name: 'Alaska A160', category: 'Battery', brand: 'Alaska', price: 24341, image: null,
    specs: { Plates: '19', Capacity: '105Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'High performance Alaska for solar systems. Deep cycle design for daily solar charging cycles.',
    inStock: true, featured: false },

  { id: 'alaska-a200', name: 'Alaska A200', category: 'Battery', brand: 'Alaska', price: 29725, image: null,
    specs: { Plates: '23', Capacity: '140Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Commercial grade Alaska for solar backup. Powers shops and offices through extended outages.',
    inStock: true, featured: false },

  { id: 'alaska-a270', name: 'Alaska A270', category: 'Battery', brand: 'Alaska', price: 38604, image: null,
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: "Alaska's flagship battery for industrial solar. Maximum capacity with 24 month warranty.",
    inStock: true, featured: true },

  // ─── SOLAR PANELS ──────────────────────────
  { id: 'solar-coming-soon', name: 'Solar Panels — Coming Soon', category: 'Solar Panel',
    brand: 'Various', price: 0, image: null,
    specs: { Note: 'Contact us for latest pricing', Brands: 'LONGI, JinkoSolar, Canadian Solar' },
    description: 'We stock premium solar panels from LONGI, JinkoSolar, Canadian Solar and more. Contact us for current prices and availability.',
    inStock: true, featured: false },

  // ─── INVERTERS ─────────────────────────────
  { id: 'inverter-coming-soon', name: 'Inverters — Coming Soon', category: 'Inverter',
    brand: 'Various', price: 0, image: null,
    specs: { Note: 'Contact us for latest pricing', Types: 'Hybrid, Grid-Tied, Off-Grid' },
    description: 'We stock hybrid, grid-tied, and off-grid inverters from leading brands. Contact us for current prices.',
    inStock: true, featured: false },

  // ─── ACCESSORIES ───────────────────────────
  { id: 'accessory-coming-soon', name: 'Accessories — Coming Soon', category: 'Accessory',
    brand: 'Various', price: 0, image: null,
    specs: { Note: 'Contact us for latest pricing', Items: 'Cables, Connectors, Brackets, Controllers' },
    description: 'Solar cables, MC4 connectors, mounting brackets, charge controllers and more. Contact us for availability.',
    inStock: true, featured: false },

]

import type { Product } from '@/types'

export const products: Product[] = [

  // ─── OSAKA BATTERIES ───────────────────────
  { id: 'osaka-ht55', name: 'Osaka HT55R', category: 'Battery', brand: 'Osaka', price: 6619, image: '/products/Osaka/osaka-ht55.jpg',
    specs: { Plates: '7', Capacity: '32Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Reliable lead-acid battery for small UPS and backup systems. Perfect for small homes and offices with minimal power needs.',
    inStock: true, featured: false },

  { id: 'osaka-ht60', name: 'Osaka HT60R', category: 'Battery', brand: 'Osaka', price: 8007, image: '/products/Osaka/osaka-ht60.jpg',
    specs: { Plates: '9', Capacity: '38Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Ideal for home UPS systems and small solar setups. Trusted by thousands of Lahore households.',
    inStock: true, featured: false },

  { id: 'osaka-ht115', name: 'Osaka HT115 Plus-A', category: 'Battery', brand: 'Osaka', price: 14214, image: '/products/Osaka/osaka-ht115.jpg',
    specs: { Plates: '11', Capacity: '72Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: "Pakistan's most popular mid-range battery. Best value for home solar and UPS applications in Lahore.",
    inStock: true, featured: true },

  { id: 'osaka-ht135', name: 'Osaka HT135', category: 'Battery', brand: 'Osaka', price: 19096, image: '/products/Osaka/osaka-ht135.jpg',
    specs: { Plates: '15', Capacity: '90Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'High capacity battery for medium solar systems. Handles 6-8 hours of daily load-shedding comfortably.',
    inStock: true, featured: false },

  { id: 'osaka-ht145', name: 'Osaka HT145', category: 'Battery', brand: 'Osaka', price: 20995, image: '/products/Osaka/osaka-ht145.jpg',
    specs: { Plates: '17', Capacity: '105Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Heavy duty battery for residential solar. Supports ACs, refrigerators, and heavy appliances.',
    inStock: true, featured: false },

  { id: 'osaka-ht160', name: 'Osaka HT160', category: 'Battery', brand: 'Osaka', price: 23328, image: '/products/Osaka/osaka-ht160.jpg',
    specs: { Plates: '19', Capacity: '115Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Premium battery for larger home setups. Deep cycle design for daily charge-discharge cycles.',
    inStock: true, featured: true },

  { id: 'osaka-ht200', name: 'Osaka HT200', category: 'Battery', brand: 'Osaka', price: 26311, image: '/products/Osaka/osaka-ht200.jpg',
    specs: { Plates: '21', Capacity: '130Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'High performance battery for commercial solar. Handles heavy commercial loads with ease.',
    inStock: true, featured: false },

  { id: 'osaka-ht230', name: 'Osaka HT230', category: 'Battery', brand: 'Osaka', price: 30760, image: '/products/Osaka/osaka-ht230.jpg',
    specs: { Plates: '23', Capacity: '150Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Industrial grade battery for heavy load requirements. Built for extreme Lahore summer temperatures.',
    inStock: true, featured: false },

  { id: 'osaka-ht270', name: 'Osaka HT270', category: 'Battery', brand: 'Osaka', price: 36565, image: '/products/Osaka/osaka-ht270.jpg',
    specs: { Plates: '27', Capacity: '180Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Extra large capacity for industrial solar systems. Maximum backup duration for factories and warehouses.',
    inStock: true, featured: true },

  { id: 'osaka-ht1800', name: 'Osaka HT1800 Tubular', category: 'Battery', brand: 'Osaka', price: 39060, image: '/products/Osaka/osaka-ht1800.jpg',
    specs: { Plates: '5', Capacity: '185Ah', Type: 'Tall Tubular', Warranty: '24 Months' },
    description: 'Tall tubular technology for maximum backup duration. Ideal for areas with 8+ hours of daily load-shedding.',
    inStock: true, featured: false },

  { id: 'osaka-ht2500', name: 'Osaka HT2500 Tubular', category: 'Battery', brand: 'Osaka', price: 52080, image: '/products/Osaka/osaka-ht2500.jpg',
    specs: { Plates: '7', Capacity: '250Ah', Type: 'Tall Tubular', Warranty: '24 Months' },
    description: 'High capacity tubular for commercial backup. Runs complete offices through extended outages.',
    inStock: true, featured: false },

  { id: 'osaka-ht3000', name: 'Osaka HT3000 Tubular', category: 'Battery', brand: 'Osaka', price: 65100, image: '/products/Osaka/osaka-ht3000.jpg',
    specs: { Plates: '9', Capacity: '280Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: 'Premium tall tubular for large solar installations. 3-year warranty with exceptional cycle life.',
    inStock: true, featured: true },

  { id: 'osaka-ht3500', name: 'Osaka HT3500 Tubular', category: 'Battery', brand: 'Osaka', price: 65643, image: '/products/Osaka/osaka-ht3500.jpg',
    specs: { Plates: '9', Capacity: '330Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: "Osaka's flagship tubular battery. Maximum capacity for industrial and large commercial solar.",
    inStock: true, featured: false },

  // ─── PHOENIX BATTERIES ─────────────────────
  { id: 'phoenix-xp60', name: 'Phoenix XP60', category: 'Battery', brand: 'Phoenix', price: 9458, image: '/products/Phoenix/phoenix-xp60.jpg',
    specs: { Plates: '9', Capacity: '35Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Compact Phoenix battery for small UPS and home backup. Reliable performance at an affordable price.',
    inStock: true, featured: false },

  { id: 'phoenix-xp100', name: 'Phoenix XP100', category: 'Battery', brand: 'Phoenix', price: 13928, image: '/products/Phoenix/phoenix-xp100.jpg',
    specs: { Plates: '13', Capacity: '60Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Reliable mid-range battery for home solar. Phoenix quality with 12 months manufacturer warranty.',
    inStock: true, featured: false },

  { id: 'phoenix-xp115', name: 'Phoenix XP115', category: 'Battery', brand: 'Phoenix', price: 15019, image: '/products/Phoenix/phoenix-xp115.jpg',
    specs: { Plates: '10', Capacity: '45Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Popular Phoenix battery for residential backup. Handles standard home loads through load-shedding.',
    inStock: true, featured: false },

  { id: 'phoenix-ext135', name: 'Phoenix EXT135', category: 'Battery', brand: 'Phoenix', price: 18523, image: '/products/Phoenix/phoenix-ext135.jpg',
    specs: { Plates: '14', Capacity: '65Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Extended life design for medium solar installations. EXT series built for longer cycle performance.',
    inStock: true, featured: false },

  { id: 'phoenix-ext145', name: 'Phoenix EXT145', category: 'Battery', brand: 'Phoenix', price: 20301, image: '/products/Phoenix/phoenix-ext145.jpg',
    specs: { Plates: '15', Capacity: '80Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Heavy duty Phoenix for home solar systems. EXT145 is our top selling Phoenix model in Lahore.',
    inStock: true, featured: true },

  { id: 'phoenix-xp150', name: 'Phoenix XP150', category: 'Battery', brand: 'Phoenix', price: 24138, image: '/products/Phoenix/phoenix-xp150.jpg',
    specs: { Plates: '17', Capacity: '100Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'High performance Phoenix for residential solar. Handles ACs and heavy loads comfortably.',
    inStock: true, featured: false },

  { id: 'phoenix-xp165', name: 'Phoenix XP165', category: 'Battery', brand: 'Phoenix', price: 24615, image: '/products/Phoenix/phoenix-xp165.jpg',
    specs: { Plates: '19', Capacity: '105Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Premium Phoenix for larger home solar setups. Deep cycle technology for daily solar charging.',
    inStock: true, featured: false },

  { id: 'phoenix-xp200', name: 'Phoenix XP200', category: 'Battery', brand: 'Phoenix', price: 27531, image: '/products/Phoenix/phoenix-xp200.jpg',
    specs: { Plates: '21', Capacity: '120Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Commercial grade Phoenix for solar systems. Trusted by shops and offices across Lahore.',
    inStock: true, featured: false },

  { id: 'phoenix-xp220', name: 'Phoenix XP220', category: 'Battery', brand: 'Phoenix', price: 29532, image: '/products/Phoenix/phoenix-xp220.jpg',
    specs: { Plates: '23', Capacity: '140Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'High capacity Phoenix for heavy backup needs. Industrial strength for demanding applications.',
    inStock: true, featured: false },

  { id: 'phoenix-ugs210', name: 'Phoenix UGS210', category: 'Battery', brand: 'Phoenix', price: 34449, image: '/products/Phoenix/phoenix-ugs210.jpg',
    specs: { Plates: '23', Capacity: '150Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Ultra Grade Series Phoenix for premium solar. UGS technology delivers superior performance.',
    inStock: true, featured: false },

  { id: 'phoenix-ugs235', name: 'Phoenix UGS235', category: 'Battery', brand: 'Phoenix', price: 38360, image: '/products/Phoenix/phoenix-ugs235.jpg',
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Top tier Phoenix UGS for industrial applications. Maximum power density in its class.',
    inStock: true, featured: true },

  { id: 'phoenix-xp260', name: 'Phoenix XP260', category: 'Battery', brand: 'Phoenix', price: 38604, image: '/products/Phoenix/phoenix-xp260.jpg',
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Extra capacity Phoenix for large solar arrays. Commercial and industrial grade performance.',
    inStock: true, featured: false },

  { id: 'phoenix-tx1800', name: 'Phoenix TX1800 Tubular', category: 'Battery', brand: 'Phoenix', price: 28532, image: '/products/Phoenix/phoenix-tx1800.jpg',
    specs: { Capacity: '90Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: 'Phoenix tall tubular for extended backup duration. Tubular plates for 3x longer cycle life.',
    inStock: true, featured: false },

  { id: 'phoenix-tx2500', name: 'Phoenix TX2500 Tubular', category: 'Battery', brand: 'Phoenix', price: 36471, image: '/products/Phoenix/phoenix-tx2500.jpg',
    specs: { Capacity: '140Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: 'Large Phoenix tubular for commercial solar. Powers complete offices through extended outages.',
    inStock: true, featured: false },

  { id: 'phoenix-tx3500', name: 'Phoenix TX3500 Tubular', category: 'Battery', brand: 'Phoenix', price: 50517, image: '/products/Phoenix/phoenix-tx3500.jpg',
    specs: { Capacity: '210Ah', Type: 'Tall Tubular', Warranty: '36 Months' },
    description: 'Maximum capacity Phoenix tubular for industrial solar. Top performing tubular in Pakistan.',
    inStock: true, featured: false },

  // ─── AGS BATTERIES ─────────────────────────
  { id: 'ags-ap35', name: 'AGS AP35', category: 'Battery', brand: 'AGS', price: 5598, image: '/products/AGS/ags-ap35.jpg',
    specs: { Plates: '5', Capacity: '20Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Entry level AGS battery for small UPS systems. Most affordable AGS option for basic backup.',
    inStock: true, featured: false },

  { id: 'ags-sp60', name: 'AGS SP60', category: 'Battery', brand: 'AGS', price: 9458, image: '/products/AGS/ags-sp60.jpg',
    specs: { Plates: '9', Capacity: '35Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: "Standard AGS battery for home UPS and small solar. Pakistan's most trusted battery brand.",
    inStock: true, featured: false },

  { id: 'ags-sp100', name: 'AGS SP100', category: 'Battery', brand: 'AGS', price: 13928, image: '/products/AGS/ags-sp100.jpg',
    specs: { Plates: '13', Capacity: '60Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: "Pakistan's number one selling battery. AGS SP100 is the benchmark for home solar reliability.",
    inStock: true, featured: true },

  { id: 'ags-sp130', name: 'AGS SP130', category: 'Battery', brand: 'AGS', price: 20379, image: '/products/AGS/ags-sp130.jpg',
    specs: { Plates: '15', Capacity: '85Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Mid-range AGS for home solar installations. Handles full home loads with consistent performance.',
    inStock: true, featured: false },

  { id: 'ags-sp140', name: 'AGS SP140', category: 'Battery', brand: 'AGS', price: 21760, image: '/products/AGS/ags-sp140.jpg',
    specs: { Plates: '17', Capacity: '100Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Heavy duty AGS battery for residential backup. Recommended for homes with AC and heavy loads.',
    inStock: true, featured: false },

  { id: 'ags-sp150', name: 'AGS SP150', category: 'Battery', brand: 'AGS', price: 24412, image: '/products/AGS/ags-sp150.jpg',
    specs: { Plates: '19', Capacity: '105Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Premium AGS for larger home solar systems. Best in class cycle life for daily solar use.',
    inStock: true, featured: false },

  { id: 'ags-sp180', name: 'AGS SP180', category: 'Battery', brand: 'AGS', price: 27531, image: '/products/AGS/ags-sp180.jpg',
    specs: { Plates: '21', Capacity: '120Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'High capacity AGS for commercial solar. Trusted by shops and factories across Pakistan.',
    inStock: true, featured: false },

  { id: 'ags-gx165', name: 'AGS GX165', category: 'Battery', brand: 'AGS', price: 27429, image: '/products/AGS/ags-gx165.jpg',
    specs: { Plates: '23', Capacity: '140Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'AGS GX series — premium heavy duty battery. GX technology for extreme temperature performance.',
    inStock: true, featured: false },

  { id: 'ags-gx175', name: 'AGS GX175', category: 'Battery', brand: 'AGS', price: 29471, image: '/products/AGS/ags-gx175.jpg',
    specs: { Plates: '23', Capacity: '140Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Reliable AGS GX175 for medium commercial installations. Superior heat resistance for Lahore summers.',
    inStock: true, featured: false },

  { id: 'ags-gx200', name: 'AGS GX200', category: 'Battery', brand: 'AGS', price: 38259, image: '/products/AGS/ags-gx200.jpg',
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Premium AGS GX series for maximum backup. Top performing AGS model for commercial solar.',
    inStock: true, featured: true },

  { id: 'ags-sp250', name: 'AGS SP250', category: 'Battery', brand: 'AGS', price: 38360, image: '/products/AGS/ags-sp250.jpg',
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Extra large AGS for industrial solar systems. Maximum capacity in the SP series lineup.',
    inStock: true, featured: false },

  // ─── ALASKA BATTERIES ──────────────────────
  { id: 'alaska-a60', name: 'Alaska A60', category: 'Battery', brand: 'Alaska', price: 8544, image: '/products/Alaska/alaska-a60.jpg',
    specs: { Plates: '9', Capacity: '30Ah', Type: 'Lead Acid', Warranty: '6 Months' },
    description: 'Alaska entry series for home UPS and backup. Excellent value for basic power backup needs.',
    inStock: true, featured: false },

  { id: 'alaska-a110', name: 'Alaska A110', category: 'Battery', brand: 'Alaska', price: 11398, image: '/products/Alaska/alaska-a110.jpg',
    specs: { Plates: '11', Capacity: '45Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: "Mid-range Alaska for residential solar. Consistent performance through Pakistan's harsh summers.",
    inStock: true, featured: false },

  { id: 'alaska-a130', name: 'Alaska A130', category: 'Battery', brand: 'Alaska', price: 16549, image: '/products/Alaska/alaska-a130.jpg',
    specs: { Plates: '13', Capacity: '75Ah', Type: 'Lead Acid', Warranty: '12 Months' },
    description: 'Popular Alaska battery for home solar installations. Strong performance at competitive pricing.',
    inStock: true, featured: false },

  { id: 'alaska-a140', name: 'Alaska A140', category: 'Battery', brand: 'Alaska', price: 20531, image: '/products/Alaska/alaska-a140.jpg',
    specs: { Plates: '15', Capacity: '85Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Heavy duty Alaska for larger backup systems. Handles full home loads through load-shedding.',
    inStock: true, featured: false },

  { id: 'alaska-a150', name: 'Alaska A150', category: 'Battery', brand: 'Alaska', price: 21954, image: '/products/Alaska/alaska-a150.jpg',
    specs: { Plates: '17', Capacity: '100Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'Premium Alaska for residential solar setups. Our top recommended Alaska model for home use.',
    inStock: true, featured: true },

  { id: 'alaska-a160', name: 'Alaska A160', category: 'Battery', brand: 'Alaska', price: 24341, image: '/products/Alaska/alaska-a160.jpg',
    specs: { Plates: '19', Capacity: '105Ah', Type: 'Lead Acid', Warranty: '18 Months' },
    description: 'High performance Alaska for solar systems. Deep cycle design for daily solar charging cycles.',
    inStock: true, featured: false },

  { id: 'alaska-a200', name: 'Alaska A200', category: 'Battery', brand: 'Alaska', price: 29725, image: '/products/Alaska/alaska-a200.jpg',
    specs: { Plates: '23', Capacity: '140Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: 'Commercial grade Alaska for solar backup. Powers shops and offices through extended outages.',
    inStock: true, featured: false },

  { id: 'alaska-a270', name: 'Alaska A270', category: 'Battery', brand: 'Alaska', price: 38604, image: '/products/Alaska/alaska-a270.jpg',
    specs: { Plates: '27', Capacity: '175Ah', Type: 'Lead Acid', Warranty: '24 Months' },
    description: "Alaska's flagship battery for industrial solar. Maximum capacity with 24 month warranty.",
    inStock: true, featured: true },

  // ─── KNOX LITHIUM BATTERIES (LFP) ──────────
  { id: 'knox-powerwall-3', name: 'Knox Powerwall 3.0 LCD 2.56kWh', category: 'Battery', brand: 'Knox', price: 137500, image: '/products/batteries/knox-powerwall-3.webp',
    specs: { Voltage: '25.6V', Capacity: '100Ah', Energy: '2.56kWh', Type: 'LFP Lithium', Connectivity: 'WiFi + Bluetooth', Rating: 'IP20', Warranty: '5 Years', Mount: 'Wall Mounted' },
    description: 'Knox Powerwall 3.0 LCD Lithium LFP battery. 25.6V 100Ah with WiFi and Bluetooth monitoring. 5-year warranty. Wall-mounted design with DC cables included.',
    inStock: true, featured: false },

  { id: 'knox-powerwall-6', name: 'Knox Powerwall 6.0 LCD 5.12kWh', category: 'Battery', brand: 'Knox', price: 242500, image: '/products/batteries/knox-powerwall-6.webp',
    specs: { Voltage: '51.2V', Capacity: '100Ah', Energy: '5.12kWh', Type: 'LFP Lithium', Connectivity: 'WiFi + Bluetooth', Rating: 'IP20', Warranty: '5 Years', Mount: 'Wall Mounted' },
    description: 'Knox Powerwall 6.0 LCD Lithium LFP battery. 51.2V 100Ah with WiFi and Bluetooth. 5-year warranty. Premium wall-mount lithium battery for home solar systems.',
    inStock: true, featured: true },

  { id: 'knox-powerwall-4-15', name: 'Knox Powerwall 4.15 IP54 1.5C 2.56kWh', category: 'Battery', brand: 'Knox', price: 157500, image: '/products/batteries/knox-powerwall-4-15.webp',
    specs: { Voltage: '25.6V', Capacity: '100Ah', Energy: '3.84kWh', Rate: '1.5C', Type: 'LFP Lithium', Display: 'Touch LCD', Rating: 'IP54', Warranty: '5 Years' },
    description: 'Knox Powerwall 4.15 IP54 Lithium LFP battery. 1.5C discharge rate for high-power output. IP54 weatherproof with touch LCD display. 5-year warranty.',
    inStock: true, featured: false },

  { id: 'knox-powerwall-ip54', name: 'Knox Powerwall IP54 1.5C 5.12kWh', category: 'Battery', brand: 'Knox', price: 257500, image: '/products/batteries/knox-powerwall-ip54.webp',
    specs: { Voltage: '51.2V', Capacity: '100Ah', Energy: '5.32kWh', Rate: '1.5C', Type: 'LFP Lithium', Display: 'Touch LCD', Rating: 'IP54', Warranty: '5 Years' },
    description: 'Knox Powerwall IP54 51.2V Lithium LFP battery. IP54 rated, 1.5C discharge, touch LCD display. Premium 5-year warranty lithium battery for serious solar installations.',
    inStock: true, featured: true },

  { id: 'knox-powerbase-16', name: 'Knox Powerbase IP54 16 — 16kWh', category: 'Battery', brand: 'Knox', price: 622500, image: '/products/batteries/knox-powerbase-16.webp',
    specs: { Voltage: '51.2V', Capacity: '314Ah', Energy: '16kWh', Rate: '0.6C', Type: 'LFP Lithium', Connectivity: 'WiFi + Bluetooth', Display: 'Touch LCD', Rating: 'IP54', Cycles: '8000', Warranty: '5 Years' },
    description: 'Knox Powerbase IP54-16 Lithium LFP 314Ah battery. 16kWh energy storage with 8000 cycle life. WiFi and Bluetooth monitoring. For large commercial solar storage.',
    inStock: true, featured: false },

  { id: 'knox-powerbase-32', name: 'Knox Powerbase IP54 32 — 32kWh', category: 'Battery', brand: 'Knox', price: 1092500, image: '/products/batteries/knox-powerbase-32.webp',
    specs: { Voltage: '51.2V', Capacity: '628Ah', Energy: '32kWh', Rate: '0.5C', Type: 'LFP Lithium', Display: 'Touch LCD', Rating: 'IP54', Cycles: '8000', Warranty: '5 Years' },
    description: 'Knox Powerbase IP54-32 Lithium LFP 628Ah — 32kWh industrial energy storage. 8000 cycle life, 5-year warranty. Maximum capacity lithium storage for industrial solar.',
    inStock: true, featured: false },

  // ─── SOLAR PANELS — CANADIAN SOLAR ─────────
  { id: 'canadian-585w', name: 'Canadian Solar 585W N-Type Bifacial', category: 'Solar Panel', brand: 'Canadian Solar', price: 26179, image: '/products/Solar Panels/canadian-585w.jpg',
    specs: { Wattage: '585W', 'Per Watt': 'PKR 44.75/W', Type: 'N-Type Bifacial', Cells: 'Multi BB', Frame: 'Aluminum Alloy', Warranty: '25 Years Performance' },
    description: 'Canadian Solar 585W N-Type Bifacial — globally trusted brand with excellent low-light performance. Ideal for residential rooftops across Lahore.',
    inStock: true, featured: true },

  { id: 'canadian-590w', name: 'Canadian Solar 590W N-Type Bifacial', category: 'Solar Panel', brand: 'Canadian Solar', price: 26108, image: '/products/Solar Panels/canadian-590w.jpg',
    specs: { Wattage: '590W', 'Per Watt': 'PKR 44.25/W', Type: 'N-Type Bifacial', Frame: 'Aluminum Alloy', Warranty: '25 Years Performance' },
    description: 'Canadian Solar 590W N-Type Bifacial. Superior bifacial gain from reflected light maximizes total energy yield. Perfect for Lahore rooftop installations.',
    inStock: true, featured: false },

  { id: 'canadian-615w', name: 'Canadian Solar 615W N-Type Bifacial', category: 'Solar Panel', brand: 'Canadian Solar', price: 26291, image: '/products/Solar Panels/canadian-615w.jpg',
    specs: { Wattage: '615W', 'Per Watt': 'PKR 42.75/W', Type: 'N-Type Bifacial', Frame: 'Aluminum Alloy', Warranty: '25 Years Performance' },
    description: 'Canadian Solar 615W high-output N-Type Bifacial. Best value per watt in the lineup. Excellent choice for medium to large solar systems.',
    inStock: true, featured: false },

  { id: 'canadian-715w', name: 'Canadian Solar 715W N-Type Bifacial', category: 'Solar Panel', brand: 'Canadian Solar', price: 30030, image: '/products/Solar Panels/canadian-715w.jpg',
    specs: { Wattage: '715W', 'Per Watt': 'PKR 42.00/W', Type: 'N-Type Bifacial', Frame: 'Aluminum Alloy', Warranty: '25 Years Performance' },
    description: 'Canadian Solar 715W ultra-high power N-Type Bifacial. Maximum output per panel reduces total installation cost. Best for commercial and industrial systems.',
    inStock: true, featured: true },

  // ─── SOLAR PANELS — JINKO SOLAR ────────────
  { id: 'jinko-585w', name: 'JinkoSolar 585W N-Type Bifacial', category: 'Solar Panel', brand: 'JinkoSolar', price: 25302, image: '/products/Solar Panels/jinko-585w.jpg',
    specs: { Wattage: '585W', 'Per Watt': 'PKR 43.25/W', Type: 'N-Type Bifacial', Cells: 'Multi BB', Warranty: '25 Years Performance' },
    description: "JinkoSolar 585W N-Type Bifacial — world's #1 solar brand by shipments. Industry-leading efficiency and 25-year performance warranty. Most popular in Lahore.",
    inStock: true, featured: true },

  { id: 'jinko-635w', name: 'JinkoSolar 635W N-Type Bifacial', category: 'Solar Panel', brand: 'JinkoSolar', price: 27146, image: '/products/Solar Panels/jinko-635w.jpg',
    specs: { Wattage: '635W', 'Per Watt': 'PKR 42.75/W', Type: 'N-Type Bifacial', Stock: 'x20 Available', Warranty: '25 Years Performance' },
    description: 'JinkoSolar 635W high-power N-Type Bifacial. Premium efficiency for demanding installations. Limited stock of 20 panels — order fast.',
    inStock: true, featured: false },

  // ─── SOLAR PANELS — JA SOLAR ───────────────
  { id: 'ja-625w', name: 'JA Solar 625W N-Type Bifacial', category: 'Solar Panel', brand: 'JA Solar', price: 24531, image: '/products/Solar Panels/ja-625w.jpg',
    specs: { Wattage: '625W', 'Per Watt': 'PKR 39.25/W', Type: 'N-Type Bifacial', Frame: 'Aluminum Alloy', Warranty: '25 Years Performance' },
    description: "JA Solar 625W N-Type Bifacial — exceptional value for money. One of Pakistan's most installed solar brands. Great low-light performance for Lahore weather.",
    inStock: true, featured: false },

  // ─── SOLAR PANELS — LONGI ──────────────────
  { id: 'longi-x7-620w', name: 'LONGi X7 620W N-Type Bifacial 18BB', category: 'Solar Panel', brand: 'LONGi', price: 24800, image: '/products/Solar Panels/longi-x7-620w.jpg',
    specs: { Wattage: '620W', 'Per Watt': 'PKR 40.00/W', Type: 'N-Type Bifacial', Cells: '18BB', Series: 'X7', Warranty: '25 Years Performance' },
    description: "LONGi X7 620W N-Type Bifacial with 18BB cell technology. LONGi is the world's largest solar manufacturer. X7 series delivers outstanding efficiency and durability.",
    inStock: true, featured: true },

  { id: 'longi-x10-645w', name: 'LONGi X10 645W N-Type Bifacial', category: 'Solar Panel', brand: 'LONGi', price: 27735, image: '/products/Solar Panels/longi-x10-645w.jpg',
    specs: { Wattage: '645W', 'Per Watt': 'PKR 43.00/W', Type: 'N-Type Bifacial', Series: 'X10', Warranty: '25 Years Performance' },
    description: 'LONGi X10 645W — flagship LONGi panel with premium bifacial technology. Maximum power density for premium residential and commercial solar systems.',
    inStock: true, featured: true },

  { id: 'longi-225w', name: 'LONGi 225W Horizon Series 12V', category: 'Solar Panel', brand: 'LONGi', price: 9000, image: '/products/Solar Panels/longi-225w.jpg',
    specs: { Wattage: '225W', Voltage: '12V', Series: 'Horizon', Type: 'Monocrystalline', Warranty: '25 Years Performance' },
    description: 'LONGi 225W Horizon Series 12V panel. Perfect for smaller solar setups, water pumping, and 12V off-grid systems. Compact and highly reliable.',
    inStock: true, featured: false },

  // ─── SOLAR PANELS — ASTRO ENERGY ───────────
  { id: 'astro-590w', name: 'Astro Energy 590W N-Type Bifacial 20BB', category: 'Solar Panel', brand: 'Astro Energy', price: 24338, image: '/products/Solar Panels/astro-590w.jpg',
    specs: { Wattage: '590W', 'Per Watt': 'PKR 41.25/W', Type: 'N-Type Bifacial', Cells: '20BB', Warranty: '25 Years Performance' },
    description: 'Astro Energy 590W N-Type Bifacial with 20BB cell technology. Premium multi-busbar design for reduced resistance and higher energy output.',
    inStock: true, featured: false },

  { id: 'astro-625w', name: 'Astro Energy 625W N-Type Bifacial', category: 'Solar Panel', brand: 'Astro Energy', price: 24688, image: '/products/Solar Panels/astro-625w.jpg',
    specs: { Wattage: '625W', 'Per Watt': 'PKR 39.50/W', Type: 'N-Type Bifacial', Frame: 'Aluminum Alloy', Warranty: '25 Years Performance' },
    description: 'Astro Energy 625W N-Type Bifacial. Excellent efficiency at competitive pricing. Strong choice for both residential and commercial solar in Pakistan.',
    inStock: true, featured: false },

  // ─── SOLAR PANELS — RISEN HJT ──────────────
  { id: 'risen-740w', name: 'Risen HJT 740W N-Type Bifacial', category: 'Solar Panel', brand: 'Risen', price: 30340, image: '/products/Solar Panels/risen-740w.jpg',
    specs: { Wattage: '740W', 'Per Watt': 'PKR 41.00/W', Type: 'HJT N-Type Bifacial', Technology: 'Heterojunction (HJT)', Warranty: '25 Years Performance' },
    description: 'Risen HJT 740W — cutting-edge Heterojunction Technology. Highest efficiency available in Pakistan market. Best temperature coefficient for hot Lahore summers.',
    inStock: true, featured: true },

  // ─── SOLAR PANELS — TRINA ──────────────────
  { id: 'trina-720w', name: 'Trina Solar 720W N-Type Bifacial', category: 'Solar Panel', brand: 'Trina', price: 28080, image: '/products/Solar Panels/trina-720w.jpg',
    specs: { Wattage: '720W', 'Per Watt': 'PKR 39.00/W', Type: 'N-Type Bifacial', Frame: 'Aluminum Alloy', Warranty: '25 Years Performance' },
    description: 'Trina Solar 720W N-Type Bifacial. Trina is a top-5 global solar brand with proven reliability. Excellent value for high-power commercial installations.',
    inStock: true, featured: false },

  // ─── SOLAR PANELS — AIKO ───────────────────
  { id: 'aiko-665w', name: 'AIKO Stellar 665W N-Type Bifacial', category: 'Solar Panel', brand: 'AIKO', price: 27099, image: '/products/Solar Panels/aiko-665w.jpg',
    specs: { Wattage: '665W', 'Per Watt': 'PKR 40.75/W', Type: 'N-Type Bifacial', Series: 'Stellar', Warranty: '25 Years Performance' },
    description: "AIKO Stellar 665W N-Type Bifacial. AIKO's proprietary ABC cell technology delivers industry-leading efficiency. Premium choice for performance-focused installations.",
    inStock: true, featured: false },

  // ─── SOLAR PANELS — RONMA ──────────────────
  { id: 'ronma-620w', name: 'Ronma 620W Shiny Glass Bifacial', category: 'Solar Panel', brand: 'Ronma', price: 22785, image: '/products/Solar Panels/ronma-620w.jpg',
    specs: { Wattage: '620W', 'Per Watt': 'PKR 36.75/W', Type: 'Bifacial Shiny Glass', Frame: 'Aluminum Alloy', Warranty: '25 Years Performance' },
    description: 'Ronma 620W Shiny Glass Bifacial. Most affordable high-wattage option with glass-glass bifacial construction. Best budget choice for maximizing solar output.',
    inStock: true, featured: false },

  // ─── SOLAR PANELS — INVEREX JOLLYWOOD ──────
  { id: 'inverex-jollywood-620w', name: 'Inverex Jollywood 620W N-Type Bifacial Steel Frame', category: 'Solar Panel', brand: 'Inverex Jollywood', price: 26350, image: '/products/Solar Panels/inverex-jollywood-620w.jpg',
    specs: { Wattage: '620W', 'Per Watt': 'PKR 42.50/W', Type: 'N-Type Bifacial', Frame: 'Steel Frame', Warranty: '25 Years Performance' },
    description: "Inverex Jollywood 620W N-Type Bifacial with heavy-duty Steel Frame. Extra durability for Pakistani weather conditions. Backed by Inverex's local warranty support.",
    inStock: true, featured: false },

  // ─── SOLAR PANELS — CORETECH ───────────────
  { id: 'coretech-585w', name: 'Coretech 585W 18BB', category: 'Solar Panel', brand: 'Coretech', price: 22376, image: '/products/Solar Panels/coretech-585w.jpg',
    specs: { Wattage: '585W', 'Per Watt': 'PKR 38.25/W', Type: 'Monocrystalline', Cells: '18BB', Warranty: '25 Years Performance' },
    description: 'Coretech 585W 18BB monocrystalline panel. Affordable and reliable 18 busbar technology for budget-conscious solar installations without compromising quality.',
    inStock: true, featured: false },

  // ─── KNOX HYBRID INVERTERS ─────────────────
  { id: 'knox-eco-4000', name: 'Knox Krypton ECO 4000 Wi-Fi 3kW', category: 'Inverter', brand: 'Knox', price: 82500, image: '/products/inverters/knox-eco-4000.webp',
    specs: { Power: '3kW', 'Max PV': '4000W', Voltage: '24VDC', WiFi: 'Built-in', Voltronic: 'Genuine VP Taiwan', Operation: 'Battery-less possible' },
    description: 'Knox Krypton ECO-4000 3kW hybrid inverter with built-in Wi-Fi. Genuine Voltronic Power Taiwan. Battery-less operation capable. Perfect for small home solar systems.',
    inStock: true, featured: false },

  { id: 'knox-eco-5000', name: 'Knox Krypton ECO 5000 Wi-Fi 4.2kW', category: 'Inverter', brand: 'Knox', price: 102500, image: '/products/inverters/knox-eco-5000.webp',
    specs: { Power: '4.2kW', 'Max PV': '5000W', Voltage: '24VDC', WiFi: 'Built-in', Voltronic: 'Genuine VP Taiwan', Operation: 'Battery-less possible' },
    description: 'Knox Krypton ECO-5000 4.2kW hybrid inverter. Built-in Wi-Fi monitoring and battery-less operation. Genuine Voltronic Power Taiwan — ideal for medium homes.',
    inStock: true, featured: false },

  { id: 'knox-eco-6600', name: 'Knox Krypton ECO 6600 Wi-Fi 6.2kW', category: 'Inverter', brand: 'Knox', price: 122500, image: '/products/inverters/knox-eco-6600.webp',
    specs: { Power: '6.2kW', 'Max PV': '6600W', Voltage: '48VDC', WiFi: 'Built-in', Voltronic: 'Genuine VP Taiwan', Operation: 'Battery-less possible' },
    description: 'Knox Krypton ECO-6600 6.2kW 48V hybrid inverter with Wi-Fi. Battery-less operation. Genuine Voltronic Power — best for larger homes and small offices.',
    inStock: true, featured: false },

  { id: 'knox-6000', name: 'Knox Krypton 6000 4kW Hybrid', category: 'Inverter', brand: 'Knox', price: 120500, image: '/products/inverters/knox-6000.webp',
    specs: { Power: '4kW', 'Max PV': '6000W', Voltage: '24VDC', WiFi: 'Built-in', BMS: 'Built-in', Output: 'Dual Output', Voltronic: 'Genuine VP Taiwan' },
    description: 'Knox Krypton 6000 4kW hybrid inverter. Built-in Wi-Fi, BMS and Dual Output. Genuine Voltronic Power Taiwan. Most popular Knox model for residential solar in Lahore.',
    inStock: true, featured: true },

  { id: 'knox-6500', name: 'Knox Krypton 6500 4.5kW Hybrid', category: 'Inverter', brand: 'Knox', price: 127500, image: '/products/inverters/knox-6500.webp',
    specs: { Power: '4.5kW', 'Max PV': '6500W', Voltage: '24VDC', WiFi: 'Built-in', BMS: 'Built-in', Output: 'Dual Output', Voltronic: 'Genuine VP Taiwan' },
    description: 'Knox Krypton 6500 4.5kW hybrid with dual output. Built-in Wi-Fi and BMS. Genuine Voltronic Power — step up from 6000 for homes with higher energy demands.',
    inStock: true, featured: false },

  { id: 'knox-9000', name: 'Knox Krypton 9000 RGB 6.2kW Hybrid', category: 'Inverter', brand: 'Knox', price: 162500, image: '/products/inverters/knox-9000.webp',
    specs: { Power: '6.2kW', 'Max PV': '9000W', WiFi: 'Built-in', BMS: 'Built-in', Display: 'RGB', Output: 'Dual Output', Voltronic: 'Genuine VP Taiwan' },
    description: 'Knox Krypton 9000 RGB 6.2kW hybrid inverter. Dual output with built-in BMS and Wi-Fi. RGB display panel. Genuine Voltronic Power Taiwan — ideal for larger homes.',
    inStock: true, featured: true },

  { id: 'knox-9055', name: 'Knox Krypton 9055 RGB 6.5kW Hybrid', category: 'Inverter', brand: 'Knox', price: 182500, image: '/products/inverters/knox-9055.webp',
    specs: { Power: '6.5kW', 'Max PV': '9000W', 'PV+Bat': '8000W', 'Grid Feed': '8000W', Display: 'HMI Touch', WiFi: 'Built-in', BMS: 'Built-in', Voltronic: 'Genuine VP Taiwan' },
    description: 'Knox Krypton 9055 RGB 6.5kW with HMI touch display. Grid feeding 8000W. Dual output with BMS and Wi-Fi. Genuine Voltronic — premium choice for solar exporters.',
    inStock: true, featured: false },

  { id: 'knox-12002', name: 'Knox Krypton 12002 RGB 8.5kW Hybrid', category: 'Inverter', brand: 'Knox', price: 267500, image: '/products/inverters/knox-12002.webp',
    specs: { Power: '8.5kW', 'Max PV': '12000W', Display: '7" HMI Touch', MPPT: 'Dual MPPT', WiFi: 'Built-in', BMS: 'Built-in', Output: 'Dual Output', Voltronic: 'Genuine VP Taiwan' },
    description: 'Knox Krypton 12002 RGB 8.5kW — 7 inch HMI touch display, dual MPPT, built-in BMS and Wi-Fi. Genuine Voltronic Power Taiwan. Best for large homes and commercial use.',
    inStock: true, featured: true },

  { id: 'knox-13002', name: 'Knox Krypton 13002 RGB 10kW Hybrid', category: 'Inverter', brand: 'Knox', price: 297500, image: '/products/inverters/knox-13002.webp',
    specs: { Power: '10kW', 'Max PV': '13000W', Display: '7" HMI Touch', MPPT: 'Dual MPPT', WiFi: 'Built-in', BMS: 'Built-in', Output: 'Dual Output', Voltronic: 'Genuine VP Taiwan' },
    description: 'Knox Krypton 13002 10kW hybrid with 7 inch HMI touch display. Dual MPPT for maximum solar harvest. Genuine Voltronic Power — designed for commercial solar systems.',
    inStock: true, featured: false },

  { id: 'knox-15002', name: 'Knox Krypton 15002 RGB 11.5kW Hybrid', category: 'Inverter', brand: 'Knox', price: 312500, image: '/products/inverters/knox-15002.webp',
    specs: { Power: '11.5kW', 'Max PV': '15000W', Display: '7" HMI Touch', MPPT: 'Dual MPPT', WiFi: 'Built-in', BMS: 'Built-in', Output: 'Dual Output', Voltronic: 'Genuine VP Taiwan' },
    description: 'Knox Krypton 15002 11.5kW — most powerful Krypton series inverter. Dual MPPT, 7 inch HMI touch. Genuine Voltronic Power Taiwan. Built for heavy commercial loads.',
    inStock: true, featured: false },

  // ─── KNOX ON-GRID INVERTERS ─────────────────
  { id: 'knox-xenon-12066', name: 'Knox Xenon 12066 IP66 6kW On-Grid', category: 'Inverter', brand: 'Knox', price: 237500, image: '/products/inverters/knox-xenon-12066.webp',
    specs: { Power: '6kW', 'Max PV': '12000W', Rating: 'IP66', ISC: '22A', Display: 'HMI LCD 7"', WiFi: 'Built-in', BMS: 'Built-in', Output: 'Dual Output', Warranty: '5 Year Board Replacement' },
    description: 'Knox Xenon 12066 IP66 6kW on-grid inverter. IP66 weatherproof rating with 7 inch HMI LCD. 5-year free board replacement warranty. Genuine Voltronic Power Taiwan.',
    inStock: true, featured: false },

  { id: 'knox-xenon-18000', name: 'Knox Xenon 18000 IP65 12kW On-Grid', category: 'Inverter', brand: 'Knox', price: 572500, image: '/products/inverters/knox-xenon-18000.webp',
    specs: { Power: '12kW', 'Max PV': '18000W', Rating: 'IP65', Voltage: '48VDC', MPPT: 'Dual PV Controller', WiFi: 'Built-in', BMS: 'Built-in', Voltronic: 'Genuine VP' },
    description: 'Knox Xenon 18000 IP65 12kW on-grid inverter. Dual PV controller and dual output. IP65 weatherproof. Genuine Voltronic Power — perfect for large commercial solar.',
    inStock: true, featured: false },

  { id: 'knox-zynex-8kw', name: 'Knox Zynex 8kW 3MPPT IP66 On-Grid', category: 'Inverter', brand: 'Knox', price: 347500, image: '/products/inverters/knox-zynex-8kw.webp',
    specs: { Power: '8kW', 'Max PV': '16000W', Rating: 'IP66', MPPT: '3 MPPT', Voltage: '48VDC', WiFi: 'Built-in', BMS: 'Built-in', Warranty: '5 Year Board Replacement' },
    description: 'Knox Zynex 8kW IP66 with triple MPPT controller. Maximum solar harvest from multiple roof orientations. 5-year board replacement warranty. For serious commercial installations.',
    inStock: true, featured: true },

  { id: 'knox-zynex-10kw', name: 'Knox Zynex 10kW 3MPPT IP66 On-Grid', category: 'Inverter', brand: 'Knox', price: 377500, image: '/products/inverters/knox-zynex-10kw.webp',
    specs: { Power: '10kW', 'Max PV': '18000W', Rating: 'IP66', MPPT: '3 MPPT', Voltage: '48VDC', WiFi: 'Built-in', BMS: 'Built-in', Warranty: '5 Year Board Replacement' },
    description: 'Knox Zynex 10kW IP66 with triple MPPT. Handles 18000W solar input across 3 independent MPPT trackers. 5-year board replacement warranty. Industrial grade reliability.',
    inStock: true, featured: false },

  { id: 'knox-asw-5000t', name: 'Knox ASW 5000-T On-Grid 5kW', category: 'Inverter', brand: 'Knox', price: 132500, image: '/products/inverters/knox-asw-5000t.webp',
    specs: { Power: '5kW', 'Max PV': '7.5kW', ISC: '18A/18A', Edition: 'Limited Edition LE & G2' },
    description: 'Knox ASW 5000-T Limited Edition 5kW on-grid inverter. Dual 18A ISC input. LE & G2 technology for improved efficiency and reliability in Pakistani grid conditions.',
    inStock: true, featured: false },

  { id: 'knox-asw-6000t', name: 'Knox ASW 6000-T On-Grid 6kW', category: 'Inverter', brand: 'Knox', price: 137500, image: '/products/inverters/knox-asw-6000t.webp',
    specs: { Power: '6kW', 'Max PV': '9kW', ISC: '18A/18A', Edition: 'Limited Edition LE & G2' },
    description: 'Knox ASW 6000-T Limited Edition 6kW on-grid inverter. Dual 18A ISC input. Premium LE & G2 version for optimized grid-tied solar performance.',
    inStock: true, featured: false },

  { id: 'knox-asw-8k-lt-g2', name: 'Knox ASW 8K-LT-G2 On-Grid 8kW', category: 'Inverter', brand: 'Knox', price: 142500, image: '/products/inverters/knox-asw-8k-lt-g2.webp',
    specs: { Power: '8kW', 'Max PV': '12kW', ISC: '26A/13A', Output: '40A-20A' },
    description: 'Knox ASW 8K-LT-G2 8kW on-grid inverter. High ISC input for large panel arrays. G2 generation technology for superior efficiency.',
    inStock: true, featured: false },

  { id: 'knox-xerox-g4-10kw', name: 'Knox Xerox G4 10kW On-Grid', category: 'Inverter', brand: 'Knox', price: 172500, image: '/products/inverters/knox-xerox-g4-10kw.webp',
    specs: { Power: '10kW', 'Max PV': '15kW', ISC: '20A', 'Max Output': '11kW' },
    description: 'Knox Xerox G4 10kW on-grid inverter. G4 fourth generation technology with maximum 11kW output. Reliable grid-tied performance for large commercial installations.',
    inStock: true, featured: false },

  { id: 'knox-xerox-g4-pro-10-2', name: 'Knox Xerox G4 Pro 10.2kW On-Grid', category: 'Inverter', brand: 'Knox', price: 187500, image: '/products/inverters/knox-xerox-g4-pro-10-2.webp',
    specs: { Power: '10kW', 'Max PV': '17kW', ISC: '32A/20A', 'Max Output': '13.2kW' },
    description: 'Knox Xerox G4 Pro 10.2kW on-grid inverter. High ISC 32A input with 13.2kW maximum output. Pro series for premium commercial grid-tied systems.',
    inStock: true, featured: false },

  { id: 'knox-xerox-g4-pro-15-2', name: 'Knox Xerox G4 Pro 15.2kW On-Grid', category: 'Inverter', brand: 'Knox', price: 222500, image: null,
    specs: { Power: '15kW', 'Max PV': '23kW', ISC: '32A/20A', 'Max Output': '16.5kW' },
    description: 'Knox Xerox G4 Pro 15.2kW on-grid inverter with 16.5kW maximum output. G4 Pro series for industrial solar. Top choice for factories and large commercial buildings.',
    inStock: true, featured: false },

  { id: 'knox-xerox-g4-pro-20-2', name: 'Knox Xerox G4 Pro 20.2kW On-Grid', category: 'Inverter', brand: 'Knox', price: 272500, image: '/products/inverters/knox-xerox-g4-pro-20-2.webp',
    specs: { Power: '20kW', 'Max PV': '30kW', ISC: '32A/32A', 'Max Output': '22kW' },
    description: 'Knox Xerox G4 Pro 20.2kW on-grid inverter. Maximum 22kW output with dual 32A ISC. Industrial-grade reliability for large factories and commercial complexes.',
    inStock: true, featured: false },

  { id: 'knox-xerox-g4-pro-25-2', name: 'Knox Xerox G4 Pro 25.2kW On-Grid', category: 'Inverter', brand: 'Knox', price: 302500, image: '/products/inverters/knox-xerox-g4-pro-25-2.webp',
    specs: { Power: '25kW', 'Max PV': '38kW', ISC: '40A/32A', 'Max Output': '27.5kW' },
    description: 'Knox Xerox G4 Pro 25.2kW on-grid inverter. 27.5kW maximum output for heavy industrial solar. Best choice for warehouses and large manufacturing facilities.',
    inStock: true, featured: false },

]

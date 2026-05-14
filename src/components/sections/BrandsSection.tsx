/* Infinite scrolling brand strip — full list repeated twice for seamless loop */

const BRANDS = [
  { name: 'Osaka',            category: 'BATTERY'      },
  { name: 'Phoenix',          category: 'BATTERY'      },
  { name: 'AGS',              category: 'BATTERY'      },
  { name: 'Alaska',           category: 'BATTERY'      },
  { name: 'Lithium Batteries', category: 'BATTERY'     },
  { name: 'Canadian Solar',   category: 'SOLAR'        },
  { name: 'JinkoSolar',       category: 'SOLAR'        },
  { name: 'JA Solar',         category: 'SOLAR'        },
  { name: 'LONGi',            category: 'SOLAR'        },
  { name: 'Risen Energy',     category: 'SOLAR'        },
  { name: 'Trina Solar',      category: 'SOLAR'        },
  { name: 'AIKO',             category: 'SOLAR'        },
  { name: 'Astro Energy',     category: 'SOLAR'        },
  { name: 'Inverex',          category: 'INVERTER'     },
  { name: 'Coretech',         category: 'SOLAR'        },
]

/* Separator between each brand */
function Dot() {
  return (
    <span
      className="w-1 h-1 rounded-full bg-amber-400 mx-6 shrink-0 self-center"
      aria-hidden
    />
  )
}

function BrandItem({ name, category }: { name: string; category: string }) {
  return (
    <span className="inline-flex items-baseline gap-2 shrink-0">
      <span className="text-sm font-bold text-slate-500 tracking-wide whitespace-nowrap">
        {name}
      </span>
      <span className="text-[9px] font-black tracking-[0.18em] text-amber-500 uppercase hidden sm:inline">
        {category}
      </span>
    </span>
  )
}

export function BrandsSection() {
  const doubled = [...BRANDS, ...BRANDS]

  return (
    <section className="bg-white border-b border-gray-100 py-8 overflow-hidden">
      {/* Header */}
      <p className="text-center text-[10px] font-black tracking-[0.25em] uppercase text-gray-400 mb-7">
        Authorised Dealer &amp; Installer
      </p>

      {/* Marquee track — edge-fades via CSS mask */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee">
          {doubled.map((brand, i) => (
            <span key={i} className="inline-flex items-center">
              <BrandItem name={brand.name} category={brand.category} />
              <Dot />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

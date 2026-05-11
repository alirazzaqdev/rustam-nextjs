const BRANDS = [
  { name: 'Osaka',          category: 'Batteries'    },
  { name: 'Phoenix',        category: 'Batteries'    },
  { name: 'AGS',            category: 'Batteries'    },
  { name: 'Alaska',         category: 'Batteries'    },
  { name: 'Knox',           category: 'Inverters'    },
  { name: 'Canadian Solar', category: 'Solar Panels' },
  { name: 'JinkoSolar',     category: 'Solar Panels' },
  { name: 'JA Solar',       category: 'Solar Panels' },
  { name: 'LONGi',          category: 'Solar Panels' },
  { name: 'Risen',          category: 'Solar Panels' },
]

export function BrandsSection() {
  return (
    <section className="bg-slate-50 py-10 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold tracking-[0.18em] uppercase text-gray-400 mb-7">
          Authorised dealer &amp; installer
        </p>

        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="group flex items-center gap-2 bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-sm rounded-full px-4 py-2 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition-colors" />
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                {b.name}
              </span>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide hidden sm:inline">
                {b.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

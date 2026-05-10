const stats = [
  { value: '19+', label: 'Years experience' },
  { value: '500+', label: 'Happy customers' },
  { value: '70%', label: 'Avg bill reduction' },
  { value: '5kW', label: 'Avg system size' },
]

export function StatsSection() {
  return (
    <section className="bg-slate-50 py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-4 py-6 md:py-2">
              <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {s.value}
              </p>
              <p className="text-sm text-gray-500 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

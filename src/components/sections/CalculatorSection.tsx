'use client'

import { useState, useMemo } from 'react'
import { Zap, TrendingUp, TrendingDown, Leaf, Sun, BatteryCharging, Info, Phone, Banknote, CalendarClock } from 'lucide-react'

// ─── Pakistan 2025 Solar Constants ────────────────────────────────────────────
// Lahore peak sun hours (annual average across seasons)
const LAHORE_SUN_HOURS = 4.8
// System losses: inverter (3%) + wiring (2%) + dust/shading (5%) + temp derating (10%)
const SYSTEM_EFFICIENCY = 0.80
// Standard panel wattage in Pakistan market 2025
const PANEL_WATTS = 580

// Installation cost per kW (panels + inverter + installation + wiring, PKR)
const COST_PER_KW = {
  ongrid: 72_000,   // On-grid system (no batteries)
  hybrid: 98_000,   // Hybrid system (no batteries — added separately)
}

// Tubular battery cost (150Ah, 12V — most common in Pakistan)
const BATTERY_COST = 24_000 // PKR per battery

// Pakistan electricity inflation rate (average last 5 years)
const ELEC_INFLATION = 0.15   // 15% per year

// NEPRA net-metering buyback rate for on-grid systems
const NET_METERING_RATE = 22  // PKR / kWh

// CO2 factor for Pakistan national grid (Coal + Gas mix)
const CO2_PER_KWH = 0.46     // kg CO₂ per kWh

type SystemType = 'ongrid' | 'hybrid'

function getBatteries(systemKw: number): number {
  if (systemKw <= 3)  return 2
  if (systemKw <= 6)  return 4
  if (systemKw <= 10) return 6
  return 8
}

function formatPKR(n: number) {
  if (n >= 1_000_000) return `PKR ${(n / 1_000_000).toFixed(2)}M`
  if (n >= 100_000)   return `PKR ${(n / 1_000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`
  return `PKR ${Math.round(n).toLocaleString('en-PK')}`
}

export function CalculatorSection() {
  const [monthlyBill,  setMonthlyBill]  = useState(12_000)
  const [systemType,   setSystemType]   = useState<SystemType>('hybrid')
  const [sunHours,     setSunHours]     = useState(LAHORE_SUN_HOURS)
  const [unitRate,     setUnitRate]     = useState(35)
  const [withBattery,  setWithBattery]  = useState(true)

  const calc = useMemo(() => {
    // ── Monthly consumption ────────────────────────────────────────────────────
    const monthlyUnits      = monthlyBill / unitRate            // kWh
    const dailyConsumption  = monthlyUnits / 30                 // kWh/day

    // ── System sizing ──────────────────────────────────────────────────────────
    const rawKw     = dailyConsumption / (sunHours * SYSTEM_EFFICIENCY)
    // Round up to nearest 0.5 kW (commercial sizes)
    const systemKw  = Math.ceil(rawKw * 2) / 2

    // ── Panel count ────────────────────────────────────────────────────────────
    const panelCount        = Math.ceil((systemKw * 1000) / PANEL_WATTS)
    const actualSystemKw    = (panelCount * PANEL_WATTS) / 1000

    // ── Production ────────────────────────────────────────────────────────────
    const dailyProduction   = actualSystemKw * sunHours * SYSTEM_EFFICIENCY
    const monthlyProduction = dailyProduction * 30
    const annualProduction  = monthlyProduction * 12

    // ── Cost ──────────────────────────────────────────────────────────────────
    const baseCost      = actualSystemKw * COST_PER_KW[systemType]
    const batteryCount  = systemType === 'hybrid' && withBattery ? getBatteries(actualSystemKw) : 0
    const batteryCost   = batteryCount * BATTERY_COST
    const totalCost     = baseCost + batteryCost

    // ── Monthly savings ────────────────────────────────────────────────────────
    // On-grid: solar covers ~85% of bill (daytime only, sells excess via net metering)
    // Hybrid + battery: solar + battery covers ~92% of bill
    const coverageFactor = systemType === 'ongrid'
      ? 0.85
      : withBattery ? 0.92 : 0.80
    const monthlySavings  = monthlyBill * coverageFactor
    const newMonthlyBill  = Math.max(monthlyBill - monthlySavings, 500) // Meter charges min ~PKR 500

    // Net metering extra credit (on-grid only: excess solar sold back)
    const excessSolar         = Math.max(monthlyProduction - monthlyUnits, 0)
    const netMeteringMonthly  = systemType === 'ongrid' ? excessSolar * NET_METERING_RATE : 0

    const totalMonthlySavings = monthlySavings + netMeteringMonthly
    const annualSavings       = totalMonthlySavings * 12

    // ── Payback period (with 15% electricity inflation) ───────────────────────
    let cumSavings = 0
    let paybackYears = 0
    let rateMultiplier = 1
    for (let y = 1; y <= 25; y++) {
      cumSavings += annualSavings * rateMultiplier
      rateMultiplier *= (1 + ELEC_INFLATION)
      if (cumSavings >= totalCost && paybackYears === 0) paybackYears = y
    }

    // ── 25-year total savings (compounding electricity inflation) ─────────────
    let total25 = 0
    let mult = 1
    for (let y = 1; y <= 25; y++) {
      total25 += annualSavings * mult
      mult *= (1 + ELEC_INFLATION)
    }
    const twentyFiveYearSavings = total25 - totalCost

    // ── Environmental ─────────────────────────────────────────────────────────
    const co2Annual   = annualProduction * CO2_PER_KWH
    const treesPlanted = Math.round(co2Annual / 21)

    return {
      monthlyUnits: Math.round(monthlyUnits),
      systemKw: actualSystemKw,
      panelCount,
      batteryCount,
      dailyProduction:        Math.round(dailyProduction * 10) / 10,
      monthlyProduction:      Math.round(monthlyProduction),
      annualProduction:       Math.round(annualProduction),
      baseCost, batteryCost, totalCost,
      monthlySavings:         Math.round(totalMonthlySavings),
      newMonthlyBill:         Math.round(newMonthlyBill),
      annualSavings:          Math.round(annualSavings),
      paybackYears,
      twentyFiveYearSavings:  Math.round(twentyFiveYearSavings),
      co2Annual:              Math.round(co2Annual),
      treesPlanted,
      netMeteringMonthly:     Math.round(netMeteringMonthly),
      coveragePct:            Math.round(coverageFactor * 100),
    }
  }, [monthlyBill, systemType, sunHours, unitRate, withBattery])

  return (
    <section id="calculator" className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-14">
          {/* Label */}
          <p className="text-emerald-600 text-xs font-bold tracking-[5px] uppercase mb-4 text-center">
            Free Solar Savings Calculator
          </p>

          {/* Main heading */}
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight text-center leading-tight mb-5">
            How much can solar reduce<br />
            <span className="text-emerald-600">your electricity bill?</span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 text-base text-center leading-relaxed mb-10 max-w-2xl mx-auto">
            Enter your monthly electricity bill — this calculator instantly shows your recommended
            system size, total installation cost, monthly savings, and 25-year profit.
            Based on real Pakistan 2025 market prices and Lahore sun data.
          </p>

          {/* 4 feature chips — what this calculator tells you */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {([
              { Icon: Zap,           color: 'text-amber-500',   bg: 'bg-amber-50',   title: 'System Size',    desc: 'Recommended kW for your usage' },
              { Icon: Banknote,      color: 'text-emerald-600', bg: 'bg-emerald-50', title: 'Total Cost',     desc: 'Full cost including installation' },
              { Icon: TrendingDown,  color: 'text-blue-500',    bg: 'bg-blue-50',    title: 'Bill Reduction', desc: 'Your new monthly electricity bill' },
              { Icon: CalendarClock, color: 'text-purple-500',  bg: 'bg-purple-50',  title: 'Payback Period', desc: 'Years to recover your investment' },
            ] as const).map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <f.Icon size={20} className={f.color} />
                </div>
                <p className="text-sm font-bold text-slate-800">{f.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── INPUTS (left, 2 cols) ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* System Type */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <label className="block text-sm font-bold text-slate-800 mb-4">System Type</label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { id: 'hybrid',  label: 'Hybrid',   sub: 'Battery backup + solar' },
                  { id: 'ongrid',  label: 'On-Grid',  sub: 'Net metering, no batteries' },
                ] as { id: SystemType; label: string; sub: string }[]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSystemType(t.id)}
                    className={`p-3.5 rounded-xl text-left transition-all border-2 ${
                      systemType === t.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-gray-200 bg-white text-slate-600 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-sm">{t.label}</p>
                    <p className="text-xs mt-0.5 opacity-70">{t.sub}</p>
                  </button>
                ))}
              </div>

              {/* Battery toggle — only for hybrid */}
              {systemType === 'hybrid' && (
                <div className="mt-4 flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Include Batteries</p>
                    <p className="text-xs text-gray-500">150Ah tubular — loadshedding backup</p>
                  </div>
                  <button
                    onClick={() => setWithBattery(b => !b)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${withBattery ? 'bg-emerald-500' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${withBattery ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              )}
            </div>

            {/* Monthly Bill Slider */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <label className="block text-sm font-bold text-slate-800 mb-1">Monthly Electricity Bill</label>
              <p className="text-xs text-gray-500 mb-4">Your current LESCO/WAPDA monthly bill</p>
              <div className="text-3xl font-black text-emerald-600 mb-4">
                PKR {monthlyBill.toLocaleString()}
              </div>
              <input
                type="range" min="2000" max="100000" step="1000"
                value={monthlyBill}
                onChange={e => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>PKR 2,000</span>
                <span className="text-slate-600 font-semibold">≈ {calc.monthlyUnits} units/month</span>
                <span>PKR 100,000</span>
              </div>
            </div>

            {/* Electricity Rate */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-bold text-slate-800">Effective Rate (PKR/kWh)</label>
                <div className="group relative">
                  <Info size={14} className="text-gray-400 cursor-help" />
                  <div className="absolute right-0 top-5 w-56 bg-slate-800 text-white text-xs rounded-xl p-3 hidden group-hover:block z-10">
                    Include fuel surcharge, taxes, and fixed charges. Typical LESCO effective rate in 2025: PKR 30–50/kWh.
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4">Including all surcharges and taxes</p>
              <div className="text-3xl font-black text-emerald-600 mb-4">
                PKR {unitRate}/kWh
              </div>
              <input
                type="range" min="20" max="60" step="1"
                value={unitRate}
                onChange={e => setUnitRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>PKR 20</span>
                <span>PKR 60</span>
              </div>
            </div>

            {/* Sun Hours */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <label className="block text-sm font-bold text-slate-800 mb-1">Daily Peak Sun Hours</label>
              <p className="text-xs text-gray-500 mb-4">Lahore annual average: 4.8 hrs · Summer peak: 6+ hrs</p>
              <div className="text-3xl font-black text-emerald-600 mb-4">
                {sunHours} hours/day
              </div>
              <input
                type="range" min="3.5" max="6.5" step="0.1"
                value={sunHours}
                onChange={e => setSunHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>3.5 (Winter)</span>
                <span>6.5 (Summer)</span>
              </div>
            </div>
          </div>

          {/* ── RESULTS (right, 3 cols) ── */}
          <div className="lg:col-span-3 space-y-5">

            {/* System Recommendation — hero card */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200">
              <p className="text-emerald-200 text-xs font-bold tracking-widest uppercase mb-3">Recommended System</p>
              <div className="flex items-end gap-4 mb-4">
                <div>
                  <div className="text-6xl font-black leading-none">{calc.systemKw}</div>
                  <div className="text-emerald-200 font-semibold text-lg">kW system</div>
                </div>
                <div className="flex-1 pb-1">
                  <div className="text-emerald-100 text-sm mb-1">
                    <Zap size={13} className="inline mr-1" />
                    {calc.panelCount} panels × {PANEL_WATTS}W each
                  </div>
                  {calc.batteryCount > 0 && (
                    <div className="text-emerald-100 text-sm">
                      <BatteryCharging size={13} className="inline mr-1" />
                      {calc.batteryCount} batteries × 150Ah
                    </div>
                  )}
                  <div className="text-emerald-100 text-sm">
                    <Sun size={13} className="inline mr-1" />
                    {calc.dailyProduction} kWh/day generation
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/15 rounded-2xl px-4 py-3">
                  <p className="text-emerald-200 text-xs font-medium">Monthly Generation</p>
                  <p className="text-white font-black text-xl">{calc.monthlyProduction.toLocaleString()} kWh</p>
                </div>
                <div className="bg-white/15 rounded-2xl px-4 py-3">
                  <p className="text-emerald-200 text-xs font-medium">Bill Coverage</p>
                  <p className="text-white font-black text-xl">{calc.coveragePct}%</p>
                </div>
              </div>
            </div>

            {/* Bill comparison */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm font-bold text-slate-700 mb-4">Monthly Bill — Before vs After</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 text-center bg-red-50 rounded-xl py-4">
                  <p className="text-xs text-red-400 font-semibold uppercase tracking-wide mb-1">Current Bill</p>
                  <p className="text-2xl font-black text-red-500">PKR {monthlyBill.toLocaleString()}</p>
                </div>
                <div className="text-2xl font-black text-gray-300">→</div>
                <div className="flex-1 text-center bg-emerald-50 rounded-xl py-4">
                  <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wide mb-1">After Solar</p>
                  <p className="text-2xl font-black text-emerald-600">PKR {calc.newMonthlyBill.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 text-center text-sm text-gray-500">
                Save <span className="font-bold text-emerald-600">PKR {calc.monthlySavings.toLocaleString()}/month</span> from day one
              </div>
              {calc.netMeteringMonthly > 0 && (
                <div className="mt-2 text-center text-xs text-sky-600 bg-sky-50 rounded-lg py-1.5">
                  + PKR {calc.netMeteringMonthly.toLocaleString()}/month net metering credit
                </div>
              )}
            </div>

            {/* Cost breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm font-bold text-slate-700 mb-4">Investment Breakdown</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Solar panels + inverter + installation</span>
                  <span className="font-semibold text-slate-800">PKR {calc.baseCost.toLocaleString()}</span>
                </div>
                {calc.batteryCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{calc.batteryCount}× 150Ah tubular batteries</span>
                    <span className="font-semibold text-slate-800">PKR {calc.batteryCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-2.5 flex justify-between text-base font-black">
                  <span className="text-slate-800">Total Investment</span>
                  <span className="text-emerald-600">{formatPKR(calc.totalCost)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">* Estimate. Final price after free site assessment may vary ±10%.</p>
              </div>
            </div>

            {/* ROI grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Payback Period</p>
                <div className="text-4xl font-black text-emerald-600">{calc.paybackYears}<span className="text-lg font-bold text-gray-400 ml-1">yrs</span></div>
                <p className="text-gray-400 text-xs mt-1">With 15% electricity inflation</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Annual Savings</p>
                <div className="text-2xl font-black text-emerald-600">{formatPKR(calc.annualSavings)}</div>
                <p className="text-gray-400 text-xs mt-1">Growing 15%/yr with inflation</p>
              </div>
            </div>

            {/* 25-year savings */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-semibold">25-Year Net Profit</p>
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <div className="text-4xl font-black text-emerald-400">{formatPKR(calc.twentyFiveYearSavings)}</div>
              <p className="text-slate-500 text-xs mt-1">Total savings minus system cost over 25 years (15% electricity inflation applied)</p>
            </div>

            {/* Environment */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="text-emerald-500" size={16} />
                <p className="text-sm font-bold text-slate-700">Environmental Impact</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black text-emerald-600">{calc.co2Annual.toLocaleString()}<span className="text-base font-bold text-gray-400 ml-1">kg</span></div>
                  <p className="text-xs text-gray-500">CO₂ saved per year</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600">{calc.treesPlanted.toLocaleString()}</div>
                  <p className="text-xs text-gray-500">Trees equivalent</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="tel:+923213770402"
              className="flex items-center justify-center gap-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-200 text-base"
            >
              <Phone size={18} />
              Call for Free Site Assessment
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
          <p className="text-sm text-slate-600">
            <strong>How these numbers are calculated:</strong> System size is based on your monthly consumption ÷ (Lahore sun hours × 80% efficiency factor). Costs use 2025 Lahore market rates (panels + inverter + installation). Payback and 25-year savings include 15% annual electricity inflation — historically accurate for Pakistan. CO₂ uses Pakistan national grid factor of 0.46 kg/kWh. Contact us for a free site visit and final quote.
          </p>
        </div>
      </div>
    </section>
  )
}

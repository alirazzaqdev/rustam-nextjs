'use client'

import { useState, useMemo, useEffect } from 'react'
import { Sun, BatteryCharging, Zap, TrendingDown, Phone, RefreshCw, Radio, Info, CheckCircle2 } from 'lucide-react'

// ── 2026 Lahore constants ──────────────────────────────────────────────────────
const SUN_HOURS      = 4.8   // Lahore annual average peak sun hours
const EFFICIENCY     = 0.80  // Inverter + wiring + dust losses
const PANEL_W        = 580   // Tier-1 mono-PERC panel (standard 2026 Pakistan)
const ELEC_INFLATION = 0.15  // 15%/yr Pakistan historical average

// ── Standard residential system tiers (kW) ────────────────────────────────────
const TIERS = [6, 8, 10, 12, 15] as const
type Tier = typeof TIERS[number]

// ── Battery bank matched to each system tier ──────────────────────────────────
const BATTERY: Record<Tier, { spec: string; kwh: number }> = {
  6:  { spec: '48V · 100Ah', kwh: 5   },
  8:  { spec: '48V · 150Ah', kwh: 7.5 },
  10: { spec: '48V · 200Ah', kwh: 10  },
  12: { spec: '48V · 200Ah', kwh: 10  },
  15: { spec: '48V · 314Ah', kwh: 15  },
}

// ── ACs supported per tier ────────────────────────────────────────────────────
const ACS: Record<Tier, string> = {
  6:  'Daily routine (no AC)',
  8:  '1 AC',
  10: '2 ACs',
  12: '3 ACs',
  15: '4–5 ACs',
}

// ── Overhead: inverter + wiring + mounting + labor ────────────────────────────
const OVERHEAD: Record<'hybrid' | 'ongrid', number> = {
  hybrid: 54_000,  // PKR per kW
  ongrid: 42_000,
}

type SystemType = 'hybrid' | 'ongrid'

interface LivePrices {
  batteryPrice: number
  panelPrice:   number
  source:       'live' | 'market'
  updatedAt:    string
}

function pkr(n: number) {
  if (n >= 1_000_000) return `PKR ${(n / 1_000_000).toFixed(2)}M`
  if (n >= 100_000)   return `PKR ${(n / 1_000).toFixed(0)}K`
  return `PKR ${Math.round(n).toLocaleString('en-PK')}`
}

export function CalculatorSection() {
  const [monthlyBill, setMonthlyBill] = useState(15_000)
  const [unitRate,    setUnitRate]    = useState(35)
  const [systemType,  setSystemType]  = useState<SystemType>('hybrid')

  const [prices,       setPrices]       = useState<LivePrices | null>(null)
  const [priceLoading, setPriceLoading] = useState(true)

  useEffect(() => {
    fetch('/api/calculator-prices')
      .then(r => r.json())
      .then((d: LivePrices) => { setPrices(d); setPriceLoading(false) })
      .catch(() => {
        setPrices({ batteryPrice: 24_000, panelPrice: 17_500, source: 'market', updatedAt: new Date().toISOString() })
        setPriceLoading(false)
      })
  }, [])

  const panelPrice   = prices?.panelPrice   ?? 17_500
  const batteryKwhPrice = prices?.batteryPrice ?? 24_000  // per battery (150Ah 12V unit from DB)

  const calc = useMemo(() => {
    // ── Step 1: Calculate required kW from bill ──────────────────────────────
    const monthlyUnits  = monthlyBill / unitRate
    const dailyKwh      = monthlyUnits / 30
    const rawKw         = dailyKwh / (SUN_HOURS * EFFICIENCY)

    // ── Step 2: Snap to nearest standard tier (min 6kW) ──────────────────────
    const tier = (TIERS.find(t => t >= rawKw) ?? 15) as Tier
    const battery = BATTERY[tier]

    // ── Step 3: Panel count ──────────────────────────────────────────────────
    const panelCount    = Math.ceil((tier * 1000) / PANEL_W)
    const actualKw      = (panelCount * PANEL_W) / 1000

    // ── Step 4: Daily & monthly production ──────────────────────────────────
    const dailyProd     = actualKw * SUN_HOURS * EFFICIENCY
    const monthlyProd   = dailyProd * 30

    // ── Step 5: Cost breakdown ───────────────────────────────────────────────
    // Battery cost: price per 5kWh unit scaled to battery bank size
    const batteryBankCost = systemType === 'hybrid'
      ? Math.round(battery.kwh / 5) * batteryKwhPrice * 4   // 4× 12V 150Ah per 5kWh equiv
      : 0
    const panelCost    = panelCount * panelPrice
    const overheadCost = tier * OVERHEAD[systemType]
    const totalCost    = panelCost + overheadCost + batteryBankCost

    // ── Step 6: Savings ──────────────────────────────────────────────────────
    const coverage       = systemType === 'ongrid' ? 0.85 : 0.90
    const monthlySavings = Math.round(monthlyBill * coverage)
    const newBill        = Math.max(monthlyBill - monthlySavings, 500)
    const annualSavings  = monthlySavings * 12

    // ── Step 7: Payback (with 15% electricity inflation) ─────────────────────
    let cum = 0, payback = 0, mult = 1
    for (let y = 1; y <= 25; y++) {
      cum += annualSavings * mult
      mult *= 1 + ELEC_INFLATION
      if (cum >= totalCost && payback === 0) payback = y
    }

    return {
      tier, panelCount, actualKw, battery,
      dailyProd: Math.round(dailyProd * 10) / 10,
      monthlyProd: Math.round(monthlyProd),
      monthlyUnits: Math.round(monthlyUnits),
      panelCost, overheadCost, batteryBankCost, totalCost,
      monthlySavings, newBill, annualSavings, payback,
      acs: ACS[tier],
    }
  }, [monthlyBill, unitRate, systemType, panelPrice, batteryKwhPrice])

  return (
    <section id="calculator" className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-emerald-600 text-xs font-bold tracking-[5px] uppercase mb-3">Solar Calculator 2026</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            What solar system do{' '}
            <span className="text-emerald-600">you need?</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Enter your monthly bill — get your system size, cost, and savings instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── INPUTS ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* System Type */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">System Type</p>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { id: 'hybrid', label: 'Hybrid', sub: 'Battery backup included' },
                  { id: 'ongrid', label: 'On-Grid', sub: 'Net metering, no batteries' },
                ] as { id: SystemType; label: string; sub: string }[]).map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSystemType(t.id)}
                    className={`p-3.5 rounded-xl text-left border-2 transition-all ${
                      systemType === t.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <p className={`font-bold text-sm ${systemType === t.id ? 'text-emerald-700' : 'text-slate-700'}`}>{t.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Bill */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Monthly Electricity Bill</p>
              <p className="text-xs text-gray-400 mb-4">Your LESCO/WAPDA monthly bill amount</p>
              <div className="text-4xl font-black text-slate-900 mb-1">
                PKR <span className="text-emerald-600">{monthlyBill.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">≈ {calc.monthlyUnits} units/month</p>
              <input
                type="range" min="3000" max="150000" step="1000"
                value={monthlyBill}
                onChange={e => setMonthlyBill(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-300 mt-2">
                <span>PKR 3,000</span><span>PKR 1,50,000</span>
              </div>
            </div>

            {/* Unit Rate */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Per Unit Rate</p>
                <div className="group relative">
                  <Info size={13} className="text-gray-300 cursor-help" />
                  <div className="absolute right-0 top-5 w-52 bg-slate-800 text-white text-xs rounded-xl p-3 hidden group-hover:block z-10 shadow-xl">
                    Include fuel surcharge + taxes. LESCO effective rate 2026: PKR 35–55/kWh
                  </div>
                </div>
              </div>
              <div className="text-4xl font-black text-slate-900 mb-4">
                <span className="text-emerald-600">{unitRate}</span>
                <span className="text-lg font-bold text-gray-400 ml-1">PKR/kWh</span>
              </div>
              <input
                type="range" min="25" max="65" step="1"
                value={unitRate}
                onChange={e => setUnitRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-300 mt-2">
                <span>PKR 25</span><span>PKR 65</span>
              </div>
            </div>

            {/* Price source badge */}
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold border ${
              priceLoading
                ? 'bg-slate-50 border-slate-100 text-slate-400'
                : prices?.source === 'live'
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                  : 'bg-amber-50 border-amber-100 text-amber-700'
            }`}>
              {priceLoading
                ? <><RefreshCw size={11} className="animate-spin" /> Loading live prices...</>
                : prices?.source === 'live'
                  ? <><Radio size={11} className="text-emerald-500" /> Live prices from our stock</>
                  : <><Info size={11} /> 2026 Lahore market rates</>
              }
            </div>
          </div>

          {/* ── RESULTS ── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Hero Result Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-7 text-white shadow-2xl shadow-slate-900/20">

              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-400 text-xs font-bold tracking-[4px] uppercase">Recommended System</p>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide border ${
                  prices?.source === 'live'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}>
                  {prices?.source === 'live' ? 'Live Prices' : 'Market 2026'}
                </span>
              </div>

              {/* System size — big number */}
              <div className="flex items-end gap-5 mb-6">
                <div>
                  <div className="text-8xl font-black leading-none tracking-tight text-white">{calc.tier}</div>
                  <div className="text-slate-400 text-xl font-bold mt-1">kW System</div>
                </div>
                <div className="pb-2 space-y-2.5">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Sun size={14} className="text-amber-400 shrink-0" />
                    <span>{calc.panelCount} panels × {PANEL_W}W</span>
                  </div>
                  {systemType === 'hybrid' && (
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <BatteryCharging size={14} className="text-emerald-400 shrink-0" />
                      <span>{calc.battery.spec} · {calc.battery.kwh} kWh</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Zap size={14} className="text-amber-400 shrink-0" />
                    <span>{calc.dailyProd} kWh/day output</span>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/8 rounded-2xl p-3.5 text-center">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide mb-1">Runs</p>
                  <p className="text-white font-bold text-sm leading-tight">{calc.acs}</p>
                </div>
                <div className="bg-white/8 rounded-2xl p-3.5 text-center">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide mb-1">Monthly Output</p>
                  <p className="text-white font-bold text-sm">{calc.monthlyProd} kWh</p>
                </div>
                <div className="bg-white/8 rounded-2xl p-3.5 text-center">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide mb-1">
                    {systemType === 'hybrid' ? 'Backup' : 'Coverage'}
                  </p>
                  <p className="text-white font-bold text-sm">
                    {systemType === 'hybrid' ? `${calc.battery.kwh} kWh` : '85%'}
                  </p>
                </div>
              </div>
            </div>

            {/* Bill Comparison */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Bill Comparison</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-red-50 border border-red-100 rounded-xl py-4 text-center">
                  <p className="text-xs text-red-400 font-semibold mb-1">Now</p>
                  <p className="text-xl font-black text-red-500">PKR {monthlyBill.toLocaleString()}</p>
                </div>
                <TrendingDown size={20} className="text-emerald-500 shrink-0" />
                <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl py-4 text-center">
                  <p className="text-xs text-emerald-500 font-semibold mb-1">After Solar</p>
                  <p className="text-xl font-black text-emerald-600">PKR {calc.newBill.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">
                Save <span className="font-black text-emerald-600">PKR {calc.monthlySavings.toLocaleString()}/month</span> from day one
              </p>
            </div>

            {/* Investment + Payback row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Total Investment</p>
                <div className="text-2xl font-black text-slate-900 mb-3">{pkr(calc.totalCost)}</div>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>{calc.panelCount}× Panels</span>
                    <span className="font-semibold text-slate-700">{pkr(calc.panelCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inverter + Install</span>
                    <span className="font-semibold text-slate-700">{pkr(calc.overheadCost)}</span>
                  </div>
                  {systemType === 'hybrid' && (
                    <div className="flex justify-between">
                      <span>Battery Bank</span>
                      <span className="font-semibold text-slate-700">{pkr(calc.batteryBankCost)}</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-gray-300 mt-3">±10% after free site visit</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Returns</p>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Annual Savings</p>
                  <p className="text-xl font-black text-emerald-600 mb-4">{pkr(calc.annualSavings)}</p>
                  <p className="text-xs text-gray-400 mb-1">Payback Period</p>
                  <p className="text-xl font-black text-slate-900">{calc.payback} years</p>
                  <p className="text-[10px] text-gray-400 mt-1">with 15% electricity inflation</p>
                </div>
              </div>
            </div>

            {/* Includes */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">What&apos;s Included</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-emerald-800">
                {[
                  `${calc.panelCount}× ${PANEL_W}W Tier-1 Panels`,
                  systemType === 'hybrid' ? 'Hybrid Inverter' : 'On-Grid Inverter',
                  systemType === 'hybrid' ? `${calc.battery.spec} Battery Bank` : 'Net Metering Setup',
                  'Complete Wiring & Mounting',
                  'Professional Installation',
                  '25-Year Panel Warranty',
                ].map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="tel:+923213770402"
              className="flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg text-sm"
            >
              <Phone size={16} />
              Get Exact Quote — Free Site Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

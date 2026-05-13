'use client'

import { useState, useMemo, useEffect } from 'react'
import { Zap, TrendingUp, TrendingDown, Leaf, Sun, BatteryCharging, Info, Phone, Banknote, CalendarClock, RefreshCw, Radio } from 'lucide-react'

// ─── Fixed engineering constants ──────────────────────────────────────────────
const LAHORE_SUN_HOURS   = 4.8   // Lahore annual average peak sun hours
const SYSTEM_EFFICIENCY  = 0.80  // Losses: inverter + wiring + dust + temp derating
const PANEL_WATTS        = 580   // Standard panel in Pakistan 2025 market
const ELEC_INFLATION     = 0.15  // 15% per year — Pakistan historical average
const NET_METERING_RATE  = 22    // PKR/kWh NEPRA buyback
const CO2_PER_KWH        = 0.46  // kg CO₂/kWh Pakistan national grid

// ─── Per-kW overhead: inverter + wiring + mounting + labor (NOT panels/batteries)
const OVERHEAD_PER_KW = { ongrid: 48_000, hybrid: 58_000 }

// ─── Battery specs: 150Ah 12V tubular (most common Pakistan)
const BATTERY_WH      = 150 * 12        // 1800 Wh gross
const BATTERY_USABLE  = BATTERY_WH * 0.80  // 80% DoD → 1440 Wh usable
const SAFETY_FACTOR   = 1.25            // 25% headroom on battery bank

type SystemType = 'ongrid' | 'hybrid'

interface LivePrices {
  batteryPrice: number
  panelPrice:   number
  source:       'live' | 'market'
  updatedAt:    string
}

function formatPKR(n: number) {
  if (n >= 1_000_000) return `PKR ${(n / 1_000_000).toFixed(2)}M`
  if (n >= 100_000)   return `PKR ${(n / 1_000).toFixed(0)}K`
  return `PKR ${Math.round(n).toLocaleString('en-PK')}`
}

export function CalculatorSection() {
  const [monthlyBill,       setMonthlyBill]       = useState(12_000)
  const [systemType,        setSystemType]        = useState<SystemType>('hybrid')
  const [sunHours,          setSunHours]          = useState(LAHORE_SUN_HOURS)
  const [unitRate,          setUnitRate]          = useState(35)
  const [withBattery,       setWithBattery]       = useState(true)
  const [loadSheddingHours, setLoadSheddingHours] = useState(6)

  const [prices,   setPrices]   = useState<LivePrices | null>(null)
  const [priceLoading, setPriceLoading] = useState(true)

  // ── Fetch live prices from DB ───────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/calculator-prices')
      .then(r => r.json())
      .then((d: LivePrices) => { setPrices(d); setPriceLoading(false) })
      .catch(() => {
        setPrices({ batteryPrice: 24_000, panelPrice: 18_500, source: 'market', updatedAt: new Date().toISOString() })
        setPriceLoading(false)
      })
  }, [])

  const batteryPrice = prices?.batteryPrice ?? 24_000
  const panelPrice   = prices?.panelPrice   ?? 18_500

  const calc = useMemo(() => {
    // ── Consumption ────────────────────────────────────────────────────────────
    const monthlyUnits     = monthlyBill / unitRate
    const dailyConsumption = monthlyUnits / 30          // kWh/day
    const hourlyLoad       = dailyConsumption / 24      // kW average hourly draw

    // ── System sizing ──────────────────────────────────────────────────────────
    const rawKw   = dailyConsumption / (sunHours * SYSTEM_EFFICIENCY)
    const systemKw = Math.ceil(rawKw * 2) / 2           // round up to nearest 0.5kW

    // ── Panels ─────────────────────────────────────────────────────────────────
    const panelCount     = Math.ceil((systemKw * 1000) / PANEL_WATTS)
    const actualSystemKw = (panelCount * PANEL_WATTS) / 1000

    // ── Production ────────────────────────────────────────────────────────────
    const dailyProduction   = actualSystemKw * sunHours * SYSTEM_EFFICIENCY
    const monthlyProduction = dailyProduction * 30
    const annualProduction  = monthlyProduction * 12

    // ── Battery sizing (engineering formula) ──────────────────────────────────
    // Backup energy = hourly load × loadshedding hours × safety factor
    const backupEnergyWh = hourlyLoad * 1000 * loadSheddingHours * SAFETY_FACTOR
    const batteryCount   = systemType === 'hybrid' && withBattery
      ? Math.max(2, Math.ceil(backupEnergyWh / BATTERY_USABLE))
      : 0

    // ── Cost breakdown (real prices from DB) ──────────────────────────────────
    const panelCost       = panelCount * panelPrice
    const overheadCost    = actualSystemKw * OVERHEAD_PER_KW[systemType]
    const batteryCost     = batteryCount * batteryPrice
    const totalCost       = panelCost + overheadCost + batteryCost

    // ── Monthly savings ────────────────────────────────────────────────────────
    const coverageFactor   = systemType === 'ongrid' ? 0.85 : withBattery ? 0.92 : 0.80
    const monthlySavings   = monthlyBill * coverageFactor
    const newMonthlyBill   = Math.max(monthlyBill - monthlySavings, 500)

    const excessSolar           = Math.max(monthlyProduction - monthlyUnits, 0)
    const netMeteringMonthly    = systemType === 'ongrid' ? excessSolar * NET_METERING_RATE : 0
    const totalMonthlySavings   = monthlySavings + netMeteringMonthly
    const annualSavings         = totalMonthlySavings * 12

    // ── Payback with 15% electricity inflation ────────────────────────────────
    let cumSavings = 0, paybackYears = 0, mult = 1
    for (let y = 1; y <= 25; y++) {
      cumSavings += annualSavings * mult
      mult *= (1 + ELEC_INFLATION)
      if (cumSavings >= totalCost && paybackYears === 0) paybackYears = y
    }

    // ── 25-year net profit ────────────────────────────────────────────────────
    let total25 = 0; mult = 1
    for (let y = 1; y <= 25; y++) { total25 += annualSavings * mult; mult *= (1 + ELEC_INFLATION) }
    const twentyFiveYearSavings = total25 - totalCost

    // ── Environmental ─────────────────────────────────────────────────────────
    const co2Annual    = annualProduction * CO2_PER_KWH
    const treesPlanted = Math.round(co2Annual / 21)

    return {
      monthlyUnits:           Math.round(monthlyUnits),
      systemKw:               actualSystemKw,
      panelCount,
      batteryCount,
      dailyProduction:        Math.round(dailyProduction * 10) / 10,
      monthlyProduction:      Math.round(monthlyProduction),
      annualProduction:       Math.round(annualProduction),
      panelCost, overheadCost, batteryCost, totalCost,
      monthlySavings:         Math.round(totalMonthlySavings),
      newMonthlyBill:         Math.round(newMonthlyBill),
      annualSavings:          Math.round(annualSavings),
      paybackYears,
      twentyFiveYearSavings:  Math.round(twentyFiveYearSavings),
      co2Annual:              Math.round(co2Annual),
      treesPlanted,
      netMeteringMonthly:     Math.round(netMeteringMonthly),
      coveragePct:            Math.round(coverageFactor * 100),
      backupHours:            batteryCount > 0
        ? Math.round((batteryCount * BATTERY_USABLE) / (hourlyLoad * 1000 * 10)) / 10
        : 0,
    }
  }, [monthlyBill, systemType, sunHours, unitRate, withBattery, loadSheddingHours, batteryPrice, panelPrice])

  return (
    <section id="calculator" className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-14">
          <p className="text-emerald-600 text-xs font-bold tracking-[5px] uppercase mb-4 text-center">
            Free Solar Savings Calculator
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight text-center leading-tight mb-5">
            How much can solar reduce<br />
            <span className="text-emerald-600">your electricity bill?</span>
          </h2>
          <p className="text-gray-500 text-base text-center leading-relaxed mb-6 max-w-2xl mx-auto">
            Enter your monthly bill and load-shedding hours — get an accurate system size,
            real battery count, live pricing, and 25-year savings estimate.
          </p>

          {/* Live prices badge */}
          <div className="flex justify-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border ${
              priceLoading
                ? 'bg-slate-50 border-slate-200 text-slate-500'
                : prices?.source === 'live'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}>
              {priceLoading
                ? <><RefreshCw size={11} className="animate-spin" /> Loading live prices...</>
                : prices?.source === 'live'
                  ? <><Radio size={11} className="text-emerald-500" /> Prices pulled live from our current inventory</>
                  : <><Info size={11} /> Using 2025 Lahore market rates</>
              }
            </div>
          </div>

          {/* 4 feature chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {([
              { Icon: Zap,           color: 'text-amber-600',   bg: 'bg-amber-50',   title: 'System Size',    desc: 'Exact kW for your usage' },
              { Icon: Banknote,      color: 'text-emerald-600', bg: 'bg-emerald-50', title: 'Real Cost',      desc: 'Live prices from our stock' },
              { Icon: TrendingDown,  color: 'text-emerald-700', bg: 'bg-emerald-50', title: 'Bill Reduction', desc: 'New monthly electricity bill' },
              { Icon: CalendarClock, color: 'text-amber-700',   bg: 'bg-amber-50',   title: 'Payback Period', desc: 'Years to recover investment' },
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

          {/* ── INPUTS ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* System Type */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <label className="block text-sm font-bold text-slate-800 mb-4">System Type</label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { id: 'hybrid', label: 'Hybrid',  sub: 'Battery backup + solar' },
                  { id: 'ongrid', label: 'On-Grid', sub: 'Net metering, no batteries' },
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

            {/* Monthly Bill */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <label className="block text-sm font-bold text-slate-800 mb-1">Monthly Electricity Bill</label>
              <p className="text-xs text-gray-500 mb-4">Your current LESCO/WAPDA monthly bill</p>
              <div className="text-3xl font-black text-emerald-600 mb-4">
                PKR {monthlyBill.toLocaleString()}
              </div>
              <input
                type="range" min="2000" max="200000" step="1000"
                value={monthlyBill}
                onChange={e => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>PKR 2,000</span>
                <span className="text-slate-600 font-semibold">≈ {calc.monthlyUnits} units/month</span>
                <span>PKR 2,00,000</span>
              </div>
            </div>

            {/* Load Shedding Hours — NEW */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <label className="block text-sm font-bold text-slate-800 mb-1">Daily Load Shedding</label>
              <p className="text-xs text-gray-500 mb-4">Hours of power outage per day in your area</p>
              <div className="text-3xl font-black text-emerald-600 mb-4">
                {loadSheddingHours} hrs/day
              </div>
              <input
                type="range" min="0" max="12" step="1"
                value={loadSheddingHours}
                onChange={e => setLoadSheddingHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0 hrs (No outage)</span>
                <span>12 hrs</span>
              </div>
              {loadSheddingHours > 0 && calc.batteryCount > 0 && (
                <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-1.5 font-medium">
                  {calc.batteryCount} batteries will cover ~{calc.backupHours} hrs of backup
                </p>
              )}
            </div>

            {/* Per Unit Rate */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-bold text-slate-800">Per Unit Rate (PKR/kWh)</label>
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
                type="range" min="20" max="65" step="1"
                value={unitRate}
                onChange={e => setUnitRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>PKR 20</span>
                <span>PKR 65</span>
              </div>
            </div>

            {/* Sun Hours */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <label className="block text-sm font-bold text-slate-800 mb-1">Peak Sun Hours</label>
              <p className="text-xs text-gray-500 mb-4">Lahore avg: 4.8 · Summer: 6+ · Winter: 3.5</p>
              <div className="text-3xl font-black text-emerald-600 mb-4">
                {sunHours} hrs/day
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

          {/* ── RESULTS ── */}
          <div className="lg:col-span-3 space-y-5">

            {/* System Recommendation — hero card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Recommended System</p>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold uppercase tracking-wide">
                  {prices?.source === 'live' ? 'Live Prices' : 'Market Rates'}
                </span>
              </div>

              <div className="flex items-end gap-4 mb-5">
                <div>
                  <div className="text-6xl font-black leading-none text-white">{calc.systemKw}</div>
                  <div className="text-slate-400 font-semibold text-lg">kW system</div>
                </div>
                <div className="flex-1 pb-1 space-y-1">
                  <div className="text-slate-300 text-sm flex items-center gap-1.5">
                    <Sun size={13} className="text-amber-400" />
                    {calc.panelCount} panels × {PANEL_WATTS}W
                  </div>
                  {calc.batteryCount > 0 && (
                    <div className="text-slate-300 text-sm flex items-center gap-1.5">
                      <BatteryCharging size={13} className="text-emerald-400" />
                      {calc.batteryCount} batteries × 150Ah (12V)
                    </div>
                  )}
                  <div className="text-slate-300 text-sm flex items-center gap-1.5">
                    <Zap size={13} className="text-amber-400" />
                    {calc.dailyProduction} kWh/day generation
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-2xl px-3 py-3 text-center">
                  <p className="text-slate-400 text-[10px] font-medium mb-1">Monthly Output</p>
                  <p className="text-white font-black text-base">{calc.monthlyProduction.toLocaleString()} kWh</p>
                </div>
                <div className="bg-white/10 rounded-2xl px-3 py-3 text-center">
                  <p className="text-slate-400 text-[10px] font-medium mb-1">Bill Coverage</p>
                  <p className="text-white font-black text-base">{calc.coveragePct}%</p>
                </div>
                <div className="bg-white/10 rounded-2xl px-3 py-3 text-center">
                  <p className="text-slate-400 text-[10px] font-medium mb-1">Battery Backup</p>
                  <p className="text-white font-black text-base">
                    {calc.backupHours > 0 ? `${calc.backupHours} hrs` : '—'}
                  </p>
                </div>
              </div>
            </div>

            {/* Bill comparison */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm font-bold text-slate-700 mb-4">Monthly Bill — Before vs After Solar</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 text-center bg-red-50 rounded-xl py-4 border border-red-100">
                  <p className="text-xs text-red-400 font-semibold uppercase tracking-wide mb-1">Current Bill</p>
                  <p className="text-2xl font-black text-red-500">PKR {monthlyBill.toLocaleString()}</p>
                </div>
                <TrendingDown size={22} className="text-emerald-500 shrink-0" />
                <div className="flex-1 text-center bg-emerald-50 rounded-xl py-4 border border-emerald-100">
                  <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wide mb-1">After Solar</p>
                  <p className="text-2xl font-black text-emerald-600">PKR {calc.newMonthlyBill.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 text-center text-sm text-gray-500">
                Save <span className="font-black text-emerald-600">PKR {calc.monthlySavings.toLocaleString()}/month</span> from day one
              </div>
              {calc.netMeteringMonthly > 0 && (
                <div className="mt-2 text-center text-xs text-amber-700 bg-amber-50 rounded-lg py-1.5 border border-amber-100">
                  + PKR {calc.netMeteringMonthly.toLocaleString()}/month extra via NEPRA net metering
                </div>
              )}
            </div>

            {/* Cost breakdown — REAL prices */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-slate-700">Investment Breakdown</p>
                {priceLoading && <RefreshCw size={13} className="text-gray-300 animate-spin" />}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <span className="text-gray-700">{calc.panelCount}× Solar Panels ({PANEL_WATTS}W each)</span>
                    <span className="ml-2 text-xs text-gray-400">
                      @ PKR {panelPrice.toLocaleString()}/panel
                    </span>
                  </div>
                  <span className="font-semibold text-slate-800 shrink-0 ml-4">
                    PKR {calc.panelCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {systemType === 'hybrid' ? 'Hybrid inverter' : 'On-grid inverter'} + installation + wiring
                  </span>
                  <span className="font-semibold text-slate-800">PKR {calc.overheadCost.toLocaleString()}</span>
                </div>
                {calc.batteryCount > 0 && (
                  <div className="flex justify-between items-start text-sm">
                    <div>
                      <span className="text-gray-700">{calc.batteryCount}× Batteries (150Ah, 12V)</span>
                      <span className="ml-2 text-xs text-gray-400">
                        @ PKR {batteryPrice.toLocaleString()}/battery
                      </span>
                    </div>
                    <span className="font-semibold text-slate-800 shrink-0 ml-4">
                      PKR {calc.batteryCost.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-black">
                  <span className="text-slate-800">Total Estimated Cost</span>
                  <span className="text-emerald-600">{formatPKR(calc.totalCost)}</span>
                </div>
                <p className="text-xs text-gray-400">
                  * Final price confirmed after free site visit. May vary ±10% based on roof type and wiring.
                </p>
              </div>
            </div>

            {/* ROI */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Payback Period</p>
                <div className="text-4xl font-black text-emerald-600">
                  {calc.paybackYears}<span className="text-lg font-bold text-gray-400 ml-1">yrs</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">With 15% electricity inflation</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Annual Savings</p>
                <div className="text-2xl font-black text-emerald-600">{formatPKR(calc.annualSavings)}</div>
                <p className="text-gray-400 text-xs mt-1">Growing 15%/yr with inflation</p>
              </div>
            </div>

            {/* 25-year profit */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-semibold">25-Year Net Profit</p>
                <TrendingUp size={18} className="text-emerald-400" />
              </div>
              <div className="text-4xl font-black text-emerald-400">{formatPKR(calc.twentyFiveYearSavings)}</div>
              <p className="text-slate-500 text-xs mt-1">
                Total savings minus system cost over 25 years · 15% electricity inflation applied
              </p>
            </div>

            {/* Environmental */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="text-emerald-500" size={16} />
                <p className="text-sm font-bold text-slate-700">Environmental Impact</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black text-emerald-600">
                    {calc.co2Annual.toLocaleString()}<span className="text-base font-bold text-gray-400 ml-1">kg</span>
                  </div>
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
              className="flex items-center justify-center gap-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-200/50 text-base"
            >
              <Phone size={18} />
              Call for Free Site Assessment
            </a>
          </div>
        </div>

        {/* How it's calculated */}
        <div className="mt-10 p-5 bg-slate-100 border border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-600">
            <strong>How these numbers are calculated:</strong> System size = daily consumption ÷ (sun hours × 80% efficiency).
            Battery count = load shedding hours × hourly load × 1.25 safety factor ÷ 1.44kWh usable per battery.
            {prices?.source === 'live'
              ? ' Panel and battery prices are pulled live from our current product inventory.'
              : ' Costs use 2025 Lahore market rates.'}
            {' '}Payback and 25-year savings include 15% annual electricity inflation (Pakistan historical average).
            Contact us for a free site visit and exact quote.
          </p>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { Zap, TrendingUp, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CalculatorResult {
  systemSize: number
  monthlyProduction: number
  annualProduction: number
  annualSavings: number
  systemCost: number
  roi: number
  paybackPeriod: number
  co2Savings: number
  dailyProduction: number
}

export function CalculatorSection() {
  const [monthlyBill, setMonthlyBill] = useState(5000)
  const [sunHours, setSunHours] = useState(5)
  const [electricityRate, setElectricityRate] = useState(25)
  const [systemType, setSystemType] = useState('hybrid')

  // Constants for Pakistan/Lahore
  const COST_PER_KW = 180000 // PKR per kW
  const CO2_PER_KWH = 0.85 // kg CO2 per kWh
  const SYSTEM_EFFICIENCY = 0.85
  const ANNUAL_DEGRADATION = 0.007

  const results: CalculatorResult = useMemo(() => {
    // Calculate system size based on monthly bill
    const monthlyConsumption = monthlyBill / electricityRate
    const systemSize = monthlyConsumption / (sunHours * 30 * SYSTEM_EFFICIENCY)

    // Daily and annual production
    const dailyProduction = systemSize * sunHours
    const monthlyProduction = dailyProduction * 30
    const annualProduction = monthlyProduction * 12

    // Savings calculations
    const annualSavings = annualProduction * electricityRate
    const systemCost = systemSize * COST_PER_KW

    // Financial metrics
    const roi = ((annualSavings * 10) / systemCost) * 100 // 10-year ROI
    const paybackPeriod = systemCost / annualSavings

    // Environmental impact
    const co2Savings = annualProduction * CO2_PER_KWH

    return {
      systemSize: Math.round(systemSize * 10) / 10,
      monthlyProduction: Math.round(monthlyProduction),
      annualProduction: Math.round(annualProduction),
      annualSavings: Math.round(annualSavings),
      systemCost: Math.round(systemCost),
      roi: Math.round(roi),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Savings: Math.round(co2Savings),
      dailyProduction: Math.round(dailyProduction),
    }
  }, [monthlyBill, sunHours, electricityRate, systemType])

  const handleQuote = () => {
    // Scroll to contact section or open modal
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="calculator" className="bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-emerald-600 text-sm font-semibold tracking-widest uppercase mb-3">Savings Calculator</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Solar Savings Calculator — Lahore, Pakistan
          </h2>
          <p className="mt-4 text-base text-gray-500 leading-relaxed">
            Calculate your potential savings, ROI, and payback period with a custom solar system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-8">
            {/* Monthly Bill Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Monthly Electricity Bill (PKR)
              </label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-slate-600">PKR 1,000</span>
                <span className="text-2xl font-bold text-emerald-700">
                  PKR {monthlyBill.toLocaleString()}
                </span>
                <span className="text-sm text-slate-600">PKR 50,000</span>
              </div>
            </div>

            {/* Sun Hours Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Average Daily Sun Hours (hrs)
              </label>
              <input
                type="range"
                min="3"
                max="7"
                step="0.5"
                value={sunHours}
                onChange={(e) => setSunHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-slate-600">3 hrs</span>
                <span className="text-2xl font-bold text-emerald-700">{sunHours} hrs</span>
                <span className="text-sm text-slate-600">7 hrs</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Lahore average: ~5 hours/day (varies by season)
              </p>
            </div>

            {/* Electricity Rate Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Electricity Rate (PKR/kWh)
              </label>
              <input
                type="range"
                min="15"
                max="40"
                step="1"
                value={electricityRate}
                onChange={(e) => setElectricityRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-slate-600">PKR 15</span>
                <span className="text-2xl font-bold text-emerald-700">
                  PKR {electricityRate}/kWh
                </span>
                <span className="text-sm text-slate-600">PKR 40</span>
              </div>
            </div>

            {/* System Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                System Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'hybrid', label: 'Hybrid (Grid + Battery)' },
                  { id: 'grid', label: 'Grid-Tied' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSystemType(type.id)}
                    className={`p-3 rounded-lg font-medium transition-colors ${
                      systemType === type.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <Button
              onClick={handleQuote}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold"
            >
              Get Detailed Quote
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* System Size Card */}
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-50 border-emerald-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="text-emerald-700" size={24} />
                  System Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-emerald-700 mb-2">
                  {results.systemSize} kW
                </div>
                <p className="text-sm text-slate-600">
                  Recommended system size for your needs
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-600">Daily Production</p>
                    <p className="font-semibold text-slate-900">
                      {results.dailyProduction} kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">Monthly Production</p>
                    <p className="font-semibold text-slate-900">
                      {results.monthlyProduction.toLocaleString()} kWh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Annual Savings Card */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="text-green-600" size={24} />
                  Annual Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  PKR {results.annualSavings.toLocaleString()}
                </div>
                <p className="text-sm text-slate-600">
                  Your yearly electricity bill reduction
                </p>
                <div className="mt-4 text-sm text-slate-700">
                  Annual Production: <span className="font-semibold">{results.annualProduction.toLocaleString()} kWh</span>
                </div>
              </CardContent>
            </Card>

            {/* Financial Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* ROI Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                <p className="text-gray-500 text-sm font-medium mb-3">10-Year ROI</p>
                <div className="text-3xl font-black text-emerald-600">
                  {results.roi}%
                </div>
                <p className="text-gray-400 text-xs mt-1">Return on investment</p>
              </div>

              {/* Payback Period Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                <p className="text-gray-500 text-sm font-medium mb-3">Payback Period</p>
                <div className="text-3xl font-black text-emerald-600">
                  {results.paybackPeriod}y
                </div>
                <p className="text-gray-400 text-xs mt-1">Years to break even</p>
              </div>
            </div>

            {/* System Cost Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-gray-500 text-sm font-medium mb-3">Estimated System Cost</p>
              <div className="text-3xl font-black text-emerald-600 mb-2">
                PKR {results.systemCost.toLocaleString()}
              </div>
              <p className="text-gray-500 text-sm mb-1">
                Approximate cost for {results.systemSize} kW system
              </p>
              <p className="text-gray-400 text-xs">
                * Includes solar panels, inverter, wiring, installation
              </p>
            </div>

            {/* Environmental Impact Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="text-emerald-600" size={18} />
                <p className="text-gray-500 text-sm font-medium">Environmental Impact</p>
              </div>
              <div className="text-3xl font-black text-emerald-600 mb-2">
                {results.co2Savings.toLocaleString()} kg
              </div>
              <p className="text-gray-600 text-sm">
                CO₂ reduction per year (equivalent to planting {Math.round(results.co2Savings / 21)} trees)
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-700">
            <strong>Note:</strong> This calculator provides estimates based on average Lahore conditions.
            Actual savings depend on location, roof angle, shading, weather patterns, and system maintenance.
            Contact us for a detailed site assessment and accurate quote.
          </p>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { CheckCircle, Phone, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Order Confirmed — Rustam Battery & Solar',
}

interface SuccessPageProps {
  searchParams: Promise<{ ref?: string; payment?: string; name?: string }>
}

export default async function OrderSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const ref = params.ref || 'N/A'
  const payment = params.payment || 'Bank Transfer'
  const name = params.name || 'Customer'

  const paymentInstructions: Record<string, { title: string; details: string[] }> = {
    'Bank Transfer': {
      title: 'Bank Transfer Details',
      details: [
        'Bank: Meezan Bank / HBL',
        'Account Title: Rustam Battery & Solar',
        'Account No: 1234-5678-9012-3456',
        `Reference: Order #${ref}`,
        'Please send payment proof on WhatsApp after transfer',
      ],
    },
    EasyPaisa: {
      title: 'EasyPaisa Payment',
      details: [
        'EasyPaisa Account: 0300-1234567',
        'Account Title: Muhammad Rustam',
        `Reference/Note: Order #${ref}`,
        'Send screenshot on WhatsApp after payment',
      ],
    },
    JazzCash: {
      title: 'JazzCash Payment',
      details: [
        'JazzCash Number: 0300-1234567',
        'Account Title: Muhammad Rustam',
        `Reference/Note: Order #${ref}`,
        'Send screenshot on WhatsApp after payment',
      ],
    },
    'Cash on Visit': {
      title: 'Cash Payment on Visit',
      details: [
        'Visit our shop: Kahna Nau, Lahore',
        'Business Hours: Mon-Sat, 9 AM – 6 PM',
        `Mention Order #${ref} when you arrive`,
        'Our team will also call you to confirm',
      ],
    },
    Installments: {
      title: 'Installment Plan',
      details: [
        'Our team will contact you within 24 hours',
        'Down payment: 30% of total amount',
        'Remaining: Easy monthly installments',
        `Mention Order #${ref} when contacted`,
      ],
    },
  }

  const instructions = paymentInstructions[payment] || paymentInstructions['Bank Transfer']

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
          <p className="text-slate-600 mb-6">
            Thank you, <strong>{decodeURIComponent(name)}</strong>. Your order has been received successfully.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 inline-block mb-6">
            <p className="text-sm text-amber-700 font-medium mb-1">Your Order Reference</p>
            <p className="text-3xl font-bold text-amber-600 tracking-widest">#{ref}</p>
            <p className="text-xs text-amber-600 mt-1">Save this number for tracking</p>
          </div>

          <p className="text-slate-600 text-sm">
            A confirmation email has been sent to your email address. Our team will call you within <strong>24 hours</strong>.
          </p>
        </div>

        {/* Payment Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>💳</span> {instructions.title}
          </h2>
          <ul className="space-y-3">
            {instructions.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-slate-700">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Location */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Call / WhatsApp</p>
                <a href="tel:+923001234567" className="text-amber-600 hover:underline">+92 300 1234567</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Visit Us</p>
                <p className="text-slate-600 text-sm">Kahna Nau, Lahore, Punjab, Pakistan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Business Hours</p>
                <p className="text-slate-600 text-sm">Mon–Sat: 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 text-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/#products"
            className="flex-1 text-center border-2 border-slate-300 hover:border-amber-400 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Browse More Products
          </Link>
        </div>
      </div>
    </main>
  )
}

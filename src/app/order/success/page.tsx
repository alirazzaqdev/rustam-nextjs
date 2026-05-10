'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, Clock, MessageCircle, Phone, MapPin } from 'lucide-react'

function SuccessContent() {
  const params = useSearchParams()
  const orderNumber = params.get('orderNumber') || params.get('ref') || ''
  const status = params.get('status') || 'success'
  const method = params.get('method') || params.get('payment') || ''
  const reason = params.get('reason') || ''

  const isSuccess = status === 'success'
  const isBankTransfer = method === 'bank_transfer'
  const isCod = method === 'cod'

  const whatsappMsg = encodeURIComponent(
    `Hello! I placed an order *${orderNumber}* on Rustam Battery website. Please confirm my order.`
  )

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full space-y-4">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
          {isSuccess ? (
            <>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${isBankTransfer ? 'bg-amber-100' : 'bg-green-100'}`}>
                {isBankTransfer
                  ? <Clock className="text-amber-500" size={40} />
                  : <CheckCircle className="text-green-500" size={40} />}
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {isBankTransfer ? 'Order Received!' : 'Order Confirmed!'}
              </h1>

              {orderNumber && (
                <div className="inline-block bg-amber-50 border border-amber-200 rounded-xl px-6 py-3 mb-4">
                  <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">Order Reference</p>
                  <p className="text-xl font-bold text-amber-700">{orderNumber}</p>
                </div>
              )}

              <p className="text-gray-600 text-sm mb-6">
                {isBankTransfer
                  ? 'We received your order. After verifying your bank transfer, we will confirm within 2–4 hours.'
                  : isCod
                  ? 'Your order is confirmed! Our team will contact you to arrange delivery.'
                  : 'Payment successful! Your order is confirmed and will be processed shortly.'}
              </p>

              <a
                href={`https://wa.me/923213770402?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors mb-3"
              >
                <MessageCircle size={20} />
                Confirm on WhatsApp
              </a>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <XCircle className="text-red-500" size={40} />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
              <p className="text-gray-600 text-sm mb-6">
                {reason === 'invalid_hash' && 'Payment verification failed. Please contact support.'}
                {reason === 'order_not_found' && 'Order not found. Please contact support.'}
                {reason === 'server_error' && 'A server error occurred. Please try again.'}
                {!reason && 'Your payment was not completed. Please try again or choose a different payment method.'}
              </p>

              <a
                href="https://wa.me/923213770402"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors mb-3"
              >
                <MessageCircle size={20} />
                Contact Support on WhatsApp
              </a>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors mb-3"
              >
                Try Again
              </Link>
            </>
          )}

          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Contact block */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Need help?</p>
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
            <a href="tel:+923213770402" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
              <Phone size={14} className="text-amber-500" />
              +92 321 3770402
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-amber-500" />
              Kahna Nau, Lahore
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

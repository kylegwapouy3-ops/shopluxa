import { useState } from 'react'
import type { FormEvent } from 'react'
import { X } from 'lucide-react'
import { formatPeso, useCart } from '@/lib/cart'

const PAYMENT_METHODS = [
  { value: 'gcash', label: 'GCash' },
  { value: 'maya', label: 'Maya' },
  { value: 'cod', label: 'Cash on Delivery' },
] as const

interface FormState {
  fullName: string
  mobile: string
  email: string
  address: string
  barangay: string
  city: string
  province: string
  postalCode: string
  payment: (typeof PAYMENT_METHODS)[number]['value']
}

const EMPTY_FORM: FormState = {
  fullName: '',
  mobile: '',
  email: '',
  address: '',
  barangay: '',
  city: '',
  province: '',
  postalCode: '',
  payment: 'gcash',
}

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, discount, shipping, total, clearCart } =
    useCart()
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)

  if (!isCheckoutOpen) return null

  const handleClose = () => {
    closeCheckout()
    if (submitted) {
      setSubmitted(false)
      setForm(EMPTY_FORM)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setSubmitted(true)
    clearCart()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close checkout"
        onClick={handleClose}
        className="absolute inset-0 bg-charcoal/60"
      />
      <div className="relative bg-cream rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/30 sticky top-0 bg-cream">
          <h2 className="font-display text-xl font-bold text-burgundy-dark">
            {submitted ? 'Order Received!' : 'Checkout'}
          </h2>
          <button onClick={handleClose} aria-label="Close" className="p-1 hover:text-burgundy">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <p className="text-2xl mb-2">🌸</p>
            <h3 className="font-display text-2xl font-bold text-burgundy-dark mb-2">
              Order Received!
            </h3>
            <p className="text-charcoal/70 mb-6">
              Thank you for choosing LUXA Cosmetics.
            </p>
            <p className="text-xs text-charcoal/50 mb-6">
              This is a demo checkout for a class project. No real payment was processed.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-burgundy text-cream font-semibold hover:bg-burgundy-light transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div className="text-sm space-y-1 bg-white/60 rounded-lg p-3">
              <div className="flex justify-between">
                <span className="text-charcoal/70">Subtotal</span>
                <span>{formatPeso(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-burgundy">
                  <span>Discount</span>
                  <span>-{formatPeso(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-charcoal/70">Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPeso(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-gold/30">
                <span>Total</span>
                <span>{formatPeso(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Full Name"
                value={form.fullName}
                onChange={(v) => setForm((f) => ({ ...f, fullName: v }))}
                className="sm:col-span-2"
              />
              <Field
                label="Mobile Number"
                value={form.mobile}
                onChange={(v) => setForm((f) => ({ ...f, mobile: v }))}
                type="tel"
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                type="email"
              />
              <Field
                label="Complete Address"
                value={form.address}
                onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                className="sm:col-span-2"
              />
              <Field
                label="Barangay"
                value={form.barangay}
                onChange={(v) => setForm((f) => ({ ...f, barangay: v }))}
              />
              <Field
                label="City / Municipality"
                value={form.city}
                onChange={(v) => setForm((f) => ({ ...f, city: v }))}
              />
              <Field
                label="Province"
                value={form.province}
                onChange={(v) => setForm((f) => ({ ...f, province: v }))}
              />
              <Field
                label="Postal Code"
                value={form.postalCode}
                onChange={(v) => setForm((f) => ({ ...f, postalCode: v }))}
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-charcoal mb-2">Payment Method</p>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.value}
                    className={`text-center text-sm py-2 rounded-lg border cursor-pointer transition-colors ${
                      form.payment === method.value
                        ? 'bg-burgundy text-cream border-burgundy'
                        : 'border-charcoal/20 text-charcoal hover:border-burgundy'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={form.payment === method.value}
                      onChange={() => setForm((f) => ({ ...f, payment: method.value }))}
                      className="sr-only"
                    />
                    {method.label}
                  </label>
                ))}
              </div>
            </div>

            <p className="text-xs text-charcoal/50">
              Demo checkout only &mdash; no real payment will be processed.
            </p>

            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full py-3 rounded-full bg-burgundy text-cream font-semibold hover:bg-burgundy-light transition-colors disabled:opacity-50"
            >
              Place Order
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  className = '',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  className?: string
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="block text-charcoal/70 mb-1">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-charcoal/20 outline-none focus:border-burgundy bg-white"
      />
    </label>
  )
}

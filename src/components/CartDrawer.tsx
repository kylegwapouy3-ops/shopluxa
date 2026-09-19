import { useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import { formatPeso, useCart } from '@/lib/cart'

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    subtotal,
    discount,
    shipping,
    total,
    promoCode,
    promoError,
    applyPromo,
    removePromo,
    openCheckout,
  } = useCart()
  const [promoInput, setPromoInput] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-charcoal/50"
      />
      <div className="relative w-full sm:w-[420px] h-full bg-cream flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gold/30">
          <h2 className="font-display text-xl font-bold text-burgundy-dark">Your Cart</h2>
          <button onClick={closeCart} aria-label="Close" className="p-1 hover:text-burgundy">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-charcoal/60 text-center mt-10">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <img
                    src={`/.netlify/images?url=${encodeURIComponent(item.image)}&w=160&fm=webp&q=75`}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-white flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold text-sm text-charcoal">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-charcoal/40 hover:text-burgundy"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gold font-semibold mb-2">{formatPeso(item.price)}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrement(item.id)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-burgundy"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => increment(item.id)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full border border-charcoal/20 flex items-center justify-center hover:border-burgundy"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gold/30 px-5 py-4 space-y-3">
            {promoCode ? (
              <div className="flex items-center justify-between text-sm bg-gold/10 rounded-lg px-3 py-2">
                <span>
                  Promo <strong>{promoCode}</strong> applied
                </span>
                <button onClick={removePromo} className="text-burgundy underline">
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-1.5 rounded-full border border-charcoal/20 text-sm outline-none focus:border-burgundy"
                  />
                  <button
                    onClick={() => {
                      applyPromo(promoInput)
                      setPromoInput('')
                    }}
                    className="px-4 py-1.5 rounded-full border border-burgundy text-burgundy text-sm font-semibold hover:bg-burgundy hover:text-cream"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-xs text-burgundy mt-1">{promoError}</p>}
              </div>
            )}

            <div className="text-sm space-y-1.5">
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
              <div className="flex justify-between font-bold text-base pt-1 border-t border-gold/30">
                <span>Total</span>
                <span>{formatPeso(total)}</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-3 rounded-full bg-burgundy text-cream font-semibold hover:bg-burgundy-light transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

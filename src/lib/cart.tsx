import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { Product } from '@/data/products'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  qty: number
}

const STORAGE_KEY = 'luxa-cart'
const FREE_SHIPPING_THRESHOLD = 1500
const SHIPPING_FEE = 60
const PROMO_CODES: Record<string, number> = {
  LUXA10: 0.1,
  LUXAVIP: 0.15,
}

interface CartContextValue {
  items: Array<CartItem>
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  isCheckoutOpen: boolean
  openCheckout: () => void
  closeCheckout: () => void
  addItem: (product: Product, qty?: number) => void
  removeItem: (id: number) => void
  increment: (id: number) => void
  decrement: (id: number) => void
  clearCart: () => void
  promoCode: string | null
  promoError: string | null
  applyPromo: (code: string) => void
  removePromo: () => void
  itemCount: number
  subtotal: number
  discount: number
  shipping: number
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Array<CartItem>>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [promoError, setPromoError] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed.items)) setItems(parsed.items)
        if (typeof parsed.promoCode === 'string') setPromoCode(parsed.promoCode)
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, promoCode }))
  }, [items, promoCode, hydrated])

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, image: product.image, qty },
      ]
    })
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const increment = useCallback((id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)),
    )
  }, [])

  const decrement = useCallback((id: number) => {
    setItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item]
        if (item.qty <= 1) return []
        return [{ ...item, qty: item.qty - 1 }]
      }),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setPromoCode(null)
    setPromoError(null)
  }, [])

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase()
    if (!normalized) return
    if (PROMO_CODES[normalized]) {
      setPromoCode(normalized)
      setPromoError(null)
    } else {
      setPromoError('That promo code is not valid.')
    }
  }, [])

  const removePromo = useCallback(() => {
    setPromoCode(null)
    setPromoError(null)
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const openCheckout = useCallback(() => {
    setIsOpen(false)
    setIsCheckoutOpen(true)
  }, [])
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), [])

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  )
  const discountRate = promoCode ? PROMO_CODES[promoCode] ?? 0 : 0
  const discount = useMemo(() => Math.round(subtotal * discountRate), [subtotal, discountRate])
  const shipping = useMemo(() => {
    if (items.length === 0) return 0
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  }, [items.length, subtotal])
  const total = useMemo(() => Math.max(0, subtotal - discount + shipping), [subtotal, discount, shipping])

  const value: CartContextValue = {
    items,
    isOpen,
    openCart,
    closeCart,
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
    addItem,
    removeItem,
    increment,
    decrement,
    clearCart,
    promoCode,
    promoError,
    applyPromo,
    removePromo,
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export function formatPeso(amount: number) {
  return `₱${amount.toLocaleString('en-PH')}`
}

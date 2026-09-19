import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/cart'

const NAV_LINKS = [
  { href: '#shop', label: 'Shop' },
  { href: '#why-luxa', label: 'Why LUXA' },
  { href: '#owners', label: 'About Us' },
]

export function Header() {
  const { itemCount, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-gold/30">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="#top" className="font-display text-2xl tracking-wide text-burgundy font-bold">
          LUXA
          <span className="text-gold"> Cosmetics</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-burgundy transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2 rounded-full hover:bg-gold/10 transition-colors"
          >
            <ShoppingBag className="w-6 h-6 text-burgundy" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-burgundy text-cream text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-full hover:bg-gold/10 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6 text-burgundy" /> : <Menu className="w-6 h-6 text-burgundy" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-gold/30 px-5 py-3 flex flex-col gap-3 text-sm font-medium text-charcoal bg-cream">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-burgundy transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

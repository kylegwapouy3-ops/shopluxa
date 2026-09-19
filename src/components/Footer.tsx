import { useState } from 'react'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { InfoModal } from './InfoModal'

type InfoKey = 'faq' | 'shipping' | 'privacy' | 'terms'

const LINKS: Array<{ key: InfoKey; label: string }> = [
  { key: 'faq', label: 'FAQ' },
  { key: 'shipping', label: 'Shipping & Returns' },
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms & Conditions' },
]

export function Footer() {
  const [active, setActive] = useState<InfoKey | null>(null)

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="font-display text-xl font-bold text-cream mb-2">
            LUXA <span className="text-gold">Cosmetics</span>
          </p>
          <p className="text-sm">Ormoc City, Philippines</p>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              aria-label="LUXA on Facebook"
              className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="LUXA on Instagram"
              className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream mb-3">Contact</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" /> Ormoc City, Leyte, Philippines
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" /> +63 900 000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold" /> hello@luxacosmetics.ph
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream mb-3">Support</p>
          <ul className="space-y-2 text-sm">
            {LINKS.slice(0, 2).map((link) => (
              <li key={link.key}>
                <button
                  onClick={() => setActive(link.key)}
                  className="hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream mb-3">Legal</p>
          <ul className="space-y-2 text-sm">
            {LINKS.slice(2).map((link) => (
              <li key={link.key}>
                <button
                  onClick={() => setActive(link.key)}
                  className="hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © 2026 LUXA Cosmetics. All rights reserved.
      </div>

      {active === 'faq' && (
        <InfoModal title="Frequently Asked Questions" onClose={() => setActive(null)}>
          <div>
            <p className="font-semibold text-charcoal">Is this a real store?</p>
            <p>This site is a demo e-commerce project created for a Digital Marketing finals project.</p>
          </div>
          <div>
            <p className="font-semibold text-charcoal">Can I actually pay for products?</p>
            <p>No. Checkout on this site is for demonstration only &mdash; no real payments are processed.</p>
          </div>
          <div>
            <p className="font-semibold text-charcoal">Where is LUXA based?</p>
            <p>LUXA Cosmetics is a concept brand based in Ormoc City, Philippines.</p>
          </div>
        </InfoModal>
      )}

      {active === 'shipping' && (
        <InfoModal title="Shipping & Returns" onClose={() => setActive(null)}>
          <p>
            This is a demo policy for a class project. In a live store, orders would typically ship
            within 2&ndash;5 business days within the Philippines, with delivery times varying by
            location.
          </p>
          <p>
            Returns and exchanges would be accepted within 7 days of delivery for unopened,
            unused products in their original packaging.
          </p>
        </InfoModal>
      )}

      {active === 'privacy' && (
        <InfoModal title="Privacy Policy" onClose={() => setActive(null)}>
          <p>
            This demo site does not collect, store, or share personal information on any server.
            Checkout details you enter stay in your browser for this demonstration only.
          </p>
          <p>
            In a live version of LUXA Cosmetics, this section would describe how customer data is
            collected, used, and protected.
          </p>
        </InfoModal>
      )}

      {active === 'terms' && (
        <InfoModal title="Terms & Conditions" onClose={() => setActive(null)}>
          <p>
            LUXA Cosmetics is a fictional brand created for academic purposes as part of a Digital
            Marketing finals project. Product names, prices, and offers on this site are for
            demonstration only and do not represent a real, operating business.
          </p>
        </InfoModal>
      )}
    </footer>
  )
}

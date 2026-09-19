# AGENTS.md

Project overview for developers and AI agents working on this codebase.

## Project Overview

LUXA Cosmetics is a one-page e-commerce site for a Digital Marketing finals project. It showcases 8
fixed cosmetics products with a working client-side cart, a demo Philippine-style checkout, and brand
sections (hero, shop, why LUXA, promotion, owners, final CTA, footer). Built with TanStack Start and
deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (custom theme: burgundy/gold/cream/charcoal) |
| Icons | lucide-react |
| Images | Netlify Image CDN (`/.netlify/images`) |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

There is no backend, database, or payment integration by design: checkout is a client-side-only demo
(see CHECKOUT below) and all product/owner data is static.

## Directory Structure

```
├── public/img/products/   # AI-generated product photography (PNG)
├── public/img/owners/     # Real team member photos (JPG)
├── public/img/hero-flatlay.png  # Hero/promotion background image
├── src
│   ├── components/
│   │   ├── Header.tsx        # Sticky nav + cart icon with item count
│   │   ├── Hero.tsx           # Hero section
│   │   ├── Shop.tsx            # Product grid: search, category filter, sort, load more
│   │   ├── WhyLuxa.tsx         # Brand messaging cards
│   │   ├── Promotion.tsx       # Secondary promo banner
│   │   ├── Owners.tsx          # "The People Behind LUXA" team cards
│   │   ├── FinalCta.tsx        # Closing call-to-action
│   │   ├── Footer.tsx          # Footer + FAQ/Shipping/Privacy/Terms modals
│   │   ├── CartDrawer.tsx      # Slide-over cart: qty, promo code, totals
│   │   ├── CheckoutModal.tsx   # Demo PH-style checkout form + confirmation
│   │   └── InfoModal.tsx       # Generic modal used by footer legal/FAQ content
│   ├── data/
│   │   ├── products.ts   # The 8 fixed LUXA products (id, name, price, image, category)
│   │   └── owners.ts     # The 5 team member entries (name + photo path)
│   ├── lib/
│   │   └── cart.tsx      # CartProvider/useCart: cart + checkout modal state, localStorage persistence
│   ├── routes/
│   │   ├── __root.tsx    # Root layout: fonts, meta tags, global styles
│   │   └── index.tsx     # The single page: composes all sections inside CartProvider
│   ├── router.tsx
│   └── styles.css        # Tailwind import + @theme color tokens
├── netlify.toml
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Key Concepts

### One page only

Everything lives on `/` (`src/routes/index.tsx`). Nav links and CTAs are anchor links (`#shop`,
`#why-luxa`, `#owners`). Do not add new routes for FAQ/Privacy/Terms/etc. — those are modals rendered
from `Footer.tsx` so the site stays a single page.

### Product data integrity

`src/data/products.ts` has exactly the 8 products the brand brief specifies, each with a matched
image path under `public/img/products/`. Do not add, remove, or reorder products, and never point two
products at the same image or vice versa.

### Owner photo integrity

`src/data/owners.ts` pairs each of the 5 team members with their real uploaded photo in
`public/img/owners/` (filenames encode the person's name). When updating this list, keep each name
permanently paired with its own photo file — never swap them.

### Cart & checkout (`src/lib/cart.tsx`)

`CartProvider` holds cart items, the cart drawer's open state, and the checkout modal's open state,
persisted to `localStorage` under `luxa-cart`. Promo codes are a hardcoded map (`LUXA10`, `LUXAVIP`);
shipping is a flat fee waived above a subtotal threshold — see the constants at the top of the file.

Checkout (`CheckoutModal.tsx`) collects PH-style fields (name, mobile, email, address, barangay,
city, province, postal code) and a payment method (GCash / Maya / Cash on Delivery), then shows an
"Order Received!" confirmation and clears the cart. This is intentionally client-side only — no
network request is made and no order data is persisted or sent anywhere, matching the "demo checkout,
no real payments" requirement. Do not wire this to a real payment provider or backend without an
explicit request to do so.

### Images

Product, hero, and owner images are served through Netlify Image CDN
(`/.netlify/images?url=/img/...&w=...&fm=webp`) rather than the raw files, for on-the-fly resizing and
format negotiation. Keep using that pattern for any new images.

## Conventions

- Components: PascalCase, one per file in `src/components/`.
- Import paths use the `@/` alias for `src/*`.
- Tailwind utility classes styled with the custom tokens in `styles.css` (`bg-burgundy`, `text-gold`,
  `bg-cream`, `text-charcoal`, `font-display` for the Playfair Display headings) — reuse these instead
  of introducing new ad-hoc colors.
- No test suite, no analytics, no review/testimonial UI — these are explicitly out of scope for this
  project.

## Development Commands

```bash
npm run dev      # Start dev server (or: netlify dev --port 8889)
npm run build    # Production build
```

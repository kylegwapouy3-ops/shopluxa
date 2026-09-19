# LUXA Cosmetics

A polished one-page e-commerce site for LUXA Cosmetics (Ormoc City, Philippines), built as a Digital
Marketing finals project. It presents a fixed catalog of 8 products with a fully working cart and a
demo Philippine-style checkout — no real payments are processed.

## Sections

Hero → Shop → Why LUXA → Promotion → The People Behind LUXA → Final CTA → Footer, all on a single
page (`/`).

## Key Features

- **Shop** — search, category filter, sorting, and a "Load More" reveal over the 8 products.
- **Cart** — add/remove items, adjust quantity, promo codes, subtotal/shipping/discount/total,
  persisted in the browser via `localStorage`.
- **Checkout** — a demo-only Philippine-style form (name, mobile, email, address, barangay, city,
  province, postal code) with GCash / Maya / Cash on Delivery options, ending in an "Order Received!"
  confirmation. Nothing is charged or sent to a server.
- **Owners** — "The People Behind LUXA" team cards, each permanently paired with its own photo.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) + React 19 + Vite 7
- Tailwind CSS 4 with a custom burgundy/gold/cream/charcoal theme
- Product and hero imagery generated to match the brand palette; team photos are the real uploaded
  portraits
- Netlify Image CDN for on-demand image resizing/format conversion

## Running Locally

```bash
npm install
npm run dev
```

Or, for full Netlify feature emulation:

```bash
netlify dev --port 8889
```

## Project Structure

See `AGENTS.md` for the full directory breakdown and the conventions to follow when extending this
project (product data, owner photos, cart/checkout behavior, image handling).

import { useMemo, useState } from 'react'
import products from '@/data/products'
import type { Product } from '@/data/products'
import { formatPeso, useCart } from '@/lib/cart'

const CATEGORIES = ['All', 'Lips', 'Face', 'Eyes', 'Skincare', 'Tools'] as const
const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
] as const

const PAGE_SIZE = 6

function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart, openCheckout } = useCart()

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gold/20 overflow-hidden hover:shadow-lg hover:shadow-burgundy/10 transition-shadow">
      <div className="aspect-square bg-cream overflow-hidden">
        <img
          src={`/.netlify/images?url=${encodeURIComponent(product.image)}&w=500&fm=webp&q=75`}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <span className="text-xs uppercase tracking-wide text-gold font-semibold mb-1">
          {product.category}
        </span>
        <h3 className="font-display text-lg font-bold text-burgundy-dark mb-1">{product.name}</h3>
        <p className="text-sm text-charcoal/70 flex-1 mb-3">{product.shortDescription}</p>
        <div className="text-xl font-bold text-charcoal mb-4">{formatPeso(product.price)}</div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              addItem(product)
              openCart()
            }}
            className="flex-1 px-3 py-2 rounded-full border border-burgundy text-burgundy text-sm font-semibold hover:bg-burgundy hover:text-cream transition-colors"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              addItem(product)
              openCheckout()
            }}
            className="flex-1 px-3 py-2 rounded-full bg-gold text-burgundy-dark text-sm font-semibold hover:bg-gold-light transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export function Shop() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [sort, setSort] = useState<typeof SORTS[number]['value']>('featured')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(search.trim().toLowerCase()),
    )
    if (category !== 'All') {
      list = list.filter((p) => p.category === category)
    }
    list = [...list]
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [search, category, sort])

  const visibleProducts = filtered.slice(0, visible)

  return (
    <section id="shop" className="max-w-6xl mx-auto px-5 py-20">
      <div className="text-center mb-10">
        <p className="text-gold font-semibold uppercase tracking-widest text-xs mb-2">Shop</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-burgundy-dark">
          Beauty Essentials
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-8">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setVisible(PAGE_SIZE)
          }}
          placeholder="Search products..."
          className="w-full md:w-64 px-4 py-2 rounded-full border border-charcoal/20 focus:border-burgundy outline-none text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c)
                setVisible(PAGE_SIZE)
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                category === c
                  ? 'bg-burgundy text-cream border-burgundy'
                  : 'border-charcoal/20 text-charcoal hover:border-burgundy'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="px-4 py-2 rounded-full border border-charcoal/20 text-sm outline-none focus:border-burgundy"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-charcoal/60 py-10">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-8 py-3 rounded-full border border-burgundy text-burgundy font-semibold hover:bg-burgundy hover:text-cream transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  )
}

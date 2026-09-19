export interface Product {
  id: number
  slug: string
  name: string
  image: string
  category: 'Lips' | 'Face' | 'Eyes' | 'Skincare' | 'Tools'
  price: number
  shortDescription: string
}

const products: Array<Product> = [
  {
    id: 1,
    slug: 'velvet-lip-cream',
    name: 'LUXA Velvet Lip Cream',
    image: '/img/products/velvet-lip-cream.png',
    category: 'Lips',
    price: 299,
    shortDescription: 'A weightless, velvety lip tint that glides on smooth and lasts all day.',
  },
  {
    id: 2,
    slug: 'matte-lipstick',
    name: 'LUXA Matte Lipstick',
    image: '/img/products/matte-lipstick.png',
    category: 'Lips',
    price: 349,
    shortDescription: 'Full-coverage matte color with a comfortable, non-drying finish.',
  },
  {
    id: 3,
    slug: 'glow-foundation',
    name: 'LUXA Glow Foundation',
    image: '/img/products/glow-foundation.png',
    category: 'Face',
    price: 599,
    shortDescription: 'Buildable, luminous coverage that evens skin tone with a natural glow.',
  },
  {
    id: 4,
    slug: 'blush-veil',
    name: 'LUXA Blush Veil',
    image: '/img/products/blush-veil.png',
    category: 'Face',
    price: 399,
    shortDescription: 'A silky pressed blush that blends effortlessly for a soft, healthy flush.',
  },
  {
    id: 5,
    slug: 'luxe-eyeshadow-palette',
    name: 'LUXA Luxe Eyeshadow Palette',
    image: '/img/products/eyeshadow-palette.png',
    category: 'Eyes',
    price: 699,
    shortDescription: 'Twelve richly pigmented mattes and shimmers for endless eye looks.',
  },
  {
    id: 6,
    slug: 'mascara',
    name: 'LUXA Mascara',
    image: '/img/products/mascara.png',
    category: 'Eyes',
    price: 349,
    shortDescription: 'Lengthens and lifts lashes with a smudge-proof, all-day formula.',
  },
  {
    id: 7,
    slug: 'facial-serum',
    name: 'LUXA Facial Serum',
    image: '/img/products/facial-serum.png',
    category: 'Skincare',
    price: 499,
    shortDescription: 'A lightweight daily serum that hydrates and preps skin for makeup.',
  },
  {
    id: 8,
    slug: 'makeup-brush-set',
    name: 'LUXA Makeup Brush Set',
    image: '/img/products/brush-set.png',
    category: 'Tools',
    price: 599,
    shortDescription: 'Five essential brushes for a flawless, streak-free application.',
  },
]

export default products

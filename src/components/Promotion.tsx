export function Promotion() {
  return (
    <section className="relative overflow-hidden bg-burgundy-dark text-cream">
      <img
        src="/.netlify/images?url=/img/hero-flatlay.png&w=1600&fm=webp&q=70"
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative max-w-3xl mx-auto px-5 py-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Discover Your LUXA Look.
        </h2>
        <p className="text-cream/80 mb-8">
          Find beauty essentials designed to complement your everyday confidence.
        </p>
        <a
          href="#shop"
          className="inline-block px-8 py-3 rounded-full bg-gold text-burgundy-dark font-semibold hover:bg-gold-light transition-colors"
        >
          Shop Now
        </a>
      </div>
    </section>
  )
}

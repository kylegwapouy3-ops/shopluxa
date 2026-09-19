export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-burgundy text-cream"
    >
      <div className="absolute inset-0">
        <img
          src="/.netlify/images?url=/img/hero-flatlay.png&w=1600&fm=webp&q=70"
          alt=""
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy-dark/90 via-burgundy/85 to-burgundy" />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 py-28 md:py-36 text-center">
        <p className="tracking-[0.3em] text-gold text-xs md:text-sm font-semibold uppercase mb-5">
          LUXA Cosmetics
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
          Discover Your LUXA Look.
        </h1>
        <p className="text-cream/85 text-base md:text-lg max-w-2xl mx-auto mb-10">
          Elevate your everyday beauty with LUXA Cosmetics&mdash;where confidence meets elegance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#shop"
            className="px-8 py-3 rounded-full bg-gold text-burgundy-dark font-semibold hover:bg-gold-light transition-colors w-full sm:w-auto"
          >
            Shop Now
          </a>
          <a
            href="#why-luxa"
            className="px-8 py-3 rounded-full border border-cream/40 text-cream font-semibold hover:bg-cream/10 transition-colors w-full sm:w-auto"
          >
            Explore Products
          </a>
        </div>
      </div>
    </section>
  )
}

import owners from '@/data/owners'

export function Owners() {
  return (
    <section id="owners" className="max-w-6xl mx-auto px-5 py-20">
      <div className="text-center mb-12">
        <p className="text-gold font-semibold uppercase tracking-widest text-xs mb-2">
          About Us
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-burgundy-dark">
          The People Behind LUXA
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {owners.map((owner) => (
          <div key={owner.id} className="text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-gold mb-3">
              <img
                src={`/.netlify/images?url=${encodeURIComponent(owner.image)}&w=300&h=300&fit=cover&fm=webp&q=80`}
                alt={owner.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-semibold text-charcoal">{owner.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

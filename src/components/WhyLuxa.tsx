import { Heart, Leaf, ShieldCheck, Sparkles } from 'lucide-react'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Premium Beauty',
    description: 'Thoughtfully formulated cosmetics designed to look and feel luxurious every day.',
  },
  {
    icon: Leaf,
    title: 'Carefully Selected Ingredients',
    description: 'Formulas chosen with care, balancing performance with gentle everyday wear.',
  },
  {
    icon: ShieldCheck,
    title: 'Cruelty-Free',
    description: 'A brand promise: never tested on animals, always kind to beauty.',
  },
  {
    icon: Heart,
    title: 'Made for Everyday Confidence',
    description: 'Products made to help you feel effortlessly beautiful, wherever your day takes you.',
  },
]

export function WhyLuxa() {
  return (
    <section id="why-luxa" className="bg-white/60 py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold uppercase tracking-widest text-xs mb-2">
            Why LUXA
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-burgundy-dark">
            Beauty You Can Trust
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="text-center px-4">
              <div className="w-14 h-14 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-burgundy" />
              </div>
              <h3 className="font-display font-bold text-lg text-burgundy-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-charcoal/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

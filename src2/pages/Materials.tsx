import { useInView } from '../hooks/useInView'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const materialGroups = [
  {
    category: 'Stone',
    label: '01 — STONE',
    intro: 'Chosen from the finest quarries across Italy, Spain, Portugal and India. Every slab is hand-selected.',
    items: [
      {
        name: 'Calacatta Oro', finish: 'Polished', origin: 'Apuan Alps, Italy',
        care: 'Seal annually. Clean with pH-neutral solution.',
        desc: 'Ivory white with bold amber and grey veining. A statement material of enduring rarity.',
        img: 'https://images.unsplash.com/photo-1551554781-c46200ea959d?w=500&h=600&fit=crop&auto=format',
        alt: 'Calacatta marble texture'
      },
      {
        name: 'Nero Marquina', finish: 'Polished / Honed', origin: 'Basque Country, Spain',
        care: 'Seal annually. Avoid acidic cleaners.',
        desc: 'Deep black with brilliant white veining. A bold counterpoint to warm interiors.',
        img: 'https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=500&h=600&fit=crop&auto=format',
        alt: 'Black marble texture'
      },
      {
        name: 'Roman Travertine', finish: 'Brushed / Filled', origin: 'Tivoli, Italy',
        care: 'Seal every 18 months. Wipe spills promptly.',
        desc: 'Warm beige with a distinctive pitted surface. Ages beautifully over decades.',
        img: 'https://images.unsplash.com/photo-1603369425250-b276f2006ec0?w=500&h=600&fit=crop&auto=format',
        alt: 'Travertine stone texture'
      },
      {
        name: 'Bianco Carrara', finish: 'Polished / Satin', origin: 'Carrara, Italy',
        care: 'Seal biannually. Mild soap and water.',
        desc: 'The original luxury marble. Cool white with fine grey veining — timeless precision.',
        img: 'https://images.unsplash.com/photo-1558346648-9757f2fa4474?w=500&h=600&fit=crop&auto=format',
        alt: 'White Carrara marble texture'
      }
    ]
  },
  {
    category: 'Wood',
    label: '02 — WOOD',
    intro: 'European and American hardwoods, responsibly sourced. Each veneer is sequenced for visual continuity.',
    items: [
      {
        name: 'Smoked Walnut', finish: 'Natural Oil', origin: 'North America',
        care: 'Oil annually with food-safe oil. Wipe dry.',
        desc: 'Fumed American walnut with deep chocolate tones. The warmth that defines a room.',
        img: 'https://images.unsplash.com/photo-1736506159776-22ca388780fa?w=500&h=600&fit=crop&auto=format',
        alt: 'Dark walnut wood grain'
      },
      {
        name: 'Brushed European Oak', finish: 'Lye + Oil', origin: 'France / Germany',
        care: 'Oil every 2 years. Avoid standing water.',
        desc: 'Wire-brushed to accentuate the open grain. A bone-white surface tone of quiet elegance.',
        img: 'https://images.unsplash.com/photo-1736506159893-22cca29b8018?w=500&h=600&fit=crop&auto=format',
        alt: 'Oak wood grain texture'
      },
      {
        name: 'Ebonised Ash', finish: 'Ebonising Treatment', origin: 'Eastern Europe',
        care: 'Wipe clean with damp cloth. Avoid abrasives.',
        desc: 'Chemically darkened ash — a dramatic matte black that preserves the natural grain.',
        img: 'https://images.unsplash.com/photo-1621295693450-080546d2ec8e?w=500&h=600&fit=crop&auto=format',
        alt: 'Dark wood grain texture'
      }
    ]
  },
  {
    category: 'Metal',
    label: '03 — METAL',
    intro: 'Sourced from specialist metalwork studios. Every hardware piece is finished to our specification.',
    items: [
      {
        name: 'Unlacquered Brass', finish: 'Living Patina', origin: 'Custom-cast',
        care: 'Allow to patina naturally. Clean with dry cloth.',
        desc: 'A hardware material that transforms over time — the mark of a kitchen that has been lived in.',
        img: 'https://images.unsplash.com/photo-1619976553860-b7ffbe9a093b?w=500&h=600&fit=crop&auto=format',
        alt: 'Brass metal texture'
      },
      {
        name: 'Brushed Steel', finish: 'Linear Brush', origin: 'Custom-fabricated',
        care: 'Wipe in direction of grain. Mild detergent.',
        desc: 'Industrial precision with a refined finish. A material that performs as beautifully as it looks.',
        img: 'https://images.unsplash.com/photo-1603323978104-4c1c0d1bfc72?w=500&h=600&fit=crop&auto=format',
        alt: 'Brushed metal surface'
      }
    ]
  }
]

export default function Materials() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '65vh' }}>
        <img
          src="https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?w=1600&h=900&fit=crop&auto=format"
          alt="Marble counter with kitchen materials"
          className="w-full h-full object-cover hero-img-ken"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 to-dark/60" />
        <div className="absolute bottom-16 left-8 md:left-16 text-bg-warm">
          <p className="text-label mb-4" style={{ color: '#372314' }}>MATERIALS</p>
          <h1 className="text-display" style={{ fontSize: 'clamp(2.8rem,5.5vw,6.5rem)', lineHeight: 1.02 }}>
            Material Is<br /><em>the Design.</em>
          </h1>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-20">
        <Reveal>
          <p className="text-body text-ink-muted" style={{ fontSize: '18px', maxWidth: '680px', lineHeight: '1.8' }}>
            We believe material selection is not a final step — it is the foundation of the design. Every surface, every edge, every hardware piece is chosen for how it feels, how it performs, and how it ages.
          </p>
        </Reveal>
      </div>

      {/* Material groups */}
      {materialGroups.map((group, gi) => (
        <section key={group.category} className={gi % 2 === 0 ? 'bg-bg py-20' : 'bg-bg-warm py-20'}>
          <div className="max-w-screen-xl mx-auto px-8 md:px-16">
            <Reveal>
              <div className="flex items-end justify-between mb-16 border-b border-border pb-8">
                <div>
                  <p className="text-label text-accent mb-3">{group.label}</p>
                  <h2 className="text-display text-ink" style={{ fontSize: 'clamp(1.8rem,3vw,3rem)' }}>
                    {group.category}
                  </h2>
                </div>
                <p className="text-body text-ink-muted text-sm hidden md:block" style={{ maxWidth: '360px' }}>
                  {group.intro}
                </p>
              </div>
            </Reveal>

            <div className="h-scroll-container gap-6 pb-6">
              {group.items.map((mat, i) => (
                <div key={mat.name} className="h-scroll-item cursor-none group" data-cursor="view"
                  style={{ width: 'min(340px, 78vw)' }}>
                  <Reveal delay={i * 80}>
                    <div className="img-zoom overflow-hidden mb-6" style={{ aspectRatio: '5/6' }}>
                      <img src={mat.img} alt={mat.alt} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-label text-accent mb-2">{mat.finish} · {mat.origin}</p>
                    <h3 className="text-display text-ink mb-3" style={{ fontSize: '22px' }}>{mat.name}</h3>
                    <p className="text-body text-ink-muted text-sm mb-3">{mat.desc}</p>
                    <p className="text-label text-ink-muted" style={{ fontSize: '9px', opacity: 0.6 }}>
                      CARE: {mat.care}
                    </p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom statement */}
      <section className="section-dark py-40 text-center">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <Reveal>
            <p className="text-label mb-8" style={{ color: '#372314' }}>THE MATERIAL LIBRARY</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-display mb-8" style={{ fontSize: 'clamp(2rem,4.5vw,5rem)', color: '#FAF5F0', lineHeight: 1.05 }}>
              Visit our studio to experience<br /><em>the full material library.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <button
              className="magnetic-btn px-10 py-4 text-label tracking-widest border border-bg-warm/40 transition-all duration-500 hover:bg-accent hover:border-accent"
              style={{ color: '#FAF5F0' }}
              data-cursor="open"
            >
              BOOK A STUDIO VISIT
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

import { useInView } from '../hooks/useInView'

function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const collections = [
  {
    id: 'monolith',
    name: 'MONOLITH',
    tagline: 'Stone-forward architecture.',
    desc: 'A collection defined by the rawness and permanence of natural stone. Monolith kitchens treat surfaces as architecture — counters that become walls, islands that become sculptures. Every slab is hand-selected.',
    materials: ['Calacatta Nero', 'Honed Concrete', 'Brushed Steel', 'Smoked Glass'],
    img: 'https://images.unsplash.com/photo-1663811397261-916af74a9363?w=1400&h=900&fit=crop&auto=format',
    alt: 'Monolith dark contemporary kitchen'
  },
  {
    id: 'warm-minimal',
    name: 'WARM MINIMAL',
    tagline: 'Walnut + neutral tones.',
    desc: 'Restraint is the design. Warm Minimal is a collection that finds its character in texture and proportion rather than ornamentation. Smoked walnut, linen-white lacquer, and unlacquered brass — nothing more.',
    materials: ['Smoked Walnut', 'Linen Lacquer', 'Aged Brass', 'Travertine'],
    img: 'https://images.unsplash.com/photo-1758448755927-e5c5ae14790c?w=1400&h=900&fit=crop&auto=format',
    alt: 'Warm minimal kitchen with marble accents'
  },
  {
    id: 'contemporary',
    name: 'CONTEMPORARY',
    tagline: 'Clean geometry + modern materials.',
    desc: 'Precise geometry, seamless integration, and a commitment to the invisible — where the refrigerator disappears and the kitchen becomes architecture. Contemporary is for those who demand performance without compromise.',
    materials: ['Calacatta Marble', 'Matte White', 'Integrated Steel', 'White Oak'],
    img: 'https://images.unsplash.com/photo-1671197244266-73129c97c096?w=1400&h=900&fit=crop&auto=format',
    alt: 'Contemporary kitchen with marble countertops'
  },
  {
    id: 'signature',
    name: 'SIGNATURE',
    tagline: 'Highly customized luxury kitchens.',
    desc: 'No catalogue. No precedent. Signature is a fully bespoke service for spaces that require singular solutions. We begin with a blank page and build entirely around your architecture, your life, and your vision.',
    materials: ['By Commission', 'Any Material', 'Custom Hardware', 'Bespoke Joinery'],
    img: 'https://images.unsplash.com/photo-1769737122085-97b1ee5ab104?w=1400&h=900&fit=crop&auto=format',
    alt: 'Signature luxury kitchen with ocean view'
  }
]

export default function Collections() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="pt-36 pb-20 max-w-screen-xl mx-auto px-8 md:px-16">
        <Reveal>
          <p className="text-label text-accent mb-6">COLLECTIONS</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-display text-ink" style={{ fontSize: 'clamp(2.8rem,6vw,7.5rem)', lineHeight: 1.02 }}>
            A Collection of<br /><em>Possibilities.</em>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body text-ink-muted mt-8" style={{ fontSize: '17px', maxWidth: '560px' }}>
            Four distinct design languages, each a complete world. Find the one that resonates — or begin a Signature commission with a blank page.
          </p>
        </Reveal>
      </div>

      {/* Collections */}
      {collections.map((col, i) => (
        <section
          key={col.id}
          className={i % 2 === 0 ? 'bg-bg' : 'bg-bg-warm'}
        >
          <div className={`max-w-screen-xl mx-auto px-8 md:px-16 py-20 grid md:grid-cols-2 gap-0 items-center ${i % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}>
            <div className={i % 2 !== 0 ? 'md:[direction:ltr] md:pl-20' : 'md:pr-20'}>
              <Reveal delay={0}>
                <p className="section-num mb-4">0{i + 1}</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-display text-ink mb-3" style={{ fontSize: 'clamp(2rem,3.5vw,3.5rem)' }}>
                  {col.name}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-label text-accent mb-6">{col.tagline}</p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-body text-ink-muted mb-8" style={{ fontSize: '16px', maxWidth: '440px' }}>{col.desc}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mb-8">
                  <p className="text-label text-ink-muted mb-3">SIGNATURE MATERIALS</p>
                  <div className="flex flex-wrap gap-2">
                    {col.materials.map(m => (
                      <span key={m} className="text-label px-3 py-1.5 border border-border text-ink-muted"
                        style={{ fontSize: '9px' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={280}>
                <button
                  className="arrow-link text-label text-ink border-b border-ink pb-1"
                  data-cursor="open"
                >
                  EXPLORE COLLECTION
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              </Reveal>
            </div>

            <div className={`${i % 2 !== 0 ? 'md:[direction:ltr]' : ''} cursor-none`} data-cursor="view">
              <div className="img-zoom overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img src={col.img} alt={col.alt} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="section-dark py-32">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <Reveal>
            <div>
              <p className="text-label mb-6" style={{ color: '#372314' }}>BEGIN YOURS</p>
              <h2 className="text-display" style={{ fontSize: 'clamp(2rem,4vw,4.5rem)', color: '#FAF5F0' }}>
                Not seeing<br /><em>what you imagined?</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-col gap-4">
              <p className="text-body" style={{ color: 'rgba(245,237,227,0.55)', maxWidth: '320px' }}>
                Every Signature kitchen is designed from scratch. Tell us what you're imagining.
              </p>
              <button
                className="magnetic-btn px-10 py-4 text-label tracking-widest transition-colors duration-500"
                style={{ background: '#372314', color: '#FAF5F0' }}
                data-cursor="open"
              >
                BEGIN A COMMISSION
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

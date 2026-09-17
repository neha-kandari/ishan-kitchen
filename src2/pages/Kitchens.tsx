import { useState } from 'react'
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

const kitchens = [
  {
    name: 'The Bone White', style: 'Minimal', category: 'minimal',
    desc: 'Bone white lacquer, integrated handles, and Calacatta marble — a study in deliberate restraint.',
    size: 'lg',
    img: 'https://images.unsplash.com/photo-1613545564267-b80e188a1541?w=900&h=700&fit=crop&auto=format',
    alt: 'Minimal white kitchen cabinets'
  },
  {
    name: 'Carbon Monolith', style: 'Contemporary', category: 'contemporary',
    desc: 'Matte carbon cabinetry, precision engineered with near-invisible hardware.',
    size: 'sm',
    img: 'https://images.unsplash.com/photo-1663811397261-916af74a9363?w=600&h=700&fit=crop&auto=format',
    alt: 'Contemporary black kitchen design'
  },
  {
    name: 'The Warm Edit', style: 'Luxury', category: 'luxury',
    desc: 'Smoked oak veneer, aged brass hardware, and a hand-selected Travertine island.',
    size: 'sm',
    img: 'https://images.unsplash.com/photo-1758448755927-e5c5ae14790c?w=600&h=700&fit=crop&auto=format',
    alt: 'Warm kitchen with marble accents'
  },
  {
    name: 'Studio Concrete', style: 'Minimal', category: 'minimal',
    desc: 'Polished concrete surfaces, integrated appliances, and raw steel details.',
    size: 'sm',
    img: 'https://images.unsplash.com/photo-1758565811430-3423f31396f9?w=600&h=700&fit=crop&auto=format',
    alt: 'Modern kitchen with concrete ceiling'
  },
  {
    name: 'Calacatta Grand', style: 'Classic', category: 'classic',
    desc: 'Book-matched Calacatta Oro marble from counter to ceiling — the definitive luxury statement.',
    size: 'lg',
    img: 'https://images.unsplash.com/photo-1671197244266-73129c97c096?w=900&h=600&fit=crop&auto=format',
    alt: 'Modern kitchen with marble countertops'
  },
  {
    name: 'Island Living', style: 'Contemporary', category: 'contemporary',
    desc: 'A generously proportioned kitchen centred around an oversized walnut island.',
    size: 'sm',
    img: 'https://images.unsplash.com/photo-1760072513457-651955c7074d?w=600&h=500&fit=crop&auto=format',
    alt: 'Kitchen with large island and dining area'
  },
  {
    name: 'The Compact Edit', style: 'Compact', category: 'compact',
    desc: 'Intelligent spatial design that delivers a full luxury experience within 8 sqm.',
    size: 'sm',
    img: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=600&h=700&fit=crop&auto=format',
    alt: 'Compact luxury kitchen design'
  },
  {
    name: 'Signature Brass', style: 'Luxury', category: 'luxury',
    desc: 'Unlacquered brass hardware, hand-rubbed limewash plaster, and bespoke oak joinery.',
    size: 'lg',
    img: 'https://images.unsplash.com/photo-1769737122085-97b1ee5ab104?w=900&h=700&fit=crop&auto=format',
    alt: 'Kitchen with ocean view and luxury finishes'
  }
]

const filters = ['All', 'Contemporary', 'Minimal', 'Classic', 'Luxury', 'Compact']

export default function Kitchens() {
  const [active, setActive] = useState('All')

  const visible = active === 'All'
    ? kitchens
    : kitchens.filter(k => k.category === active.toLowerCase())

  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden bg-dark">
        <img
          src="https://images.unsplash.com/photo-1758565811404-0ff79b13ad48?w=1920&h=900&fit=crop&auto=format"
          alt="Luxury kitchen with island and contemporary design"
          className="w-full h-full object-cover opacity-80 hero-img-ken"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark/50" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-20">
          <p className="text-label mb-4" style={{ color: '#372314' }}>OUR KITCHENS</p>
          <h1 className="text-display" style={{ fontSize: 'clamp(2.8rem,5.5vw,6.5rem)', color: '#FAF5F0', lineHeight: 1.02 }}>
            Kitchens Designed<br /><em>Without Compromise.</em>
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[72px] z-40 bg-bg-warm/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-5 flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="text-label px-5 py-2 transition-all duration-300"
              style={{
                background: active === f ? '#1E0E06' : 'transparent',
                color: active === f ? '#FAF5F0' : '#7A5840',
                border: `1px solid ${active === f ? '#1E0E06' : '#C8AD96'}`,
                letterSpacing: '0.12em'
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Kitchen grid */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {visible.map((k, i) => (
            <Reveal key={k.name} delay={i * 60}>
              <div
                className="group relative overflow-hidden cursor-none bg-bg"
                data-cursor="view"
                style={{ aspectRatio: k.size === 'lg' ? '4/3' : '3/4' }}
              >
                <img
                  src={k.img}
                  alt={k.alt}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-bg-warm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <p className="text-label mb-2 opacity-60">{k.style}</p>
                  <h3 className="text-display mb-2" style={{ fontSize: 'clamp(1.2rem,2vw,1.6rem)' }}>{k.name}</h3>
                  <p className="text-body text-sm opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                    style={{ maxWidth: '300px' }}>
                    {k.desc}
                  </p>
                  <div className="mt-4 arrow-link text-label text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    EXPLORE
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

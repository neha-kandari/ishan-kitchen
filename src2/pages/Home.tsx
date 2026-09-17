import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useMediaQuery'
import KitchenComparison from './sections/KitchenComparison'
import HeroSequence from './sections/HeroSequence'
import BrandStatement from './sections/BrandStatement'
import ProjectsShowcase from './sections/ProjectsShowcase'
import StoneBenefits from './sections/StoneBenefits'

type Page = 'home' | 'projects' | 'about' | 'contact'
interface HomeProps { navigate: (page: Page) => void }

function Reveal({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
}) {
  const [ref, inView] = useInView()
  const cls = direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : direction === 'scale' ? 'reveal-scale' : 'reveal'
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}
      className={`${cls} ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Home({ navigate }: HomeProps) {
  return (
    <div className="bg-bg">

      {/* ══════════════════════════════════════════════
          HERO — image-sequence cinematic scroll
      ══════════════════════════════════════════════ */}
      <HeroSequence onNavigate={navigate} />

      {/* ══════════════════════════════════════════════
          PROJECTS SHOWCASE — large image + list
      ══════════════════════════════════════════════ */}
      <ProjectsShowcase navigate={navigate} />

      {/* ══════════════════════════════════════════════
          KITCHEN COMPARISON — timeline + video
      ══════════════════════════════════════════════ */}
      <KitchenComparison />

      {/* ══════════════════════════════════════════════
          BRAND STATEMENT
      ══════════════════════════════════════════════ */}
      <BrandStatement />

      {/* ══════════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#C8AD96', overflow: 'hidden', padding: '22px 0', borderTop: '1px solid #C8AD96', borderBottom: '1px solid #C8AD96' }}>
        <MarqueeRow text="PRECISION · MATERIAL · LONGEVITY · CRAFT · DETAIL · ARCHITECTURE ·" />
      </section>


      {/* ══════════════════════════════════════════════
          MATERIAL REEL — dark horizontal strip
      ══════════════════════════════════════════════ */}
      <MaterialReel />

      {/* ══════════════════════════════════════════════
          STONE BENEFITS — scroll sticky cards
      ══════════════════════════════════════════════ */}
      <StoneBenefits />

      {/* ══════════════════════════════════════════════
          NUMBERS — oversized stat grid
      ══════════════════════════════════════════════ */}
      <NumbersSection />

      {/* ══════════════════════════════════════════════
          PROCESS — horizontal step timeline
      ══════════════════════════════════════════════ */}
      <ProcessSection />


      {/* ══════════════════════════════════════════════
          REVIEWS — star-rated client cards
      ══════════════════════════════════════════════ */}
      <ReviewsSection />

      {/* ══════════════════════════════════════════════
          FAQ — accordion questions
      ══════════════════════════════════════════════ */}
      <FaqSection />

      {/* ══════════════════════════════════════════════
          FINAL CTA — cinematic background
      ══════════════════════════════════════════════ */}
      <CtaSection navigate={navigate} />

    </div>
  )
}

// ── Marquee ────────────────────────────────────────────────
function MarqueeRow({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      {[0,1].map(k => (
        <div key={k} style={{
          display: 'flex', gap: 0, flexShrink: 0,
          animation: 'marquee 22s linear infinite',
        }}>
          {Array(3).fill(text).map((t, i) => (
            <span key={i} style={{
              fontFamily: 'Manrope,sans-serif', fontWeight: 500,
              fontSize: 'clamp(0.6rem,0.75vw,0.75rem)', color: 'rgba(30,14,6,0.45)',
              letterSpacing: '0.22em', paddingRight: '3rem',
            }}>{t}</span>
          ))}
        </div>
      ))}
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  )
}

// ── Three Principles ───────────────────────────────────────
function ThreePrinciples() {
  const isMobile = useIsMobile()
  const items = [
    {
      num: '01', title: 'Precision', body: 'We design to tolerances most cannot perceive — but everyone feels.',
      img: 'https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?w=800&h=900&fit=crop&auto=format',
      alt: 'Marble counter precision', bg: '#FAF5F0',
    },
    {
      num: '02', title: 'Material', body: 'Stone, wood and metal selected for how they age — not just how they appear.',
      img: 'https://images.unsplash.com/photo-1551554781-c46200ea959d?w=800&h=900&fit=crop&auto=format',
      alt: 'Marble texture', bg: '#F5EDE3',
    },
    {
      num: '03', title: 'Personalization', body: 'No two kitchens share the same brief. We build from your life outward.',
      img: 'https://images.unsplash.com/photo-1760072513457-651955c7074d?w=800&h=900&fit=crop&auto=format',
      alt: 'Kitchen island', bg: '#C8AD96',
    },
  ]
  const sidePad = isMobile ? '20px' : '56px'
  return (
    <section style={{ background: '#F5EDE3' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: sidePad, paddingRight: sidePad, paddingTop: isMobile ? 64 : 96, paddingBottom: isMobile ? 64 : 96 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? 40 : 64 }}>
          <Reveal>
            <h2 className="text-display text-ink" style={{ fontSize: 'clamp(2rem,4vw,4rem)', lineHeight: 1.05 }}>
              Where Design Meets<br /><em>Everyday Living.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-label text-accent" style={{ fontSize: 10 }}>THREE PRINCIPLES</p>
          </Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 2 }}>
          {items.map((item, i) => (
            <Reveal key={item.num} delay={i * 100} direction="scale">
              <div className="group cursor-none" data-cursor="view"
                style={{ position: 'relative', overflow: 'hidden', aspectRatio: isMobile ? '4/3' : '3/4', background: item.bg }}>
                <img src={item.img} alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.06]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }} />
                {/* Dark overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(55,35,20,0.78) 0%, rgba(55,35,20,0.0) 55%)' }} />
                {/* Number top-left */}
                <p className="absolute top-6 left-6 text-label" style={{ color: 'rgba(245,237,227,0.45)', fontSize: 10 }}>{item.num}</p>
                {/* Content bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-bg-warm">
                  <h3 className="text-display mb-2" style={{ fontSize: 28 }}>{item.title}</h3>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(245,237,227,0.55)', lineHeight: 1.65, maxWidth: 240 }}>{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Featured Projects ──────────────────────────────────────
function FeaturedProjects({ navigate }: { navigate: (p: Page) => void }) {
  const projects = [
    { name: 'Residence No. 08', location: 'New Delhi', type: 'Contemporary', year: '2025',
      img: 'https://images.unsplash.com/photo-1758565811352-a439bd6f956e?w=1200&h=800&fit=crop&auto=format', alt: 'Res 08' },
    { name: 'Residence No. 12', location: 'Mumbai', type: 'Warm Minimal', year: '2025',
      img: 'https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?w=800&h=1000&fit=crop&auto=format', alt: 'Res 12' },
    { name: 'Residence No. 04', location: 'Bangalore', type: 'Monolith', year: '2024',
      img: 'https://images.unsplash.com/photo-1663811397261-916af74a9363?w=1200&h=800&fit=crop&auto=format', alt: 'Res 04' },
  ]

  return (
    <section className="bg-bg-warm" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}>
          <div>
            <Reveal><p className="text-label text-accent mb-4">SELECTED WORK</p></Reveal>
            <Reveal delay={80}>
              <h2 className="text-display text-ink" style={{ fontSize: 'clamp(2rem,4vw,4.5rem)', lineHeight: 1.02 }}>
                Spaces Worth<br /><em>Coming Home To.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <button onClick={() => navigate('projects')} data-cursor="open"
              className="arrow-link text-label text-ink border-b border-border pb-1 hidden md:flex">
              VIEW ALL PROJECTS
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1"/></svg>
            </button>
          </Reveal>
        </div>

        {/* Layout: large left + two stacked right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gridTemplateRows: 'auto auto', gap: 4 }}>
          {/* Large left */}
          <div style={{ gridRow: '1 / 3' }}>
          <Reveal direction="scale" className="">
            <div className="group cursor-none img-zoom overflow-hidden" data-cursor="view"
              style={{ aspectRatio: '3/4', height: '100%' }}>
              <img src={projects[0].img} alt={projects[0].alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(55,35,20,0.7) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-bg-warm">
                <p className="text-label mb-2 opacity-60">{projects[0].location} — {projects[0].year}</p>
                <h3 className="text-display mb-1" style={{ fontSize: 28 }}>{projects[0].name}</h3>
                <p className="text-label opacity-50">{projects[0].type}</p>
              </div>
            </div>
          </Reveal>
          </div>

          {/* Two right */}
          {projects.slice(1).map((p, i) => (
            <Reveal key={p.name} delay={(i+1)*80} direction="right">
              <div className="group cursor-none img-zoom overflow-hidden relative" data-cursor="view"
                style={{ aspectRatio: '16/10' }}>
                <img src={p.img} alt={p.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(55,35,20,0.65) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-bg-warm">
                  <p className="text-label mb-1 opacity-60">{p.location} — {p.year}</p>
                  <h3 className="text-display mb-1" style={{ fontSize: 22 }}>{p.name}</h3>
                  <p className="text-label opacity-50">{p.type}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Material Reel ──────────────────────────────────────────
const MATERIALS = [
  {
    name: 'Calacatta Marble',
    finish: 'Honed',
    origin: 'Apuan Alps, Italy',
    desc: 'Ivory white with bold amber veining — a statement surface of enduring rarity.',
    tag: 'STONE',
    img: 'https://images.unsplash.com/photo-1551554781-c46200ea959d?w=800&h=1000&fit=crop&auto=format',
    alt: 'Calacatta marble texture',
  },
  {
    name: 'Smoked Walnut',
    finish: 'Natural Oil',
    origin: 'North America',
    desc: 'Fumed American walnut with deep chocolate tones — the warmth that defines a room.',
    tag: 'WOOD',
    img: 'https://images.unsplash.com/photo-1736506159776-22ca388780fa?w=800&h=1000&fit=crop&auto=format',
    alt: 'Smoked walnut grain',
  },
  {
    name: 'Roman Travertine',
    finish: 'Brushed',
    origin: 'Tivoli, Italy',
    desc: 'Warm beige with a distinctive pitted surface. Ages beautifully over decades.',
    tag: 'STONE',
    img: 'https://images.unsplash.com/photo-1603369425250-b276f2006ec0?w=800&h=1000&fit=crop&auto=format',
    alt: 'Travertine stone',
  },
  {
    name: 'Nero Marquina',
    finish: 'Polished',
    origin: 'Basque Country, Spain',
    desc: 'Deep black with brilliant white veining — a bold counterpoint to warm interiors.',
    tag: 'STONE',
    img: 'https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=800&h=1000&fit=crop&auto=format',
    alt: 'Black marble',
  },
  {
    name: 'Brushed European Oak',
    finish: 'Lye + Oil',
    origin: 'France / Germany',
    desc: 'Wire-brushed to accentuate open grain — a bone-white surface of quiet elegance.',
    tag: 'WOOD',
    img: 'https://images.unsplash.com/photo-1736506159893-22cca29b8018?w=800&h=1000&fit=crop&auto=format',
    alt: 'European oak grain',
  },
  {
    name: 'Bianco Carrara',
    finish: 'Polished',
    origin: 'Carrara, Italy',
    desc: 'Cool white with fine grey veining — the original luxury marble. Timeless precision.',
    tag: 'STONE',
    img: 'https://images.unsplash.com/photo-1558346648-9757f2fa4474?w=800&h=1000&fit=crop&auto=format',
    alt: 'Bianco Carrara marble',
  },
]

function MaterialReel() {
  const isMobile = useIsMobile()
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState<'ALL' | 'STONE' | 'WOOD'>('ALL')
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const visible = filter === 'ALL' ? MATERIALS : MATERIALS.filter(m => m.tag === filter)

  useEffect(() => { setActive(0) }, [filter])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (paused) return
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % visible.length)
    }, 4000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused, visible.length, filter])

  // Mobile: vertical card list
  if (isMobile) {
    return (
      <section style={{ background: '#F5EDE3', padding: '64px 0 0' }}>
        <div style={{ padding: '0 20px 36px' }}>
          <p className="text-label mb-4" style={{ color: '#372314' }}>MATERIAL LIBRARY</p>
          <h2 className="text-display text-ink" style={{ fontSize: 'clamp(1.8rem,7vw,3rem)', lineHeight: 1.05, marginBottom: 24 }}>
            Touch is the first<br /><em>test of quality.</em>
          </h2>
          <div style={{ display: 'flex', gap: 2 }}>
            {(['ALL', 'STONE', 'WOOD'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{
                  fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.16em',
                  padding: '8px 16px',
                  background: filter === f ? '#1E0E06' : 'transparent',
                  color: filter === f ? '#FAF5F0' : 'rgba(30,14,6,0.45)',
                  border: `1px solid ${filter === f ? '#1E0E06' : 'rgba(30,14,6,0.2)'}`,
                  cursor: 'pointer', transition: 'all 0.3s',
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {visible.map((m, i) => (
            <div key={m.name} onClick={() => setActive(i)}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <img src={m.img} alt={m.alt}
                style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block',
                  filter: i === active ? 'brightness(0.65)' : 'brightness(0.5) saturate(0.7)',
                  transition: 'filter 0.4s' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,13,11,0.92) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px 20px' }}>
                <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.2em', color: '#5C3820', border: '1px solid rgba(92,56,32,0.4)', padding: '3px 8px', marginBottom: 10, display: 'inline-block' }}>
                  {m.tag} · {m.finish.toUpperCase()}
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 20, color: '#FAF5F0', lineHeight: 1.1, marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11.5, color: 'rgba(245,237,227,0.5)', lineHeight: 1.6 }}>{m.origin}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '20px 0 56px' }}>
          {visible.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 3, background: i === active ? '#372314' : 'rgba(55,35,20,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.4s' }} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section style={{ background: '#F5EDE3', padding: '96px 0 0' }}>
      {/* ── Header ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px 52px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div>
            <Reveal><p className="text-label mb-4" style={{ color: '#372314' }}>MATERIAL LIBRARY</p></Reveal>
            <Reveal delay={60}>
              <h2 className="text-display text-ink" style={{ fontSize: 'clamp(2rem,4vw,4rem)', lineHeight: 1.05 }}>
                Touch is the first<br /><em>test of quality.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div style={{ display: 'flex', gap: 2 }}>
              {(['ALL', 'STONE', 'WOOD'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} data-cursor="open"
                  style={{
                    fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.18em',
                    padding: '9px 20px',
                    background: filter === f ? '#1E0E06' : 'transparent',
                    color: filter === f ? '#FAF5F0' : 'rgba(30,14,6,0.4)',
                    border: `1px solid ${filter === f ? '#1E0E06' : 'rgba(30,14,6,0.18)'}`,
                    cursor: 'none', transition: 'all 0.3s',
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Horizontal accordion ── */}
      <div
        style={{ display: 'flex', height: 560, overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {visible.map((m, i) => {
          const isActive = i === active
          return (
            <div
              key={m.name}
              onClick={() => setActive(i)}
              data-cursor={isActive ? 'view' : 'open'}
              style={{
                flex: isActive ? 4 : 1,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'none',
                transition: 'flex 0.75s cubic-bezier(0.76,0,0.24,1)',
                borderRight: i < visible.length - 1 ? '1px solid rgba(245,237,227,0.08)' : 'none',
              }}
            >
              <img src={m.img} alt={m.alt}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: isActive ? 'scale(1)' : 'scale(1.06)',
                  transition: 'transform 0.75s cubic-bezier(0.76,0,0.24,1)',
                  filter: isActive ? 'none' : 'brightness(0.45) saturate(0.6)',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: isActive
                  ? 'linear-gradient(to top, rgba(15,13,11,0.9) 0%, rgba(15,13,11,0.25) 55%, transparent 100%)'
                  : 'rgba(15,13,11,0.2)',
                transition: 'background 0.75s',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: isActive ? 0 : 1, transition: 'opacity 0.35s', pointerEvents: 'none',
              }}>
                <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(245,237,227,0.7)', whiteSpace: 'nowrap', transform: 'rotate(-90deg)', letterSpacing: '0.04em' }}>
                  {m.name}
                </p>
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px 40px 40px',
                opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.5s 0.2s, transform 0.5s 0.2s cubic-bezier(0.16,1,0.3,1)',
                pointerEvents: isActive ? 'all' : 'none',
              }}>
                <span style={{ display: 'inline-block', marginBottom: 16, fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.22em', color: '#5C3820', border: '1px solid rgba(92,56,32,0.4)', padding: '4px 12px' }}>
                  {m.tag} · {m.finish.toUpperCase()}
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(1.6rem,2.4vw,2.6rem)', color: '#FAF5F0', lineHeight: 1.08, marginBottom: 14 }}>{m.name}</h3>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12.5, color: 'rgba(245,237,227,0.5)', lineHeight: 1.75, maxWidth: 340, marginBottom: 24 }}>{m.desc}</p>
                <div style={{ display: 'flex', gap: 0 }}>
                  {[{ label: 'FINISH', val: m.finish }, { label: 'ORIGIN', val: m.origin }].map((d, di) => (
                    <div key={d.label} style={{ paddingRight: 24, marginRight: 24, borderRight: di === 0 ? '1px solid rgba(245,237,227,0.12)' : 'none' }}>
                      <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.16em', color: 'rgba(245,237,227,0.3)', marginBottom: 5 }}>{d.label}</p>
                      <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, color: 'rgba(245,237,227,0.72)' }}>{d.val}</p>
                    </div>
                  ))}
                </div>
                {!paused && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(245,237,227,0.08)' }}>
                    <div key={`${filter}-${i}-${active}`} style={{ height: '100%', background: '#372314', animation: 'matProgress 4s linear forwards' }} />
                  </div>
                )}
              </div>
              <div style={{ position: 'absolute', top: 24, right: 28, fontFamily: 'Manrope,sans-serif', fontSize: 10, color: 'rgba(245,237,227,0.3)', letterSpacing: '0.1em', opacity: isActive ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
                {String(i + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Dot navigation ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '28px 0 72px' }}>
        {visible.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} data-cursor="open"
            style={{ width: i === active ? 24 : 6, height: 6, borderRadius: 3, background: i === active ? '#372314' : 'rgba(55,35,20,0.3)', border: 'none', cursor: 'none', padding: 0, transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s' }} />
        ))}
      </div>

      <style>{`
        @keyframes matProgress {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  )
}

// ── Numbers Section ────────────────────────────────────────
function NumbersSection() {
  const isMobile = useIsMobile()
  const stats = [
    { n: '12', unit: 'Years', label: 'of precision kitchen design' },
    { n: '180+', unit: 'Kitchens', label: 'delivered across India' },
    { n: '10', unit: 'Year', label: 'structural warranty on every kitchen' },
    { n: '8', unit: 'Cities', label: 'with dedicated showrooms' },
  ]
  const pad = isMobile ? '20px' : '56px'
  return (
    <section className="bg-bg" style={{ padding: `${isMobile ? 56 : 96}px 0`, borderTop: '1px solid #C8AD96', borderBottom: '1px solid #C8AD96' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${pad}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 0 : 0 }}>
          {stats.map((s, i) => {
            const isLastInRow = isMobile ? i % 2 === 1 : i === 3
            const isBottom = isMobile ? i >= 2 : false
            return (
              <Reveal key={s.n} delay={i * 80}>
                <div style={{
                  padding: isMobile ? '24px 16px' : `0 40px`,
                  paddingLeft: !isMobile && i === 0 ? 0 : isMobile ? 16 : 40,
                  borderRight: isLastInRow ? 'none' : '1px solid #C8AD96',
                  borderBottom: isMobile && !isBottom ? '1px solid #C8AD96' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                    <span className="text-display text-ink" style={{ fontSize: isMobile ? 'clamp(2.2rem,8vw,3rem)' : 'clamp(3rem,5vw,5.5rem)', lineHeight: 1 }}>{s.n}</span>
                    <span className="text-display text-accent" style={{ fontSize: isMobile ? '1rem' : 'clamp(1rem,1.5vw,1.4rem)', fontStyle: 'italic' }}>{s.unit}</span>
                  </div>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: isMobile ? 11 : 13, color: '#7A5840', lineHeight: 1.5 }}>{s.label}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Process Section ────────────────────────────────────────
function ProcessSection() {
  const isMobile = useIsMobile()
  const steps = [
    { n: '01', title: 'Discover',    duration: '1–2 wks',  desc: 'We visit your space and understand every constraint — structural, habitual and personal.' },
    { n: '02', title: 'Concept',     duration: '2–3 wks',  desc: 'First design directions shaped around your brief. Layouts, materials, proportions.' },
    { n: '03', title: 'Materials',   duration: '1 wk',     desc: 'Visit our library — hold stone, touch wood, test every hardware pull by hand.' },
    { n: '04', title: 'Design',      duration: '2–4 wks',  desc: 'Millimetre-precise drawings and photorealistic 3D. Every detail resolved before build.' },
    { n: '05', title: 'Manufacture', duration: '10–14 wks',desc: 'Hand-built in our workshop. Stone finished on-site. Every unit inspected before delivery.' },
    { n: '06', title: 'Reveal',      duration: '1–2 wks',  desc: 'Supervised installation. Keys handed over when the kitchen is exactly as designed.' },
  ]

  return (
    <section style={{ background: '#FAF5F0', padding: '96px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${isMobile ? '20px' : '56px'}` }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? 40 : 64, flexWrap: 'wrap', gap: 12 }}>
          <Reveal>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.26em', color: '#372314', marginBottom: 14, fontWeight: 500 }}>THE PROCESS</p>
            <h2 className="text-display text-ink" style={{ fontSize: 'clamp(2rem,4vw,4.4rem)', lineHeight: 1.04, letterSpacing: '-0.02em' }}>
              From First Sketch<br /><em>to Final Detail.</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(55,35,20,0.7)', paddingBottom: 8 }}>16–26 WEEKS END-TO-END</p>
          </Reveal>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 0 }}>
          {steps.map((s, i) => {
            const isBottom = isMobile ? i === steps.length - 1 : i >= 3
            const isRight = isMobile ? true : i % 3 === 2
            return (
              <Reveal key={s.n} delay={i * 55} direction="scale">
                <div
                  data-cursor="open"
                  className="group"
                  style={{
                    padding: '40px 36px',
                    borderTop: '1px solid #C8AD96',
                    borderRight: isRight ? 'none' : '1px solid #C8AD96',
                    borderBottom: isBottom ? 'none' : '1px solid #C8AD96',
                    position: 'relative', overflow: 'hidden',
                    cursor: 'none',
                    transition: 'background 0.4s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F5EDE3' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  {/* Step number — top right, ghost */}
                  <span style={{
                    position: 'absolute', top: 24, right: 28,
                    fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic',
                    fontSize: 64, lineHeight: 1, color: 'rgba(30,14,6,0.05)',
                    userSelect: 'none', pointerEvents: 'none',
                    transition: 'color 0.4s',
                  }}>{s.n}</span>

                  {/* Duration pill */}
                  <span style={{
                    display: 'inline-block', marginBottom: 24,
                    fontFamily: 'Manrope,sans-serif', fontSize: 9,
                    letterSpacing: '0.16em', color: '#372314',
                    border: '1px solid rgba(55,35,20,0.3)',
                    padding: '4px 10px',
                  }}>{s.duration}</span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond,serif',
                    fontSize: 'clamp(1.4rem,2vw,2rem)',
                    fontWeight: 500, lineHeight: 1.1,
                    color: '#1E0E06', marginBottom: 14,
                    letterSpacing: '-0.01em',
                  }}>{s.title}</h3>

                  {/* Rule */}
                  <div style={{ width: 32, height: 1, background: '#372314', marginBottom: 14, opacity: 0.5 }} />

                  {/* Description */}
                  <p style={{
                    fontFamily: 'Manrope,sans-serif', fontSize: 13,
                    color: '#7A5840', lineHeight: 1.75,
                  }}>{s.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}


// ── Reviews ────────────────────────────────────────────────
const REVIEWS = [
  { quote: "The team understood our brief better than we did. Our kitchen is now the soul of our home.", name: 'Ananya & Vikram Mehra', city: 'New Delhi', project: 'Warm Minimal — 2025', avatar: 'AM' },
  { quote: "Impeccable craftsmanship. Every detail — from the drawer mechanism to the marble selection — is faultless.", name: 'Siddharth Bose', city: 'Kolkata', project: 'Monolith — 2024', avatar: 'SB' },
  { quote: "We were nervous about a 20-week timeline. They delivered in 18 — and the result exceeded every expectation.", name: 'Meera & Rahul Joshi', city: 'Pune', project: 'Contemporary — 2025', avatar: 'MJ' },
  { quote: "What sets Arka apart is their complete honesty about materials and time. No surprises, only delight.", name: 'Pooja Nair', city: 'Bangalore', project: 'Signature — 2024', avatar: 'PN' },
  { quote: "Three months in and every single cabinet still opens perfectly. That says everything about their build quality.", name: 'Arjun Kapoor', city: 'Mumbai', project: 'Contemporary — 2025', avatar: 'AK' },
  { quote: "They didn't just design a kitchen — they redesigned how our family uses the space. Remarkable outcome.", name: 'Deepa & Sriram Iyer', city: 'Chennai', project: 'Warm Minimal — 2024', avatar: 'DI' },
]

function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  return (
    <section className="bg-bg" style={{ padding: '100px 0', borderTop: '1px solid #C8AD96', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', marginBottom: 40 }} className="md:!px-[56px] md:!mb-[56px]">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Reveal><p className="text-label text-accent mb-4">CLIENT REVIEWS</p></Reveal>
            <Reveal delay={80}>
              <h2 className="text-display text-ink" style={{ fontSize: 'clamp(2rem,4vw,4.5rem)', lineHeight: 1.02 }}>
                Heard From<br /><em>Our Clients.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div style={{ textAlign: 'right' }}>
              <p className="text-display text-ink" style={{ fontSize: 52, lineHeight: 1 }}>5.0</p>
              <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end', margin: '8px 0' }}>
                {[0,1,2,3,4].map(i => (
                  <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#372314"><path d="M7 0l1.8 5.4H14L9.6 8.7l1.7 5.3L7 10.7l-4.3 3.3 1.7-5.3L0 5.4h5.2z"/></svg>
                ))}
              </div>
              <p className="text-label text-ink-muted">Based on 180+ kitchens</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Infinite scroll track */}
      <div
        style={{ overflow: 'hidden', cursor: 'none' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        data-cursor="view"
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 3,
            width: 'max-content',
            animation: `reviewsScroll 38s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div key={i} style={{
              width: 380,
              flexShrink: 0,
              background: i % 3 === 0 ? '#FAF5F0' : i % 3 === 1 ? '#F5EDE3' : '#C8AD96',
              padding: '40px 40px 36px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative quote */}
              <span style={{
                position: 'absolute', top: 12, right: 24,
                fontFamily: 'Cormorant Garamond,serif', fontSize: 110,
                color: 'rgba(55,35,20,0.09)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
              }}>"</span>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                {[0,1,2,3,4].map(j => (
                  <svg key={j} width="11" height="11" viewBox="0 0 14 14" fill="#372314"><path d="M7 0l1.8 5.4H14L9.6 8.7l1.7 5.3L7 10.7l-4.3 3.3 1.7-5.3L0 5.4h5.2z"/></svg>
                ))}
              </div>

              <blockquote style={{
                fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic',
                fontSize: 16.5, color: '#1E0E06', lineHeight: 1.7,
                marginBottom: 28,
              }}>
                "{r.quote}"
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: '#1E0E06',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, color: '#FAF5F0', letterSpacing: '0.04em', fontWeight: 600 }}>{r.avatar}</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12.5, color: '#1E0E06', fontWeight: 500, marginBottom: 2 }}>{r.name}</p>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, color: '#372314', letterSpacing: '0.1em' }}>{r.project} · {r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes reviewsScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

// ── FAQ ─────────────────────────────────────────────────────
function FaqSection() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      q: "What is the typical lead time for a kitchen project?",
      a: "Our typical end-to-end timeline is 16–26 weeks, depending on the complexity of the design and material availability. This includes the design phase (3–5 weeks), manufacturing (10–16 weeks), and installation (1–2 weeks). We work to an agreed timeline from the moment you sign off on the design.",
    },
    {
      q: "Do you handle the entire project, or just manufacture the kitchen?",
      a: "We are a full-service studio. We manage design, material sourcing, manufacturing in our Gurugram workshop, logistics, and supervised installation. You have one point of contact throughout, and we coordinate directly with your architect or interior designer if needed.",
    },
    {
      q: "What warranty do you offer?",
      a: "Every Arka kitchen comes with a 10-year structural warranty covering cabinetry, hardware, and joinery. Natural stone and solid wood surfaces carry a 5-year warranty against defects in workmanship. We also offer an annual maintenance programme to keep your kitchen in perfect condition.",
    },
    {
      q: "Can you work with my existing architect or designer?",
      a: "Absolutely. We regularly collaborate with architects and interior designers across India. We provide detailed technical drawings, material samples, and 3D visualisations for design team review. We adapt to your project's coordination structure.",
    },
    {
      q: "What is the minimum project size you work with?",
      a: "We work with kitchens from 6 sqm upward. Whether it is a compact apartment kitchen or a 40 sqm culinary space, our design process and quality standards are identical. Some of our most considered work has been in smaller spaces.",
    },
    {
      q: "How do I get started?",
      a: "Book a discovery call or visit one of our showrooms. We will discuss your space, brief, and timeline — no commitment required. If you would like, bring your architect's drawings or rough floor plan. From there, we will outline a proposal within five working days.",
    },
  ]

  return (
    <section style={{ background: '#F5EDE3', padding: `${isMobile ? 60 : 100}px 0` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${isMobile ? '20px' : '56px'}` }}>
        {/* On mobile: stacked header then accordion */}
        {isMobile && (
          <div style={{ marginBottom: 36 }}>
            <p className="text-label text-accent mb-4">FREQUENTLY ASKED</p>
            <h2 className="text-display text-ink" style={{ fontSize: 'clamp(2rem,7vw,3rem)', lineHeight: 1.05, marginBottom: 20 }}>
              Questions<br /><em>Worth Asking.</em>
            </h2>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13.5, color: '#7A5840', lineHeight: 1.75 }}>
              Designing a kitchen is a considered investment. Here are the questions our clients ask most.
            </p>
          </div>
        )}
        <div style={{ display: isMobile ? 'block' : 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 96, alignItems: 'start' }}>

          {/* Left — sticky label (desktop only) */}
          {!isMobile && <div style={{ position: 'sticky', top: 120 }}>
            <Reveal><p className="text-label text-accent mb-6">FREQUENTLY ASKED</p></Reveal>
            <Reveal delay={80}>
              <h2 className="text-display text-ink" style={{ fontSize: 'clamp(2rem,3.5vw,4rem)', lineHeight: 1.05, marginBottom: 28 }}>
                Questions<br /><em>Worth Asking.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 14, color: '#7A5840', lineHeight: 1.75, marginBottom: 40, maxWidth: 300 }}>
                Designing a kitchen is a considered investment. Here are the questions our clients ask most.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, color: '#372314', letterSpacing: '0.1em' }}>
                STILL HAVE QUESTIONS?<br />
                <span style={{ color: '#1E0E06', borderBottom: '1px solid #C8AD96', paddingBottom: 2 }}>hello@arka.studio</span>
              </p>
            </Reveal>
          </div>}

          {/* Accordion */}
          <div>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ borderTop: '1px solid #C8AD96' }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    data-cursor="open"
                    style={{
                      width: '100%', textAlign: 'left', padding: '28px 0',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                      gap: 24, background: 'none', border: 'none', cursor: isMobile ? 'pointer' : 'none',
                    }}
                  >
                    <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 18, color: '#1E0E06', lineHeight: 1.4, flex: 1 }}>
                      {faq.q}
                    </span>
                    {/* Plus / minus icon */}
                    <span style={{
                      flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                      border: '1px solid #C8AD96', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.3s, border-color 0.3s', marginTop: 2,
                      background: open === i ? '#1E0E06' : 'transparent',
                      borderColor: open === i ? '#1E0E06' : '#C8AD96',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 0v10M0 5h10" stroke={open === i ? '#FAF5F0' : '#1E0E06'} strokeWidth="1"
                          style={{ transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transformOrigin: '5px 5px' }} />
                      </svg>
                    </span>
                  </button>

                  {/* Answer */}
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: open === i ? 300 : 0,
                    transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}>
                    <p style={{
                      fontFamily: 'Manrope,sans-serif', fontSize: 14.5, color: '#7A5840',
                      lineHeight: 1.8, paddingBottom: 28, maxWidth: 580,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            {/* Bottom border */}
            <div style={{ borderTop: '1px solid #C8AD96' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ──────────────────────────────────────────────
function CtaSection({ navigate }: { navigate: (p: Page) => void }) {
  const isMobile = useIsMobile()
  const sidePad = isMobile ? '20px' : '56px'
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '80px 0' : '160px 0' }} className="bg-bg">
      {/* Background image very faint */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.12,
        backgroundImage: 'url(https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1800&h=900&fit=crop&auto=format)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      {/* Diagonal accent line */}
      <div style={{ position: 'absolute', top: 0, right: '20%', width: 1, height: '100%', background: 'rgba(55,35,20,0.15)', transform: 'rotate(8deg)', transformOrigin: 'top' }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', paddingLeft: sidePad, paddingRight: sidePad, textAlign: 'center' }}>
        <Reveal>
          <p className="text-label text-accent mb-8">BEGIN YOUR JOURNEY</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-display text-ink" style={{ fontSize: 'clamp(3rem,6.5vw,7.5rem)', lineHeight: 1.0, marginBottom: 28, letterSpacing: '-0.02em' }}>
            Let's Design<br /><em>Your Kitchen.</em>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body text-ink-muted mx-auto" style={{ fontSize: 17, maxWidth: 480, lineHeight: 1.8, marginBottom: 52 }}>
            Tell us about your space. We'll turn it into something extraordinary.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            gap: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <button onClick={() => navigate('contact')} data-cursor="open"
              className="magnetic-btn text-label tracking-widest"
              style={{
                padding: '18px 44px', background: '#1E0E06', color: '#FAF5F0',
                border: '1px solid #1E0E06', fontSize: 10, transition: 'background 0.4s, color 0.4s',
                width: isMobile ? '100%' : 'auto', cursor: isMobile ? 'pointer' : 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#372314'; (e.currentTarget as HTMLElement).style.borderColor='#372314' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#1E0E06'; (e.currentTarget as HTMLElement).style.borderColor='#1E0E06' }}>
              BOOK A CONSULTATION
            </button>
            <button onClick={() => navigate('projects')} data-cursor="open"
              className="arrow-link text-label text-ink border-b border-border pb-1"
              style={{ cursor: isMobile ? 'pointer' : 'none' }}>
              EXPLORE PROJECTS
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M0 6h14M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1"/></svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

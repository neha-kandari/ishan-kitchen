import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useMediaQuery'

function Reveal({
  children, delay = 0, dir = 'up',
}: { children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right' | 'scale' }) {
  const [ref, inView] = useInView()
  const cls = dir === 'left' ? 'reveal-left' : dir === 'right' ? 'reveal-right' : dir === 'scale' ? 'reveal-scale' : 'reveal'
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`${cls} ${inView ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function matSwatch(name: string) {
  const m = name.toLowerCase()
  if (m.includes('calacatta oro')) return '#C8A430'
  if (m.includes('calacatta')) return '#DDD5C4'
  if (m.includes('nero') || m.includes('carbon') || m.includes('matte black')) return '#1A1917'
  if (m.includes('brass')) return '#B8963A'
  if (m.includes('steel')) return '#9EA4A8'
  if (m.includes('walnut')) return '#4E2E1A'
  if (m.includes('oak') || m.includes('teak')) return '#8C6235'
  if (m.includes('ivory') || m.includes('bone')) return '#EBE0C5'
  if (m.includes('travertine')) return '#C8B898'
  if (m.includes('glass')) return '#A8C8C0'
  if (m.includes('white')) return '#EDEBE4'
  return '#B8AF9F'
}

const projects = [
  {
    id: 'res-08', name: 'Residence No. 08', location: 'New Delhi', year: '2025',
    style: 'Contemporary Minimal', sqm: '18 sqm', leadTime: '22 weeks',
    materials: ['Calacatta Marble', 'Brushed Steel', 'Lacquer White'],
    brief: "A full-height marble kitchen designed around a chef's daily ritual. Integrated appliances, a 3.2m island, and skylights that shift the space from morning to evening.",
    quote: 'Every detail was designed to disappear into the architecture.',
    client: 'Priya & Arjun Sharma',
    img1: 'https://images.unsplash.com/photo-1758565811352-a439bd6f956e?w=1400&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?w=900&h=700&fit=crop&auto=format',
    img3: 'https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?w=900&h=700&fit=crop&auto=format',
    img4: 'https://images.unsplash.com/photo-1758565811430-3423f31396f9?w=1400&h=800&fit=crop&auto=format',
    highlights: [
      { title: '3.2m Waterfall Island', desc: 'A single slab of Calacatta marble wraps the island top and both sides, eliminating every visible seam.' },
      { title: 'Zenithal Skylights', desc: "Three roof lights track the sun across the marble surface, transforming the kitchen's mood from cool morning to amber dusk." },
      { title: 'Fully Concealed Appliances', desc: 'All appliances sit behind push-to-open lacquer panels, preserving the monolithic wall elevation at every angle.' },
    ],
    challenge: 'Unite a professional-grade cooking environment with the visual silence of a gallery space in a single 18 sqm volume.',
    solution: 'A continuous Calacatta marble plane from floor to ceiling dissolves the boundary between worksurface and architecture, letting the kitchen read as pure form.',
  },
  {
    id: 'res-12', name: 'Residence No. 12', location: 'Mumbai', year: '2025',
    style: 'Warm Minimal', sqm: '14 sqm', leadTime: '18 weeks',
    materials: ['Smoked Walnut', 'Bone Lacquer', 'Unlacquered Brass'],
    brief: 'Smoked walnut and bone-white lacquer against a sweeping sea view. The kitchen becomes an extension of the horizon.',
    quote: 'The kitchen disappeared. Only the view remained.',
    client: 'Kavita Menon',
    img1: 'https://images.unsplash.com/photo-1769737122085-97b1ee5ab104?w=1400&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1760072513457-651955c7074d?w=900&h=700&fit=crop&auto=format',
    img3: 'https://images.unsplash.com/photo-1758565811438-23e44c7c65fa?w=900&h=700&fit=crop&auto=format',
    img4: 'https://images.unsplash.com/photo-1722605090433-41d1183a792d?w=1400&h=800&fit=crop&auto=format',
    highlights: [
      { title: 'View-Aligned Layout', desc: 'Every primary workstation faces the sea, so the horizon becomes the focal point of daily kitchen life.' },
      { title: 'Unlacquered Brass Hardware', desc: 'Raw brass fittings are left to patina naturally, accruing a warmth that echoes the sunset palette outside.' },
      { title: 'Floor-to-Ceiling Smoked Walnut', desc: "Vertical grain walnut panels extend from plinth to cornice, anchoring the space without competing with the view." },
    ],
    challenge: "Design a 14 sqm kitchen that competes with — and ultimately defers to — one of Mumbai's most dramatic sea views.",
    solution: "A deliberate palette of warm neutrals and natural materials recedes visually, framing the panorama as the room's defining architectural element.",
  },
  {
    id: 'res-04', name: 'Residence No. 04', location: 'Gurugram', year: '2024',
    style: 'Monolith', sqm: '22 sqm', leadTime: '26 weeks',
    materials: ['Nero Marquina', 'Carbon Lacquer', 'Brushed Steel'],
    brief: 'Carbon black cabinetry, Nero Marquina marble, and brushed steel — an uncompromising statement that transforms a penthouse kitchen into sculpture.',
    quote: 'Architecture that happens to be a kitchen.',
    client: 'Rohan Kapoor',
    img1: 'https://images.unsplash.com/photo-1663811397261-916af74a9363?w=1400&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1663811396777-05505d999151?w=900&h=700&fit=crop&auto=format',
    img3: 'https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=900&h=700&fit=crop&auto=format',
    img4: 'https://images.unsplash.com/photo-1758565811145-619f5e20f196?w=1400&h=800&fit=crop&auto=format',
    highlights: [
      { title: 'Monolithic Carbon Block', desc: 'Upper and lower cabinetry are finished in identical carbon lacquer, erasing the visual break between zones.' },
      { title: 'Nero Marquina Feature Wall', desc: "A 4m continuous slab of black-and-white marble becomes the room's single dominant gesture." },
      { title: 'Recessed Brushed Steel', desc: 'All handles are replaced by a continuous brushed steel channel running the full cabinet length — tactile precision at scale.' },
    ],
    challenge: 'Deliver a kitchen for a collector of minimal art that functions as a statement sculpture without sacrificing a single square centimetre of usability.',
    solution: 'Radical material restraint — three tones, three materials, zero ornamentation — channels every visual tension into the Nero Marquina slab behind the hob.',
  },
  {
    id: 'res-16', name: 'Residence No. 16', location: 'Bangalore', year: '2026',
    style: 'Signature', sqm: '30 sqm', leadTime: '24 weeks',
    materials: ['Calacatta Oro', 'Custom Oak', 'Unlacquered Brass'],
    brief: "A Signature commission built around the owners' art collection. Custom oak joinery, unlacquered brass, and a bespoke Calacatta Oro island.",
    quote: 'The most personal kitchen we have ever designed.',
    client: 'Deepa & Sriram Iyer',
    img1: 'https://images.unsplash.com/photo-1758448755927-e5c5ae14790c?w=1400&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1671197244266-73129c97c096?w=900&h=700&fit=crop&auto=format',
    img3: 'https://images.unsplash.com/photo-1559554704-0f74b35a8718?w=900&h=700&fit=crop&auto=format',
    img4: 'https://images.unsplash.com/photo-1643949915134-73a4c880f7c7?w=1400&h=800&fit=crop&auto=format',
    highlights: [
      { title: 'Bespoke Calacatta Oro Island', desc: "A book-matched 3.6m island slab is bookmarked by the clients' own bronze sculptures, treating the worksurface as a plinth." },
      { title: 'Artisan Oak Joinery', desc: 'Each cabinet door is individually coopered by hand, giving the oak wall a subtle relief that reads differently under every light.' },
      { title: 'Gallery-Grade Lighting', desc: 'A museum lighting consultant specified each circuit, ensuring artwork and marble receive the same rigour of illumination.' },
    ],
    challenge: 'Integrate a world-class private art collection into a working family kitchen without reducing either the art or the architecture.',
    solution: 'Treating every surface as a potential plinth — island, shelving, and niches — gave the art genuine architectural context while the kitchen receded into warm, handcrafted calm.',
  },
  {
    id: 'res-21', name: 'Residence No. 21', location: 'Chennai', year: '2024',
    style: 'Classic', sqm: '16 sqm', leadTime: '20 weeks',
    materials: ['Ivory Lacquer', 'Fluted Glass', 'Reclaimed Oak'],
    brief: 'A timeless kitchen for a heritage apartment. Ivory lacquer, fluted glass, and unlacquered brass hardware with bespoke reclaimed oak floors.',
    quote: 'A kitchen that feels like it has always been there.',
    client: 'Pooja Nair',
    img1: 'https://images.unsplash.com/photo-1613545564267-b80e188a1541?w=1400&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=900&h=700&fit=crop&auto=format',
    img3: 'https://images.unsplash.com/photo-1551554781-c46200ea959d?w=900&h=700&fit=crop&auto=format',
    img4: 'https://images.unsplash.com/photo-1558346648-9757f2fa4474?w=1400&h=800&fit=crop&auto=format',
    highlights: [
      { title: 'Heritage Fluted Glass Cabinets', desc: 'Upper cabinets use period-correct fluted glass with brass astragal bars, referencing the Art Deco language of the original building.' },
      { title: 'Reclaimed Teak Floor', desc: "Boards salvaged from a demolished 1940s Chettinad home were re-laid at the original 45-degree angle, carrying genuine history underfoot." },
      { title: 'Hand-Cast Brass Hardware', desc: 'Every pull and hinge was individually cast in Jaipur to a 1930s pattern, then aged to match the apartment\'s original fittings.' },
    ],
    challenge: 'Bring a fully modern kitchen into a heritage-listed Art Deco apartment without disturbing its 1930s soul or its structural integrity.',
    solution: "Period materials and construction techniques — fluted glass, reclaimed timber, hand-cast brass — were paired with modern appliances concealed behind historically faithful cabinetry.",
  },
  {
    id: 'res-09', name: 'Residence No. 09', location: 'Pune', year: '2025',
    style: 'Contemporary', sqm: '20 sqm', leadTime: '19 weeks',
    materials: ['Roman Travertine', 'White Oak', 'Matte Black'],
    brief: 'A family kitchen designed for joy. A 4m breakfast bar, integrated charging, and custom drawer organizers — luxury that performs.',
    quote: 'Functional perfection is its own kind of luxury.',
    client: 'Meera & Rahul Joshi',
    img1: 'https://images.unsplash.com/photo-1758565811430-3423f31396f9?w=1400&h=900&fit=crop&auto=format',
    img2: 'https://images.unsplash.com/photo-1683629357935-f3f4777ddf41?w=900&h=700&fit=crop&auto=format',
    img3: 'https://images.unsplash.com/photo-1603369425250-b276f2006ec0?w=900&h=700&fit=crop&auto=format',
    img4: 'https://images.unsplash.com/photo-1682662044733-9120471befc7?w=1400&h=800&fit=crop&auto=format',
    highlights: [
      { title: '4m Social Breakfast Bar', desc: "The oversized white oak bar seats six and integrates flush wireless charging pads, making it the household's natural gathering hub." },
      { title: 'Roman Travertine Feature', desc: 'A cross-cut travertine backsplash brings organic texture to the matte black zone, preventing austerity from tipping into coldness.' },
      { title: 'Precision Drawer Architecture', desc: "Every deep drawer ships with a bespoke oak insert system — cutlery, spice, knife, and pantry zones each engineered to their exact contents." },
    ],
    challenge: 'Design a high-performance family kitchen that feels genuinely luxurious in daily use without requiring a curator to maintain its appearance.',
    solution: 'Durable natural materials — travertine, solid oak, matte black steel — were selected for their ability to look better with use, while obsessive internal organisation makes effortless tidiness the default.',
  },
]

type Project = typeof projects[0]

// ─────────────────────────────────────────────
// Projects List
// ─────────────────────────────────────────────
export default function Projects() {
  const isMobile = useIsMobile()
  const [selected, setSelected] = useState<Project | null>(null)

  if (selected) {
    const idx = projects.findIndex(p => p.id === selected.id)
    const next = projects[(idx + 1) % projects.length]
    return (
      <ProjectDetail
        project={selected}
        next={next}
        onBack={() => setSelected(null)}
        onSelect={p => { setSelected(p); window.scrollTo({ top: 0 }) }}
      />
    )
  }

  return (
    <div style={{ background: '#FAF5F0', minHeight: '100vh' }}>

      {/* ── Page header ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '100px 20px 40px' : '140px 56px 80px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 32 : 0 }}>
          <div>
            <Reveal>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.28em', color: '#372314', marginBottom: 18, fontWeight: 500 }}>
                PORTFOLIO · SELECTED WORK
              </p>
            </Reveal>
            <Reveal delay={55}>
              <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(3.2rem,7.5vw,9rem)', fontWeight: 500, lineHeight: 0.92, letterSpacing: '-0.03em', color: '#1E0E06' }}>
                Selected<br /><em>Spaces.</em>
              </h1>
            </Reveal>
          </div>
          <Reveal delay={120} dir="right">
            <div style={{ display: 'flex', gap: isMobile ? 28 : 48, paddingBottom: isMobile ? 0 : 10 }}>
              {[['06', 'COMPLETED\nPROJECTS'], ['05', 'CITIES\nACROSS INDIA'], ['22+', 'WEEKS AVG\nLEAD TIME']].map(([n, l]) => (
                <div key={l} style={{ textAlign: isMobile ? 'left' : 'right' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: isMobile ? 28 : 38, color: '#1E0E06', lineHeight: 1 }}>{n}</p>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 7.5, letterSpacing: '0.2em', color: '#372314', marginTop: 6, whiteSpace: 'pre-line', textAlign: isMobile ? 'left' : 'right' }}>{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Index table ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 20px' : '0 56px' }}>
        {/* Table header — desktop only */}
        {!isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '48px 1fr 180px 140px 64px 72px 120px 32px',
            gap: 0,
            borderTop: '1px solid #C8AD96',
            borderBottom: '1px solid #C8AD96',
            padding: '10px 0',
          }}>
            {['#', 'PROJECT', 'STYLE', 'LOCATION', 'YEAR', 'AREA', '', ''].map((h, i) => (
              <p key={i} style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.22em', color: 'rgba(55,35,20,0.55)', fontWeight: 500 }}>{h}</p>
            ))}
          </div>
        )}

        {/* Mobile: top border */}
        {isMobile && <div style={{ borderTop: '1px solid #C8AD96' }} />}

        {/* Project rows */}
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} onSelect={() => setSelected(p)} />
        ))}

        <div style={{ borderTop: '1px solid #C8AD96' }} />
      </div>

      {/* ── Featured spotlight ── */}
      <div style={{ marginTop: isMobile ? 64 : 120, background: '#1E0E06' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 0', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : 560, alignItems: 'stretch' }}>
          {/* Left: image */}
          <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 300 : 'auto' }}>
            <img
              src={projects[2].img1}
              alt={projects[2].name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'kenBrowse 20s ease-out infinite alternate' }}
            />
            {!isMobile && (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #1E0E06 100%)', pointerEvents: 'none' }} />
            )}
          </div>

          {/* Right: editorial copy */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '40px 20px' : '72px 0 72px 64px' }}>
            <Reveal>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.26em', color: '#372314', marginBottom: 28 }}>SPOTLIGHT · {projects[2].style.toUpperCase()}</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(2rem,3.5vw,4rem)', color: '#FAF5F0', lineHeight: 1.1, marginBottom: 28, letterSpacing: '-0.015em' }}>
                {projects[2].quote}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(245,237,227,0.5)', lineHeight: 1.8, marginBottom: 44, maxWidth: 380 }}>
                {projects[2].brief}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ display: 'flex', gap: isMobile ? 20 : 28, alignItems: 'center', marginBottom: 44, flexWrap: 'wrap' }}>
                {[['LOCATION', projects[2].location], ['AREA', projects[2].sqm], ['COMPLETED', projects[2].year]].map(([l, v]) => (
                  <div key={l}>
                    <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 7.5, letterSpacing: '0.2em', color: '#372314', marginBottom: 5 }}>{l}</p>
                    <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(245,237,227,0.75)' }}>{v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <button
                onClick={() => setSelected(projects[2])}
                data-cursor="open"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                  fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.22em', fontWeight: 600,
                  color: '#FAF5F0', background: 'transparent',
                  border: '1px solid rgba(245,237,227,0.25)', padding: '16px 32px',
                  cursor: 'pointer', transition: 'background 0.35s, border-color 0.35s',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(55,35,20,0.3)'; e.currentTarget.style.borderColor = 'rgba(55,35,20,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(245,237,227,0.25)' }}
              >
                VIEW THIS PROJECT
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Style categories ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '64px 20px' : '104px 56px' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: isMobile ? 32 : 56, gap: isMobile ? 16 : 0 }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.26em', color: '#372314', marginBottom: 12 }}>DESIGN LANGUAGE</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.8rem,3.2vw,3.4rem)', fontWeight: 500, color: '#1E0E06', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                Every kitchen speaks<br /><em>its own language.</em>
              </h2>
            </div>
          </Reveal>
          <Reveal dir="right">
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, color: '#372314', maxWidth: 280, textAlign: isMobile ? 'left' : 'right', lineHeight: 1.7 }}>
              From monolithic stone to warm heritage craft — each commission is shaped by the client's identity.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 3 }}>
          {[
            { label: 'Contemporary', desc: 'Clean lines, integrated technology, and precision materiality.', img: projects[0].img1, count: '2 projects' },
            { label: 'Monolith', desc: 'Single-material statements of radical restraint.', img: projects[2].img1, count: '1 project' },
            { label: 'Warm Minimal', desc: 'Natural materials and earned warmth without ornamentation.', img: projects[1].img1, count: '1 project' },
            { label: 'Classic', desc: 'Heritage craft and period references for lasting rooms.', img: projects[4].img1, count: '1 project' },
          ].map((cat, i) => (
            <Reveal key={cat.label} delay={i * 70} dir="scale">
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#111', cursor: 'default' }} data-cursor="view">
                <img src={cat.img} alt={cat.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.55)', transition: 'transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.5s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.7)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.55)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,13,11,0.9) 0%, transparent 55%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: isMobile ? 16 : 28, left: isMobile ? 14 : 24, right: isMobile ? 14 : 24 }}>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.18em', color: 'rgba(245,237,227,0.4)', marginBottom: 8 }}>{cat.count.toUpperCase()}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: isMobile ? 16 : 22, color: '#FAF5F0', lineHeight: 1.1, marginBottom: isMobile ? 0 : 8 }}>{cat.label}</h3>
                  {!isMobile && <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, color: 'rgba(245,237,227,0.5)', lineHeight: 1.6 }}>{cat.desc}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Studio numbers ── */}
      <div style={{ background: '#F5EDE3', borderTop: '1px solid #C8AD96', borderBottom: '1px solid #C8AD96' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 20px' : '72px 56px', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(5,1fr)', gap: isMobile ? '32px 0' : 0 }}>
          {[
            ['18+', 'Years of\ncraft'],
            ['6', 'Completed\nkitchens'],
            ['5', 'Cities\nacross India'],
            ['100%', 'Stone\nmaterials'],
            ['22 wks', 'Average\nlead time'],
          ].map(([n, l], i) => (
            <Reveal key={n} delay={i * 55}>
              <div style={{ padding: isMobile ? '0 0 0 16px' : '0 0 0 32px', borderLeft: isMobile ? (i % 3 === 0 ? 'none' : '1px solid #C8AD96') : (i > 0 ? '1px solid #C8AD96' : 'none') }}>
                <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: isMobile ? 'clamp(1.6rem,5vw,2.8rem)' : 'clamp(2rem,4vw,4.5rem)', color: '#1E0E06', lineHeight: 1, marginBottom: 10 }}>{n}</p>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.14em', color: '#372314', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '64px 20px' : '96px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', alignItems: 'center', gap: isMobile ? 32 : 56 }}>
        <Reveal>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.24em', color: '#372314', marginBottom: 14 }}>READY TO BEGIN?</p>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem,3.2vw,3.8rem)', color: '#1E0E06', lineHeight: 1.1, letterSpacing: '-0.015em' }}>
            Your kitchen is waiting<br />to be built.
          </p>
        </Reveal>
        <Reveal dir="right">
          <button
            data-cursor="open"
            style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.22em', fontWeight: 600, color: '#FAF5F0', background: '#1E0E06', border: 'none', padding: '18px 40px', cursor: 'pointer', transition: 'background 0.35s', display: isMobile ? 'block' : 'inline-block', width: isMobile ? '100%' : 'auto' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#372314' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1E0E06' }}
          >
            BOOK A CONSULTATION
          </button>
        </Reveal>
      </div>

      <style>{`
        @keyframes kenBrowse {
          from { transform: scale(1.05) translateX(0); }
          to   { transform: scale(1)    translateX(-2%); }
        }
      `}</style>
    </div>
  )
}

// ── Individual index row ───────────────────────────────────
function ProjectRow({ project: p, index: i, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  const isMobile = useIsMobile()
  const [hovered, setHovered] = useState(false)

  if (isMobile) {
    return (
      <button
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 16,
          width: '100%', textAlign: 'left',
          background: hovered ? '#F5EDE3' : 'transparent',
          border: 'none',
          borderBottom: '1px solid #C8AD96',
          padding: '16px 0',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
      >
        {/* Thumbnail */}
        <div style={{ width: 80, height: 56, flexShrink: 0, overflow: 'hidden', border: '1px solid #C8AD96' }}>
          <img src={p.img1} alt={p.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
          />
        </div>
        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 16, fontWeight: 500, color: '#1E0E06', lineHeight: 1.2, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {p.name}
          </p>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, color: '#372314', letterSpacing: '0.08em' }}>
            {p.style} · {p.location} · {p.year}
          </p>
        </div>
        {/* Arrow */}
        <div style={{ flexShrink: 0, opacity: hovered ? 1 : 0.35, transition: 'opacity 0.3s' }}>
          <svg width="16" height="10" viewBox="0 0 18 11" fill="none">
            <path d="M0 5.5h16M11 1l5 4.5L11 10" stroke="#372314" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr 180px 140px 64px 72px 120px 32px',
        gap: 0,
        width: '100%', textAlign: 'left',
        background: hovered ? '#F5EDE3' : 'transparent',
        border: 'none',
        borderBottom: '1px solid #C8AD96',
        padding: '0',
        cursor: 'none',
        transition: 'background 0.3s',
        alignItems: 'center',
        minHeight: 92,
      }}
    >
      {/* Number */}
      <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.14em', color: hovered ? '#372314' : 'rgba(55,35,20,0.45)', fontWeight: 600, transition: 'color 0.3s' }}>
        {String(i + 1).padStart(2, '0')}
      </p>

      {/* Name */}
      <div style={{ paddingRight: 24 }}>
        <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: hovered ? 22 : 20, fontWeight: 500, color: hovered ? '#1E0E06' : '#1E0E06', transition: 'font-size 0.35s cubic-bezier(0.16,1,0.3,1), color 0.3s', lineHeight: 1.15 }}>
          {p.name}
        </p>
        <div style={{ overflow: 'hidden', maxHeight: hovered ? 40 : 0, opacity: hovered ? 1 : 0, transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s' }}>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, color: '#372314', marginTop: 4, lineHeight: 1.5 }}>
            {p.materials.join(' · ')}
          </p>
        </div>
      </div>

      {/* Style */}
      <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, color: hovered ? '#7A5840' : '#7A5840', letterSpacing: '0.02em', transition: 'color 0.3s' }}>
        {p.style}
      </p>

      {/* Location */}
      <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, color: hovered ? '#7A5840' : '#7A5840', transition: 'color 0.3s' }}>
        {p.location}
      </p>

      {/* Year */}
      <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, color: '#372314' }}>{p.year}</p>

      {/* Area */}
      <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, color: '#372314' }}>{p.sqm}</p>

      {/* Thumbnail */}
      <div style={{ width: 100, height: 68, overflow: 'hidden', flexShrink: 0, border: hovered ? '1px solid rgba(55,35,20,0.5)' : '1px solid transparent', transition: 'border-color 0.3s' }}>
        <img src={p.img1} alt={p.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </div>

      {/* Arrow */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-6px)', transition: 'opacity 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
          <path d="M0 5.5h16M11 1l5 4.5L11 10" stroke="#372314" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}

// ─────────────────────────────────────────────
// Project Detail
// ─────────────────────────────────────────────
function ProjectDetail({ project: p, next, onBack, onSelect }: {
  project: Project; next: Project; onBack: () => void; onSelect: (p: Project) => void
}) {
  const isMobile = useIsMobile()
  const [scrollY, setScrollY] = useState(0)
  const [scrollPct, setScrollPct] = useState(0)
  const [specsReady, setSpecsReady] = useState(false)
  const specsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY)
      const total = document.body.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const el = specsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSpecsReady(true) }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const idx = projects.findIndex(proj => proj.id === p.id)

  return (
    <div style={{ background: '#FAF5F0', minHeight: '100vh' }}>

      {/* Scroll progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'rgba(55,35,20,0.12)', zIndex: 200 }}>
        <div style={{ height: '100%', background: '#372314', width: `${scrollPct * 100}%`, transition: 'width 0.08s linear' }} />
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        data-cursor="open"
        style={{
          position: 'fixed',
          top: isMobile ? 20 : 36,
          left: isMobile ? 16 : 48,
          zIndex: 100,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.22em',
          color: scrollY > 90 ? '#1E0E06' : 'rgba(245,237,227,0.8)',
          background: scrollY > 90 ? '#FAF5F0' : 'transparent',
          border: scrollY > 90 ? '1px solid #C8AD96' : 'none',
          padding: scrollY > 90 ? '9px 16px' : '0',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
          <path d="M15 5H1M6 1L1 5l5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        BACK
      </button>

      {/* ── 1. Hero ── */}
      <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: '-18% 0 -18% 0', transform: `translateY(${scrollY * 0.35}px)`, willChange: 'transform' }}>
          <img src={p.img1} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(12,11,10,0.1) 0%, transparent 40%, rgba(12,11,10,0.75) 100%)', pointerEvents: 'none' }} />

        {/* Project index */}
        <div style={{ position: 'absolute', top: isMobile ? 20 : 44, right: isMobile ? 16 : 56 }}>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(245,237,227,0.35)' }}>
            {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </div>

        {/* Bottom title */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '0 20px 40px' : '0 72px 72px' }}>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.28em', color: 'rgba(245,237,227,0.4)', marginBottom: 14 }}>
            {p.style.toUpperCase()} · {p.location.toUpperCase()} · {p.year}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(3.5rem,7.5vw,9rem)', color: '#FAF5F0', lineHeight: 0.9, letterSpacing: '-0.03em' }}>
            {p.name}
          </h1>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: isMobile ? 30 : 44, right: isMobile ? 20 : 56, opacity: scrollY < 50 ? 1 : 0, transition: 'opacity 0.4s', display: isMobile ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 48, background: 'rgba(245,237,227,0.3)', animation: 'lineGrow 1.8s ease-in-out infinite' }} />
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 7.5, letterSpacing: '0.24em', color: 'rgba(245,237,227,0.3)' }}>SCROLL</p>
        </div>
      </div>

      {/* ── 2. Specs bar ── */}
      <div ref={specsRef} style={{ background: '#1E0E06', padding: isMobile ? '32px 0' : '40px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 20px' : '0 56px', display: 'flex', justifyContent: isMobile ? 'flex-start' : 'space-between', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: isMobile ? '20px 32px' : 0 }}>
          {([
            ['STYLE', p.style],
            ['LOCATION', p.location],
            ['AREA', p.sqm],
            ['LEAD TIME', p.leadTime],
            ['YEAR', p.year],
            ['CLIENT', p.client],
          ] as [string, string][]).map(([l, v], i) => (
            <div key={l} style={{ opacity: specsReady ? 1 : 0, transform: specsReady ? 'translateY(0)' : 'translateY(14px)', transition: `opacity 0.5s ${i * 70}ms, transform 0.5s ${i * 70}ms cubic-bezier(0.16,1,0.3,1)`, minWidth: isMobile ? 'calc(50% - 16px)' : 'auto' }}>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 7.5, letterSpacing: '0.24em', color: '#372314', marginBottom: 8 }}>{l}</p>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(245,237,227,0.82)' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Brief + challenge/solution (asymmetric) ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 20px' : '96px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>
          <Reveal>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.26em', color: '#372314', marginBottom: 28 }}>THE BRIEF</p>
            <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.3rem,2.2vw,2.2rem)', color: '#1E0E06', lineHeight: 1.6, fontWeight: 400, letterSpacing: '-0.01em' }}>
              {p.brief}
            </p>
            {/* Material chips */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 44 }}>
              {p.materials.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', border: '1px solid #C8AD96', background: '#FAF5F0' }}>
                  <div style={{ width: 10, height: 10, background: matSwatch(m), flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.12em', color: '#7A5840' }}>{m}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={isMobile ? 0 : 100} dir={isMobile ? 'up' : 'right'}>
            <div style={{ paddingTop: isMobile ? 0 : 48 }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                  <div style={{ width: 24, height: 1, background: '#372314' }} />
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.26em', color: '#372314' }}>THE CHALLENGE</p>
                </div>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13.5, color: '#1E0E06', lineHeight: 1.82 }}>{p.challenge}</p>
              </div>
              <div style={{ borderTop: '1px solid #C8AD96', paddingTop: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                  <div style={{ width: 24, height: 1, background: '#372314' }} />
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.26em', color: '#372314' }}>THE SOLUTION</p>
                </div>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13.5, color: '#1E0E06', lineHeight: 1.82 }}>{p.solution}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 4. Asymmetric image block ── */}
      <div style={{ padding: isMobile ? '0' : '0 56px', maxWidth: isMobile ? '100%' : 1280, margin: '0 auto' }}>
        <Reveal dir="scale">
          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={p.img4} alt={p.name + " primary"}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                {[p.img2, p.img3].map((src, si) => (
                  <div key={si} style={{ overflow: 'hidden', aspectRatio: '3/2' }}>
                    <img src={src} alt={p.name + " detail " + (si + 1)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.9)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 4 }}>
              {/* Primary large */}
              <div style={{ overflow: 'hidden', aspectRatio: '4/3', cursor: 'none' }} data-cursor="view">
                <img src={p.img4} alt={p.name + " primary"}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
              </div>
              {/* Two stacked */}
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 4 }}>
                {[p.img2, p.img3].map((src, si) => (
                  <div key={si} style={{ overflow: 'hidden', cursor: 'none' }} data-cursor="view">
                    <img src={src} alt={p.name + " detail " + (si + 1)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.9)', transition: 'transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.5s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.9)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>

      {/* ── 5. Design highlights ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 20px' : '100px 56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? 32 : 64 }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.26em', color: '#372314', marginBottom: 12 }}>DESIGN HIGHLIGHTS</p>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(1.4rem,2.4vw,2.6rem)', color: '#1E0E06', lineHeight: 1.1 }}>
                Three decisions that<br />define the space.
              </p>
            </div>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 0 }}>
          {p.highlights.map((h, hi) => (
            <Reveal key={h.title} delay={hi * 90}>
              <div
                style={{ padding: isMobile ? '28px 0' : '44px 40px', borderLeft: (!isMobile && hi > 0) ? '1px solid #C8AD96' : 'none', borderTop: (isMobile && hi > 0) ? '1px solid #C8AD96' : 'none', position: 'relative', overflow: 'hidden', transition: 'background 0.4s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F5EDE3' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                {/* Ghost number */}
                <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 120, color: 'rgba(55,35,20,0.07)', lineHeight: 1, position: 'absolute', top: -10, right: 16, userSelect: 'none', pointerEvents: 'none' }}>
                  {String(hi + 1)}
                </p>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.22em', color: '#372314', marginBottom: 20, position: 'relative' }}>
                  {String(hi + 1).padStart(2, '0')}
                </p>
                <h4 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 22, color: '#1E0E06', lineHeight: 1.2, marginBottom: 20, position: 'relative' }}>{h.title}</h4>
                <div style={{ width: 32, height: 1, background: '#372314', marginBottom: 20 }} />
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: '#1E0E06', lineHeight: 1.82, position: 'relative' }}>{h.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── 6. Full-bleed panoramic ── */}
      <div style={{ width: '100%', aspectRatio: isMobile ? '16/9' : '21/8', overflow: 'hidden', position: 'relative', cursor: 'default' }} data-cursor="view">
        <img src={p.img1} alt={p.name + " panoramic"}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'kenDetail 16s ease-out forwards' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,13,11,0.55) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: isMobile ? 20 : 44, left: isMobile ? 20 : 72 }}>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.22em', color: 'rgba(245,237,227,0.35)', marginBottom: 10 }}>
            {p.style.toUpperCase()} · {p.location.toUpperCase()}
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(1.4rem,2.5vw,3rem)', color: 'rgba(245,237,227,0.8)', lineHeight: 1.1 }}>{p.name}</p>
        </div>
      </div>

      {/* ── 7. Materials ── */}
      <div style={{ background: '#FAF5F0', borderTop: '1px solid #C8AD96' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 56px' }}>
          <Reveal>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.26em', color: '#372314', marginBottom: 52 }}>MATERIALS SPECIFIED</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${p.materials.length},1fr)`, gap: isMobile ? 32 : 0 }}>
            {p.materials.map((m, mi) => (
              <Reveal key={m} delay={mi * 75} dir="left">
                <div style={{ padding: isMobile ? '0' : `0 44px 0 0`, borderRight: (!isMobile && mi < p.materials.length - 1) ? '1px solid #C8AD96' : 'none', marginRight: (!isMobile && mi < p.materials.length - 1) ? 44 : 0 }}>
                  <div
                    style={{ width: '100%', height: 72, background: matSwatch(m), marginBottom: 24, transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), height 0.45s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.height = '90px' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.height = '72px' }}
                  />
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.2em', color: '#372314', marginBottom: 10 }}>
                    {String(mi + 1).padStart(2, '0')}
                  </p>
                  <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 20, color: '#1E0E06', lineHeight: 1.2 }}>{m}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. Project data ── */}
      <div style={{ background: '#F5EDE3', borderTop: '1px solid #C8AD96' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80 }}>
          <div>
            <Reveal>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.26em', color: '#372314', marginBottom: 44 }}>PROJECT DATA</p>
            </Reveal>
            {([
              ['Project', p.name],
              ['Style', p.style],
              ['Location', p.location],
              ['Area', p.sqm],
              ['Lead Time', p.leadTime],
              ['Completed', p.year],
            ] as [string, string][]).map(([label, val], di) => (
              <Reveal key={label} delay={di * 40}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid #C8AD96' }}>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.24em', color: '#372314', fontWeight: 500 }}>{label.toUpperCase()}</p>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: '#1E0E06' }}>{val}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Editorial aside */}
          <Reveal delay={100} dir={isMobile ? 'up' : 'right'}>
            <div style={{ paddingTop: isMobile ? 0 : 80, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem,2.5vw,2.8rem)', color: '#1E0E06', lineHeight: 1.35, marginBottom: 28 }}>
                "{p.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 1, background: '#372314' }} />
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.22em', color: '#372314' }}>{p.client.toUpperCase()}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 9. Next project ── */}
      <div
        onClick={() => onSelect(next)}
        data-cursor="view"
        style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', height: isMobile ? 320 : 500 }}
      >
        <img src={next.img1} alt={next.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.35)', transition: 'transform 1.4s cubic-bezier(0.16,1,0.3,1), filter 0.6s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.5)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.35)' }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', pointerEvents: 'none' }}>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.36em', color: 'rgba(245,237,227,0.3)', marginBottom: 22 }}>NEXT PROJECT</p>
          <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,5.5vw,6.5rem)', color: '#FAF5F0', lineHeight: 0.92, letterSpacing: '-0.025em', marginBottom: 20 }}>
            {next.name}
          </h3>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.18em', color: 'rgba(245,237,227,0.35)', marginBottom: isMobile ? 24 : 40 }}>
            {next.style} · {next.location}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: 'rgba(245,237,227,0.65)', border: '1px solid rgba(245,237,227,0.2)', padding: '13px 32px' }}>
            <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.22em' }}>VIEW PROJECT</span>
            <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
              <path d="M0 5h15M10 1l5 4-5 4" stroke="rgba(245,237,227,0.65)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kenDetail {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }
        @keyframes lineGrow {
          0%, 100% { opacity: 0.2; transform: scaleY(0.5) translateY(-10px); }
          50%       { opacity: 0.7; transform: scaleY(1)   translateY(0); }
        }
      `}</style>
    </div>
  )
}

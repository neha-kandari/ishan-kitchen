import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../../hooks/useMediaQuery'

const BENEFITS = [
  {
    num: '01', title: 'Stain Safe',
    body: "Stone surfaces are virtually impervious to spills, oils, turmeric, and acids that permanently discolour wood or laminate. A simple wipe is all it takes — even years later.",
    detail: 'Hardness: 6–7 Mohs · Non-porous surface · No sealing required',
    img: 'https://images.unsplash.com/photo-1558346648-9757f2fa4474?w=1200&h=900&fit=crop&auto=format',
    alt: 'White marble countertop — stain resistant',
  },
  {
    num: '02', title: 'Scratch Safe',
    body: "Knives, utensils and abrasive cleaning pads leave no mark on a stone surface. The crystalline structure is far harder than steel — built for the way kitchens actually get used.",
    detail: 'Compressive strength: 100–250 MPa · No surface coating that wears off',
    img: 'https://images.unsplash.com/photo-1603369425250-b276f2006ec0?w=1200&h=900&fit=crop&auto=format',
    alt: 'Stone surface close-up — scratch proof',
  },
  {
    num: '03', title: 'High Load Bearing',
    body: "Our stone panels support continuous loads that would cause wooden shelving to bow or fail. Heavy appliances, stacked crockery, and corner storage loads are handled without compromise.",
    detail: 'Load capacity: up to 400 kg/m² · No deflection under sustained load',
    img: 'https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?w=1200&h=900&fit=crop&auto=format',
    alt: 'Kitchen island with heavy stone countertop',
  },
  {
    num: '04', title: 'Fire Safe',
    body: "Stone is fully non-combustible. It does not ignite, does not emit toxic fumes, and does not propagate flame. The safest surface to cook on — and the easiest to work near open flames.",
    detail: 'Ignition temperature: none · Zero VOC emission · Class A fire rating',
    img: 'https://images.unsplash.com/photo-1551554781-c46200ea959d?w=1200&h=900&fit=crop&auto=format',
    alt: 'Calacatta marble — fire safe material',
  },
  {
    num: '05', title: 'Water Safe',
    body: "Zero water absorption means stone cannot swell, delaminate or rot. High humidity, steam and accidental flooding leave no lasting mark — unlike MDF-based cabinetry that swells and warps.",
    detail: 'Water absorption: < 0.1% · Ideal for coastal and humid climates',
    img: 'https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=1200&h=900&fit=crop&auto=format',
    alt: 'Nero Marquina marble — water resistant',
  },
  {
    num: '06', title: 'Impact Safe',
    body: "The dense crystalline structure of natural stone absorbs and distributes impact energy across its surface. Chips are rare; fractures, rarer. A material that ages with dignity rather than showing damage.",
    detail: 'Density: 2,600–2,900 kg/m³ · No hollow-core failure risk',
    img: 'https://images.unsplash.com/photo-1758565811438-23e44c7c65fa?w=1200&h=900&fit=crop&auto=format',
    alt: 'Stone kitchen surface — impact resistant',
  },
  {
    num: '07', title: 'More Storage',
    body: "Our wall units are engineered with extra depth and full-height profiles, delivering up to 62% more usable storage than a standard kitchen. Every centimetre is designed with purpose.",
    detail: 'Depth: up to 400mm · Full-height to ceiling available · Custom internal fittings',
    img: 'https://images.unsplash.com/photo-1643949915134-73a4c880f7c7?w=1200&h=900&fit=crop&auto=format',
    alt: 'Kitchen storage with stone cabinets',
  },
]

export default function StoneBenefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState<number | null>(0)
  const isMobile = useIsMobile()

  const goTo = (idx: number) => {
    setActiveIdx(prev => {
      if (prev === idx) return prev
      setPrevIdx(prev)
      return idx
    })
  }

  useEffect(() => {
    const fn = () => {
      const el = sectionRef.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const p = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / scrollable))
      const idx = Math.min(BENEFITS.length - 1, Math.floor(p * BENEFITS.length))
      // only advance forward on scroll — scrolling up does not revert
      setActiveIdx(prev => {
        if (idx > prev) { setPrevIdx(prev); return idx }
        return prev
      })
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // ── Mobile: vertical accordion cards ──────────────────────
  if (isMobile) {
    return (
      <section style={{ background: '#FAF5F0', padding: '64px 0' }}>
        <div style={{ padding: '0 20px' }}>

          {/* Section title */}
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.26em', color: '#372314', marginBottom: 14, fontWeight: 500 }}>
            STONE ADVANTAGES
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.8rem,6vw,2.8rem)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1E0E06', marginBottom: 36 }}>
            Why Stone Makes<br /><em>All the Difference.</em>
          </h2>

          {/* Accordion cards */}
          <div style={{ borderBottom: '1px solid #C8AD96' }}>
            {BENEFITS.map((b, i) => {
              const isOpen = mobileOpen === i
              return (
                <div key={b.num} style={{ borderTop: '1px solid #C8AD96' }}>
                  <button
                    onClick={() => setMobileOpen(isOpen ? null : i)}
                    style={{
                      width: '100%', textAlign: 'left', padding: '20px 0',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none', cursor: 'pointer', gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                      <span style={{
                        fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.12em',
                        color: '#372314', flexShrink: 0, fontWeight: 600,
                      }}>
                        {b.num}
                      </span>
                      <h3 style={{
                        fontFamily: 'Cormorant Garamond,serif', fontSize: 20,
                        fontWeight: 500, color: '#1E0E06', lineHeight: 1.2,
                        margin: 0,
                      }}>
                        {b.title}
                      </h3>
                    </div>
                    {/* Chevron icon */}
                    <span style={{
                      flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                      border: '1px solid #C8AD96',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isOpen ? '#1E0E06' : 'transparent',
                      borderColor: isOpen ? '#1E0E06' : '#C8AD96',
                      transition: 'background 0.3s, border-color 0.3s',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M5 0v10M0 5h10"
                          stroke={isOpen ? '#FAF5F0' : '#1E0E06'}
                          strokeWidth="1"
                          style={{
                            transition: 'transform 0.3s',
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                            transformOrigin: '5px 5px',
                          }}
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Expandable content */}
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? 400 : 0,
                    transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}>
                    <p style={{
                      fontFamily: 'Manrope,sans-serif', fontSize: 14, color: '#7A5840',
                      lineHeight: 1.75, paddingBottom: 12,
                    }}>
                      {b.body}
                    </p>
                    <p style={{
                      fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.12em',
                      color: '#372314', paddingBottom: 20,
                    }}>
                      {b.detail}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // ── Desktop: sticky scroll layout ─────────────────────────
  const active = BENEFITS[activeIdx]
  const prev = prevIdx !== null ? BENEFITS[prevIdx] : null

  return (
    <section
      ref={sectionRef}
      style={{ height: `${BENEFITS.length * 100}vh`, background: '#FAF5F0', position: 'relative' }}
    >
      {/* ── Sticky viewport ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, maxWidth: 1280, width: '100%', margin: '0 auto', padding: '0 56px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Section title */}
          <div style={{ padding: '48px 0 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexShrink: 0 }}>
            <div>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.26em', color: '#372314', marginBottom: 12, fontWeight: 500 }}>
                STONE ADVANTAGES
              </p>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.8rem,3.2vw,3.2rem)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#1E0E06' }}>
                Why Stone Makes<br /><em>All the Difference.</em>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 64, height: 1, background: '#C8AD96', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#372314', width: `${((activeIdx + 1) / BENEFITS.length) * 100}%`, transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
              <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, color: '#372314', letterSpacing: '0.1em' }}>
                {String(activeIdx + 1).padStart(2, '0')} / {String(BENEFITS.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Two-column main area */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '380px 1fr', gap: 0, overflow: 'hidden', border: '1px solid #C8AD96' }}>

            {/* ─── LEFT: numbered list + description ─── */}
            <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #C8AD96', overflow: 'hidden' }}>
              <div style={{ flex: 1, overflowY: 'hidden' }}>
                {BENEFITS.map((b, i) => {
                  const isActive = i === activeIdx
                  return (
                    <button key={b.num} onClick={() => goTo(i)} data-cursor="open" style={{ display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', border: 'none', padding: '0 32px', height: isActive ? 'auto' : 44, minHeight: isActive ? 0 : 44, borderBottom: '1px solid #C8AD96', background: isActive ? '#F5EDE3' : 'transparent', transition: 'background 0.4s', position: 'relative', overflow: 'hidden', cursor: 'none' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: isActive ? '#372314' : 'transparent', transition: 'background 0.4s' }} />
                      <div style={{ flex: 1, padding: isActive ? '20px 0' : '0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.12em', color: '#372314', flexShrink: 0, fontWeight: 600 }}>{b.num}</span>
                          <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: isActive ? 19 : 14.5, fontWeight: isActive ? 600 : 400, color: isActive ? '#1E0E06' : 'rgba(30,14,6,0.45)', lineHeight: 1.2, transition: 'font-size 0.4s cubic-bezier(0.16,1,0.3,1), color 0.4s' }}>{b.title}</span>
                        </div>
                        <div style={{ overflow: 'hidden', maxHeight: isActive ? 180 : 0, opacity: isActive ? 1 : 0, transition: 'max-height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s 0.1s' }}>
                          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12.5, color: '#7A5840', lineHeight: 1.75, marginTop: 10, marginBottom: 10, paddingLeft: 23 }}>{b.body}</p>
                          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.12em', color: '#372314', paddingLeft: 23 }}>{b.detail}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <div style={{ padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid #C8AD96', flexShrink: 0 }}>
                <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                  <rect x="1" y="1" width="10" height="16" rx="5" stroke="rgba(55,35,20,0.5)" strokeWidth="1.2"/>
                  <circle cx="6" cy="5" r="1.5" fill="#372314"><animate attributeName="cy" values="5;10;5" dur="1.8s" repeatCount="indefinite"/></circle>
                </svg>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.14em', color: 'rgba(55,35,20,0.6)' }}>SCROLL TO EXPLORE</p>
              </div>
            </div>

            {/* ─── RIGHT: image ─── */}
            <div style={{ position: 'relative', overflow: 'hidden', background: '#111' }}>
              {prev && (
                <img key={`prev-${prevIdx}`} src={prev.img} alt={prev.alt}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: 'sbFadeOut 0.65s cubic-bezier(0.16,1,0.3,1) forwards', zIndex: 1 }} />
              )}
              <img key={`active-${activeIdx}`} src={active.img} alt={active.alt}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: 'sbFadeIn 0.65s cubic-bezier(0.16,1,0.3,1) forwards', zIndex: 2 }} />
              <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(15,13,11,0.75) 0%, transparent 55%)' }} />
              <div key={`label-${activeIdx}`} style={{ position: 'absolute', bottom: 36, left: 40, right: 40, zIndex: 4, pointerEvents: 'none', animation: 'sbSlideUp 0.5s 0.15s cubic-bezier(0.16,1,0.3,1) both' }}>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(245,237,227,0.5)', marginBottom: 8, fontWeight: 500 }}>{active.num} · STONE ADVANTAGE</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(1.4rem,2.2vw,2.4rem)', color: '#FAF5F0', lineHeight: 1.05 }}>{active.title}</h3>
              </div>
              <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {BENEFITS.map((_, i) => (
                  <div key={i} style={{ width: 3, height: i === activeIdx ? 18 : 3, borderRadius: 2, background: i === activeIdx ? '#FAF5F0' : 'rgba(245,237,227,0.3)', transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s' }} />
                ))}
              </div>
            </div>
          </div>

          {/* bottom padding spacer */}
          <div style={{ height: 48, flexShrink: 0 }} />
        </div>
      </div>

      <style>{`
        @keyframes sbFadeIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes sbFadeOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }
        @keyframes sbSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

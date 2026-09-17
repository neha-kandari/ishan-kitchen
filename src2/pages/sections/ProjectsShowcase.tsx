import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../../hooks/useMediaQuery'

type Page = 'home' | 'projects' | 'about' | 'contact'

const DURATION = 5000 // ms per project

const PROJECTS = [
  {
    id: 1, name: 'Residence No. 08', type: 'Contemporary Kitchen', location: 'New Delhi', year: '2025',
    img: 'https://images.unsplash.com/photo-1758565811352-a439bd6f956e?w=1400&h=900&fit=crop&auto=format',
    thumb: 'https://images.unsplash.com/photo-1758565811352-a439bd6f956e?w=160&h=110&fit=crop&auto=format',
  },
  {
    id: 2, name: 'Residence No. 12', type: 'Warm Minimal', location: 'Mumbai', year: '2025',
    img: 'https://images.unsplash.com/photo-1722605090433-41d1183a792d?w=1400&h=900&fit=crop&auto=format',
    thumb: 'https://images.unsplash.com/photo-1722605090433-41d1183a792d?w=160&h=110&fit=crop&auto=format',
  },
  {
    id: 3, name: 'Residence No. 04', type: 'Monolith Stone', location: 'Bangalore', year: '2024',
    img: 'https://images.unsplash.com/photo-1663811396777-05505d999151?w=1400&h=900&fit=crop&auto=format',
    thumb: 'https://images.unsplash.com/photo-1663811396777-05505d999151?w=160&h=110&fit=crop&auto=format',
  },
  {
    id: 4, name: 'Residence No. 17', type: 'Modern Classic', location: 'Pune', year: '2024',
    img: 'https://images.unsplash.com/photo-1682662044733-9120471befc7?w=1400&h=900&fit=crop&auto=format',
    thumb: 'https://images.unsplash.com/photo-1682662044733-9120471befc7?w=160&h=110&fit=crop&auto=format',
  },
  {
    id: 5, name: 'Residence No. 22', type: 'Stone Series', location: 'Chennai', year: '2024',
    img: 'https://images.unsplash.com/photo-1643949915134-73a4c880f7c7?w=1400&h=900&fit=crop&auto=format',
    thumb: 'https://images.unsplash.com/photo-1643949915134-73a4c880f7c7?w=160&h=110&fit=crop&auto=format',
  },
  {
    id: 6, name: 'Residence No. 31', type: 'Island Kitchen', location: 'Hyderabad', year: '2024',
    img: 'https://images.unsplash.com/photo-1683629357935-f3f4777ddf41?w=1400&h=900&fit=crop&auto=format',
    thumb: 'https://images.unsplash.com/photo-1683629357935-f3f4777ddf41?w=160&h=110&fit=crop&auto=format',
  },
]

export default function ProjectsShowcase({ navigate }: { navigate: (p: Page) => void }) {
  const isMobile = useIsMobile()
  const [activeIdx, setActiveIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const [tick, setTick] = useState(0) // used as key to restart progress animation
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isPaused = useRef(false)

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        setActiveIdx(prev => {
          setPrevIdx(prev)
          return (prev + 1) % PROJECTS.length
        })
        setTick(t => t + 1)
      }
    }, DURATION)
  }

  useEffect(() => {
    startCycle()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const goTo = (i: number) => {
    if (i === activeIdx) return
    setPrevIdx(activeIdx)
    setActiveIdx(i)
    setTick(t => t + 1)
    startCycle()
  }

  const active = PROJECTS[activeIdx]
  const prev = prevIdx !== null ? PROJECTS[prevIdx] : null

  // ── Shared crossfade image block ──────────────────────────
  const CrossfadeImage = ({ style }: { style?: React.CSSProperties }) => (
    <div
      style={{ position: 'relative', overflow: 'hidden', background: '#111', ...style }}
      onMouseEnter={() => { isPaused.current = true }}
      onMouseLeave={() => { isPaused.current = false }}
    >
      {prev && (
        <img
          key={`prev-${prevIdx}`}
          src={prev.img}
          alt={prev.name}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            animation: 'projectFadeOut 0.65s cubic-bezier(0.16,1,0.3,1) forwards',
            zIndex: 1,
          }}
        />
      )}
      <img
        key={`active-${activeIdx}`}
        src={active.img}
        alt={active.name}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          animation: 'projectFadeIn 0.65s cubic-bezier(0.16,1,0.3,1) forwards',
          zIndex: 2,
        }}
      />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(55,35,20,0.72) 0%, rgba(55,35,20,0.0) 55%)',
      }} />
      {/* Bottom label + CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: isMobile ? '0 16px 20px' : '0 36px 32px',
      }}>
        <div>
          <p style={{
            fontFamily: 'Manrope, sans-serif', fontSize: 9, letterSpacing: '0.22em',
            color: 'rgba(245,237,227,0.55)', fontWeight: 500, marginBottom: 8,
            textTransform: 'uppercase',
          }}>
            {active.type} · {active.location}
          </p>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '1.15rem' : 'clamp(1.4rem,2.5vw,2.2rem)',
            fontWeight: 500, color: '#FAF5F0', lineHeight: 1.1,
          }}>
            {active.name}
          </h3>
        </div>
        {!isMobile && (
          <button
            onClick={() => navigate('projects')}
            data-cursor="open"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'Manrope, sans-serif', fontSize: 10, letterSpacing: '0.18em', fontWeight: 600,
              color: '#FAF5F0', background: 'rgba(245,237,227,0.12)',
              border: '1px solid rgba(245,237,227,0.3)',
              backdropFilter: 'blur(10px)',
              padding: '13px 24px', cursor: 'none',
              transition: 'background 0.3s, border-color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(55,35,20,0.4)'; e.currentTarget.style.borderColor = 'rgba(55,35,20,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,237,227,0.12)'; e.currentTarget.style.borderColor = 'rgba(245,237,227,0.3)' }}
          >
            VIEW PROJECT
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
              <path d="M0 4.5h12M8 1l4 3.5L8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )

  const styles = `
    @keyframes projectFadeIn {
      from { opacity: 0; transform: scale(1.03); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes projectFadeOut {
      from { opacity: 1; transform: scale(1); }
      to   { opacity: 0; transform: scale(0.98); }
    }
    @keyframes projectFill {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    .thumb-strip::-webkit-scrollbar { display: none; }
    .thumb-strip { -ms-overflow-style: none; scrollbar-width: none; }
  `

  // ── MOBILE LAYOUT ─────────────────────────────────────────
  if (isMobile) {
    return (
      <section style={{ background: '#FAF5F0', padding: '64px 0 0', borderBottom: '1px solid #C8AD96' }}>
        <div style={{ padding: '0 20px' }}>

          {/* Section header — stacked */}
          <div style={{ marginBottom: 28 }}>
            <p style={{
              fontFamily: 'Manrope, sans-serif', fontSize: 9.5,
              letterSpacing: '0.26em', color: '#372314', marginBottom: 12, fontWeight: 500,
            }}>
              OUR PROJECTS
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.9rem,8vw,2.8rem)',
              fontWeight: 500, lineHeight: 1.05,
              letterSpacing: '-0.02em', color: '#1E0E06',
              marginBottom: 20,
            }}>
              Kitchens that speak<br /><em>for themselves.</em>
            </h2>
            <button
              onClick={() => navigate('projects')}
              data-cursor="open"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: 'Manrope, sans-serif', fontSize: 10, letterSpacing: '0.2em', fontWeight: 600,
                color: '#FAF5F0', background: '#1E0E06',
                border: '1px solid #1E0E06', padding: '12px 24px',
                cursor: 'pointer',
              }}
            >
              VIEW ALL PROJECTS
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Full-width image */}
        <CrossfadeImage style={{ height: 'max(56vw, 280px)', width: '100%' }} />

        {/* Horizontal-scroll thumbnail strip */}
        <div
          className="thumb-strip"
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            gap: 12,
            padding: '12px 20px 24px',
            background: '#FAF5F0',
          }}
        >
          {PROJECTS.map((p, i) => {
            const isActive = i === activeIdx
            return (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                style={{
                  flexShrink: 0,
                  width: 'calc(50% - 6px)',
                  scrollSnapAlign: 'start',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {/* Progress fill */}
                {isActive && (
                  <div
                    key={`fill-${tick}`}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(55,35,20,0.13)',
                      transformOrigin: 'left center',
                      animation: `projectFill ${DURATION}ms linear forwards`,
                      zIndex: 0,
                    }}
                  />
                )}
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: 8,
                  padding: '10px 10px 10px',
                  background: isActive ? 'rgba(55,35,20,0.08)' : '#F5EDE3',
                  border: isActive ? '1px solid rgba(55,35,20,0.35)' : '1px solid #C8AD96',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
                    <img
                      src={p.thumb}
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 13, fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#1E0E06' : '#1E0E06',
                      lineHeight: 1.2, marginBottom: 2,
                    }}>
                      {p.name}
                    </p>
                    <p style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 9, letterSpacing: '0.1em', fontWeight: 400,
                      color: isActive ? '#372314' : 'rgba(122,88,64,0.6)',
                    }}>
                      {p.type.toUpperCase()} · {p.year}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <style>{styles}</style>
      </section>
    )
  }

  // ── DESKTOP LAYOUT (unchanged) ────────────────────────────
  return (
    <section style={{ background: '#FAF5F0', padding: '96px 0', borderBottom: '1px solid #C8AD96' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>

        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52 }}>
          <div>
            <p style={{
              fontFamily: 'Manrope, sans-serif', fontSize: 9.5,
              letterSpacing: '0.26em', color: '#372314', marginBottom: 14, fontWeight: 500,
            }}>
              OUR PROJECTS
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem,4vw,4.4rem)',
              fontWeight: 500, lineHeight: 1.05,
              letterSpacing: '-0.02em', color: '#1E0E06',
            }}>
              Kitchens that speak<br /><em>for themselves.</em>
            </h2>
          </div>
          <button
            onClick={() => navigate('projects')}
            data-cursor="open"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'Manrope, sans-serif', fontSize: 10, letterSpacing: '0.2em', fontWeight: 600,
              color: '#FAF5F0', background: '#1E0E06',
              border: '1px solid #1E0E06', padding: '14px 28px',
              cursor: 'none', transition: 'background 0.35s, color 0.35s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#372314'; e.currentTarget.style.borderColor = '#372314' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1E0E06'; e.currentTarget.style.borderColor = '#1E0E06' }}
          >
            VIEW ALL PROJECTS
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 3, alignItems: 'stretch' }}>

          {/* LEFT — large active image */}
          <CrossfadeImage style={{ minHeight: 540 }} />

          {/* RIGHT — project list */}
          <div style={{ display: 'flex', flexDirection: 'column', background: '#F5EDE3' }}>
            {PROJECTS.map((p, i) => {
              const isActive = i === activeIdx
              return (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  data-cursor="open"
                  style={{
                    flex: 1, cursor: 'none', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '0 20px',
                    position: 'relative', overflow: 'hidden',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: i < PROJECTS.length - 1 ? '1px solid #C8AD96' : 'none',
                    transition: 'none',
                  }}
                >
                  {/* Progress fill */}
                  {isActive && (
                    <div
                      key={`fill-${tick}`}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(55,35,20,0.13)',
                        transformOrigin: 'left center',
                        animation: `projectFill ${DURATION}ms linear forwards`,
                        zIndex: 0,
                      }}
                    />
                  )}
                  {/* Static hover tint */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isActive ? 'transparent' : 'rgba(55,35,20,0)',
                    transition: 'background 0.3s',
                    zIndex: 0,
                  }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(55,35,20,0.07)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  />

                  {/* Thumbnail */}
                  <div style={{
                    flexShrink: 0, position: 'relative', zIndex: 1,
                    width: 60, height: 44, overflow: 'hidden',
                    border: isActive ? '1px solid rgba(55,35,20,0.5)' : '1px solid transparent',
                    transition: 'border-color 0.4s',
                  }}>
                    <img src={p.thumb} alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                    <p style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 14.5, fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#1E0E06' : '#1E0E06',
                      lineHeight: 1.2, marginBottom: 3,
                      transition: 'color 0.4s, font-weight 0.4s',
                    }}>
                      {p.name}
                    </p>
                    <p style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 10, letterSpacing: '0.1em', fontWeight: 400,
                      color: isActive ? '#372314' : 'rgba(122,88,64,0.6)',
                      transition: 'color 0.4s',
                    }}>
                      {p.type.toUpperCase()} · {p.year}
                    </p>
                  </div>

                  {/* Active indicator */}
                  <div style={{
                    flexShrink: 0, position: 'relative', zIndex: 1,
                    width: 5, height: 5, borderRadius: '50%',
                    background: isActive ? '#372314' : 'transparent',
                    border: isActive ? 'none' : '1px solid rgba(55,35,20,0.3)',
                    transition: 'background 0.4s',
                  }} />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style>{styles}</style>
    </section>
  )
}

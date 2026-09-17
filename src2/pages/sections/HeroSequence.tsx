import { useEffect, useRef, useState } from 'react'

// ── All four images are from the same kitchen shoot by @___atmos
// Same space · same camera · same light — pure scroll-driven crossfade
const IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1758565811352-a439bd6f956e?w=1920&h=1080&fit=crop&auto=format',
    alt: 'Luxury kitchen — wide establishing shot',
  },
  {
    url: 'https://images.unsplash.com/photo-1758565811430-3423f31396f9?w=1920&h=1080&fit=crop&auto=format',
    alt: 'Luxury kitchen — dining perspective',
  },
  {
    url: 'https://images.unsplash.com/photo-1758565811438-23e44c7c65fa?w=1920&h=1080&fit=crop&auto=format',
    alt: 'Luxury kitchen — island close detail',
  },
  {
    url: 'https://images.unsplash.com/photo-1758565811145-619f5e20f196?w=1920&h=1080&fit=crop&auto=format',
    alt: 'Luxury kitchen — bar stools and appliances',
  },
]

const FADE_W    = 0.06   // crossfade overlap as fraction of total progress
const SCALE_MAX = 1.065  // scale each image reaches by the time it exits

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
function ease(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t }

// each image owns a 0.25 band of total progress
function imgOpacity(p: number, i: number) {
  const s = i * 0.25, e = (i + 1) * 0.25
  if (p < s - FADE_W || p > e + FADE_W) return 0
  if (p < s) return ease(clamp((p - (s - FADE_W)) / FADE_W, 0, 1))
  if (p > e) return ease(clamp(1 - (p - e) / FADE_W, 0, 1))
  return 1
}

// 0-1 through its own quarter
function imgProgress(p: number, i: number) { return clamp((p - i * 0.25) / 0.25, 0, 1) }

type Page = 'home' | 'projects' | 'about' | 'contact'

export default function HeroSequence({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded]     = useState(false)

  // measure scroll
  useEffect(() => {
    const fn = () => {
      const el = wrapRef.current; if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      const p = scrollable > 0 ? clamp(-el.getBoundingClientRect().top / scrollable, 0, 1) : 0
      setProgress(p)
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // trigger intro text entry
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 120); return () => clearTimeout(t) }, [])

  // intro text fades out as soon as user starts scrolling
  const introOp  = clamp(1 - progress * 14, 0, 1)
  const introY   = progress * -40

  // CTA appears only at the end
  const ctaOp = clamp((progress - 0.84) / 0.08, 0, 1)

  return (
    <div ref={wrapRef} style={{ height: '400vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0c0b0a' }}>

        {/* ── Image layers ─────────────────────────────── */}
        {IMAGES.map((img, i) => {
          const op  = imgOpacity(progress, i)
          const sp  = imgProgress(progress, i)
          // slow continuous push-in per image
          const sc  = 1 + sp * (SCALE_MAX - 1)
          // very slight lateral drift alternates L/R per image
          const tx  = (sp - 0.4) * (i % 2 === 0 ? 0.6 : -0.6)
          // micro-blur only at mid-crossfade
          const blr = op > 0.05 && op < 0.95 ? (1 - Math.abs(op - 0.5) * 2.2) * 2.4 : 0

          return (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              opacity: op,
              zIndex: Math.round(op * 4) + i,
              willChange: 'opacity',
            }}>
              <img
                src={img.url}
                alt={img.alt}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${sc}) translateX(${tx}%)`,
                  transformOrigin: 'center center',
                  filter: blr > 0.05 ? `blur(${blr}px)` : 'none',
                  display: 'block',
                  willChange: 'transform',
                }}
              />
            </div>
          )
        })}

        {/* ── Vignette ─────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
          background: 'linear-gradient(160deg, rgba(12,11,10,0.22) 0%, rgba(12,11,10,0.0) 45%, rgba(12,11,10,0.55) 100%)',
        }} />

        {/* ── Brand mark — top centre ───────────────────── */}
        <div style={{
          position: 'absolute', top: 88, left: 0, right: 0, zIndex: 30,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          opacity: clamp(1 - progress * 10, 0, 1),
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 32, fontWeight: 300,
            fontStyle: 'italic', letterSpacing: '0.04em', color: 'rgba(245,237,227,0.9)',
            lineHeight: 1,           }}>
            Arka
          </span>
          <p style={{
            fontFamily: 'Manrope, sans-serif', fontSize: 8,
            letterSpacing: '0.32em', color: 'rgba(245,237,227,0.38)',
            fontWeight: 500,
          }}>
            KITCHEN STUDIO
          </p>
        </div>

        {/* ── Intro text — load-in, scroll-out ─────────── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 30,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          textAlign: 'center',
          opacity: introOp,
          transform: `translateY(${introY}px)`,
          pointerEvents: introOp < 0.05 ? 'none' : 'all',
        }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(3.2rem, 7vw, 8rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            color: '#FAF5F0',
            marginBottom: 24,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)',
          }}>
            Your kitchen is<br />waiting to be built.
          </h1>
          <p style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 13,
            letterSpacing: '0.18em',
            color: 'rgba(245,237,227,0.45)',
            fontWeight: 400,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.2s 0.3s cubic-bezier(0.16,1,0.3,1), transform 1.2s 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}>
            SCROLL TO SEE IT COME TO LIFE
          </p>

          {/* Animated scroll chevrons */}
          <div style={{
            marginTop: 40,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1s 0.6s',
          }}>
            {[0, 1, 2].map(i => (
              <svg key={i} width="16" height="9" viewBox="0 0 16 9" fill="none"
                style={{
                  animation: `chevronPulse 1.8s ${i * 0.22}s ease-in-out infinite`,
                  opacity: 0,
                }}>
                <path d="M1 1l7 7 7-7" stroke="rgba(245,237,227,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ))}
          </div>
        </div>


        {/* ── CTA — final stage only ───────────────────── */}
        <div style={{
          position: 'absolute', bottom: 64, left: 72, zIndex: 40,
          opacity: ctaOp, pointerEvents: ctaOp > 0.1 ? 'all' : 'none',
          transform: `translateY(${(1 - ctaOp) * 16}px)`,
          transition: 'none',
        }}>
          <button
            onClick={() => onNavigate('projects')}
            data-cursor="open"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 14,
              fontFamily: 'Manrope, sans-serif', fontSize: 10,
              letterSpacing: '0.22em', fontWeight: 600,
              color: '#FAF5F0',
              background: 'rgba(245,237,227,0.08)',
              border: '1px solid rgba(245,237,227,0.25)',
              backdropFilter: 'blur(12px)',
              padding: '16px 32px',
              cursor: 'none',
              transition: 'background 0.35s, border-color 0.35s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(55,35,20,0.32)'
              e.currentTarget.style.borderColor = 'rgba(55,35,20,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(245,237,227,0.08)'
              e.currentTarget.style.borderColor = 'rgba(245,237,227,0.25)'
            }}
          >
            EXPLORE OUR KITCHENS
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
              <path d="M0 5.5h16M11 1l5 4.5L11 10" stroke="#FAF5F0" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes chevronPulse {
          0%   { opacity: 0; transform: translateY(-4px); }
          50%  { opacity: 0.6; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(4px); }
        }
      `}</style>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { useIsMobile } from '../../hooks/useMediaQuery'

function Reveal({ children, delay = 0, dir = 'up' }: {
  children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right'
}) {
  const [ref, inView] = useInView()
  const cls = dir === 'left' ? 'reveal-left' : dir === 'right' ? 'reveal-right' : 'reveal'
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}
      className={`${cls} ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const WORDS = ['Precision.', 'Material.', 'Craft.', 'You.']

const FACTS = [
  { n: '12+', label: 'Years of kitchen design' },
  { n: '180+', label: 'Kitchens delivered' },
  { n: '10 yr', label: 'Structural warranty' },
]

const PILLARS = [
  { icon: '◎', text: 'Designed around your life — not a catalogue.' },
  { icon: '◈', text: 'Stone and solid joinery. Built to outlast trends.' },
  { icon: '◐', text: 'One team. From sketch to final installation.' },
]

export default function BrandStatement() {
  const [wordIdx, setWordIdx] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const imgRef = useRef<HTMLDivElement>(null)
  const [imgY, setImgY] = useState(0)
  const isMobile = useIsMobile()

  // Cycling word
  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setWordVisible(true) }, 320)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  // Subtle parallax on the right image
  useEffect(() => {
    const fn = () => {
      const el = imgRef.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      setImgY(center * 0.08)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const sidePad = isMobile ? '20px' : '56px'

  return (
    <section style={{ background: '#FAF5F0', padding: isMobile ? '48px 0' : '72px 0', borderBottom: '1px solid #C8AD96' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${sidePad}` }}>

        {/* ── Two-column grid (stacks to one on mobile) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
          gap: isMobile ? 32 : 64,
          alignItems: 'center',
        }}>

          {/* LEFT — big statement */}
          <div>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 28 }}>
                <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 22, fontWeight: 300, fontStyle: 'italic', color: '#372314', lineHeight: 1, }}>Arka</span>
                <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.26em', color: 'rgba(55,35,20,0.6)', fontWeight: 500 }}>KITCHEN STUDIO</span>
              </div>
            </Reveal>
            <Reveal delay={50}>
              <h2 style={{
                fontFamily: 'Cormorant Garamond,serif',
                fontSize: 'clamp(2.2rem,4.5vw,5.2rem)',
                fontWeight: 500, lineHeight: 1.06,
                color: '#1E0E06', letterSpacing: '-0.02em',
                marginBottom: 36,
              }}>
                Every kitchen<br />starts with{' '}
                <span style={{
                  fontStyle: 'italic', color: '#372314',
                  display: 'inline-block',
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  minWidth: '2ch',
                }}>
                  {WORDS[wordIdx]}
                </span>
              </h2>
            </Reveal>

            {/* Pillars — compact horizontal pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PILLARS.map((p, i) => (
                <Reveal key={i} delay={100 + i * 60}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 13, color: '#372314', flexShrink: 0, lineHeight: 1 }}>{p.icon}</span>
                    <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: '#7A5840', lineHeight: 1.5 }}>{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT — image + stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

            {/* Image with parallax */}
            <Reveal dir="right">
              <div ref={imgRef} style={{ overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1758565811438-23e44c7c65fa?w=900&h=680&fit=crop&auto=format"
                  alt="Luxury kitchen interior"
                  style={{
                    width: '100%', height: '110%', objectFit: 'cover',
                    display: 'block',
                    transform: `translateY(${imgY}px)`,
                    willChange: 'transform',
                  }}
                />
              </div>
            </Reveal>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', background: '#F5EDE3' }}>
              {FACTS.map((f, i) => (
                <Reveal key={f.n} delay={i * 60}>
                  <div style={{
                    padding: isMobile ? '14px 12px' : '20px 20px',
                    borderRight: i < 2 ? '1px solid #C8AD96' : 'none',
                  }}>
                    <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: isMobile ? 18 : 22, color: '#1E0E06', lineHeight: 1, marginBottom: 5 }}>{f.n}</p>
                    <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, color: '#372314', letterSpacing: '0.1em', lineHeight: 1.4 }}>{f.label.toUpperCase()}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

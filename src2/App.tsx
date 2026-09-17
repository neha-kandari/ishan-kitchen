import { useState, useEffect, useRef, useCallback } from 'react'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import PriceCalculator from './pages/PriceCalculator'

type Page = 'home' | 'projects' | 'about' | 'contact' | 'calculator'

// ── Custom Cursor ──────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const posRef  = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current)  { dotRef.current.style.left  = `${e.clientX}px`; dotRef.current.style.top  = `${e.clientY}px` }
      if (labelRef.current){ labelRef.current.style.left = `${e.clientX}px`; labelRef.current.style.top = `${e.clientY}px` }
    }
    const animate = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) { ringRef.current.style.left = `${ringPos.current.x}px`; ringRef.current.style.top = `${ringPos.current.y}px` }
      rafRef.current = requestAnimationFrame(animate)
    }
    const handleHover = (e: MouseEvent) => {
      const label = (e.target as Element).closest('[data-cursor]')?.getAttribute('data-cursor') ?? null
      document.body.classList.toggle('cursor-expanded', label === 'view' || label === 'open')
      if (labelRef.current) labelRef.current.textContent = label === 'view' ? 'VIEW' : label === 'open' ? 'OPEN' : ''
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseover', handleHover, { passive: true })
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleHover)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" />
    </>
  )
}

// ── Nav ────────────────────────────────────────────────────
function Nav({ current, navigate, menuOpen, setMenuOpen }: {
  current: Page; navigate: (p: Page) => void
  menuOpen: boolean; setMenuOpen: (v: boolean) => void
}) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isHero = current === 'home' && !scrolled
  const fg     = isHero ? '#FAF5F0' : '#1E0E06'
  const fgMuted = isHero ? 'rgba(245,237,227,0.6)' : '#7A5840'

  const links: { label: string; page: Page }[] = [
    { label: 'Home',       page: 'home' },
    { label: 'Projects',   page: 'projects' },
    { label: 'Our Story',  page: 'about' },
    { label: 'Price Calculator', page: 'calculator' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled || current !== 'home' ? 'nav-scrolled' : ''}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex flex-col items-start gap-1" data-cursor="open">
            <span className="transition-colors duration-500"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 26, fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.04em', color: fg, lineHeight: 1, }}>
              Arka
            </span>
            <span className="transition-colors duration-500"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: 7, letterSpacing: '0.28em', color: fgMuted, fontWeight: 500 }}>
              KITCHEN STUDIO
            </span>
          </button>

          {/* Centre links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(({ label, page }) => (
              <button key={page} onClick={() => navigate(page)} data-cursor="open"
                className="relative text-body transition-colors duration-400"
                style={{ fontSize: 13, color: current === page ? fg : fgMuted }}>
                {label}
                {current === page && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: isHero ? '#FAF5F0' : '#1E0E06' }} />
                )}
              </button>
            ))}
          </div>

          {/* Right CTA */}
          <button onClick={() => navigate('contact')} data-cursor="open"
            className="hidden md:flex magnetic-btn px-5 py-2.5 text-label tracking-[0.12em] transition-all duration-500"
            style={{
              fontSize: 9,
              background: isHero ? 'rgba(245,237,227,0.1)' : '#1E0E06',
              color: '#FAF5F0',
              border: isHero ? '1px solid rgba(245,237,227,0.28)' : '1px solid #1E0E06',
              backdropFilter: isHero ? 'blur(8px)' : 'none',
            }}>
            BOOK CONSULTATION
          </button>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu" data-cursor="open">
            {[0,1,2].map(i => (
              <span key={i} className="block w-5 h-px transition-all duration-300"
                style={{
                  background: fg,
                  transform: menuOpen
                    ? i===0 ? 'rotate(45deg) translate(4px,4px)' : i===1 ? 'scaleX(0)' : 'rotate(-45deg) translate(4px,-4px)'
                    : 'none'
                }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="fixed inset-0 z-40 bg-bg-warm flex flex-col justify-center px-10 md:hidden"
        style={{
          clipPath: menuOpen ? 'inset(0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 0.7s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}>
        <div className="flex flex-col gap-6 mb-12">
          {links.map(({ label, page }, i) => (
            <button key={page} onClick={() => { navigate(page); setMenuOpen(false) }}
              className="text-display text-ink text-left transition-opacity duration-300"
              style={{ fontSize: 'clamp(2rem,8vw,3.5rem)', opacity: menuOpen ? 1 : 0, transitionDelay: `${i*60}ms` }}>
              {label}
            </button>
          ))}
        </div>
        <button onClick={() => { navigate('contact'); setMenuOpen(false) }}
          className="px-8 py-4 bg-ink text-bg-warm text-label tracking-widest w-fit"
          style={{ opacity: menuOpen ? 1 : 0, transition: 'opacity 0.4s', transitionDelay: '240ms' }}>
          BOOK A CONSULTATION
        </button>
      </div>
    </>
  )
}

// ── Footer ─────────────────────────────────────────────────
function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer style={{ background: '#1E0E06' }}>
      <div className="max-w-screen-xl mx-auto px-5 md:px-16 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-16 pb-16 mb-12 border-b" style={{ borderColor: 'rgba(245,237,227,0.08)' }}>
          <div>
            <button onClick={() => navigate('home')} className="flex flex-col gap-1.5 mb-8" data-cursor="open">
              <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 32, fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.04em', color: '#FAF5F0', lineHeight: 1, }}>Arka</span>
              <span style={{ fontSize: 7.5, letterSpacing: '0.28em', color: 'rgba(245,237,227,0.35)', fontFamily: 'Manrope,sans-serif', fontWeight: 500 }}>KITCHEN STUDIO</span>
            </button>
            <p style={{ color: 'rgba(245,237,227,0.45)', fontSize: 15, fontFamily: 'Manrope,sans-serif', lineHeight: 1.7, maxWidth: 300 }}>
              Designing kitchens around<br />the way you live.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-2">
            {([['Home','home'],['Projects','projects'],['Our Story','about'],['Contact','contact'],['Price Calculator','calculator']] as [string,Page][]).map(([l,p]) => (
              <button key={p} onClick={() => navigate(p)} data-cursor="open"
                className="link-underline text-left w-fit"
                style={{ fontFamily: 'Manrope,sans-serif', fontSize: 14, color: 'rgba(245,237,227,0.5)' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-6">
            {['Instagram','Pinterest','LinkedIn'].map(s => (
              <a key={s} href="#" data-cursor="open" className="link-underline text-label"
                style={{ color: 'rgba(245,237,227,0.35)', letterSpacing: '0.12em' }}>
                {s.toUpperCase()}
              </a>
            ))}
          </div>
          <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, color: 'rgba(245,237,227,0.25)', letterSpacing: '0.06em' }}>
            © 2026 ARKA KITCHEN STUDIO
          </span>
        </div>
      </div>
    </footer>
  )
}

// ── Page transition ────────────────────────────────────────
function PageTransition({ visible }: { visible: boolean }) {
  return (
    <div className="page-transition" style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none', transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
      <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 28, fontWeight: 300, fontStyle: 'italic', color: '#372314', opacity: 0.7, }}>Arka</span>
    </div>
  )
}

// ── App ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]           = useState<Page>('home')
  const [transitioning, setTrans] = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  const navigate = useCallback((to: Page) => {
    if (to === page) return
    setTrans(true)
    setTimeout(() => { setPage(to); window.scrollTo({ top: 0, behavior: 'instant' }); setTrans(false) }, 400)
  }, [page])

  const pages: Record<Page, React.ReactNode> = {
    home:       <Home navigate={navigate} />,
    projects:   <Projects />,
    about:      <About />,
    contact:    <Contact />,
    calculator: <PriceCalculator />,
  }

  return (
    <>
      <Cursor />
      <PageTransition visible={transitioning} />
      <Nav current={page} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>{pages[page]}</main>
      <Footer navigate={navigate} />
    </>
  )
}

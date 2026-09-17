import { useState, useEffect, useRef } from 'react'
import { useIsMobile } from '../hooks/useMediaQuery'

// ── Data ──────────────────────────────────────────────────
const LAYOUTS = [
  {
    id: 'l-shaped', label: 'L-Shaped', bestFor: 'Corner spaces',
    desc: 'Two adjacent walls working together.',
    walls: ['A', 'B'] as string[], defaults: { A: 8, B: 6 },
  },
  {
    id: 'straight', label: 'Straight', bestFor: 'Narrow kitchens',
    desc: 'One long wall — minimal, clean, open.',
    walls: ['A'] as string[], defaults: { A: 10, B: 0 },
  },
  {
    id: 'u-shaped', label: 'U-Shaped', bestFor: 'Maximum storage',
    desc: 'Three walls of counter, storage, and workflow.',
    walls: ['A', 'B'] as string[], defaults: { A: 8, B: 6 },
  },
  {
    id: 'parallel', label: 'Parallel', bestFor: 'Galley kitchens',
    desc: 'Two facing walls — efficient and elegant.',
    walls: ['A', 'B'] as string[], defaults: { A: 10, B: 10 },
  },
]

const PACKAGES = [
  {
    id: 'stone', label: 'Stone Series', tier: '₹₹',
    sub: 'Essential luxury',
    tagline: 'Handcrafted stone surfaces with refined finishes — the ideal first step into premium.',
    rate: 45000,
    features: ['Natural stone countertops', 'Soft-close cabinetry', 'Standard hardware', 'Integrated lighting'],
    img: 'https://images.unsplash.com/photo-1558346648-9757f2fa4474?w=800&h=560&fit=crop&auto=format',
    color: '#7A5840',
    recommended: false,
  },
  {
    id: 'signature', label: 'Signature', tier: '₹₹₹',
    sub: 'Most popular',
    tagline: 'Our best-selling collection — premium stone, bespoke bronze hardware, full-height joinery.',
    rate: 75000,
    features: ['Premium stone selection', 'Custom bronze hardware', 'Full-height cabinetry', 'Island option', 'Recessed lighting'],
    img: 'https://images.unsplash.com/photo-1769737122085-97b1ee5ab104?w=800&h=560&fit=crop&auto=format',
    color: '#372314',
    recommended: true,
  },
  {
    id: 'bespoke', label: 'Bespoke', tier: '₹₹₹₹',
    sub: 'Collector grade',
    tagline: 'Museum-grade specification — rare stone, fully custom joinery, gallery lighting, white-glove delivery.',
    rate: 125000,
    features: ['Rare stone curation', 'Bespoke joinery', 'Gallery-grade lighting', 'Full-scope design', 'White-glove install'],
    img: 'https://images.unsplash.com/photo-1663811397261-916af74a9363?w=800&h=560&fit=crop&auto=format',
    color: '#7A5840',
    recommended: false,
  },
]

const CITIES = ['New Delhi', 'Mumbai', 'Bangalore', 'Gurugram', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Other']
const STEPS = ['Kitchen Layout', 'Measurements', 'Select Package', 'Get Estimate']

function calcRft(id: string, d: { A: number; B: number }) {
  if (id === 'straight') return d.A
  if (id === 'u-shaped') return 2 * d.A + d.B
  return d.A + d.B
}

// ── SVG diagrams ───────────────────────────────────────────
function LayoutDiagram({ id, dims, dark }: { id: string; dims?: { A: number; B: number }; dark?: boolean }) {
  const stroke = dark ? '#C4AA8A' : '#372314'
  const fill = dark ? 'rgba(196,170,138,0.12)' : 'rgba(55,35,20,0.09)'
  const tc = dark ? '#C4AA8A' : '#372314'
  const dim = (v: number) => dims ? `${v} ft` : ''

  if (id === 'l-shaped') return (
    <svg viewBox="0 0 140 120" fill="none" style={{ width: '100%', height: '100%' }}>
      <rect x="12" y="12" width="116" height="34" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      <rect x="12" y="12" width="36" height="96" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      {dims && <>
        <line x1="48" y1="4" x2="128" y2="4" stroke={tc} strokeWidth="0.8" strokeDasharray="3,3" />
        <text x="88" y="10" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">{dim(dims.B)}</text>
        <line x1="4" y1="46" x2="4" y2="108" stroke={tc} strokeWidth="0.8" strokeDasharray="3,3" />
        <text x="0" y="81" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600" transform="rotate(-90, 0, 81)">{dim(dims.A)}</text>
      </>}
    </svg>
  )
  if (id === 'straight') return (
    <svg viewBox="0 0 140 120" fill="none" style={{ width: '100%', height: '100%' }}>
      <rect x="12" y="44" width="116" height="32" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      {dims && <>
        <line x1="12" y1="34" x2="128" y2="34" stroke={tc} strokeWidth="0.8" strokeDasharray="3,3" />
        <text x="70" y="30" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">{dim(dims.A)}</text>
      </>}
    </svg>
  )
  if (id === 'u-shaped') return (
    <svg viewBox="0 0 140 120" fill="none" style={{ width: '100%', height: '100%' }}>
      <rect x="12" y="12" width="116" height="28" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      <rect x="12" y="12" width="28" height="96" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      <rect x="100" y="12" width="28" height="96" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      {dims && <>
        <text x="70" y="30" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">{dim(dims.B)}</text>
        <text x="26" y="75" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600" transform="rotate(-90, 26, 75)">{dim(dims.A)}</text>
      </>}
    </svg>
  )
  return (
    <svg viewBox="0 0 140 120" fill="none" style={{ width: '100%', height: '100%' }}>
      <rect x="12" y="22" width="116" height="28" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      <rect x="12" y="70" width="116" height="28" fill={fill} stroke={stroke} strokeWidth="1.8" rx="1" />
      {dims && <>
        <text x="70" y="39" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">{dim(dims.A)}</text>
        <text x="70" y="87" textAnchor="middle" fill={tc} fontSize="9.5" fontFamily="Manrope,sans-serif" fontWeight="600">{dim(dims.B)}</text>
      </>}
    </svg>
  )
}

// ── Price counter animation ────────────────────────────────
function PriceCount({ target }: { target: number }) {
  const [v, setV] = useState(target)
  const prev = useRef(target)
  useEffect(() => {
    if (prev.current === target) return
    const s = prev.current, d = target - s, t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 900, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setV(Math.round(s + d * e))
      if (p < 1) requestAnimationFrame(tick)
      else prev.current = target
    }
    requestAnimationFrame(tick)
  }, [target])
  return <>{(v / 100000).toFixed(1)}L</>
}

// ── Step transition ────────────────────────────────────────
function StepPanel({ children, k, dir }: { children: React.ReactNode; k: number; dir: 'f' | 'b' }) {
  const [v, setV] = useState(false)
  useEffect(() => { const t = setTimeout(() => setV(true), 40); return () => clearTimeout(t) }, [k])
  return (
    <div style={{
      opacity: v ? 1 : 0,
      transform: v ? 'none' : `translateX(${dir === 'f' ? 32 : -32}px)`,
      transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {children}
    </div>
  )
}

// ── Floating label input ───────────────────────────────────
function FloatInput({ label, type = 'text', placeholder, value, onChange }: {
  label: string; type?: string; placeholder: string; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0
  return (
    <div style={{ position: 'relative', paddingTop: 16 }}>
      <label style={{
        position: 'absolute', left: 0,
        top: lifted ? 0 : 28,
        fontFamily: 'Manrope,sans-serif',
        fontSize: lifted ? 8 : 12.5,
        letterSpacing: lifted ? '0.22em' : '0.04em',
        color: lifted ? '#372314' : '#B0A898',
        fontWeight: lifted ? 600 : 400,
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }}>
        {label}
      </label>
      <input
        type={type} placeholder={focused ? placeholder : ''}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          borderBottom: `1px solid ${focused ? '#1E0E06' : '#C8AD96'}`,
          padding: '10px 0 10px', marginTop: 8,
          fontFamily: 'Manrope,sans-serif', fontSize: 14, color: '#1E0E06',
          outline: 'none', transition: 'border-color 0.25s',
        }}
      />
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────
export default function PriceCalculator() {
  const isMobile = useIsMobile()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState<'f' | 'b'>('f')
  const [layoutId, setLayoutId] = useState('l-shaped')
  const [dims, setDims] = useState({ A: 8, B: 6 })
  const [pkgId, setPkgId] = useState('signature')
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' })
  const [submitted, setSubmitted] = useState(false)

  const layout = LAYOUTS.find(l => l.id === layoutId)!
  const pkg = PACKAGES.find(p => p.id === pkgId)!
  const rft = calcRft(layoutId, dims)
  const low = Math.round(rft * pkg.rate * 0.9 / 100000) * 100000
  const high = Math.round(rft * pkg.rate * 1.14 / 100000) * 100000

  const go = (n: number) => { setDir(n > step ? 'f' : 'b'); setStep(n) }
  useEffect(() => { setDims({ A: layout.defaults.A, B: layout.defaults.B }) }, [layoutId])

  const canGo = step < 3 || (form.name.trim() && form.email.trim() && form.phone.trim() && form.city)

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100vh', paddingBottom: 100 }}>

      {/* ── Stepper (inline, clears fixed nav) ── */}
      <div style={{ background: '#FAF5F0', borderBottom: '1px solid #EAE4DA', paddingTop: 72 }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '12px 20px 12px' : '20px 40px 18px', display: 'flex', alignItems: 'center' }}>
          {STEPS.map((label, i) => {
            const done = i < step, active = i === step
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <button
                  onClick={() => done ? go(i) : undefined}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: done ? 'pointer' : 'default', padding: 0 }}
                >
                  <div style={{
                    width: isMobile ? 28 : 34,
                    height: isMobile ? 28 : 34,
                    borderRadius: '50%', flexShrink: 0,
                    background: done ? '#372314' : active ? '#1E0E06' : '#C8AD96',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.4s, transform 0.3s',
                    transform: active ? 'scale(1.08)' : 'scale(1)',
                    boxShadow: active ? '0 0 0 4px rgba(30,14,6,0.08)' : 'none',
                  }}>
                    {done
                      ? <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4.5l3.5 3.5L11 1" stroke="#FAF5F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, fontWeight: 600, color: active ? '#FAF5F0' : '#B0A898' }}>{i + 1}</span>
                    }
                  </div>
                  {!isMobile && (
                    <span style={{
                      fontFamily: 'Manrope,sans-serif', fontSize: 7.5, letterSpacing: '0.16em', whiteSpace: 'nowrap',
                      color: active ? '#1E0E06' : done ? '#372314' : '#C0B8AD',
                      fontWeight: active ? 700 : 400, transition: 'color 0.3s',
                    }}>
                      {label.toUpperCase()}
                    </span>
                  )}
                </button>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: '#C8AD96', margin: '0 10px', marginBottom: isMobile ? 0 : 26, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: '#372314', transformOrigin: 'left', transform: `scaleX(${i < step ? 1 : 0})`, transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                )}
              </div>
            )
          })}
          {!isMobile && (
            <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.14em', color: '#372314', marginLeft: 20, flexShrink: 0, paddingBottom: 20 }}>
              {step + 1}/{STEPS.length}
            </span>
          )}
        </div>
      </div>

      {/* ── Page heading ── */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '40px 20px 0' : '52px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.28em', color: '#372314', marginBottom: 12, fontWeight: 600 }}>
              KITCHEN PRICE CALCULATOR
            </p>
            <h1 style={{ fontFamily: 'Cormorant Garamond,serif', fontWeight: 400, fontSize: 'clamp(2.6rem,5vw,5.2rem)', lineHeight: 0.98, letterSpacing: '-0.03em', color: '#1E0E06' }}>
              {step === 0 && <>Select your<br /><em style={{ fontWeight: 500 }}>kitchen layout.</em></>}
              {step === 1 && <>Confirm your<br /><em style={{ fontWeight: 500 }}>dimensions.</em></>}
              {step === 2 && <>Choose your<br /><em style={{ fontWeight: 500 }}>collection.</em></>}
              {step === 3 && !submitted && <>One last step —<br /><em style={{ fontWeight: 500 }}>get your estimate.</em></>}
              {step === 3 && submitted && <>Your estimate<br /><em style={{ fontWeight: 500 }}>is ready.</em></>}
            </h1>
          </div>
          {/* Breadcrumb selection recap — hidden on mobile */}
          {step > 0 && !isMobile && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingBottom: 8 }}>
              {[
                step > 0 ? layout.label : null,
                step > 1 ? `${rft} rft` : null,
                step > 2 ? pkg.label : null,
              ].filter(Boolean).map((v, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {i > 0 && <span style={{ color: '#C8AD96', fontSize: 10 }}>›</span>}
                  <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10, color: '#372314', letterSpacing: '0.1em', background: '#FAF5F0', border: '1px solid #C8AD96', padding: '4px 10px' }}>{v}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Step content ── */}
        <StepPanel k={step} dir={dir}>

          {/* ─── STEP 0: Layout ─── */}
          {step === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
              {LAYOUTS.map(l => {
                const sel = layoutId === l.id
                return (
                  <button
                    key={l.id}
                    onClick={() => setLayoutId(l.id)}
                    style={{
                      background: sel ? '#1E0E06' : '#FAF5F0',
                      border: `2px solid ${sel ? '#1E0E06' : '#C8AD96'}`,
                      padding: isMobile ? '20px 16px 16px' : '32px 28px 26px',
                      cursor: 'pointer', textAlign: 'left', position: 'relative',
                      transition: 'all 0.32s cubic-bezier(0.16,1,0.3,1)',
                      boxShadow: sel ? '0 8px 40px rgba(30,14,6,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = '#372314'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' } }}
                    onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = '#C8AD96'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)' } }}
                  >
                    {/* "Best for" badge */}
                    <div style={{
                      position: 'absolute', top: 18, right: 18,
                      fontFamily: 'Manrope,sans-serif', fontSize: 7.5, letterSpacing: '0.16em',
                      background: sel ? 'rgba(221,211,197,0.15)' : '#F5EDE3',
                      color: sel ? 'rgba(245,237,227,0.7)' : '#372314',
                      padding: '4px 10px',
                      transition: 'all 0.3s',
                    }}>
                      {l.bestFor.toUpperCase()}
                    </div>

                    {/* Diagram */}
                    <div style={{ height: isMobile ? 72 : 110, marginBottom: 22 }}>
                      <LayoutDiagram id={l.id} dark={sel} />
                    </div>

                    {/* Label */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 22, color: sel ? '#FAF5F0' : '#1E0E06', fontStyle: sel ? 'italic' : 'normal', transition: 'all 0.3s' }}>
                        {l.label}
                      </p>
                      {sel && (
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#372314', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'popIn 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
                          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                            <path d="M1 3.5l2.5 2.5L9 1" stroke="#FAF5F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12, color: sel ? 'rgba(245,237,227,0.5)' : '#7A5840', lineHeight: 1.55, transition: 'color 0.3s' }}>
                      {l.desc}
                    </p>
                  </button>
                )
              })}
            </div>
          )}

          {/* ─── STEP 1: Measurements ─── */}
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 0, border: '1px solid #C8AD96', overflow: 'hidden' }}>
              {/* Dark diagram panel */}
              <div style={{ background: '#1E0E06', padding: isMobile ? '24px' : '44px 40px', display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.22em', color: '#372314', marginBottom: 8, fontWeight: 600 }}>
                  {layout.label.toUpperCase()}
                </p>
                <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(245,237,227,0.6)', marginBottom: 36 }}>
                  {layout.desc}
                </p>
                <div style={{ flex: 1, minHeight: isMobile ? 160 : 200 }}>
                  <LayoutDiagram id={layoutId} dark dims={dims} />
                </div>
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(245,237,227,0.08)' }}>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.2em', color: '#372314', marginBottom: 10 }}>TOTAL RUNNING FEET</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: isMobile ? 36 : 48, color: '#FAF5F0', lineHeight: 1 }}>{rft}</span>
                    <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: '#372314', letterSpacing: '0.1em' }}>rft</span>
                  </div>
                </div>
              </div>

              {/* Light sliders panel */}
              <div style={{ background: '#FAF5F0', padding: isMobile ? '24px 20px' : '44px 40px' }}>
                <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.22em', color: '#372314', marginBottom: 32, fontWeight: 600 }}>
                  DRAG TO ADJUST WALL LENGTHS
                </p>

                {layout.walls.includes('A') && (
                  <div style={{ marginBottom: 44 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                      <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.2em', color: '#372314', fontWeight: 600 }}>WALL A</span>
                      <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 26, color: '#1E0E06', lineHeight: 1 }}>{dims.A} <span style={{ fontSize: 13, color: '#372314' }}>ft</span></span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input type="range" min={4} max={20} step={0.5} value={dims.A}
                        onChange={e => setDims(d => ({ ...d, A: +e.target.value }))}
                        style={{ width: '100%', cursor: 'pointer', accentColor: '#372314' }}
                        className="calc-slider"
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                        <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, color: '#5C3820' }}>4 ft</span>
                        <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, color: '#5C3820' }}>20 ft</span>
                      </div>
                    </div>
                  </div>
                )}

                {layout.walls.includes('B') && (
                  <div style={{ marginBottom: 44 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                      <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.2em', color: '#372314', fontWeight: 600 }}>WALL B</span>
                      <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 26, color: '#1E0E06', lineHeight: 1 }}>{dims.B} <span style={{ fontSize: 13, color: '#372314' }}>ft</span></span>
                    </div>
                    <input type="range" min={4} max={20} step={0.5} value={dims.B}
                      onChange={e => setDims(d => ({ ...d, B: +e.target.value }))}
                      style={{ width: '100%', cursor: 'pointer', accentColor: '#372314' }}
                      className="calc-slider"
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                      <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, color: '#5C3820' }}>4 ft</span>
                      <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, color: '#5C3820' }}>20 ft</span>
                    </div>
                  </div>
                )}

                <div style={{ background: '#F5EDE3', borderLeft: '2px solid #372314', padding: '14px 18px', marginTop: 8 }}>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 10.5, color: '#6B6157', lineHeight: 1.65 }}>
                    Standard sizes pre-filled. Drag to match your actual space.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Packages ─── */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PACKAGES.map(p => {
                const sel = pkgId === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setPkgId(p.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
                      background: sel ? '#1E0E06' : '#FAF5F0',
                      border: `2px solid ${sel ? '#1E0E06' : '#C8AD96'}`,
                      cursor: 'pointer', textAlign: 'left', overflow: 'hidden',
                      boxShadow: sel ? '0 8px 40px rgba(30,14,6,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
                      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseEnter={e => { if (!sel) { e.currentTarget.style.borderColor = '#372314'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.09)' } }}
                    onMouseLeave={e => { if (!sel) { e.currentTarget.style.borderColor = '#C8AD96'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)' } }}
                  >
                    {/* Image with overlay */}
                    <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 200 : 196, width: isMobile ? '100%' : undefined }}>
                      <img src={p.img} alt={p.label}
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                          filter: sel ? 'brightness(0.75) saturate(0.9)' : 'brightness(0.88) saturate(0.75)',
                          transform: sel ? 'scale(1.06)' : 'scale(1)',
                          transition: 'filter 0.5s, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      />
                      {/* Tier overlay */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,14,6,0.55) 0%, transparent 65%)' }} />
                      <div style={{ position: 'absolute', top: 20, left: 20 }}>
                        <p style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 22, color: '#FAF5F0', lineHeight: 1, marginBottom: 4 }}>{p.label}</p>
                        <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(245,237,227,0.6)' }}>{p.tier}</p>
                      </div>
                      {p.recommended && (
                        <div style={{ position: 'absolute', bottom: 16, left: 20, fontFamily: 'Manrope,sans-serif', fontSize: 7.5, letterSpacing: '0.18em', background: '#372314', color: '#FAF5F0', padding: '4px 10px' }}>
                          MOST POPULAR
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: isMobile ? '18px 18px' : '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                          {/* Selection indicator */}
                          <div style={{
                            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                            background: sel ? '#372314' : 'transparent',
                            border: `1.5px solid ${sel ? '#372314' : '#5C3820'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.28s',
                          }}>
                            {sel && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#FAF5F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.16em', color: sel ? 'rgba(245,237,227,0.5)' : '#372314', fontWeight: 500, transition: 'color 0.3s' }}>
                            {p.sub.toUpperCase()}
                          </p>
                        </div>
                        <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 12.5, color: sel ? 'rgba(245,237,227,0.55)' : '#7A7168', lineHeight: 1.75, marginBottom: 18, marginLeft: 34 }}>
                          {p.tagline}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px 0', marginLeft: 34 }}>
                          {p.features.map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '50%' }}>
                              <div style={{ width: 4, height: 4, borderRadius: '50%', background: sel ? '#372314' : '#C0B8AD', flexShrink: 0 }} />
                              <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 11, color: sel ? 'rgba(245,237,227,0.45)' : '#7A7168' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${sel ? 'rgba(245,237,227,0.1)' : '#EDE8E0'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                          <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.16em', color: sel ? 'rgba(245,237,227,0.3)' : '#B0A898' }}>FROM</span>
                          <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 21, color: sel ? '#C4AA8A' : '#1E0E06' }}>₹{(p.rate / 1000).toFixed(0)}K</span>
                          <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, color: sel ? 'rgba(245,237,227,0.3)' : '#B0A898', letterSpacing: '0.1em' }}>/ RUNNING FOOT</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                          <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.14em', color: sel ? 'rgba(245,237,227,0.3)' : '#B0A898' }}>YOUR EST.</span>
                          <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 17, color: sel ? '#C4AA8A' : '#372314' }}>
                            ₹{((rft * p.rate * 0.9) / 100000).toFixed(1)}L+
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* ─── STEP 3: Form / Success ─── */}
          {step === 3 && (
            submitted ? (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 52, alignItems: 'start' }}>
                <div>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1.5px solid #372314', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, animation: 'popIn 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path d="M1 8l7 7L21 1" stroke="#372314" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.28em', color: '#372314', marginBottom: 16 }}>ESTIMATE SENT</p>
                  <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(2rem,4vw,4rem)', color: '#1E0E06', lineHeight: 1.0, marginBottom: 24 }}>
                    Thank you,<br />{form.name.split(' ')[0] || 'there'}.
                  </h2>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13.5, color: '#7A7168', lineHeight: 1.85, marginBottom: 40 }}>
                    Your estimate has been sent to <strong style={{ color: '#1E0E06' }}>{form.email}</strong>. A designer will follow up within 24 hours.
                  </p>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, letterSpacing: '0.2em', color: '#372314', marginBottom: 12 }}>ESTIMATE RANGE</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,5vw,5rem)', color: '#1E0E06', lineHeight: 1 }}>₹<PriceCount target={low} /></span>
                    <span style={{ color: '#372314', fontSize: 18 }}>—</span>
                    <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,5vw,5rem)', color: '#1E0E06', lineHeight: 1 }}>₹<PriceCount target={high} /></span>
                  </div>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, color: '#372314', letterSpacing: '0.14em' }}>
                    {rft} RFT · {layout.label.toUpperCase()} · {pkg.label.toUpperCase()}
                  </p>
                </div>
                <SummaryPanel layout={layout} dims={dims} rft={rft} pkg={pkg} low={low} high={high} city={form.city} />
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <FloatInput label="YOUR NAME" placeholder="Priya Sharma" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                    <FloatInput label="PHONE" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
                  </div>
                  <FloatInput label="EMAIL ADDRESS" type="email" placeholder="priya@example.com" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                  <div style={{ position: 'relative', paddingTop: 16 }}>
                    <label style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.22em', color: '#372314', fontWeight: 600, display: 'block', marginBottom: 10 }}>CITY</label>
                    <select value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #C8AD96', padding: '10px 0', fontFamily: 'Manrope,sans-serif', fontSize: 14, color: form.city ? '#1E0E06' : '#B0A898', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                      <option value="" disabled>Select your city…</option>
                      {CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9.5, color: '#B0A898', lineHeight: 1.8 }}>
                    First consultation is complimentary. Our designers will be in touch within 24 hours.
                  </p>
                </div>
                <SummaryPanel layout={layout} dims={dims} rft={rft} pkg={pkg} low={low} high={high} city={form.city} />
              </div>
            )
          )}
        </StepPanel>
      </div>

      {/* ── Sticky bottom bar ── */}
      {!(step === 3 && submitted) && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#FAF5F0', borderTop: '1px solid #C8AD96', boxShadow: '0 -4px 28px rgba(0,0,0,0.08)' }}>
          <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '14px 20px' : '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            {/* Left: live recap — hidden on mobile */}
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {step >= 2 && (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.18em', color: '#B0A898' }}>ESTIMATE</span>
                    <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 20, color: '#1E0E06' }}>
                      ₹{(low / 100000).toFixed(1)}L – ₹{(high / 100000).toFixed(1)}L
                    </span>
                  </div>
                )}
                {step >= 1 && step < 2 && (
                  <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 9, letterSpacing: '0.16em', color: '#372314' }}>
                    {layout.label.toUpperCase()} · {rft} RFT
                  </span>
                )}
              </div>
            )}

            {/* Right: navigation — full width on mobile */}
            <div style={{ display: 'flex', gap: 10, width: isMobile ? '100%' : 'auto' }}>
              {step > 0 && (
                <button onClick={() => go(step - 1)}
                  style={{
                    fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.2em', color: '#372314',
                    background: 'transparent', border: '1px solid #C8AD96', padding: '13px 22px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#372314' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#C8AD96' }}
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M11 4H1M4 1L1 4l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  BACK
                </button>
              )}
              <button
                onClick={() => { if (!canGo) return; if (step === 3) setSubmitted(true); else go(step + 1) }}
                style={{
                  fontFamily: 'Manrope,sans-serif', fontSize: 9.5, letterSpacing: '0.22em', fontWeight: 600,
                  color: '#FAF5F0', background: canGo ? '#1E0E06' : '#C8C0B8',
                  border: 'none', padding: '14px 40px', cursor: canGo ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.3s',
                  flex: isMobile ? 1 : 'none', justifyContent: isMobile ? 'center' : 'flex-start',
                }}
                onMouseEnter={e => { if (canGo) e.currentTarget.style.background = '#372314' }}
                onMouseLeave={e => { if (canGo) e.currentTarget.style.background = '#1E0E06' }}
              >
                {step === 3 ? 'GET MY ESTIMATE' : 'CONTINUE'}
                <svg width="15" height="9" viewBox="0 0 15 9" fill="none">
                  <path d="M0 4.5h13M9 1l4 3.5L9 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        .calc-slider { -webkit-appearance: none; height: 2px; border-radius: 2px; background: linear-gradient(to right, #372314, #372314); }
        .calc-slider::-webkit-slider-runnable-track { height: 2px; border-radius: 2px; background: #C8AD96; }
        .calc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #1E0E06; border: 3px solid #FAF5F0; box-shadow: 0 0 0 1.5px #372314; margin-top: -10px; cursor: pointer; transition: transform 0.15s; }
        .calc-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .calc-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #1E0E06; border: 3px solid #FAF5F0; box-shadow: 0 0 0 1.5px #372314; cursor: pointer; }
      `}</style>
    </div>
  )
}

// ── Summary panel (shared by form + success) ─────────────
function SummaryPanel({ layout, dims, rft, pkg, low, high, city }: {
  layout: typeof LAYOUTS[number]; dims: { A: number; B: number };
  rft: number; pkg: typeof PACKAGES[number]; low: number; high: number; city: string
}) {
  return (
    <div style={{ background: '#1E0E06', overflow: 'hidden' }}>
      <div style={{ padding: '8px 24px', background: '#372314' }}>
        <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.24em', color: '#FAF5F0', fontWeight: 600 }}>
          YOUR SELECTION SUMMARY
        </p>
      </div>
      <div style={{ padding: '28px 28px' }}>
        {[
          ['LAYOUT', layout.label],
          ['WALL A', dims.A + ' ft'],
          ...(layout.walls.includes('B') ? [['WALL B', dims.B + ' ft']] as [string,string][] : []),
          ['RUNNING FEET', rft + ' rft'],
          ['COLLECTION', pkg.label],
          ...(city ? [['CITY', city]] as [string,string][] : []),
        ].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(245,237,227,0.06)' }}>
            <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.2em', color: '#372314' }}>{l}</span>
            <span style={{ fontFamily: 'Manrope,sans-serif', fontSize: 13, color: 'rgba(245,237,227,0.72)' }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop: 24, paddingTop: 22, borderTop: '1px solid rgba(221,211,197,0.15)' }}>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8, letterSpacing: '0.2em', color: '#372314', marginBottom: 12 }}>INDICATIVE RANGE</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 26, color: '#FAF5F0' }}>
              ₹{(low / 100000).toFixed(1)}L
            </span>
            <span style={{ color: '#372314', fontSize: 14 }}>—</span>
            <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 26, color: '#FAF5F0' }}>
              ₹{(high / 100000).toFixed(1)}L
            </span>
          </div>
          <p style={{ fontFamily: 'Manrope,sans-serif', fontSize: 8.5, color: 'rgba(245,237,227,0.25)', letterSpacing: '0.08em' }}>
            Final quote subject to site visit
          </p>
        </div>
      </div>
    </div>
  )
}

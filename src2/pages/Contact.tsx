import { useState } from 'react'
import { useInView } from '../hooks/useInView'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

interface FormData {
  name: string; phone: string; email: string; city: string;
  kitchenType: string; space: string; budget: string; message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', city: '',
    kitchenType: '', space: '', budget: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = `w-full bg-transparent border-b border-border py-3 text-ink text-body placeholder-ink-muted/50 focus:outline-none focus:border-accent transition-colors duration-300`

  return (
    <div className="bg-bg min-h-screen">
      {/* Split layout */}
      <div className="grid md:grid-cols-2 min-h-screen">

        {/* Left — Image side */}
        <div className="relative hidden md:block" style={{ minHeight: '100vh' }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1758565811352-a439bd6f956e?w=1200&h=1600&fit=crop&auto=format"
              alt="Luxury kitchen design consultation"
              className="w-full h-full object-cover hero-img-ken"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/30 to-dark/65" />
            <div className="absolute inset-0 flex flex-col justify-end p-16 text-bg-warm">
              <p className="text-label mb-4" style={{ color: '#372314' }}>ARKA KITCHEN STUDIO</p>
              <h2 className="text-display mb-6" style={{ fontSize: 'clamp(2rem,3vw,3.5rem)', lineHeight: 1.05 }}>
                Let's Build Something<br /><em>Beautiful Together.</em>
              </h2>
              <p className="text-body mb-10 opacity-60" style={{ maxWidth: '360px' }}>
                The first consultation is complimentary. We'd love to hear about your space.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { l: 'STUDIO', v: '41 Design District, Sector 44, Gurugram' },
                  { l: 'PHONE', v: '+91 98765 43210' },
                  { l: 'EMAIL', v: 'hello@arka.studio' }
                ].map(({ l, v }) => (
                  <div key={l}>
                    <p className="text-label mb-1 opacity-50">{l}</p>
                    <p className="text-body text-sm opacity-80">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form side */}
        <div className="bg-bg-warm px-5 md:px-16 pt-28 md:pt-40 pb-20">
          {submitted ? (
            <div className="h-full flex flex-col justify-center min-h-[60vh]">
              <Reveal>
                <div className="w-12 h-px bg-accent mb-10" />
                <p className="text-label text-accent mb-6">THANK YOU</p>
                <h2 className="text-display text-ink mb-6" style={{ fontSize: 'clamp(2rem,3vw,3rem)' }}>
                  We've received<br /><em>your enquiry.</em>
                </h2>
                <p className="text-body text-ink-muted" style={{ maxWidth: '400px' }}>
                  One of our designers will be in touch within 48 hours to arrange your first consultation.
                </p>
              </Reveal>
            </div>
          ) : (
            <>
              <Reveal>
                <p className="text-label text-accent mb-4">BOOK A CONSULTATION</p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-display text-ink mb-12" style={{ fontSize: 'clamp(2rem,3.5vw,3.5rem)' }}>
                  Tell Us About<br /><em>Your Space.</em>
                </h1>
              </Reveal>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <Reveal delay={120}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-label text-ink-muted mb-2 block" style={{ fontSize: '9px' }}>YOUR NAME</label>
                      <input
                        type="text" required placeholder="Priya Sharma"
                        className={inputClass}
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-label text-ink-muted mb-2 block" style={{ fontSize: '9px' }}>PHONE</label>
                      <input
                        type="tel" placeholder="+91 98765 43210"
                        className={inputClass}
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={160}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-label text-ink-muted mb-2 block" style={{ fontSize: '9px' }}>EMAIL ADDRESS</label>
                      <input
                        type="email" required placeholder="priya@example.com"
                        className={inputClass}
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-label text-ink-muted mb-2 block" style={{ fontSize: '9px' }}>CITY</label>
                      <input
                        type="text" placeholder="New Delhi"
                        className={inputClass}
                        value={form.city}
                        onChange={e => setForm({ ...form, city: e.target.value })}
                      />
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div>
                    <label className="text-label text-ink-muted mb-2 block" style={{ fontSize: '9px' }}>KITCHEN TYPE</label>
                    <select
                      className={inputClass + ' cursor-pointer'}
                      value={form.kitchenType}
                      onChange={e => setForm({ ...form, kitchenType: e.target.value })}
                    >
                      <option value="" disabled>Select a collection...</option>
                      <option>Monolith</option>
                      <option>Warm Minimal</option>
                      <option>Contemporary</option>
                      <option>Signature (Bespoke)</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </Reveal>

                <Reveal delay={240}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-label text-ink-muted mb-2 block" style={{ fontSize: '9px' }}>APPROX. SPACE (SQM)</label>
                      <input
                        type="text" placeholder="e.g. 12–18 sqm"
                        className={inputClass}
                        value={form.space}
                        onChange={e => setForm({ ...form, space: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-label text-ink-muted mb-2 block" style={{ fontSize: '9px' }}>BUDGET RANGE</label>
                      <select
                        className={inputClass + ' cursor-pointer'}
                        value={form.budget}
                        onChange={e => setForm({ ...form, budget: e.target.value })}
                      >
                        <option value="" disabled>Select range...</option>
                        <option>₹10L – ₹20L</option>
                        <option>₹20L – ₹40L</option>
                        <option>₹40L – ₹75L</option>
                        <option>₹75L+</option>
                        <option>Prefer to discuss</option>
                      </select>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={280}>
                  <div>
                    <label className="text-label text-ink-muted mb-2 block" style={{ fontSize: '9px' }}>TELL US MORE</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your space, your vision, or anything you'd like us to know..."
                      className={inputClass + ' resize-none'}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                </Reveal>

                <Reveal delay={320}>
                  <button
                    type="submit"
                    className="magnetic-btn w-full py-5 text-label tracking-widest text-bg-warm bg-ink hover:bg-accent transition-colors duration-500"
                    data-cursor="open"
                  >
                    BOOK MY CONSULTATION
                  </button>
                </Reveal>

                <Reveal delay={360}>
                  <p className="text-label text-ink-muted text-center" style={{ fontSize: '9px', lineHeight: '1.6' }}>
                    By submitting this form you agree to be contacted by our studio team.<br />
                    We do not share your information with third parties.
                  </p>
                </Reveal>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Location strip */}
      <div className="bg-bg py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-5 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-10">
            {[
              { l: 'STUDIO ADDRESS', v: '41 Design District, Sector 44\nGurugram, Haryana 122003' },
              { l: 'STUDIO HOURS', v: 'Mon–Sat: 10am – 7pm\nSunday: By appointment' },
              { l: 'CONTACT', v: '+91 98765 43210\nhello@arka.studio' },
              { l: 'SHOWROOMS', v: 'Gurugram · New Delhi\nMumbai · Bangalore' }
            ].map(({ l, v }) => (
              <div key={l}>
                <p className="text-label text-accent mb-3">{l}</p>
                <p className="text-body text-ink-muted text-sm whitespace-pre-line">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

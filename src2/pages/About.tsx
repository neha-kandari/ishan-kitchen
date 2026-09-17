import { useInView } from '../hooks/useInView'

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const values = ['Craft', 'Precision', 'Material', 'Detail', 'Longevity']

const team = [
  {
    name: 'Priya Mehta', role: 'Founder & Lead Designer',
    desc: 'Trained at the Architectural Association, London. 18 years of residential kitchen design across Europe and India.',
    img: 'https://images.unsplash.com/photo-1613545564267-b80e188a1541?w=400&h=500&fit=crop&auto=format',
    alt: 'Priya Mehta portrait'
  },
  {
    name: 'Arjun Rao', role: 'Head of Materials',
    desc: 'Former stone specialist with quarries in Rajasthan and Italy. Expert in natural material selection and aging.',
    img: 'https://images.unsplash.com/photo-1728745277862-bc0b2d68c50c?w=400&h=500&fit=crop&auto=format',
    alt: 'Arjun Rao portrait'
  },
  {
    name: 'Leila Kapoor', role: 'Design Director',
    desc: 'From the Politecnico di Milano. Specialises in spatial sequence, light, and the architecture of daily ritual.',
    img: 'https://images.unsplash.com/photo-1671197244266-73129c97c096?w=400&h=500&fit=crop&auto=format',
    alt: 'Leila Kapoor portrait'
  }
]

export default function About() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '75vh' }}>
        <img
          src="https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1800&h=1000&fit=crop&auto=format"
          alt="Architectural kitchen design studio"
          className="w-full h-full object-cover hero-img-ken"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/25 to-dark/55" />
        <div className="absolute inset-0 flex items-end px-8 md:px-16 pb-20">
          <div className="text-bg-warm">
            <p className="text-label mb-5" style={{ color: '#372314' }}>ABOUT</p>
            <h1 className="text-display" style={{ fontSize: 'clamp(2.4rem,5vw,5.5rem)', lineHeight: 1.02 }}>
              We Believe Great Design<br /><em>Should Feel Effortless.</em>
            </h1>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <section className="bg-bg-warm py-32 md:py-44">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <Reveal><p className="text-label text-accent mb-6">OUR PHILOSOPHY</p></Reveal>
            <Reveal delay={100}>
              <h2 className="text-display text-ink mb-8" style={{ fontSize: 'clamp(2rem,3.5vw,3.5rem)' }}>
                A Kitchen Is Not<br /><em>Furniture. It's Architecture.</em>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-body text-ink-muted mb-6" style={{ fontSize: '17px', maxWidth: '480px' }}>
                Founded in 2014 by Priya Mehta after a decade of residential architecture practice in London, Arka was born from one conviction: that the kitchen deserves the same design intelligence as every other part of the home.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-body text-ink-muted" style={{ fontSize: '17px', maxWidth: '480px' }}>
                We are not a furniture company. We are a design studio that happens to build kitchens — and the distinction is visible in every project we complete.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="reveal-scale">
            <div className="img-zoom overflow-hidden cursor-none" data-cursor="view" style={{ aspectRatio: '3/4' }}>
              <img
                src="https://images.unsplash.com/photo-1758565811352-a439bd6f956e?w=800&h=1000&fit=crop&auto=format"
                alt="Arka kitchen design studio philosophy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand values — typographic */}
      <section className="bg-bg py-24 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <Reveal><p className="text-label text-accent mb-12">OUR VALUES</p></Reveal>
        </div>
        {values.map((v, i) => (
          <Reveal key={v} delay={i * 80}>
            <div
              className="border-b border-border px-8 md:px-16 py-6 flex justify-between items-center group cursor-default"
              style={{ overflow: 'hidden' }}
            >
              <h3
                className="text-display text-ink group-hover:text-accent transition-colors duration-500"
                style={{ fontSize: 'clamp(2.5rem,7vw,9rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
              >
                {v}
              </h3>
              <p className="text-label text-ink-muted hidden md:block" style={{ fontSize: '9px' }}>0{i + 1}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Our craft */}
      <section className="bg-bg-warm py-32 md:py-44">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <Reveal><p className="text-label text-accent mb-6">OUR CRAFT</p></Reveal>
              <Reveal delay={100}>
                <h2 className="text-display text-ink mb-8" style={{ fontSize: 'clamp(2rem,3.5vw,3.5rem)' }}>
                  Made by Hand.<br /><em>Built to Last.</em>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="text-body text-ink-muted mb-6" style={{ fontSize: '16px', maxWidth: '460px' }}>
                  Every kitchen we produce is made in our workshop in Gurugram by a team of specialist craftspeople. We do not outsource manufacturing. We do not use standard modules. Every component is made to drawing.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="text-body text-ink-muted mb-8" style={{ fontSize: '16px', maxWidth: '460px' }}>
                  We work with stone fabricators, metal workers, and glass specialists who understand that a kitchen made with this level of intention demands an equivalent level of execution.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                  {[['12', 'Years'], ['180+', 'Kitchens'], ['8', 'Cities']].map(([n, l]) => (
                    <div key={l}>
                      <p className="text-display text-ink mb-1" style={{ fontSize: '2.5rem' }}>{n}</p>
                      <p className="text-label text-ink-muted">{l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={100}>
                <div className="img-zoom overflow-hidden cursor-none" data-cursor="view" style={{ aspectRatio: '3/4' }}>
                  <img
                    src="https://images.unsplash.com/photo-1760072513457-651955c7074d?w=500&h=700&fit=crop&auto=format"
                    alt="Kitchen craftsmanship detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="img-zoom overflow-hidden cursor-none mt-12" data-cursor="view" style={{ aspectRatio: '3/4' }}>
                  <img
                    src="https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?w=500&h=700&fit=crop&auto=format"
                    alt="Material precision detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bg py-32">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <Reveal><p className="text-label text-accent mb-6">THE STUDIO</p></Reveal>
          <Reveal delay={100}>
            <h2 className="text-display text-ink mb-20" style={{ fontSize: 'clamp(2rem,3.5vw,3.5rem)' }}>
              <em>People</em> Behind<br />the Kitchens.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 100}>
                <div className="group cursor-none" data-cursor="view">
                  <div className="img-zoom overflow-hidden mb-6" style={{ aspectRatio: '3/4' }}>
                    <img src={member.img} alt={member.alt} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <h3 className="text-display text-ink mb-1" style={{ fontSize: '22px' }}>{member.name}</h3>
                  <p className="text-label text-accent mb-3">{member.role}</p>
                  <p className="text-body text-ink-muted text-sm">{member.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="section-dark py-40">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="text-label mb-6" style={{ color: '#372314' }}>OUR COMMITMENT</p>
              <h2 className="text-display mb-8" style={{ fontSize: 'clamp(2rem,3.5vw,3.5rem)', color: '#FAF5F0' }}>
                A Kitchen That<br /><em>Outlasts Trends.</em>
              </h2>
              <p className="text-body mb-6" style={{ color: 'rgba(245,237,227,0.6)', fontSize: '16px', maxWidth: '440px' }}>
                We offer a 10-year structural warranty on every kitchen we produce. We are available for the lifetime of the kitchen — for adjustments, additions, and repairs.
              </p>
              <p className="text-body" style={{ color: 'rgba(245,237,227,0.6)', fontSize: '16px', maxWidth: '440px' }}>
                We also offer a material re-treatment service for stone and wood surfaces, so your kitchen looks as considered at twenty years as it did on day one.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(245,237,227,0.08)' }}>
              {[
                { n: '10', l: 'Year Warranty' },
                { n: '∞', l: 'Lifetime Support' },
                { n: '180+', l: 'Kitchens Delivered' },
                { n: '100%', l: 'Client Satisfaction' }
              ].map(({ n, l }) => (
                <div key={l} className="p-8" style={{ background: '#1E0E06' }}>
                  <p className="text-display mb-2" style={{ fontSize: '3rem', color: '#372314' }}>{n}</p>
                  <p className="text-label" style={{ color: 'rgba(245,237,227,0.5)' }}>{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

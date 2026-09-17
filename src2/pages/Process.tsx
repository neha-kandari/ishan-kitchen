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

const steps = [
  {
    num: '01', title: 'Consultation',
    duration: '1–2 weeks',
    desc: 'We begin with a conversation — about your space, your life, how you cook, how you gather, what you\'ve always wanted a kitchen to feel like. We visit your space, document every constraint, and understand every aspiration.',
    output: 'Space documentation + brief document',
    img: 'https://images.unsplash.com/photo-1656402887556-e727ffe1f6d7?w=800&h=600&fit=crop&auto=format',
    alt: 'Design consultation with kitchen layout'
  },
  {
    num: '02', title: 'Concept',
    duration: '2–3 weeks',
    desc: 'The first design direction takes shape. We present floor plans, elevations, and a material story — showing you not just how it will look, but how it will live. Two or three directions, developed to help you see what\'s possible.',
    output: 'Concept drawings + initial material palette',
    img: 'https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?w=800&h=600&fit=crop&auto=format',
    alt: 'Kitchen design concept with marble counter'
  },
  {
    num: '03', title: 'Materials',
    duration: '1–2 weeks',
    desc: 'You visit our material library. You hold the stone samples, feel the wood finishes, test the hardware. We refine the selection together — this is where the kitchen begins to have a character that is entirely your own.',
    output: 'Finalised material specification',
    img: 'https://images.unsplash.com/photo-1551554781-c46200ea959d?w=800&h=600&fit=crop&auto=format',
    alt: 'Material samples selection'
  },
  {
    num: '04', title: 'Design Development',
    duration: '3–4 weeks',
    desc: 'Every dimension is resolved. Storage, lighting, appliance integration, electrical positions, plumbing — all drawn to the millimetre. We present detailed 3D renders so you can inhabit the design before it exists.',
    output: 'Full technical drawings + 3D visualisation',
    img: 'https://images.unsplash.com/photo-1758448755927-e5c5ae14790c?w=800&h=600&fit=crop&auto=format',
    alt: 'Kitchen island design development'
  },
  {
    num: '05', title: 'Manufacturing',
    duration: '6–10 weeks',
    desc: 'Your kitchen is built in our workshop by our craftspeople. Every cabinet, every panel, every detail is made to our drawings. Stone is cut, wood is treated, hardware is sourced. Quality is verified at every stage.',
    output: 'Completed kitchen components ready for installation',
    img: 'https://images.unsplash.com/photo-1760072513457-651955c7074d?w=800&h=600&fit=crop&auto=format',
    alt: 'Kitchen manufacturing and craftsmanship'
  },
  {
    num: '06', title: 'Installation',
    duration: '2–4 weeks',
    desc: 'Our installation team arrives on site. We protect your space, sequence the work carefully, and attend to every joint, every edge, every alignment. We do not leave until the kitchen is exactly as designed.',
    output: 'Installed kitchen with snagging complete',
    img: 'https://images.unsplash.com/photo-1758565811430-3423f31396f9?w=800&h=600&fit=crop&auto=format',
    alt: 'Kitchen installation process'
  },
  {
    num: '07', title: 'Reveal',
    duration: 'Day one',
    desc: 'We step back. You step in. Your kitchen — designed entirely around your life, built to last for decades. We return after two weeks to attend to any adjustments, and remain available for the lifetime of the kitchen.',
    output: 'Your completed kitchen + lifetime support',
    img: 'https://images.unsplash.com/photo-1769737122085-97b1ee5ab104?w=800&h=600&fit=crop&auto=format',
    alt: 'Completed luxury kitchen reveal'
  }
]

export default function Process() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <div className="pt-40 pb-20 max-w-screen-xl mx-auto px-8 md:px-16">
        <Reveal>
          <p className="text-label text-accent mb-6">OUR PROCESS</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-display text-ink" style={{ fontSize: 'clamp(2.8rem,5.5vw,6.5rem)', lineHeight: 1.02 }}>
            Designed With You.<br /><em>Built Around You.</em>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-body text-ink-muted mt-8" style={{ fontSize: '17px', maxWidth: '560px' }}>
            From first conversation to final reveal — a process designed to be as refined as the kitchen it produces.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <p className="text-label text-ink-muted mt-6">TOTAL LEAD TIME: 16–26 WEEKS</p>
        </Reveal>
      </div>

      {/* Timeline */}
      {steps.map((step, i) => (
        <section
          key={step.num}
          className={i % 2 === 0 ? 'bg-bg-warm' : 'bg-bg'}
        >
          <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-20">
            <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${i % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}>

              {/* Image */}
              <Reveal>
                <div className={`${i % 2 !== 0 ? 'md:[direction:ltr]' : ''} img-zoom overflow-hidden cursor-none`}
                  data-cursor="view"
                  style={{ aspectRatio: '4/3' }}>
                  <img src={step.img} alt={step.alt} className="w-full h-full object-cover" />
                </div>
              </Reveal>

              {/* Content */}
              <div className={i % 2 !== 0 ? 'md:[direction:ltr] md:pl-8' : 'md:pr-8'}>
                <Reveal delay={100}>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-display text-accent" style={{ fontSize: 'clamp(3rem,6vw,6rem)', lineHeight: 1, opacity: 0.15 }}>
                      {step.num}
                    </span>
                    <div>
                      <p className="text-label text-accent mb-1">{step.duration}</p>
                      <h2 className="text-display text-ink" style={{ fontSize: 'clamp(1.8rem,3vw,3rem)' }}>
                        {step.title}
                      </h2>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={180}>
                  <p className="text-body text-ink-muted mb-8" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                    {step.desc}
                  </p>
                </Reveal>
                <Reveal delay={240}>
                  <div className="border-l-2 pl-4" style={{ borderColor: '#372314' }}>
                    <p className="text-label text-ink-muted mb-1" style={{ fontSize: '9px' }}>DELIVERABLE</p>
                    <p className="text-body text-ink text-sm">{step.output}</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-dark py-40 text-center">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <Reveal>
            <p className="text-label mb-8" style={{ color: '#372314' }}>BEGIN YOUR PROCESS</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-display mb-8" style={{ fontSize: 'clamp(2rem,4.5vw,5rem)', color: '#FAF5F0', lineHeight: 1.05 }}>
              Ready to begin?<br /><em>We are.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-body mb-12 mx-auto" style={{ color: 'rgba(245,237,227,0.55)', maxWidth: '440px' }}>
              The first consultation is complimentary. We'd love to hear about your space.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <button
              className="magnetic-btn px-12 py-5 text-label tracking-widest transition-colors duration-500"
              style={{ background: '#372314', color: '#FAF5F0' }}
              data-cursor="open"
            >
              BOOK A CONSULTATION
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

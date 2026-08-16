'use client';

import { tripleIData } from '@/data/triple-i';
import { useCursorState } from '@/providers/CursorProvider';
import { TextReveal } from '@/components/motion/TextReveal';
import { FadeIn } from '@/components/motion/FadeIn';

export function TripleISection() {
  const { setCursor, resetCursor } = useCursorState();

  return (
    <section id="triple-i" className="w-full bg-[var(--deep-black)]" style={{ paddingTop: '160px', paddingBottom: '160px' }}>

      {/* ── Editorial Header ── */}
      <div className="section-container flex flex-col items-center text-center mb-16 lg:mb-20">

        <FadeIn>
          <span className="text-metadata mb-5 block">
            04 / TRIPLE I
          </span>
        </FadeIn>

        <div style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
          <TextReveal as="h2" className="text-[var(--white)] font-extrabold uppercase mb-5">
            TEAM TRIPLE I
          </TextReveal>
        </div>

        {/* Decorative accent line */}
        <FadeIn delay={0.1}>
          <div className="w-12 h-px bg-[var(--gold)] opacity-60 mb-8" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <h3 className="font-mono text-[10px] lg:text-xs tracking-[0.3em] text-[var(--text-secondary)] uppercase mb-6">
            WE DIDN&apos;T BUILD ALONE.
          </h3>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-[var(--text-secondary)] font-light text-sm lg:text-base leading-[1.85] max-w-2xl text-center mb-8">
            We have been building as a unified team for over a year, and our relentless spirit only continues to grow. This journey has taught me the true value of collaboration and fiercely accelerated my technical skills. We've tackled multiple hackathons, learning side-by-side through every challenge, with so much more on the horizon.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="text-[var(--gold)] font-mono text-[11px] lg:text-xs tracking-[0.5em] text-center uppercase">
            IDEATE • INNOVATE • IMPLEMENT
          </p>
        </FadeIn>
      </div>

      {/* ── Cards Grid ── */}
      <div className="section-container">
        <div className="w-full h-px bg-[var(--border-subtle)] mb-12 lg:mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {tripleIData.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={0.1 + index * 0.12}
              className="w-full flex flex-col group"
            >
              <div
                onMouseEnter={() => setCursor('explore')}
                onMouseLeave={resetCursor}
                className="w-full flex flex-col h-full"
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] overflow-hidden relative mb-6 border border-[var(--border)]">
                  <img
                    src={item.image}
                    alt={`${item.event} ${item.year} — Team Photo`}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                </div>

                {/* Text Block */}
                <div className="flex flex-col items-center text-center flex-grow">
                  <h4 className="text-lg lg:text-xl font-bold uppercase text-[var(--text-primary)] tracking-[0.15em] group-hover:text-[var(--gold)] transition-colors duration-300 mb-2">
                    {item.event} {item.year}
                  </h4>

                  {item.result && (
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--gold)] opacity-80 group-hover:opacity-100 transition-opacity uppercase">
                      {item.result}
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="w-full h-px bg-[var(--border-subtle)] mt-12 lg:mt-16" />
      </div>
    </section>
  );
}


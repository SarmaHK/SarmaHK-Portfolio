'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { fieldNotes } from '@/data/field-notes';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Field Notes section — "OUTSIDE THE IDE" per §16.
 * Photography-focused. Content supplied later.
 */
export function FieldNotesSection() {
  const repeatedNotes = [...fieldNotes, ...fieldNotes, ...fieldNotes];

  return (
    <section
      id="field-notes"
      className="section-spacing"
      style={{ background: 'var(--deep-black)' }}
    >
      <div className="section-container">
        {/* ── Editorial Header ── */}
        <div className="flex flex-col items-center justify-center text-center gap-4 w-full shrink-0 mt-4 mb-20 lg:mb-24">
          <FadeIn>
            <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--muted-grey)] uppercase block">
              06 / FIELD NOTES
            </span>
          </FadeIn>
          <TextReveal as="h2" className="text-section-title text-[var(--gold)]">
            OUTSIDE THE IDE
          </TextReveal>
          <FadeIn delay={0.1}>
            <p className="max-w-4xl mx-auto text-center text-[var(--muted-grey)] font-light text-base lg:text-lg leading-loose mt-8 lg:mt-10 tracking-wide">
              The technology landscape evolves far too quickly to just stay behind a screen. Driven by an insatiable curiosity for how <strong className="font-semibold text-white">top-tier engineering teams</strong> operate, I actively step into the industry. Whether it's an exclusive field visit or a developer meetup, I am always there—uncovering the software architectures they build and the <strong className="font-semibold text-white">modern stacks they use to push boundaries</strong>.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="relative w-full overflow-hidden py-10 group flex items-center">
            {/* Dark vignette edges to blend the infinite scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-48 bg-gradient-to-r from-[var(--deep-black)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-48 bg-gradient-to-l from-[var(--deep-black)] to-transparent z-10 pointer-events-none" />

            {/* Scrolling Track */}
            <motion.div
              className="flex gap-6 lg:gap-10 w-max"
              animate={{ x: ["0%", "-33.333333%"] }}
              transition={{ ease: "linear", duration: 50, repeat: Infinity }}
            >
              {repeatedNotes.map((note, index) => (
                <div
                  key={`${note.id}-${index}`}
                  className="relative group/note bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl w-[320px] lg:w-[480px] shrink-0 p-2 lg:p-3 pb-0 flex flex-col hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative w-full aspect-[16/9] bg-[var(--deep-black)] rounded-t-lg overflow-hidden">
                    <Image
                      src={note.photos[0]}
                      alt={note.title}
                      fill
                      className="object-cover transition-transform duration-[2s] group-hover/note:scale-110"
                    />
                    {/* Subtle inner shadow for premium depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-black)]/30 to-transparent pointer-events-none mix-blend-overlay" />
                  </div>

                  {/* Permanently visible frosted footer */}
                  <div className="w-full flex-1 p-4 lg:p-5 flex justify-between items-center bg-[var(--surface-elevated)] rounded-b-lg border-t border-[var(--border-subtle)]/50">
                    <h3 className="text-white font-bold text-sm lg:text-[15px] uppercase tracking-wider leading-tight">
                      {note.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {note.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--gold)]">
                          // {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

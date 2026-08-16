'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { nowData } from '@/data/now';

export function NowSection() {
  return (
    <section
      id="now"
      className="py-32 lg:py-48"
      style={{ background: 'var(--deep-black)' }}
    >
      <div className="section-container flex flex-col items-start w-full max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-24 md:mb-32">
          <FadeIn>
            <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--muted-grey)] uppercase block mb-4">
              08 / NOW
            </span>
          </FadeIn>
          <TextReveal as="h2" className="text-[clamp(3rem,6vw,5rem)] font-[var(--font-display)] font-extrabold text-[var(--white)] uppercase tracking-tight leading-[0.9]">
            NOW
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="font-mono text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] mt-6">
              WHAT I&apos;M FOCUSED ON RIGHT NOW.
            </p>
          </FadeIn>
        </div>

        {/* Global Layout */}
        <div className="flex flex-col xl:flex-row w-full gap-24 xl:gap-40 items-start">

          {/* Main Statement (Left Side on Desktop) */}
          <div className="w-full xl:w-2/5 flex flex-col gap-10 relative xl:sticky xl:top-32">
            <TextReveal as="h3" className="text-[clamp(2.5rem,4vw,4rem)] font-[var(--font-display)] font-bold uppercase tracking-tight text-white leading-[1.1]" staggerDelay={0.03}>
              BUILDING CLOSER TO THE HARDWARE.
            </TextReveal>

            <FadeIn delay={0.3} direction="up">
              <p className="font-light text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                Right now, I&apos;m diving deeper into embedded systems, building and experimenting with hardware-focused projects while strengthening my understanding of how software interacts with the physical world.
              </p>

              {/* Closing statement explicitly requested */}
              <div className="mt-16 border-l border-[var(--gold)]/30 pl-4">
                <p className="font-[var(--font-display)] text-lg md:text-xl font-bold uppercase tracking-wide text-white/80 leading-snug">
                  THE FOCUS CHANGES. <br />
                  <span className="text-[var(--gold)]/80 italic font-medium lowercase">the curiosity doesn't.</span>
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Side / Tracks */}
          <div className="w-full xl:w-3/5 flex flex-col shrink-0">
            <div className="w-full h-px bg-white/10 mb-8" />

            {nowData.map((item, index) => {
              const isPrimary = item.status === 'CURRENT FOCUS';

              return (
                <FadeIn key={item.id} delay={0.4 + (index * 0.1)}>
                  <motion.div
                    whileHover="hover"
                    className="group relative border-t border-white/[0.05] py-12 lg:py-16 flex flex-col md:flex-row gap-8 md:gap-16 transition-colors duration-500 overflow-hidden"
                  >

                    {/* Index & Status */}
                    <div className="w-full md:w-40 flex flex-row md:flex-col justify-between items-start shrink-0 relative z-10">
                      <span className="font-[var(--font-display)] text-5xl md:text-6xl font-black text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500 leading-none tracking-tighter">
                        0{index + 1}
                      </span>
                      <div className="flex items-center gap-3 mt-2 md:mt-8">
                        {isPrimary && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)] animate-pulse" />
                        )}
                        <span className={`font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase ${isPrimary ? 'text-[var(--cyan)] font-bold' : 'text-[#666] group-hover:text-[#999] transition-colors duration-300'}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Content Component */}
                    <div className="flex-1 flex flex-col justify-center relative z-10">

                      {/* Name & Subtle Arrow */}
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <h4 className={`font-[var(--font-display)] font-extrabold uppercase tracking-tight transition-colors duration-300 ${isPrimary ? 'text-2xl md:text-3xl text-[var(--gold)]' : 'text-xl md:text-2xl text-white group-hover:text-[var(--gold)]'}`}>
                          {item.title}
                        </h4>
                        <motion.span
                          variants={{
                            hover: { x: 5, opacity: 1, color: 'var(--gold)' }
                          }}
                          initial={{ opacity: 0, color: '#555' }}
                          className="font-mono text-xl hidden md:block font-light"
                        >
                          →
                        </motion.span>
                      </div>

                      {/* Description */}
                      <p className={`font-light leading-relaxed mb-8 md:mb-10 max-w-2xl transition-colors duration-300 ${isPrimary ? 'text-white/90 text-base md:text-lg' : 'text-[#888] text-sm md:text-base group-hover:text-white/80'}`}>
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-3">
                          {item.tags.map(tag => (
                            <span key={tag} className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#777] border border-white/5 rounded-full px-4 py-2 group-hover:border-[var(--gold)]/30 group-hover:text-[var(--gold)] group-hover:bg-[var(--gold)]/5 transition-all duration-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Background hover accent */}
                    <motion.div
                      variants={{ hover: { opacity: 1 } }}
                      initial={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/[0.02] to-transparent pointer-events-none transition-opacity duration-700"
                    />
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { motion } from 'framer-motion';
import { hackathons } from '@/data/hackathons';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function HackathonsSection() {
  return (
    <section id="hackathons" className="w-full bg-[var(--near-black)]" style={{ paddingTop: '150px', paddingBottom: '160px' }}>
      <div className="section-container flex flex-col items-center w-full relative">

        {/* =========================================
            1. SECTION TITLE & INTRO
        =========================================== */}
        <div className="flex flex-col items-center text-center gap-6 w-full max-w-4xl mb-20 lg:mb-28">
          <FadeIn>
            <span className="text-metadata text-[var(--gold)] block">
              03 / HACKATHONS
            </span>
          </FadeIn>

          <TextReveal as="h2" className="text-[clamp(3rem,6vw,6rem)] font-extrabold font-[var(--font-display)] text-white uppercase tracking-tight leading-[0.95]">
            HACKATHONS
          </TextReveal>

          <FadeIn delay={0.2} className="space-y-4 mt-2">
            <p className="text-lg md:text-xl font-medium text-[var(--gold)] md:whitespace-nowrap">
              "I've learned as much from competing under pressure as I have from building in the lab."
            </p>
            <p className="text-sm md:text-base text-[var(--soft-white)] max-w-2xl mx-auto">
              From first attempts to finalist stages, every hackathon became another opportunity to build, collaborate and learn.
            </p>
          </FadeIn>
        </div>

        {/* =========================================
            2. CHRONOLOGICAL TIMELINE
        =========================================== */}
        <div className="relative w-full max-w-4xl mx-auto py-10">

          {/* THE TIMELINE LINE */}
          <div
            className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-white/10"
            style={{ transform: 'translateX(-50%)' }}
          />

          {hackathons.map((hack, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={hack.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative w-full flex flex-col md:flex-row md:items-center ${!isEven ? 'md:flex-row-reverse' : ''} mb-24 md:mb-32 last:mb-0`}
              >
                {/* CENTER MILESTONE DOT */}
                <div
                  className="absolute left-[30px] md:left-1/2 top-4 md:top-1/2 w-[9px] h-[9px] bg-[var(--gold)] rounded-full z-10 shadow-[0_0_12px_var(--gold)]"
                  style={{ transform: 'translate(-50%, -50%)' }}
                />

                {/* CONTENT PANE */}
                <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 ${isEven ? 'md:pr-16 lg:pr-20' : 'md:pl-16 lg:pl-20'} flex flex-col`}>
                  <div className={`w-full aspect-[4/3] bg-[#111111]/80 backdrop-blur-sm border border-white/5 p-8 md:p-12 lg:p-16 rounded-sm hover:border-[var(--gold)]/30 hover:bg-[#151515] transition-all duration-500 flex flex-col justify-center items-center text-center`}>
                    {/* Year */}
                    <div className="font-mono text-[10px] tracking-widest text-[#a1a1aa] mb-2 uppercase">
                      {hack.year}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-[var(--font-display)] font-bold text-white mb-3 tracking-tight">
                      {hack.name}
                    </h3>

                    {/* Team Label */}
                    {hack.team === 'Triple I' && (
                      <div className="mb-4">
                        <span className="inline-block font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">
                          TEAM TRIPLE I
                        </span>
                      </div>
                    )}

                    {/* Result/Milestone */}
                    {hack.result && (
                      <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--gold)] uppercase mb-5">
                        {hack.result}
                      </div>
                    )}

                    {/* Description & Story */}
                    {hack.shortDescription && (
                      <p className="text-[var(--soft-white)] text-sm leading-relaxed mb-4 max-w-[95%]">
                        {hack.shortDescription}
                      </p>
                    )}
                    {hack.story && (
                      <p className="text-white/60 text-xs leading-relaxed mb-6 max-w-[95%]">
                        {hack.story}
                      </p>
                    )}

                    {/* Certificate Link */}
                    {hack.certificate && (
                      <div className="mt-2">
                        <a
                          href={hack.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#a1a1aa] hover:text-[var(--gold)] border-b border-transparent hover:border-[var(--gold)]/50 pb-0.5 transition-all"
                        >
                          OPEN CERTIFICATE ↗
                        </a>
                      </div>
                    )}

                    {/* View Project Link */}
                    {hack.projectName && (
                      <div className="mt-4">
                        <Button variant="secondary" size="sm" href={`#builds`}>
                          VIEW PROJECT ↗
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* PHOTO PANE */}
                <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 mt-6 md:mt-0 ${isEven ? 'md:pl-12' : 'md:pr-12'} group`}>
                  {hack.photo ? (
                    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-[#0A0A0A]">
                      <Image
                        src={hack.photo}
                        alt={hack.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 border border-white/5 transition-colors duration-500 group-hover:border-[var(--gold)]/20 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/5 border-dashed bg-white/5 flex items-center justify-center backdrop-blur-sm">
                      <span className="font-mono text-[9px] tracking-widest text-[#52525b] uppercase text-center px-4">
                        [HACKATHON_PHOTO_PENDING]
                      </span>
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

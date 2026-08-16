'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { storyData } from '@/data/about-story';
import { useCursorState } from '@/providers/CursorProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const techIcons1 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
];

const techIcons2 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
];

const techIcons3 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
];

/**
 * Editorial About Section
 * "Tech Nerd. Too curious to stay in one lane."
 */
export function AboutSection() {
  const { setCursor, resetCursor } = useCursorState();
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      className="section-spacing relative bg-[var(--deep-black)] border-t border-white/5"
    >
      <div className="section-container relative z-10">

        {/* ── SECTION IDENTITY ── */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[var(--gold)]"></span>
              <span className="text-metadata text-[var(--gold)] block">ABOUT ME</span>
            </div>

            <div className="font-mono text-[9px] tracking-[0.3em] text-[var(--muted-grey)] uppercase hidden md:block">
              CURIOUS BY DEFAULT / BUILDING BY CHOICE
            </div>
          </div>
        </FadeIn>

        {/* ── MAIN HEADLINE & MARQUEE ── */}
        <div className="flex flex-col xl:flex-row justify-between gap-12 mb-16 relative">

          <div
            className="w-full xl:w-auto shrink-0"
            onMouseEnter={() => setCursor('read')}
            onMouseLeave={resetCursor}
          >
            {/* Desktop/Tablet Break */}
            <div className="hidden md:flex flex-col gap-0 text-[clamp(3.5rem,7vw,7rem)] leading-[1.05] font-bold text-white tracking-[-0.03em] uppercase">
              <TextReveal as="span" className="text-[var(--gold)] mb-2">TECH NERD.</TextReveal>
              <TextReveal as="span">TOO CURIOUS TO</TextReveal>
              <TextReveal as="span">STAY IN ONE LANE.</TextReveal>
            </div>

            {/* Mobile Break */}
            <div className="flex md:hidden flex-col gap-0 text-[clamp(2.75rem,10vw,4rem)] leading-[1.05] font-bold text-white tracking-[-0.02em] uppercase">
              <TextReveal as="span" className="text-[var(--gold)] mb-2">TECH NERD.</TextReveal>
              <TextReveal as="span">TOO CURIOUS</TextReveal>
              <TextReveal as="span">TO STAY IN</TextReveal>
              <TextReveal as="span">ONE LANE.</TextReveal>
            </div>
          </div>

          <div
            className="hidden xl:flex flex-1 max-w-[360px] h-[340px] relative shrink-0 overflow-hidden ml-auto opacity-70"
            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
          >
            <div className="absolute inset-x-0 inset-y-[-100%] flex gap-4 xl:gap-8 justify-center">
              <div className="flex flex-col gap-4 xl:gap-8 animate-[marquee-vertical_20s_linear_infinite]">
                {techIcons1.concat(techIcons1).map((src, i) => (
                  <div key={`col1-${i}`} className="w-20 h-20 rounded-md bg-white/5 border border-white/10 flex items-center justify-center p-4 shrink-0 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                    <Image src={src} alt="tech icon" width={48} height={48} className="w-full h-full object-contain" unoptimized />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 xl:gap-8 animate-[marquee-vertical-reverse_25s_linear_infinite]">
                {techIcons2.concat(techIcons2).map((src, i) => (
                  <div key={`col2-${i}`} className="w-20 h-20 rounded-md bg-white/5 border border-white/10 flex items-center justify-center p-4 shrink-0 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                    <Image src={src} alt="tech icon" width={48} height={48} className="w-full h-full object-contain" unoptimized />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 xl:gap-8 animate-[marquee-vertical_22s_linear_infinite]">
                {techIcons3.concat(techIcons3).map((src, i) => (
                  <div key={`col3-${i}`} className="w-20 h-20 rounded-md bg-white/5 border border-white/10 flex items-center justify-center p-4 shrink-0 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                    <Image src={src} alt="tech icon" width={48} height={48} className="w-full h-full object-contain" unoptimized />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-t border-white/5 pt-16">

          <div className="lg:col-span-7 flex flex-col gap-10 lg:pr-8">
            {/* Introduction */}
            <FadeIn delay={0.2}>
              <p className="text-white/90 text-[1.05rem] lg:text-[1.25rem] leading-[1.8] font-light">
                I'm Habikugasarma.K, an Information Technology undergraduate at the University of Kelaniya. I explore technology across software, AI, IoT, cloud, networking and cybersecurity — usually by learning something, experimenting with it, and trying to build something real.
              </p>
            </FadeIn>

            {/* Journey Paragraph */}
            <FadeIn delay={0.3}>
              <p className="text-white/70 text-[1rem] lg:text-[1.1rem] leading-[1.8] font-light">
                From academic projects and hackathons to Team Triple I, professional experiences and communities like AIESEC, Leo, AWS and IEEE, every experience has added another layer to how I approach technology.
              </p>
            </FadeIn>

            {/* Closing Statement */}
            <FadeIn delay={0.4} className="mt-8 flex flex-col gap-4">
              <p className="text-white/90 text-[1.1rem] lg:text-[1.3rem] leading-[1.8] font-light italic">
                I don't really like staying in one lane.
              </p>

              <div className="flex flex-col lg:flex-row lg:items-baseline gap-4 lg:gap-6 mt-4">
                <span className="text-white/70 text-[1.05rem] lg:text-[1.2rem] font-light">
                  There's always something new to
                </span>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={prefersReduced ? {} : {
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
                  }}
                  className="flex flex-wrap items-center gap-3 lg:gap-4 font-mono text-[0.85rem] lg:text-[0.95rem] tracking-[0.2em] font-medium text-[var(--gold)] uppercase"
                >
                  {['LEARN.', 'BUILD.', 'BREAK.', 'EXPLORE.'].map((word) => (
                    <motion.span
                      key={word}
                      variants={prefersReduced ? {} : {
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="group relative inline-flex items-center cursor-default"
                      onMouseEnter={() => setCursor('explore')}
                      onMouseLeave={resetCursor}
                    >
                      {/* Subtle hover effect on the words */}
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--white)]">
                        {word}
                      </span>
                      <span className="absolute -inset-x-2 -inset-y-1 bg-[var(--gold)]/10 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 rounded-sm -z-10" />
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 lg:pl-12 flex flex-col justify-center gap-10 border-t lg:border-t-0 lg:border-l border-white/5 pt-10 lg:pt-0">
            {/* School */}
            <FadeIn delay={0.2} direction="up" className="flex gap-6 group">
              <div
                className="w-16 h-16 rounded-md bg-white/5 border border-white/10 shrink-0 relative overflow-hidden flex items-center justify-center p-2"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={resetCursor}
              >
                {storyData.school.imagePlaceholder?.startsWith('/') ? (
                  <Image
                    src={storyData.school.imagePlaceholder}
                    alt={storyData.school.schoolName || 'School Logo'}
                    fill
                    className="object-contain p-2 transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-[10px] text-white/30 text-center font-mono">LOGO</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-gold tracking-widest uppercase mb-1">
                  {storyData.school.metadata}
                </span>
                <h3 className="text-white font-medium text-lg leading-tight mb-2">
                  {storyData.school.schoolName}
                </h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {storyData.school.description}
                </p>
              </div>
            </FadeIn>

            {/* University */}
            <FadeIn delay={0.3} direction="up" className="flex gap-6 group">
              <div
                className="w-16 h-16 rounded-md bg-white border border-white/10 shrink-0 relative overflow-hidden flex items-center justify-center p-2"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={resetCursor}
              >
                {storyData.university.imagePlaceholder?.startsWith('/') ? (
                  <Image
                    src={storyData.university.imagePlaceholder}
                    alt={storyData.university.universityName || 'University Logo'}
                    fill
                    className="object-contain p-2 transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-[10px] text-black/30 text-center font-mono">LOGO</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-gold tracking-widest uppercase mb-1">
                  {storyData.university.metadata}
                </span>
                <h3 className="text-white font-medium text-lg leading-tight mb-1">
                  {storyData.university.universityName}
                </h3>
                <span className="text-white/70 text-xs font-mono mb-2 block">
                  {storyData.university.degree}
                </span>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {storyData.university.description}
                </p>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}

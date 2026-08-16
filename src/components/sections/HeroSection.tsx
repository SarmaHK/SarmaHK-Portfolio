'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scene } from '@/components/three/Scene';
import { FadeIn } from '@/components/motion/FadeIn';
import { InteractiveName } from '@/components/motion/InteractiveName';
import { useCursorState } from '@/providers/CursorProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Editorial Hero Section — Master Specification
 * Personal + Technical + Premium + Curious + Modern
 */
export function HeroSection() {
  const { setCursor, resetCursor } = useCursorState();
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -60]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{ background: 'var(--deep-black)' }}
    >
      {/* Subtle 3D Tech Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Scene />
      </div>

      {/* Ambient Glow behind photo area */}
      <div
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden lg:block"
        style={{ background: 'radial-gradient(circle, rgba(200,164,93,0.06) 0%, transparent 70%)' }}
      />

      {/* Main Container */}
      <div className="section-container relative z-10 w-full min-h-[100svh] flex items-center py-28 lg:py-0">

        {/* Two-Column Asymmetric Grid */}
        <div className="relative w-full flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-8">

          {/* ══════════════════════════════════════
              LEFT COLUMN — Identity & Typography
              ══════════════════════════════════════ */}
          <motion.div
            style={{ y: textY, opacity: opacityFade }}
            className="w-full lg:w-[55%] relative z-30 flex flex-col"
          >
            {/* Technical Label */}
            <FadeIn delay={0.1} direction="down">
              <div className="flex items-center gap-3 mb-10">
                <span className="w-8 h-[1px] bg-[var(--gold)] opacity-60"></span>
                <span className="font-mono text-[9px] lg:text-[10px] tracking-[0.35em] text-[var(--muted-grey)] uppercase">
                  TECHNOLOGY / IN PROGRESS
                </span>
              </div>
            </FadeIn>

            {/* "Hi, I'm" intro */}
            <FadeIn delay={0.3}>
              <span className="font-mono text-sm lg:text-base text-[var(--soft-white)] tracking-[0.15em] mb-4 block">
                Hi, I&apos;m
              </span>
            </FadeIn>

            {/* ── THE NAME ── */}
            <motion.div
              initial="initial"
              animate="enter"
              className="mb-10 overflow-visible"
            >
              <InteractiveName
                name="Habikugasarma.K"
                className="text-[clamp(2.8rem,7.5vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.03em] text-[var(--white)]"
              />
            </motion.div>

            {/* Supporting Paragraph */}
            <FadeIn delay={1.0} className="max-w-[440px] mb-10">
              <p className="text-[var(--soft-white)] text-[0.88rem] lg:text-[0.95rem] leading-[1.85] font-light">
                An enthusiastic undergraduate from the University of Kelaniya, constantly exploring what technology can do — from software and AI to IoT, cloud, networks and everything in between.
              </p>
            </FadeIn>

            {/* Identity Signature */}
            <FadeIn delay={1.2} className="mb-10">
              <div className="flex items-start gap-4">
                <span className="w-[2px] h-10 bg-[var(--gold)] mt-[2px] shrink-0"></span>
                <p className="font-mono text-[10px] lg:text-[11px] tracking-[0.25em] text-[var(--white)] uppercase leading-[2.2]">
                  CURIOUS BY DEFAULT.<br />
                  BUILDING BY CHOICE.
                </p>
              </div>
            </FadeIn>

            {/* Degree Metadata */}
            <FadeIn delay={1.4} className="mb-12">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[8px] lg:text-[9px] tracking-[0.35em] text-[var(--muted-grey)] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full opacity-60"></span>
                  EDUCATION / 01
                </span>
                <h3 className="font-sans text-[0.85rem] lg:text-[0.92rem] text-[var(--soft-white)] font-medium tracking-wide">
                  BSc (Hons) in Information Technology
                </h3>
                <span className="font-sans text-xs text-[var(--muted-grey)] tracking-wide">
                  University of Kelaniya
                </span>
              </div>
            </FadeIn>

            {/* CTA Button */}
            <FadeIn delay={1.6}>
              <a
                href="#projects"
                onMouseEnter={() => setCursor('explore')}
                onMouseLeave={resetCursor}
                className="group relative inline-flex items-center gap-3 border border-[var(--border)] hover:border-[var(--gold)] rounded-none px-6 py-3.5 transition-all duration-500 overflow-hidden"
              >
                {/* Hover fill */}
                <span className="absolute inset-0 bg-[var(--gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-[0.08]"></span>

                <span className="relative font-mono text-[10px] lg:text-[11px] tracking-[0.2em] font-semibold text-[var(--white)] group-hover:text-[var(--gold)] transition-colors duration-300 uppercase">
                  EXPLORE WHAT I&apos;M BUILDING
                </span>
                <span className="relative text-[var(--gold)] text-sm transform transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </FadeIn>

          </motion.div>

          {/* ══════════════════════════════════════
              RIGHT COLUMN — Editorial Portrait
              ══════════════════════════════════════ */}
          <motion.div
            style={{ y: photoY }}
            className="w-full lg:w-[40%] lg:absolute right-0 top-1/2 lg:-translate-y-1/2 flex justify-center lg:justify-end z-10 mt-4 lg:mt-0"
          >
            <FadeIn delay={0.6} direction="up" className="relative w-full max-w-[420px]">

              {/* Photo Container */}
              <motion.div
                className="relative aspect-[3/4] w-full overflow-hidden group"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={resetCursor}
                whileHover={!prefersReduced ? { scale: 1.015 } : {}}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              >
                {/* Soft ambient surface */}
                <div className="absolute inset-0 bg-[var(--near-black)] z-0" />

                {/* Full Color Image */}
                <Image
                  src="/images/hero/K.Habikugasarma.jpeg"
                  alt="Habikugasarma.K"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover object-top relative z-[1] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  priority
                />

                {/* Bottom fade into background */}
                <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[var(--deep-black)] to-transparent z-[2] pointer-events-none" />

                {/* Left edge fade for asymmetric blending */}
                <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[var(--deep-black)] to-transparent z-[2] pointer-events-none hidden lg:block opacity-60" />

                {/* Corner frame accents */}
                <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[var(--white)]/10 z-10 transition-colors duration-500 group-hover:border-[var(--gold)]/40" />
                <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[var(--white)]/10 z-10 transition-colors duration-500 group-hover:border-[var(--gold)]/40" />

                {/* Tiny tech label */}
                <div className="absolute top-5 right-5 font-mono text-[7px] text-[var(--white)]/20 z-10 tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-[var(--gold)]/30">
                  SYS.IMG/01
                </div>
              </motion.div>

              {/* Subtle gold accent line below photo */}
              <div className="absolute -bottom-4 right-0 w-12 h-[1px] bg-[var(--gold)] opacity-30 hidden lg:block" />

            </FadeIn>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

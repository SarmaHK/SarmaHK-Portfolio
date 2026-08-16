'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { StaggerChildren, staggerChildVariants } from '@/components/motion/StaggerChildren';
import { motion } from 'framer-motion';
import { achievements } from '@/data/achievements';

/**
 * Scoreboard section — "THE SCOREBOARD" per §19.
 * Oversized typography for achievements.
 */
export function ScoreboardSection() {
  return (
    <section
      id="scoreboard"
      className="section-spacing"
      style={{ background: 'var(--deep-black)' }}
    >
      <div className="section-container">
        <FadeIn>
          <span className="text-metadata">— / ACHIEVEMENTS</span>
        </FadeIn>

        <div className="mt-6 mb-16">
          <TextReveal as="h2" className="text-section-title">
            THE SCOREBOARD
          </TextReveal>
        </div>

        {/* Achievement blocks with oversized typography */}
        <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={staggerChildVariants}
              className="flex flex-col gap-3 py-6"
              style={{
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {/* Result — oversized */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--gold)',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                }}
              >
                {achievement.result}
              </span>

              {/* Event */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--white)',
                }}
              >
                {achievement.title}
              </span>

              {/* Year */}
              <span className="text-metadata">
                {achievement.year}
              </span>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

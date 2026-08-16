'use client';

import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';

/**
 * Journey section — "STILL LEARNING" per §13.
 * Timeline of continuous development across domains.
 * Skeleton — milestones supplied later.
 */
export function JourneySection() {
  return (
    <section
      id="journey"
      className="section-spacing"
      style={{ background: 'var(--deep-black)' }}
    >
      <div className="section-container">
        <FadeIn>
          <span className="text-metadata">04 / JOURNEY</span>
        </FadeIn>

        <div className="mt-6 mb-16">
          <TextReveal as="h2" className="text-section-title">
            STILL LEARNING
          </TextReveal>
        </div>

        <FadeIn delay={0.2}>
          <div className="placeholder-block" style={{ minHeight: '400px' }}>
            [JOURNEY_TIMELINE_PENDING]
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { useCursorState } from '@/providers/CursorProvider';
import type { BuildLogStatus, BuildLogEntry } from '@/data/types';
import { buildLogData } from '@/data/buildLog';

/**
 * Filter types including 'ALL'
 */
type FilterType = BuildLogStatus | 'ALL';

const FILTERS: FilterType[] = [
  'ALL',
  'ACTIVE',
  'BUILDING',
  'LEARNING',
  'EXPLORING',
  'PAUSED',
  'COMPLETED'
];

/**
 * Build Log Entry Component
 */
function LogEntry({ entry, index }: { entry: BuildLogEntry, index: number }) {
  const { setCursor, resetCursor } = useCursorState();
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if entry is active/live
  const isActive = entry.status === 'ACTIVE' || entry.status === 'BUILDING';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className="group flex flex-col pt-8 pb-10 border-b border-white/[0.05] hover:border-[var(--gold)]/30 transition-colors duration-500"
    >
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-12 relative">

        {/* Left: Metadata */}
        <div className="w-full lg:w-[15%] flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start shrink-0">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#555] group-hover:text-[var(--gold)] transition-colors duration-300">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2 lg:mt-6">
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)] animate-pulse" />
            )}
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50">
              {entry.status}
            </span>
          </div>
          {entry.date && (
            <span className="hidden lg:block font-mono text-[9px] tracking-[0.2em] text-[#555] uppercase mt-4">
              {entry.date}
            </span>
          )}
        </div>

        {/* Center: Main Content */}
        <div className="w-full lg:w-[55%] flex flex-col gap-3">
          <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[var(--gold)] transition-colors duration-300">
            {entry.title}
          </h3>
          <p className="font-light text-sm md:text-base text-white/70 leading-relaxed md:pr-10">
            {entry.shortDescription}
          </p>
        </div>

        {/* Right: Technicals & CTA */}
        <div className="w-full lg:w-[30%] flex flex-row lg:flex-col justify-between items-end lg:items-start lg:justify-start pt-2 lg:pt-0 shrink-0 border-t border-white/5 lg:border-none mt-4 lg:mt-0 pt-4 lg:pt-0">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
              CATEGORY
            </span>
            <span className="font-mono text-[10px] md:text-xs tracking-wider text-white/70 uppercase">
              {entry.category}
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={resetCursor}
            className="lg:mt-auto font-mono text-[10px] tracking-[0.2em] text-white/50 hover:text-[var(--gold)] uppercase transition-colors flex items-center gap-2 group/btn"
          >
            {isExpanded ? 'CLOSE LOG' : 'VIEW LOG'}
            <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">
              {isExpanded ? '↖' : '↗'}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '2.5rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 md:p-10 bg-white/[0.02] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Left Detail */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--gold)] uppercase">
                    WHAT I'M EXPLORING
                  </span>
                  <p className="font-light text-sm text-white/80 leading-relaxed font-mono">
                    {entry.whatImExploring}
                  </p>
                </div>

                {entry.technologies && (
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
                      TECH STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {entry.technologies.map(tech => (
                        <span key={tech} className="font-mono text-[10px] px-2 py-1 bg-white/5 border border-white/10 text-white/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Detail */}
              <div className="flex flex-col items-start md:items-end text-left md:text-right gap-6">
                {(entry.progress || entry.status) && (
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
                      CURRENT STAGE
                    </span>
                    <span className="font-mono text-xs tracking-wider text-[var(--gold)] uppercase">
                      {entry.progress || entry.status}
                    </span>
                  </div>
                )}

                {entry.image && (
                  <div className="w-full h-32 md:h-full min-h-[120px] bg-white/5 border border-white/10 mt-2 relative overflow-hidden flex items-center justify-center">
                    {/* Placeholder for real images when they arrive */}
                    <span className="font-mono text-[9px] tracking-widest text-[#555]">[VISUAL_ASSET_PENDING]</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Main Section
 */
export function BuildLogSection() {
  const { setCursor, resetCursor } = useCursorState();
  const [filter, setFilter] = useState<FilterType>('ALL');

  // Filter the data
  const filteredData = filter === 'ALL'
    ? buildLogData
    : buildLogData.filter(entry => entry.status === filter);

  return (
    <section
      id="build-log"
      className="section-spacing border-t border-white/5"
      style={{ background: 'var(--near-black)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between w-full mb-20 lg:mb-32 gap-10">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
            <FadeIn>
              <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--muted-grey)] uppercase">
                07 / BUILD LOG
              </span>
            </FadeIn>
            <TextReveal as="h2" className="text-section-title text-[var(--white)]">
              BUILD LOG
            </TextReveal>
            <FadeIn delay={0.2}>
              <p className="font-mono text-xs md:text-sm text-white/40 tracking-[0.02em] mt-2">
                Things I'm currently building, learning and breaking.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="shrink-0 hidden lg:block">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--gold)]/50 uppercase">
              THE WORK CONTINUES.
            </span>
          </FadeIn>
        </div>

        {/* Filters */}
        <FadeIn delay={0.4} className="mb-16">
          <div className="flex overflow-x-auto pb-4 hide-scrollbar w-full border-b border-white/10">
            <div className="flex gap-8 lg:gap-12 min-w-max">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={resetCursor}
                  className="relative pb-4 group"
                >
                  <span
                    className={`font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${filter === f ? 'text-[var(--gold)] font-medium' : 'text-white/40 group-hover:text-white/80'
                      }`}
                  >
                    {f}
                  </span>
                  {filter === f && (
                    <motion.div
                      layoutId="bl-active-filter"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Content List */}
        <div className="flex flex-col w-full min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((entry, idx) => (
                <LogEntry key={`${entry.id}-${filter}`} entry={entry} index={idx} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex items-center justify-center h-48 border border-white/5 bg-white/[0.01]"
              >
                <span className="font-mono text-xs tracking-widest text-[#555] uppercase text-center leading-loose">
                  NOTHING HERE.<br />YET.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

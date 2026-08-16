'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { projectsData, Project } from '@/data/projects';
import { useCursorState } from '@/providers/CursorProvider';
import { AnimatedProcessingPlaceholder } from '@/components/ui/AnimatedProcessingPlaceholder';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export type FilterType = 'all' | 'academic' | 'personal' | 'hackathon';

function getProjectMetadata(project: Project, index: number): string {
  const num = String(index + 1).padStart(2, '0');
  let meta = `${num}`;
  if (project.classification === 'academic') meta += ` / ACADEMIC${project.academicYear ? ` · ${project.academicYear.toUpperCase()}` : ''}`;
  else if (project.classification === 'personal') meta += ` / PERSONAL PROJECT`;
  else if (project.classification === 'hackathon') meta += ` / HACKATHON PROJECT`;
  else meta += ` / PROJECT`;
  return meta;
}

export function ProjectsSection() {
  const prefersReduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { setCursor, resetCursor } = useCursorState();

  const [filter, setFilter] = useState<FilterType>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredProjects = projectsData.filter((p: Project) => filter === 'all' || p.classification === filter);
  const numProjects = filteredProjects.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  const handleNext = useCallback(() => setActiveIndex(i => (i + 1) % numProjects), [numProjects]);
  const handlePrev = useCallback(() => setActiveIndex(i => (i - 1 + numProjects) % numProjects), [numProjects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80) handlePrev();
    else if (info.offset.x < -80) handleNext();
  };

  return (
    <section id="projects" className="relative bg-[var(--deep-black)] min-h-[100vh] pt-24 lg:pt-32 pb-24 flex flex-col items-center justify-start overflow-hidden">

      {/* Spacer removed - rely on section padding from previous sections to prevent excessive gaps */}
      {/* ── Editorial Header & Filter ── */}
      <div className="z-50 flex flex-col items-center justify-center text-center gap-6 mix-blend-difference px-8 lg:px-24 w-full shrink-0 pointer-events-auto mb-16 lg:mb-20">
        <h2 className="text-[clamp(3rem,6vw,6rem)] font-bold uppercase text-[var(--white)] leading-[0.9] tracking-[-0.03em] shrink-0">
          THE BUILDS
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 overflow-x-auto no-scrollbar" role="tablist">
          {(['all', 'academic', 'personal', 'hackathon'] as FilterType[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[9px] lg:text-[10px] tracking-[0.2em] transition-colors duration-300 uppercase pb-1 whitespace-nowrap outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--deep-black)]
                  ${filter === f ? 'text-[var(--gold)] border-b border-[var(--gold)]' : 'text-[var(--muted-grey)] hover:text-[var(--white)] border-b border-transparent'}`}
            >
              {f === 'hackathon' ? 'Hackathons' : f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Central Carousel Area ── */}
      <div className="relative w-full flex-1 min-h-[600px] flex items-center justify-center pointer-events-none mt-12 lg:mt-0">

        {/* Side Navigation Arrows */}
        {numProjects > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-40 p-4 text-[var(--muted-grey)] hover:text-[var(--gold)] transition-opacity duration-300 pointer-events-auto outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
              aria-label="Previous Project"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="scale-75 lg:scale-100">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-40 p-4 text-[var(--muted-grey)] hover:text-[var(--gold)] transition-opacity duration-300 pointer-events-auto outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
              aria-label="Next Project"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="scale-75 lg:scale-100">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          {numProjects === 0 && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center p-8 pointer-events-auto"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted-grey)] border border-[var(--border-subtle)] px-8 py-4 uppercase">
                MORE BUILDS IN PROGRESS.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProjects.map((project: Project, index: number) => {
          let rawOffset = index - activeIndex;
          const half = Math.floor(numProjects / 2);
          if (rawOffset > half) rawOffset -= numProjects;
          else if (rawOffset < -half) rawOffset += numProjects;

          const offset = rawOffset;
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2; // only render adjacent cards for dom performance

          if (!isVisible && !prefersReduced) return null;

          let xCalc = `calc(-50% + 0vw)`;
          let scaleVal = 1;
          let opacityVal = 1;
          let zIndexVal = 10;
          // Subdued neighbor style
          let filterVal = 'blur(0px)';

          if (offset === 1) {
            xCalc = isDesktop ? `calc(-50% + 25vw)` : `calc(-50% + 75vw)`;
            scaleVal = 0.85;
            opacityVal = 0.4;
            zIndexVal = 5;
            filterVal = 'blur(3px)';
          } else if (offset === -1) {
            xCalc = isDesktop ? `calc(-50% - 25vw)` : `calc(-50% - 75vw)`;
            scaleVal = 0.85;
            opacityVal = 0.4;
            zIndexVal = 5;
            filterVal = 'blur(3px)';
          } else if (offset > 1) {
            xCalc = isDesktop ? `calc(-50% + 50vw)` : `calc(-50% + 150vw)`;
            scaleVal = 0.65;
            opacityVal = 0;
            zIndexVal = 1;
            filterVal = 'blur(5px)';
          } else if (offset < -1) {
            xCalc = isDesktop ? `calc(-50% - 50vw)` : `calc(-50% - 150vw)`;
            scaleVal = 0.65;
            opacityVal = 0;
            zIndexVal = 1;
            filterVal = 'blur(5px)';
          }

          return (
            <motion.article
              key={project.id}
              className={`absolute top-[50%] left-[50%] w-[90vw] md:w-[65vw] lg:w-[45vw] max-w-[640px] aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ${isActive ? 'pointer-events-auto shadow-[0_24px_80px_rgba(0,0,0,0.7)] ring-1 ring-[var(--gold)]/20' : 'pointer-events-auto hover:ring-1 hover:ring-white/20 cursor-pointer'} group`}
              style={{ y: '-50%' }}
              initial={prefersReduced ? { opacity: 0 } : false}
              animate={{
                x: prefersReduced ? '-50%' : xCalc,
                scale: prefersReduced ? 1 : scaleVal,
                opacity: prefersReduced ? (isActive ? 1 : 0) : opacityVal,
                filter: filterVal,
                zIndex: zIndexVal
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => { if (!isActive) setActiveIndex(index); }}
              drag={isActive && !prefersReduced ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => { if (!isActive) setCursor('explore'); }}
              onMouseLeave={resetCursor}
            >
              {/* ── Full-bleed background image ── */}
              <motion.div
                className="absolute inset-0 z-0 bg-[#0a0a0a]"
                whileHover={isActive && !prefersReduced ? { scale: 1.03 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {project.status === 'IN PROGRESS' ? (
                  <div className="w-full h-full bg-[var(--surface-elevated)] flex items-center justify-center">
                    <AnimatedProcessingPlaceholder projectName={project.title} />
                  </div>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover" // Fits perfectly because container is exactly 16:9
                    sizes="(max-width: 768px) 100vw, 1200px"
                    quality={95}
                    priority={isActive}
                  />
                )}
                {/* Always-on subtle shadow at bottom so it doesn't look flat before hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* ── Hover-Reveal Glassmorphic Panel ── */}
              {/* Uses CSS translate to slide up and opacity to fade in on group-hover for desktop. Constantly visible on small viewports. */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start text-left bg-[var(--deep-black)]/85 md:bg-[var(--surface-elevated)]/70 backdrop-blur-3xl border-t border-white/10 p-5 md:p-6 lg:p-8 transform translate-y-0 md:translate-y-[10px] lg:translate-y-[20px] opacity-100 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {/* Subtle top inner shadow for depth */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Metadata */}
                <div className="font-mono text-[9px] lg:text-[10px] tracking-[0.25em] text-[var(--gold)]/80 mb-2 uppercase">
                  {getProjectMetadata(project, index)}
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-[1.1] tracking-tight mb-2 drop-shadow-md">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--soft-white)] font-light text-xs lg:text-sm leading-relaxed line-clamp-2 mb-5 max-w-[95%]">
                  {project.shortDescription}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[8px] lg:text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                {project.status !== 'IN PROGRESS' && (
                  <div className="pointer-events-auto w-full">
                    <Button
                      variant="primary"
                      size="md"
                      href={`/builds/${project.id}`}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        if (!isActive) e.preventDefault();
                      }}
                      onMouseEnter={() => { if (isActive) setCursor('open') }}
                      onMouseLeave={resetCursor}
                      tabIndex={isActive ? 0 : -1}
                      className="w-full justify-center"
                    >
                      VIEW PROJECT
                    </Button>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* ── Progress Indicator Footer ── */}
      {numProjects > 0 && (
        <div className="absolute bottom-12 inset-x-8 lg:inset-x-24 z-50 flex justify-between items-center mix-blend-difference pointer-events-none">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-widest text-[var(--gold)] font-bold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="w-10 h-[1px] bg-[var(--border-subtle)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--muted-grey)]">
              {String(numProjects).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

    </section>
  );
}

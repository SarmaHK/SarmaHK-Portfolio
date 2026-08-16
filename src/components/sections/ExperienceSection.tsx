'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { useCursorState } from '@/providers/CursorProvider';
import { experiences } from '@/data/experience';
import { organizations } from '@/data/organizations';

export function ExperienceSection() {
    const { setCursor, resetCursor } = useCursorState();

    return (
        <section id="experience" className="w-full bg-[var(--near-black)] py-24 lg:py-40 border-t border-white/5">
            <div className="section-container">

                {/* =========================================
            HEADER
        =========================================== */}
                <div className="flex flex-col items-center text-center mb-20 lg:mb-32">
                    <FadeIn>
                        <span className="text-metadata text-[var(--gold)] mb-6 block uppercase">
                            05 / EXPERIENCES & LEADERSHIP
                        </span>
                    </FadeIn>

                    <TextReveal as="h2" className="text-[clamp(3rem,6vw,6rem)] font-extrabold font-[var(--font-display)] text-white uppercase tracking-tight leading-[0.95] max-w-4xl mx-auto">
                        EXPERIENCE & LEADERSHIP
                    </TextReveal>

                    <FadeIn delay={0.2} className="mt-8 max-w-2xl mx-auto">
                        <p className="text-lg text-white/60 font-light leading-relaxed">
                            Where I have applied my skills in the real world and the teams I have had the privilege to lead and learn from.
                        </p>
                    </FadeIn>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">

                    {/* =========================================
              LEFT COLUMN: PROFESSIONAL EXPERIENCE
          =========================================== */}
                    <div className="flex-1 w-full flex flex-col gap-12">
                        <FadeIn>
                            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 uppercase tracking-wider font-display">
                                Professional Experience
                            </h3>
                        </FadeIn>

                        <div className="flex flex-col gap-8">
                            {experiences.map((exp, idx) => (
                                <FadeIn key={exp.id} delay={0.1 * idx}>
                                    <motion.div
                                        className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-[var(--gold)]/30 transition-all duration-500 overflow-hidden"
                                        onMouseEnter={() => setCursor('view')}
                                        onMouseLeave={resetCursor}
                                    >
                                        {/* Subtle glow effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                        <div className="relative z-10 flex flex-col gap-4">
                                            {/* Header line */}
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                <h4 className="text-xl font-bold text-white tracking-tight">{exp.company}</h4>
                                                <span className="font-mono text-xs text-[var(--gold)] bg-[var(--gold)]/10 px-3 py-1 rounded-full whitespace-nowrap self-start">
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <div className="text-sm font-semibold text-[var(--gold)] uppercase tracking-widest font-mono">
                                                {exp.role}
                                            </div>

                                            {/* Content block */}
                                            <div className="mt-2 text-white/70 font-light text-sm leading-relaxed">
                                                {exp.contribution && exp.contribution !== '[CONTRIBUTION_PENDING]' ? (
                                                    <p>{exp.contribution}</p>
                                                ) : (
                                                    <p className="opacity-50 italic">
                                                        [Briefly describe your core contribution, project, or role impact here.]
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* =========================================
              RIGHT COLUMN: LEADERSHIP & ORGANIZATIONS
          =========================================== */}
                    <div className="flex-1 w-full flex flex-col gap-12">
                        <FadeIn delay={0.1}>
                            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 uppercase tracking-wider font-display">
                                Leadership
                            </h3>
                        </FadeIn>

                        <div className="flex flex-col gap-8">
                            {organizations.map((org, idx) => (
                                <FadeIn key={org.id} delay={0.2 + (0.1 * idx)}>
                                    <motion.div
                                        className="group relative bg-transparent border-t border-white/10 pt-6 hover:border-[var(--gold)]/50 transition-colors duration-500"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="text-lg font-bold text-[var(--gold)] tracking-tight">{org.name}</h4>
                                            </div>

                                            <div className="text-white/60 font-light text-xs leading-relaxed mt-2">
                                                {org.description && org.description !== '[DESCRIPTION_PENDING]' ? (
                                                    <p>{org.description}</p>
                                                ) : (
                                                    <p className="opacity-50 italic">
                                                        [Describe your overall experience, what you gained as a leader, and the general impact you made.]
                                                    </p>
                                                )}
                                            </div>

                                            {/* Role History Dropdown */}
                                            {org.roleHistory && org.roleHistory.length > 0 && (
                                                <details className="mt-4 group/details">
                                                    <summary className="text-[10px] font-mono text-[var(--gold)]/80 cursor-pointer select-none outline-none 
                                                        [&::-webkit-details-marker]:hidden uppercase tracking-widest border border-white/10 px-3 py-2 
                                                        inline-flex items-center gap-2 rounded hover:bg-white/5 hover:text-[var(--gold)] transition-colors">
                                                        <span>VIEW MORE</span>
                                                        <svg className="w-3 h-3 transition-transform duration-300 group-open/details:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </summary>
                                                    <div className="mt-5 flex flex-col gap-5 pl-4 border-l border-white/10">
                                                        {org.roleHistory.map((r, i) => (
                                                            <div key={r.title + i} className="flex flex-col gap-1">
                                                                <h6 className="text-[13px] font-medium text-white/90">{r.title}</h6>
                                                                <div className="text-[9px] uppercase font-mono text-[var(--gold)]/70 tracking-widest">{r.period}</div>
                                                                {r.description && (
                                                                    <p className="text-[11px] text-white/50 leading-relaxed mt-1">
                                                                        {r.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </details>
                                            )}
                                        </div>
                                    </motion.div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

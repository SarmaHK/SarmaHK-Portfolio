'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { TextReveal } from '@/components/motion/TextReveal';
import { useCursorState } from '@/providers/CursorProvider';

export function SkillsSection() {
    const { setCursor, resetCursor } = useCursorState();

    const skills = [
        { name: 'JavaScript', percentage: 90 },
        { name: 'Java', percentage: 80 },
        { name: 'C++', percentage: 70 },
        { name: 'Python', percentage: 50 },
    ];

    const frameworks = ['React.js', 'Next.js', 'Node.js', 'Express', 'TailwindCSS'];
    const infrastructure = ['AWS', 'Google Cloud', 'Docker', 'MongoDB', 'PostgreSQL'];

    return (
        <section
            id="skills"
            className="section-spacing border-t border-white/5 pb-32 lg:pb-48"
            style={{ background: 'var(--near-black)' }}
        >
            <div className="section-container">

                {/* ── Editorial Header ── */}
                <div className="flex flex-col items-center justify-center text-center w-full shrink-0 mt-4">
                    <TextReveal as="h2" className="text-section-title text-gold">
                        TECHNICAL ARSENAL
                    </TextReveal>
                </div>

                {/* ── Physical Spacer ── */}
                <div className="h-12 lg:h-24 w-full" />

                {/* ── Two Column Layout ── */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* LEFT COLUMN: CORE LANGUAGES (Progress Bars) */}
                    <div className="flex flex-col gap-8 lg:gap-10">
                        <FadeIn>
                            <h3 className="font-mono text-xs tracking-widest text-[var(--muted-grey)] uppercase mb-4 block">
                                // 01. Core Languages
                            </h3>
                        </FadeIn>

                        {skills.map((skill, index) => (
                            <FadeIn key={skill.name} delay={index * 0.1}>
                                <div
                                    className="flex flex-col xl:flex-row xl:items-center gap-4 group"
                                    onMouseEnter={() => setCursor('explore')}
                                    onMouseLeave={resetCursor}
                                >
                                    {/* Left Side: Skill Name */}
                                    <div className="w-full xl:w-1/3 shrink-0">
                                        <h3 className="font-display text-xl font-semibold tracking-tight text-white group-hover:text-[var(--gold)] transition-colors duration-300">
                                            {skill.name}
                                        </h3>
                                    </div>

                                    {/* Right Side: Thick Pill Progress Bar */}
                                    <div className="flex-1 w-full bg-white/5 rounded-full h-10 relative overflow-hidden shadow-inner border border-white/5">
                                        {/* Animated Pill Fill */}
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.percentage}%` }}
                                            viewport={{ once: true, margin: '-50px' }}
                                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--gold-muted)] to-[var(--gold)] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(200,164,93,0.2)]"
                                        >
                                            <span className="font-mono text-xs tracking-widest text-[#08090B] font-bold">
                                                {skill.percentage}%
                                            </span>
                                        </motion.div>

                                        {/* Hover interactive shimmer */}
                                        <motion.div
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            className="absolute inset-y-0 w-1/4 bg-white/20 skew-x-12 hidden group-hover:block"
                                        />
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: FRAMEWORKS & CLOUD (Terminal UI) */}
                    <div className="w-full flex flex-col gap-8 lg:gap-10">
                        <FadeIn delay={0.2}>
                            <h3 className="font-mono text-xs tracking-widest text-[var(--muted-grey)] uppercase mb-4 block">
                                // 02. Frameworks & Cloud
                            </h3>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div
                                className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden shadow-2xl relative group transition-colors duration-500 hover:border-white/20"
                                onMouseEnter={() => setCursor('view')}
                                onMouseLeave={resetCursor}
                            >
                                {/* Terminal Header */}
                                <div className="w-full h-10 bg-[#151515] border-b border-white/5 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/30" />
                                    <span className="ml-auto font-mono text-[10px] text-white/30 tracking-widest">sarmahk@system ~</span>
                                </div>

                                {/* Terminal Body */}
                                <div className="p-8 lg:p-12 font-mono text-sm lg:text-base leading-relaxed text-white/70 h-full flex flex-col justify-start">
                                    {/* Command 1 */}
                                    <div>
                                        <span className="text-[var(--gold)]">➜</span> <span className="text-[#6ED6D0]">~</span> <span className="text-white ml-2">load_frameworks.sh</span>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-3 lg:gap-4">
                                        {frameworks.map(f => (
                                            <span key={f} className="px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20 rounded-md text-[11px] lg:text-[13px] tracking-wider transition-colors duration-300 hover:bg-[var(--gold)] hover:text-black cursor-none">
                                                {f}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Command 2 */}
                                    <div className="mt-10 lg:mt-14">
                                        <span className="text-[var(--gold)]">➜</span> <span className="text-[#6ED6D0]">~</span> <span className="text-white ml-2">load_infrastructure.sh</span>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-3 lg:gap-4">
                                        {infrastructure.map(f => (
                                            <span key={f} className="px-4 py-1.5 bg-white/5 text-white/80 border border-white/10 rounded-md text-[11px] lg:text-[13px] tracking-wider transition-colors duration-300 hover:bg-white hover:text-black cursor-none">
                                                {f}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Blinking Cursor */}
                                    <motion.div
                                        className="mt-10 mb-2 w-3 h-5 lg:w-4 lg:h-6 bg-[var(--gold)]"
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                    />
                                </div>

                                {/* Specular glass highlight */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
                            </div>
                        </FadeIn>
                    </div>

                </div>

            </div>
        </section>
    );
}

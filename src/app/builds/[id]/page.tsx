import { notFound } from 'next/navigation';
import { projectsData, Project } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { AnimatedProcessingPlaceholder } from '@/components/ui/AnimatedProcessingPlaceholder';

export function generateStaticParams() {
    return projectsData.map((project) => ({
        id: project.id,
    }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
    const project = projectsData.find((p) => p.id === params.id);
    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title.replace('\n', ' ')} — Sarma HK`,
        description: project.shortDescription,
    };
}

export default function BuildDetail({ params }: { params: { id: string } }) {
    const projectIndex = projectsData.findIndex((p) => p.id === params.id);
    if (projectIndex === -1) notFound();

    const project = projectsData[projectIndex];

    // Cross-navigation
    const prevProject = projectsData[(projectIndex - 1 + projectsData.length) % projectsData.length];
    const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

    let metaString = '';
    if (project.classification === 'academic') metaString = `ACADEMIC${project.academicYear ? ` · ${project.academicYear.toUpperCase()}` : ''}`;
    else if (project.classification === 'personal') metaString = 'PERSONAL PROJECT';
    else if (project.classification === 'hackathon') metaString = 'HACKATHON PROJECT';
    else metaString = 'PROJECT EXPERIMENT';

    return (
        <main className="min-h-screen bg-[var(--deep-black)] pb-24 selection:bg-[var(--gold)] selection:text-[var(--near-black)]">
            {/* Top Navigation */}
            <nav className="fixed top-0 inset-x-0 h-24 flex items-center px-8 lg:px-24 z-50 mix-blend-difference pointer-events-none">
                <Link
                    href="/#projects"
                    className="font-mono text-[9px] lg:text-[10px] tracking-[0.2em] text-[var(--muted-grey)] hover:text-[var(--gold)] uppercase flex items-center gap-4 transition-colors pointer-events-auto"
                >
                    <span className="text-[var(--gold)]">←</span> BACK TO THE BUILDS
                </Link>
            </nav>

            {/* Hero Header */}
            <header className="pt-40 lg:pt-56 pb-24 px-8 lg:px-24 max-w-6xl mx-auto">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--gold)] mb-8 uppercase flex items-center gap-4">
                    <span>{String(projectIndex + 1).padStart(2, '0')}</span>
                    <span className="w-8 h-[1px] bg-[var(--gold)] opacity-50" />
                    <span>{metaString}</span>
                </div>
                <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-bold text-[var(--white)] uppercase leading-[0.9] tracking-[-0.03em] whitespace-pre-wrap mb-12">
                    {project.title}
                </h1>
                <p className="text-[var(--soft-white)] text-lg lg:text-2xl font-light leading-relaxed max-w-3xl">
                    {project.shortDescription}
                </p>

                {/* Global Action Links */}
                <div className="flex flex-wrap gap-8 mt-16 font-mono text-[10px] tracking-widest uppercase">
                    {project.github && (
                        <a href="#" className="flex items-center gap-3 text-[var(--white)] hover:text-[var(--gold)] border-b border-[var(--border)] hover:border-[var(--gold)] pb-2 transition-colors">
                            GITHUB REPOSITORY <span className="text-[var(--gold)]">↗</span>
                        </a>
                    )}
                    {project.demo && (
                        <a href="#" className="flex items-center gap-3 text-[var(--white)] hover:text-[var(--signal)] border-b border-[var(--border)] hover:border-[var(--signal)] pb-2 transition-colors">
                            LIVE DEMO <span className="text-[var(--signal)]">↗</span>
                        </a>
                    )}
                </div>
            </header>

            {/* Hero Media Block */}
            <div className="px-8 lg:px-24 mb-32 max-w-[1600px] mx-auto">
                <div className="w-full aspect-video border border-[var(--border)] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden group">
                    {project.status === 'IN PROGRESS' ? (
                        <div className="absolute inset-0 w-full h-full">
                            <AnimatedProcessingPlaceholder />
                        </div>
                    ) : (
                        <Image src={project.image} alt={project.title} fill className="object-contain p-8" priority />
                    )}
                    <div className="absolute inset-0 bg-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-color" />

                    {/* Decorative Corners */}
                    <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-[var(--muted-grey)] opacity-50" />
                    <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-[var(--muted-grey)] opacity-50" />
                </div>
            </div>

            {/* Editorial Body Content */}
            <article className="max-w-4xl mx-auto px-8 lg:px-0 flex flex-col gap-32">

                {/* 1. Technical Baseline */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                    <div className="md:col-span-1">
                        <h3 className="font-mono text-[10px] tracking-widest text-[var(--muted-grey)] uppercase mb-6">TECHNOLOGIES</h3>
                        <p className="font-mono text-[11px] lg:text-xs text-[var(--gold)] uppercase leading-loose">
                            {project.technologies && (
                                Array.isArray(project.technologies)
                                    ? project.technologies
                                    : project.technologies.split('·')
                            ).map((tech, i) => (
                                <span key={i} className="block border-b border-[var(--border-subtle)] pb-2 mb-2 last:border-0">{tech.trim()}</span>
                            ))}
                        </p>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-16">
                        {(project.whatWeBuilt || project.whatIBuilt) && (
                            <div className="flex flex-col gap-12">
                                {project.whatWeBuilt && (
                                    <div>
                                        <h3 className="font-mono text-[10px] tracking-widest text-[var(--muted-grey)] uppercase mb-6 border-l border-[var(--gold)] pl-4">WHAT WE BUILT</h3>
                                        <p className="text-[var(--soft-white)] font-light leading-relaxed">{project.whatWeBuilt}</p>
                                    </div>
                                )}
                                {project.whatIBuilt && (
                                    <div>
                                        <h3 className="font-mono text-[10px] tracking-widest text-[var(--muted-grey)] uppercase mb-6 border-l border-[var(--gold)] pl-4">WHAT I BUILT</h3>
                                        <p className="text-[var(--white)] font-light leading-relaxed">{project.whatIBuilt}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* 2. Deep Dive (if provided) */}
                {(project.problem || project.solution || project.overview) && (
                    <section className="border-t border-[var(--border-subtle)] pt-24 text-[var(--soft-white)] font-light leading-loose flex flex-col gap-16">
                        {project.overview && (
                            <div>
                                <h2 className="text-xl text-[var(--white)] font-medium tracking-wide mb-6">THE OVERVIEW</h2>
                                <p>{project.overview}</p>
                            </div>
                        )}

                        {(project.problem || project.solution) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
                                {project.problem && (
                                    <div className="bg-[var(--near-black)] border border-[var(--border)] p-8 lg:p-12">
                                        <h3 className="font-mono text-[10px] tracking-widest text-[var(--gold)] uppercase mb-6">PROBLEM SPACE</h3>
                                        <p className="text-sm">{project.problem}</p>
                                    </div>
                                )}
                                {project.solution && (
                                    <div className="bg-[var(--surface-primary)] border border-[var(--border)] p-8 lg:p-12">
                                        <h3 className="font-mono text-[10px] tracking-widest text-[var(--gold)] uppercase mb-6">SOLUTION</h3>
                                        <p className="text-sm text-[var(--white)]">{project.solution}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                )}

                {/* 3. Build Process & Outcome */}
                {(project.process || project.outcome) && (
                    <section className="text-[var(--soft-white)] font-light leading-loose flex flex-col gap-16">
                        {project.process && (
                            <div>
                                <h2 className="text-xl text-[var(--white)] font-medium tracking-wide mb-6">BUILD PROCESS</h2>
                                <p>{project.process}</p>
                            </div>
                        )}
                        {project.outcome && (
                            <div className="border-l-2 border-[var(--gold)] pl-8 py-2">
                                <h3 className="font-mono text-[10px] tracking-widest text-[var(--muted-grey)] uppercase mb-4">OUTCOME & RESULT</h3>
                                <p className="text-[var(--white)] text-lg">{project.outcome}</p>
                            </div>
                        )}
                    </section>
                )}

                {/* 4. Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <section className="pt-24 border-t border-[var(--border-subtle)]">
                        <h2 className="font-mono text-[10px] tracking-widest text-[var(--muted-grey)] uppercase mb-16 text-center">GALLERY ARCHIVE</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.gallery.map((img, i) => (
                                <div key={i} className="aspect-square bg-[var(--surface-primary)] border border-[var(--border)] flex justify-center items-center p-8 text-center overflow-hidden relative">
                                    <span className="font-mono text-[9px] tracking-widest text-[var(--muted-grey)]">{img}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </article>

            {/* Footer Navigation */}
            <footer className="mt-40 border-t border-[var(--border-subtle)]">
                <div className="max-w-7xl mx-auto px-8 lg:px-24 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">

                    <Link href={`/builds/${prevProject.id}`} className="group flex-1 py-16 sm:py-24 flex flex-col gap-4 text-left hover:bg-[var(--near-black)] transition-colors pr-8">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted-grey)] uppercase group-hover:text-[var(--gold)] transition-colors">← PREVIOUS BUILD</span>
                        <span className="text-2xl lg:text-4xl text-[var(--white)] font-bold tracking-tight uppercase line-clamp-1">{prevProject.title}</span>
                    </Link>

                    <Link href={`/builds/${nextProject.id}`} className="group flex-1 py-16 sm:py-24 flex flex-col gap-4 text-right hover:bg-[var(--near-black)] transition-colors sm:pl-8">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted-grey)] uppercase group-hover:text-[var(--gold)] transition-colors">NEXT BUILD →</span>
                        <span className="text-2xl lg:text-4xl text-[var(--white)] font-bold tracking-tight uppercase line-clamp-1">{nextProject.title}</span>
                    </Link>

                </div>
            </footer>
        </main>
    );
}

import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TripleISection } from '@/components/sections/TripleISection';
import { HackathonsSection } from '@/components/sections/HackathonsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ArchiveSection } from '@/components/sections/ArchiveSection';
import { FieldNotesSection } from '@/components/sections/FieldNotesSection';
import { ScoreboardSection } from '@/components/sections/ScoreboardSection';

import { NowSection } from '@/components/sections/NowSection';
import { Footer } from '@/components/ui/Footer';

/**
 * Home page — story structure per §07.
 * All sections are skeletons with placeholders.
 * Content will be supplied in later phases.
 */
export default function Home() {
  return (
    <main>
      {/* HERO */}
      <HeroSection />

      {/* Story divider */}
      <div className="section-divider" />

      {/* THE PERSON BEHIND THE BUILDS */}
      <AboutSection />

      {/* CORE LANGUAGES */}
      <SkillsSection />

      <div className="section-divider" />

      {/* THINGS I MADE */}
      <ProjectsSection />

      <div className="section-divider" />

      {/* HACKATHONS */}
      <HackathonsSection />

      <div className="section-divider" />

      {/* TEAM TRIPLE I */}
      <TripleISection />

      <div className="section-divider" />

      {/* EXPERIENCE & LEADERSHIP */}
      <ExperienceSection />

      <div className="section-divider" />

      {/* THE SCOREBOARD (Achievements) */}
      <ScoreboardSection />

      <div className="section-divider" />

      {/* PROOF OF WORK */}
      <ArchiveSection />

      <div className="section-divider" />

      {/* OUTSIDE THE IDE */}
      <FieldNotesSection />



      {/* NOW */}
      <NowSection />



      {/* FOOTER */}
      <Footer />
    </main>
  );
}

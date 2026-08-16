/* ============================================================
   DATA TYPES — Sarma HK Portfolio
   All content interfaces for the data-driven architecture (§30)
   ============================================================ */

// --- Projects (§09) ---
export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  status: 'completed' | 'in-progress' | 'archived';
  description: string;
  technologies: string[];
  role: string;
  team: string;
  problem: string;
  solution: string;
  impact: string;
  gallery: string[];
  github: string;
  demo: string;
  caseStudy: string;
  image: string;
}

// --- Hackathons (§11) ---
export interface Hackathon {
  id: string;
  year: string;
  name: string;
  shortDescription?: string;
  projectName?: string;
  team?: string;
  result?: string;
  photo?: string;
  certificate?: string;
  github?: string;
  demo?: string;
  eventLink?: string;
  story?: string;
}

// --- Certificates (§14) ---
export type CertificateCategory =
  | 'ALL'
  | 'SOFTWARE'
  | 'AI_ML'
  | 'DEVOPS'
  | 'NETWORKING'
  | 'CYBERSECURITY'
  | 'IOT';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  image: string;
  verificationUrl: string;
}

// --- Experience (§12) ---
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: 'full-time' | 'internship' | 'contract' | 'freelance';
  responsibilities: string[];
  technologies: string[];
  contribution: string;
  lessons: string[];
  certificate: string;
  media: string[];
}

// --- Organizations (§18) ---
export interface Organization {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  roleHistory?: { title: string; period: string; description?: string }[];
  contributions: string[];
  media: string[];
}

// --- Field Notes (§16) ---
export interface FieldNote {
  id: string;
  title: string;
  type: 'event' | 'visit' | 'workshop' | 'conference' | 'university';
  date: string;
  description: string;
  photos: string[];
  tags: string[];
}

// --- Creative Work (§17) ---
export interface CreativeWork {
  id: string;
  title: string;
  category: 'graphic-design' | 'video-editing' | 'visual-design' | 'marketing' | 'campaign' | 'creative-direction' | 'other';
  description: string;
  media: string[];
  year: string;
}

// --- Achievements / Scoreboard (§19) ---
export interface Achievement {
  id: string;
  title: string;
  category: 'hackathon' | 'placement' | 'sports' | 'academic' | 'other';
  event: string;
  result: string;
  year: string;
}

// --- Build Log (§20) ---
export type BuildLogStatus =
  | 'ACTIVE'
  | 'BUILDING'
  | 'LEARNING'
  | 'EXPLORING'
  | 'EXPERIMENTING'
  | 'PAUSED'
  | 'COMPLETED';

export interface BuildLogEntry {
  id: string;
  title: string;
  status: BuildLogStatus;
  category: string;
  date?: string;
  shortDescription: string;
  whatImExploring: string;
  technologies?: string[];
  progress?: string;
  image?: string;
  link?: string;
}

// --- Now (§21) ---
export interface NowItem {
  id: string;
  title: string;
  status: string;
  description: string;
  tags?: string[];
}

// --- Social Links ---
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string;
}

// --- CVs (§15) ---
export interface CV {
  id: string;
  path: string;
  label: string;
  description: string;
}

// --- Journey (§13) ---
export interface JourneyMilestone {
  id: string;
  date: string;
  title: string;
  domain: string;
  description: string;
}

// --- Navigation ---
export interface NavItem {
  number: string;
  label: string;
  href: string;
}

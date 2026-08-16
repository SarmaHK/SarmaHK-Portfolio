import { Certificate } from './types';

/**
 * Sarma HK — Certifications
 * Real mapped certificate data structure
 */
export const certificates: Certificate[] = [
  // ── AI / ML ──
  {
    id: 'cert-01',
    title: 'AIML Engineer – Stage 2',
    issuer: 'Machine Learning',
    date: '2024',
    category: 'AI_ML',
    image: '/certificates/AI_ML/AIML Engineer – Stage 2 E-Ceryificate.jpg',
    verificationUrl: '#',
  },

  // ── SOFTWARE ──
  {
    id: 'cert-02',
    title: 'Advanced React',
    issuer: 'Meta',
    date: '2024',
    category: 'SOFTWARE',
    image: '/certificates/SOFTWARE/Advance React.jpg',
    verificationUrl: '#',
  },
  {
    id: 'cert-03',
    title: 'React Basics',
    issuer: 'Meta',
    date: '2024',
    category: 'SOFTWARE',
    image: '/certificates/SOFTWARE/React Basics.jpg',
    verificationUrl: '#',
  },
  {
    id: 'cert-04',
    title: 'FrontEnd Development',
    issuer: 'Meta',
    date: '2024',
    category: 'SOFTWARE',
    image: '/certificates/SOFTWARE/FrontEnd Development.jpg',
    verificationUrl: '#',
  },
  {
    id: 'cert-05',
    title: 'CSS Depth',
    issuer: 'Meta',
    date: '2024',
    category: 'SOFTWARE',
    image: '/certificates/SOFTWARE/CSS Depth.jpg',
    verificationUrl: '#',
  },
  {
    id: 'cert-06',
    title: 'Web Design for Beginners',
    issuer: 'Meta',
    date: '2024',
    category: 'SOFTWARE',
    image: '/certificates/SOFTWARE/Web_Design_for_Beginners_E-Certificate.jpg',
    verificationUrl: '#',
  },

  // ── DEVOPS ──
  {
    id: 'cert-07',
    title: 'Version Control',
    issuer: 'Meta',
    date: '2024',
    category: 'DEVOPS',
    image: '/certificates/DEVOPS/Version control.jpg',
    verificationUrl: '#',
  },

  // ── CYBERSECURITY ──
  {
    id: 'cert-08',
    title: 'The Cybersecurity Threat Landscape',
    issuer: 'Security',
    date: '2024',
    category: 'CYBERSECURITY',
    image: '/certificates/CYBERSECURITY/The Cybersecurity Threa Landscape.jpeg',
    verificationUrl: '#',
  },
];

/** Available filter categories for the certificate archive */
export const certificateCategories = [
  'ALL',
  'SOFTWARE',
  'AI_ML',
  'DEVOPS',
  'CYBERSECURITY',
] as const;

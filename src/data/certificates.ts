import { Certificate } from './types';

/**
 * Sarma HK — Certifications
 * 16+ certifications across multiple domains
 */
export const certificates: Certificate[] = [
  // ── AI / ML ──
  {
    id: 'cert-01',
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'Stanford Online · DeepLearning.AI (Coursera)',
    date: '2024',
    category: 'AI_ML',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-02',
    title: 'Advanced Learning Algorithms',
    issuer: 'Stanford Online · DeepLearning.AI (Coursera)',
    date: '2024',
    category: 'AI_ML',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-03',
    title: 'Unsupervised Learning, Recommenders, Reinforcement Learning',
    issuer: 'Stanford Online · DeepLearning.AI (Coursera)',
    date: '2024',
    category: 'AI_ML',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-04',
    title: 'Machine Learning Specialization',
    issuer: 'Stanford Online · DeepLearning.AI (Coursera)',
    date: '2024',
    category: 'AI_ML',
    image: '',
    verificationUrl: '#',
  },

  // ── SOFTWARE ──
  {
    id: 'cert-05',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta (Coursera)',
    date: '2024',
    category: 'SOFTWARE',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-06',
    title: 'Programming with JavaScript',
    issuer: 'Meta (Coursera)',
    date: '2024',
    category: 'SOFTWARE',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-07',
    title: 'React Basics',
    issuer: 'Meta (Coursera)',
    date: '2024',
    category: 'SOFTWARE',
    image: '',
    verificationUrl: '#',
  },



  // ── DEVOPS ──
  {
    id: 'cert-10',
    title: 'Introduction to DevOps',
    issuer: 'IBM (Coursera)',
    date: '2024',
    category: 'DEVOPS',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-11',
    title: 'Docker Essentials: A Developer Introduction',
    issuer: 'IBM (Cognitive Class)',
    date: '2024',
    category: 'DEVOPS',
    image: '',
    verificationUrl: '#',
  },

  // ── NETWORKING ──
  {
    id: 'cert-12',
    title: 'Cisco Certified Network Associate (CCNA) — Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'NETWORKING',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-13',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'NETWORKING',
    image: '',
    verificationUrl: '#',
  },

  // ── CYBERSECURITY ──
  {
    id: 'cert-14',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'CYBERSECURITY',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-15',
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'CYBERSECURITY',
    image: '',
    verificationUrl: '#',
  },

  // ── IOT ──
  {
    id: 'cert-16',
    title: 'Introduction to IoT',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'IOT',
    image: '',
    verificationUrl: '#',
  },
  {
    id: 'cert-17',
    title: 'IoT Fundamentals: Connecting Things',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    category: 'IOT',
    image: '',
    verificationUrl: '#',
  },
];

/** Available filter categories for the certificate archive */
export const certificateCategories = [
  'ALL',
  'SOFTWARE',
  'AI_ML',
  'DEVOPS',
  'NETWORKING',
  'CYBERSECURITY',
  'IOT',
] as const;

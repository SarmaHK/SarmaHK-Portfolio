import { Achievement } from './types';

/**
 * Known achievements from the specification.
 * Details will be verified by the user.
 */
export const achievements: Achievement[] = [
  {
    id: 'ideasprint-champion',
    title: 'IdeaSprint 2026',
    category: 'hackathon',
    event: 'IdeaSprint 2026',
    result: 'Champion',
    year: '2026',
  },
  {
    id: 'techno-top10',
    title: 'Techno 2025',
    category: 'hackathon',
    event: 'Techno 2025',
    result: 'Top 10',
    year: '2025',
  },
  {
    id: 'sliot-semi',
    title: 'SLIoT 2026',
    category: 'hackathon',
    event: 'SLIoT 2026',
    result: 'Top 10 / Semi-Finalist',
    year: '2026',
  },
];

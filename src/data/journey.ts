import { JourneyMilestone } from './types';

/** Journey milestones will be supplied by the user. */
export const journey: JourneyMilestone[] = [];

/** Journey domain categories */
export const journeyDomains = [
  'Software',
  'AI / ML',
  'IoT',
  'Cloud',
  'DevOps',
  'Networking',
  'Cybersecurity',
  'Creative Technology',
] as const;

import { CV } from './types';

/**
 * Multiple CV system per §15.
 * PDF files will be supplied by the user.
 */
export const cvs: CV[] = [
  {
    id: 'software',
    path: '[SOFTWARE_CV_PENDING]',
    label: 'SOFTWARE',
    description: 'Software Engineering focus',
  },
  {
    id: 'ai-ml',
    path: '[AI_ML_CV_PENDING]',
    label: 'AI / ML',
    description: 'Artificial Intelligence & Machine Learning focus',
  },
  {
    id: 'cloud-devops',
    path: '[CLOUD_DEVOPS_CV_PENDING]',
    label: 'CLOUD / DEVOPS',
    description: 'Cloud & DevOps focus',
  },
  {
    id: 'iot-embedded',
    path: '[IOT_EMBEDDED_CV_PENDING]',
    label: 'IOT / EMBEDDED',
    description: 'IoT & Embedded Systems focus',
  },
  {
    id: 'general',
    path: '[GENERAL_CV_PENDING]',
    label: 'GENERAL',
    description: 'General purpose CV',
  },
];

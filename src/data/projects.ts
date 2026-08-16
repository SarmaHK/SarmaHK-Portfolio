export type ProjectClassification = 'academic' | 'personal' | 'hackathon';
export type AcademicYear = 'Year 01' | 'Year 02' | 'Year 03' | 'Year 04';

export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    tags?: string[];
    whatIBuilt?: string;
    whatWeBuilt?: string;
    technologies?: string | string[];
    image: string;
    gallery?: string[];
    status?: string;
    classification?: ProjectClassification;
    academicYear?: AcademicYear;
    overview?: string;
    problem?: string;
    solution?: string;
    features?: string[];
    process?: string;
    outcome?: string;
    github?: string;
    demo?: string;
    caseStudy?: string;
}

export const projectsData: Project[] = [
    {
        id: 'task-management-system',
        title: 'Task Management System',
        shortDescription: 'Comprehensive task tracking and productivity tool.',
        tags: ['SaaS', 'Full Stack', 'Web App'],
        image: '/images/projects/Task_Management_System.png',
    },
    {
        id: 'smartcare',
        title: 'SmartCare',
        shortDescription: 'Healthcare tracking and management application.',
        tags: ['Healthcare', 'Full Stack', 'Web App'],
        image: '/images/projects/smartcare.jpg',
    },
    {
        id: 'wasteeye-lk',
        title: 'WasteEye LK',
        shortDescription: 'Smart waste management and tracking system for Sri Lanka.',
        tags: ['AI', 'IoT', 'Smart City'],
        image: '/images/projects/WasteEYE_LK.jpg',
    },
    {
        id: 'eldreach',
        title: 'EldReach',
        shortDescription: 'Privacy-focused elderly monitoring without cameras or wearables.',
        tags: ['IoT', 'AI', 'Healthcare'],
        image: '/images/projects/EldReach.jpg',
    },
    {
        id: 'snapapi',
        title: 'SnapAPI',
        shortDescription: 'Simplified API testing and integration tool.',
        tags: ['DevTool', 'API', 'SaaS'],
        image: '/images/projects/snapAPI.png',
    },
    {
        id: 'insightflow',
        title: 'InsightFlow',
        shortDescription: 'Data visualization and analytics dashboard.',
        tags: ['Analytics', 'Dashboard', 'Full Stack'],
        image: '/images/projects/insightflow.png',
    },
    {
        id: 'weather-information-app',
        title: 'Weather App',
        shortDescription: 'Real-time weather tracking and forecasting mobile app.',
        tags: ['Mobile', 'API', 'Kotlin'],
        image: '/images/projects/Weather app.png',
        github: 'https://github.com/SarmaHK/Weather-Information-Mobile-Application',
    },
    {
        id: 'sns-console-game',
        title: 'S&S Console Game',
        shortDescription: 'A console-based matching game built around letters, numbers and symbols.',
        tags: ['C++', 'Console', 'Game'],
        image: '/images/projects/S&S console game.png',
    },
    {
        id: 'retro-snake-game',
        title: 'Retro Snake Game',
        shortDescription: 'Classic snake game implemented with modern mechanics.',
        tags: ['C++', 'Console', 'Game'],
        image: '/images/projects/Retro Snake gamer.png',
    },
    {
        id: 'lanka-courier-management-system',
        title: 'Lanka Courier Management System',
        shortDescription: 'Complete logistics and courier tracking management solution.',
        tags: ['Logistics', 'Full Stack', 'Web App'],
        image: '/images/projects/Lankacourier management system.png',
    },
    {
        id: 'url-shortener',
        title: 'URL Shortener',
        shortDescription: 'Fast and efficient URL shortening service.',
        tags: ['Web App', 'Backend', 'SaaS'],
        image: '/images/projects/URLshortner.jpg',
    },
    {
        id: 'horoscope-management-system',
        title: 'Horoscope Management System',
        shortDescription: 'Processing Project: astrological tracking and reporting system.',
        tags: ['Java', 'Processing'],
        image: '/window.svg',
        status: 'IN PROGRESS',
    },
    {
        id: 'blind-assistance-system',
        title: 'Blind Assistance System',
        shortDescription: 'Processing Project: accessibility tool and environmental awareness app.',
        tags: ['AI', 'Accessibility', 'IoT'],
        image: '/file.svg',
        status: 'IN PROGRESS',
    },
    {
        id: 'map-navigator-gadget',
        title: 'Map Navigator Gadget',
        shortDescription: 'Processing Project: geolocation routing and mapping interface.',
        tags: ['IoT', 'Embedded', 'GPS'],
        image: '/globe.svg',
        status: 'IN PROGRESS',
    }
];

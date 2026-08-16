export interface StoryCard {
    chapter: string;
    title: string;
    metadata: string;
    description: string;
    schoolName?: string;
    universityName?: string;
    degree?: string;
    imagePlaceholder?: string;
    lines?: string[];
    highlight?: string;
    conclusion?: string;
    internshipInfo?: string;
}

export const storyData: Record<string, StoryCard> = {
    person: {
        chapter: '01',
        title: 'HOW I\nGOT HERE.',
        metadata: 'ORIGIN',
        description: 'Curious about technology, constantly exploring new ideas, and always looking for something new to build.',
    },
    school: {
        chapter: '02',
        title: 'WHERE\nCURIOSITY\nSTARTED.',
        metadata: 'FOUNDATION',
        schoolName: 'Vavuniya Tamil Madhya Maha Vidyalayam',
        imagePlaceholder: '/images/hero/Vavuniya_Tamil_Madhya_Maha_Vidyalayam.jpg',
        description: 'Vavuniya Tamil Madhya Maha Vidyalayam laid the foundation for my academic and personal growth.',
    },
    university: {
        chapter: '03',
        title: 'WHERE IT\nBECAME\nTECHNOLOGY.',
        metadata: 'HIGHER ED',
        universityName: 'UNIVERSITY OF KELANIYA',
        degree: 'BSc (Hons) in Information Technology',
        imagePlaceholder: '/images/hero/Kelaniya.png',
        description: 'Exploring Software, AI/ML, IoT, Cloud, Networking, and Cybersecurity.',
    },
    nextChapter: {
        chapter: '04',
        title: 'THE NEXT\nCHAPTER.',
        metadata: 'TRANSITION',
        description: '',
        lines: [
            'Years of learning.',
            'Projects.',
            'Experiments.',
            'Competitions.'
        ],
        highlight: 'Now...',
        conclusion: 'REAL WORLD.',
        internshipInfo: '[INTERNSHIP_INFORMATION_PENDING]',
    }
};

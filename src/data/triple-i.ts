export interface TripleIEvent {
    id: string;
    image: string;
    event: string;
    year: string;
    result?: string;
    description?: string;
    story?: string;
    link?: string;
}

export const tripleIData: TripleIEvent[] = [
    {
        id: 'ideasprint-26',
        event: 'IDEASPRINT',
        year: '2026',
        result: 'CHAMPIONS',
        image: '/images/triple-i/Ideasprint 2026.jpeg',
        description: 'Emerged as champions in the Ideasprint hackathon, showcasing our ability to ideate and build scalable solutions under pressure.',
    },
    {
        id: 'techno-25',
        event: 'TECHNO',
        year: '2025',
        result: 'TOP 10 FINALISTS',
        image: '/images/triple-i/Techno 2025.jpeg',
        description: 'Secured a spot in the Top 10 Finalists. A milestone in pushing boundaries with innovative tech implementations.',
    },
    {
        id: 'sliot-26',
        event: 'SLIoT',
        year: '2026',
        result: 'TOP 10 / SEMI-FINALISTS',
        image: '/images/triple-i/SLIOT 2026.jpeg',
        description: 'Recognized as Top 10 semi-finalists, demonstrating technical excellence in IoT and connected systems design.',
    }
];

'use client';

import { useEffect, useState, useCallback, useSyncExternalStore } from 'react';

// ── Section definitions ──
export interface SectionEntry {
    id: string;
    label: string;
    number: string;
}

export const sections: SectionEntry[] = [
    { id: 'hero', label: 'HERO', number: '00' },
    { id: 'about', label: 'HOW I GOT HERE', number: '01' },
    { id: 'projects', label: 'BUILDS', number: '02' },
    { id: 'hackathons', label: 'HACKATHONS', number: '03' },
    { id: 'triple-i', label: 'TRIPLE I', number: '04' },
    { id: 'experience', label: 'LEADERSHIP', number: '05' },
    { id: 'archive', label: 'ARCHIVE', number: '06' },
    { id: 'field-notes', label: 'FIELD NOTES', number: '07' },
    { id: 'build-log', label: 'BUILD LOG', number: '08' },
    { id: 'now', label: 'NOW', number: '09' },
];

// ── Scroll progress (0-1) ──
const subscribeScroll = (callback: () => void) => {
    if (typeof window === 'undefined') return () => { };
    window.addEventListener('scroll', callback, { passive: true });
    return () => window.removeEventListener('scroll', callback);
};

const getScrollSnapshot = () => {
    if (typeof window === 'undefined') return 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
};

const getServerScrollSnapshot = () => 0;

export function useScrollProgress(): number {
    return useSyncExternalStore(subscribeScroll, getScrollSnapshot, getServerScrollSnapshot);
}

// ── Active section detection ──
export function useActiveSection(): SectionEntry {
    const [active, setActive] = useState<SectionEntry>(sections[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find the most visible section
                let maxRatio = 0;
                let mostVisible = '';
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        mostVisible = entry.target.id;
                    }
                });
                if (mostVisible) {
                    const found = sections.find((s) => s.id === mostVisible);
                    if (found) setActive(found);
                }
            },
            { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-10% 0px -10% 0px' }
        );

        // Observe all sections
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return active;
}

// ── Smooth scroll to section ──
export function useScrollToSection() {
    return useCallback((sectionId: string) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);
}

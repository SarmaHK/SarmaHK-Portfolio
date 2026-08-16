'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') return () => { };
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // lg breakpoint
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
};

const getSnapshot = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 1024px)').matches;
};

const getServerSnapshot = () => false;

/**
 * Detects if the viewport is large enough (desktop).
 * Safe for SSR hydration.
 */
export function useIsDesktop(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

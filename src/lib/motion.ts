/**
 * Global Motion Language — Reusable Framer Motion Variants
 * Establishes a consistent animation system across the entire portfolio.
 */

// ── Easing tokens ──
export const ease = {
    outExpo: [0.16, 1, 0.3, 1] as const,
    outQuart: [0.25, 1, 0.5, 1] as const,
    inOutQuart: [0.76, 0, 0.24, 1] as const,
    spring: { type: 'spring' as const, stiffness: 400, damping: 30 },
    springGentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
};

// ── Duration tokens ──
export const duration = {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    slower: 1.2,
    cinematic: 1.8,
};

// ── Fade Reveal ──
export const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.outExpo } },
    exit: { opacity: 0, y: 20, transition: { duration: duration.normal } },
};

export const fadeDown = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.outExpo } },
    exit: { opacity: 0, y: -20, transition: { duration: duration.normal } },
};

export const fadeLeft = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: ease.outExpo } },
    exit: { opacity: 0, x: -30, transition: { duration: duration.normal } },
};

export const fadeRight = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: ease.outExpo } },
    exit: { opacity: 0, x: 30, transition: { duration: duration.normal } },
};

export const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: duration.slow } },
    exit: { opacity: 0, transition: { duration: duration.normal } },
};

// ── Mask Reveal (clip-path based) ──
export const maskRevealUp = {
    initial: { clipPath: 'inset(100% 0% 0% 0%)' },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: duration.slower, ease: ease.outExpo } },
    exit: { clipPath: 'inset(100% 0% 0% 0%)', transition: { duration: duration.slow } },
};

export const maskRevealDown = {
    initial: { clipPath: 'inset(0% 0% 100% 0%)' },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: duration.slower, ease: ease.outExpo } },
    exit: { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: duration.slow } },
};

// ── Stagger Container ──
export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0) => ({
    initial: {},
    animate: {
        transition: { staggerChildren: staggerDelay, delayChildren },
    },
    exit: {},
});

// ── Stagger Item ──
export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.outExpo } },
    exit: { opacity: 0, y: 10 },
};

// ── Menu-specific variants ──
export const menuOverlay = {
    initial: { clipPath: 'inset(0 0 100% 0)' },
    animate: {
        clipPath: 'inset(0 0 0% 0)',
        transition: { duration: 0.7, ease: ease.inOutQuart }
    },
    exit: {
        clipPath: 'inset(0 0 100% 0)',
        transition: { duration: 0.5, ease: ease.inOutQuart }
    },
};

export const menuItem = {
    initial: { opacity: 0, y: 40, skewY: 2 },
    animate: {
        opacity: 1, y: 0, skewY: 0,
        transition: { duration: 0.6, ease: ease.outExpo }
    },
    exit: {
        opacity: 0, y: -20,
        transition: { duration: 0.3 }
    },
};

export const menuMetadata = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ── Section Transition ──
export const sectionReveal = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0, transition: { duration: duration.slower, ease: ease.outExpo } },
    viewport: { once: true, margin: '-80px' as const },
};

// ── Hover Interactions ──
export const hoverLift = {
    y: -4,
    transition: { duration: duration.fast, ease: 'easeOut' },
};

export const hoverScale = {
    scale: 1.02,
    transition: { duration: duration.normal, ease: ease.outExpo },
};

'use client';

import { Suspense, lazy } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SceneCanvas = lazy(() => import('./SceneCanvas'));

/**
 * R3F Canvas shell with dynamic import per §33.
 * Falls back gracefully when WebGL is unavailable.
 */
export function Scene() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <SceneCanvas />
      </Suspense>
    </div>
  );
}

'use client';

import { Canvas } from '@react-three/fiber';
import { TechCore } from './TechCore';

/**
 * Dynamically imported R3F Canvas.
 * WebGL-dependent code is isolated here for code splitting (§33).
 */
export default function SceneCanvas() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ pointerEvents: 'none' }}
    >
      <TechCore />
    </Canvas>
  );
}

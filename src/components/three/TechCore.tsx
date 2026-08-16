'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural technical core — node/line network per §04.
 * Represents relationships between domains:
 * Software, AI/ML, IoT, Cloud, Networking, Cybersecurity, Creative.
 * Custom procedural geometry, NOT a generic 3D model.
 */
export function TechCore() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate procedural node positions
  const { nodes, connections } = useMemo(() => {
    const nodeCount = 24;
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const theta = (i / nodeCount) * Math.PI * 2;
      const rand1 = Math.sin(i * 12.9898) * 43758.5453;
      const rand2 = Math.sin(i * 78.233) * 43758.5453;
      const p1 = rand1 - Math.floor(rand1);
      const p2 = rand2 - Math.floor(rand2);

      const phi = Math.acos(2 * p1 - 1);
      const r = 1.5 + p2 * 0.8;

      nodePositions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }

    // Create connections between nearby nodes
    const connectionPairs: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.8) {
          connectionPairs.push([i, j]);
        }
      }
    }

    return { nodes: nodePositions, connections: connectionPairs };
  }, []);

  // Line geometry from connections
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    connections.forEach(([a, b]) => {
      positions.push(nodes[a].x, nodes[a].y, nodes[a].z);
      positions.push(nodes[b].x, nodes[b].y, nodes[b].z);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes, connections]);

  // Node points geometry
  const pointsGeometry = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((node) => {
      positions.push(node.x, node.y, node.z);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes]);

  // Subtle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#8F7748"
          transparent
          opacity={0.15}
        />
      </lineSegments>

      {/* Nodes */}
      <points geometry={pointsGeometry}>
        <pointsMaterial
          color="#6ED6D0"
          size={0.03}
          transparent
          opacity={0.25}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

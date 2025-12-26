"use client";

import { useMemo } from "react";
import { Color, MeshStandardMaterial } from "three";
import { Float } from "@react-three/drei";

export function TropicalLeaf() {
  const leafMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#1f9d55"),
        roughness: 0.32,
        metalness: 0.08,
        emissive: new Color("#0c5f2d"),
        emissiveIntensity: 0.22
      }),
    []
  );

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.5}>
      <group position={[0.75, 1.12, -0.2]} rotation={[0.4, -0.5, 1.4]} scale={0.85}>
        <mesh castShadow receiveShadow>
          <planeGeometry args={[0.9, 1.6, 16, 16]} />
          <primitive object={leafMaterial} />
        </mesh>
        {[0.1, 0, -0.08, -0.18].map((offset, idx) => (
          <mesh
            key={`leaf-vein-${idx}`}
            rotation={[Math.PI / 2, 0, 0]}
            position={[offset, 0, 0]}
            scale={[0.02, 0.02, 0.4 + idx * 0.08]}
          >
            <cylinderGeometry args={[0.02, 0.02, 1.2, 12]} />
            <primitive object={leafMaterial} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default TropicalLeaf;

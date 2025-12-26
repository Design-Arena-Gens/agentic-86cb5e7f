"use client";

import { useMemo } from "react";
import { Color, MeshStandardMaterial, SpotLight } from "three";
import { useRef } from "react";

export function StudioBackdrop() {
  const floorMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#fdf4f0"),
        metalness: 0.12,
        roughness: 0.35
      }),
    []
  );
  const keyLightRef = useRef<SpotLight>(null);
  const rimLightRef = useRef<SpotLight>(null);

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.95, 0]}
        receiveShadow
        material={floorMaterial}
      >
        <planeGeometry args={[10, 10]} />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0.3, -2]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial
          color="#fff4ef"
          metalness={0.05}
          roughness={0.45}
          emissive="#fdd7c9"
          emissiveIntensity={0.15}
        />
      </mesh>

      <spotLight
        ref={keyLightRef}
        position={[-4, 6, 4]}
        angle={0.8}
        penumbra={0.65}
        intensity={1.35}
        color="#ffd6ad"
        castShadow
        shadow-mapSize={2048}
      />
      <spotLight
        ref={rimLightRef}
        position={[4, 4, -2]}
        angle={0.45}
        penumbra={0.7}
        intensity={1.1}
        color="#fff2dc"
      />
      <ambientLight intensity={0.46} color="#fff7f0" />
    </group>
  );
}

export default StudioBackdrop;

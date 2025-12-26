"use client";

import { useMemo } from "react";
import {
  CatmullRomCurve3,
  Color,
  MeshPhysicalMaterial,
  TubeGeometry,
  Vector3
} from "three";
import { Float, Sparkles } from "@react-three/drei";

const juiceColor = new Color("#ff6b4a");

export function JuiceSplash() {
  const splashMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: juiceColor,
        metalness: 0.04,
        roughness: 0.18,
        clearcoat: 0.6,
        clearcoatRoughness: 0.08,
        transmission: 0.52,
        thickness: 0.4,
        iridescence: 0.3,
        attenuationColor: new Color("#ff8f5f"),
        attenuationDistance: 0.48
      }),
    []
  );

  const splashCurve = useMemo(() => {
    const points = [
      new Vector3(-0.3, 0.05, -0.15),
      new Vector3(0.1, 0.22, 0.05),
      new Vector3(0.64, 0.1, 0.22),
      new Vector3(0.9, -0.08, 0.26),
      new Vector3(1.05, -0.25, 0.15)
    ];
    return new CatmullRomCurve3(points);
  }, []);

  const splashGeometry = useMemo(() => {
    const curve = splashCurve;
    return new TubeGeometry(curve, 120, 0.08, 24, false);
  }, [splashCurve]);

  return (
    <group position={[0.2, 0.4, 0.1]} rotation={[0.2, 0.4, -0.2]}>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.45}>
        <mesh geometry={splashGeometry}>
          <primitive object={splashMaterial} />
        </mesh>
      </Float>

      {[[-0.18, 0.02, -0.08, 0.14], [0.46, 0.12, 0.22, 0.16], [0.78, -0.08, 0.14, 0.1]].map(
        ([x, y, z, scale], idx) => (
          <mesh key={`drop-${idx}`} position={[x as number, y as number, z as number]}>
            <sphereGeometry args={[(scale as number) * 0.45, 48, 48]} />
            <primitive object={splashMaterial} />
          </mesh>
        )
      )}

      {[[-0.1, 0.18, -0.04], [0.22, 0.25, 0.14], [0.5, -0.05, 0.18]].map(
        ([x, y, z], idx) => (
          <mesh key={`spray-${idx}`} position={[x as number, y as number, z as number]} scale={0.18}>
            <icosahedronGeometry args={[0.5, 1]} />
            <primitive object={splashMaterial} />
          </mesh>
        )
      )}

      <Sparkles
        count={32}
        scale={[1.3, 0.9, 1.3]}
        size={0.5}
        speed={0.6}
        color="#ffe1cf"
        opacity={0.25}
      />
    </group>
  );
}

export default JuiceSplash;

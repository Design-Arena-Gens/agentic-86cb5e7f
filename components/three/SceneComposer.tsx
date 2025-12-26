"use client";

import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Environment,
  RandomizedLight,
  SoftShadows
} from "@react-three/drei";
import { Suspense } from "react";
import { JuiceCan } from "./JuiceCan";
import { JuiceSplash } from "./JuiceSplash";
import { StudioBackdrop } from "./StudioBackdrop";
import { TropicalLeaf } from "./TropicalLeaf";

export function SceneComposer() {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 2.6, 5.8], fov: 38 }}
      dpr={[1, 2.5]}
      linear={false}
      gl={{ preserveDrawingBuffer: true }}
    >
      <color attach="background" args={["#ffffff"]} />
      <Suspense fallback={null}>
        <SoftShadows size={20} samples={16} focus={0.6} />
        <StudioBackdrop />
        <JuiceCan />
        <JuiceSplash />
        <TropicalLeaf />
        <AccumulativeShadows
          temporal
          frames={120}
          color="orange"
          colorBlend={0.2}
          opacity={0.55}
          scale={12}
          position={[0, -0.98, 0]}
        >
          <RandomizedLight
            amount={8}
            radius={6}
            ambient={0.35}
            intensity={0.45}
            position={[5, 5, -2]}
          />
        </AccumulativeShadows>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}

export default SceneComposer;

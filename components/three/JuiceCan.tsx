"use client";

import { useMemo, useRef } from "react";
import {
  CanvasTexture,
  Color,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  Vector2,
  Group
} from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

type JuiceCanProps = {
  labelHue?: number;
};

const accentColors = {
  base: new Color("#ff7f50"),
  highlight: new Color("#ffa76f"),
  text: "#0d1b2a"
};

function createLabelTexture(hue: number) {
  const size = 2048;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, `hsl(${hue}, 82%, 58%)`);
  gradient.addColorStop(0.45, `hsl(${hue + 12}, 72%, 50%)`);
  gradient.addColorStop(1, `hsl(${hue + 20}, 88%, 40%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const metallicSheen = ctx.createLinearGradient(0, 0, size, size * 0.2);
  metallicSheen.addColorStop(0, "rgba(255,255,255,0.45)");
  metallicSheen.addColorStop(0.5, "rgba(255,255,255,0)");
  ctx.fillStyle = metallicSheen;
  ctx.fillRect(0, 0, size, size * 0.3);

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(0, size * 0.75, size, size * 0.25);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 7; i += 1) {
    ctx.beginPath();
    ctx.arc(size * 0.35 + i * size * 0.08, size * 0.55, size * (0.18 - i * 0.008), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(size * 0.1, size * 0.1, size * 0.8, size * 0.55);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(size * 0.1, size * 0.68, size * 0.8, size * 0.18);

  ctx.fillStyle = "rgba(13,27,42,0.18)";
  ctx.font = `${size * 0.035}px Montserrat`;
  ctx.textBaseline = "middle";
  ctx.fillText("TROPICAL BLOOM | COLD-PRESSED", size * 0.12, size * 0.72);

  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = `${size * 0.06}px Poppins`;
  ctx.fillText("PASSION · MANGO · CITRUS", size * 0.12, size * 0.83);

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.font = `${size * 0.04}px Poppins`;
  ctx.fillText("PREMIUM FRUIT ESSENCE", size * 0.12, size * 0.89);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${size * 0.25}px Playfair Display`;
  ctx.textBaseline = "middle";
  ctx.fillText("KISHORE", size * 0.12, size * 0.42);

  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = size * 0.0025;
  ctx.beginPath();
  const center = new Vector2(size * 0.76, size * 0.42);
  const radii = [size * 0.22, size * 0.28, size * 0.34];
  radii.forEach((radius) => {
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.stroke();
  });
  const pulseCount = 24;
  for (let i = 0; i < pulseCount; i += 1) {
    const angle = (i / pulseCount) * Math.PI * 2;
    const inner = radiusStep(center, radii[0] * 0.85, angle);
    const outer = radiusStep(center, radii[2], angle);
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.beginPath();
    ctx.moveTo(inner.x, inner.y);
    ctx.lineTo(outer.x, outer.y);
    ctx.stroke();
  }

  const flavourColors = ["#ffd166", "#ff6b6b", "#70e1f5", "#95f9c3"];
  flavourColors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    const angle = (index / flavourColors.length) * Math.PI * 2 - Math.PI / 4;
    ctx.arc(center.x, center.y, radii[0] * 0.78, angle - 0.15, angle + 0.22);
    ctx.lineTo(center.x, center.y);
    ctx.closePath();
    ctx.fill();
  });

  ctx.fillStyle = "#0d1b2a";
  ctx.font = `${size * 0.03}px Montserrat`;
  ctx.fillText("JUICERY", size * 0.12, size * 0.19);

  const flavourKeys = [
    ["Mango Nectar", "Sun-picked Alphonso sweetness"],
    ["Passion Splash", "Wild-grown tropical brightness"],
    ["Citrus Mist", "Cold-pressed Valencia zest"]
  ];

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = `${size * 0.035}px Montserrat`;
  flavourKeys.forEach((flavour, idx) => {
    const [title, description] = flavour;
    const y = size * (0.52 + idx * 0.08);
    ctx.fillText(title, size * 0.12, y);
    ctx.fillStyle = "rgba(13,27,42,0.82)";
    ctx.font = `${size * 0.026}px Montserrat`;
    ctx.fillText(description, size * 0.12, y + size * 0.035);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = `${size * 0.035}px Montserrat`;
  });

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  return texture;
}

function radiusStep(origin: Vector2, radius: number, angle: number) {
  return new Vector2(
    origin.x + Math.cos(angle) * radius,
    origin.y + Math.sin(angle) * radius
  );
}

export function JuiceCan({ labelHue = 24 }: JuiceCanProps) {
  const labelTexture = useMemo(() => {
    if (typeof document === "undefined") {
      return null;
    }
    return createLabelTexture(labelHue);
  }, [labelHue]);

  const sheenMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color("#f5f7fb"),
        metalness: 0.92,
        roughness: 0.12
      }),
    []
  );

  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    const elapsed = clock.getElapsedTime();
    const target = group.getObjectByName("tin-body");
    if (target) {
      target.rotation.z = Math.PI / 2 + Math.sin(elapsed * 0.4) * 0.08;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
      <group
        ref={groupRef}
        rotation={[Math.PI / 2.2, 0.35, -Math.PI / 2]}
        position={[0, 0.35, 0]}
      >
        <mesh name="tin-body" castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.48, 0.5, 1.9, 96, 1, true]} />
          <meshStandardMaterial
            map={labelTexture ?? undefined}
            metalness={0.65}
            roughness={0.32}
            emissive={accentColors.base.clone().multiplyScalar(0.05)}
            emissiveIntensity={0.35}
          />
        </mesh>

        <mesh name="tin-top" position={[0, 0.95, 0]} castShadow>
          <cylinderGeometry args={[0.52, 0.5, 0.08, 96]} />
          <primitive object={sheenMaterial} />
        </mesh>

        <mesh name="tin-bottom" position={[0, -0.95, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.52, 0.08, 96]} />
          <primitive object={sheenMaterial} />
        </mesh>

        <mesh position={[0.65, 0.2, 0.18]} rotation={[0.4, 0.1, -0.2]} castShadow>
          <torusGeometry args={[0.24, 0.03, 32, 100]} />
          <meshStandardMaterial
            color={accentColors.base.clone().offsetHSL(0.02, 0, 0.08)}
            metalness={0.22}
            roughness={0.18}
            emissive={accentColors.highlight.clone().multiplyScalar(0.12)}
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default JuiceCan;

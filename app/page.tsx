"use client";

import styles from "./page.module.css";
import { SceneComposer } from "../components/three/SceneComposer";

const flavorPalette = [
  {
    id: "MN",
    name: "Mango Nectar",
    description: "Sun-drenched Alphonso layers with velvety pulp sweetness.",
    color: "#ffd166"
  },
  {
    id: "PS",
    name: "Passion Splash",
    description: "Wild passionfruit vibrancy with a tangy floral lift.",
    color: "#ff6b6b"
  },
  {
    id: "CM",
    name: "Citrus Mist",
    description: "Cold-pressed Valencia zest with cooling citrus sparkle.",
    color: "#70e1f5"
  }
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.highlight}>PREMIUM COLD-PRESSED</span>
          <h1 className={styles.headline}>
            KISHORE
            <br />
            Tropical Bloom
          </h1>
          <p className={styles.subheading}>
            A cinematic 3D showcase capturing the KISHORE signature juice tin in mid-air,
            drenched with luscious tropical splash, metallic sheen, and botanicals frozen in
            motion.
          </p>

          <aside className={styles.flavorPanel}>
            <div className={styles.flavorTitle}>FLAVOR SPECTRUM</div>
            <div className={styles.flavorGrid}>
              {flavorPalette.map(({ id, name, description, color }) => (
                <div key={id} className={styles.flavorItem}>
                  <div className={styles.flavorSwatch} style={{ backgroundColor: color }}>
                    {id}
                  </div>
                  <div className={styles.flavorText}>
                    <strong>{name}</strong>
                    <span>{description}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className={styles.canvasShell}>
          <div className={styles.graphOverlay}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 214, 173, 0.25)" />
                  <stop offset="50%" stopColor="rgba(255, 107, 107, 0.2)" />
                  <stop offset="100%" stopColor="rgba(112, 225, 245, 0.22)" />
                </linearGradient>
              </defs>
              <path
                d="M120,840 C240,620 320,320 520,420 C720,520 720,260 900,140"
                stroke="url(#graphGradient)"
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
              />
              <path
                d="M180,780 C340,660 460,460 600,540 C760,630 820,340 920,260"
                stroke="rgba(255, 255, 255, 0.32)"
                strokeWidth="6"
                fill="transparent"
                strokeLinecap="round"
              />
              <circle cx="520" cy="420" r="26" fill="rgba(255, 214, 173, 0.6)" />
              <circle cx="720" cy="260" r="18" fill="rgba(255, 107, 107, 0.65)" />
              <circle cx="600" cy="540" r="22" fill="rgba(112, 225, 245, 0.55)" />
            </svg>
          </div>
          <div className={styles.canvasLayer}>
            <SceneComposer />
          </div>
          <div className={styles.badgeCluster}>
            <div className={`${styles.badge} ${styles.badgeAccent}`}>4K Ultra Render</div>
            <div className={styles.badge}>Tropical Leaf Infusion</div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.signature}>KISHORE DESIGN LAB</div>
        <div className={styles.metrics}>
          <div className={styles.metricItem}>
            <strong>92%</strong>
            <span>Flavor Vibrancy</span>
          </div>
          <div className={styles.metricItem}>
            <strong>4.0K</strong>
            <span>Studio Resolution</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

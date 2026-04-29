"use client";

import { shaderMaterial } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { usePlayerStore } from "@/audio/store";
import { MandalaFallback } from "./MandalaFallback";
import { fragmentShader, vertexShader } from "./mandala-shader";

// ---- Custom shader material ------------------------------------------------

const CalderaMaterialImpl = shaderMaterial(
  {
    uTime: 0 as number,
    uColorPurple: new THREE.Color("#A855F7"),
    uColorBlue: new THREE.Color("#3B82F6"),
    uColorGreen: new THREE.Color("#10B981"),
    uIntensity: 0 as number,
  },
  vertexShader,
  fragmentShader,
);

type CalderaMaterialType = InstanceType<typeof CalderaMaterialImpl> & {
  uTime: number;
  uColorPurple: THREE.Color;
  uColorBlue: THREE.Color;
  uColorGreen: THREE.Color;
  uIntensity: number;
};

extend({ CalderaMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    calderaMaterialImpl: React.ComponentProps<"shaderMaterial"> & {
      uTime?: number;
      uColorPurple?: THREE.Color;
      uColorBlue?: THREE.Color;
      uColorGreen?: THREE.Color;
      uIntensity?: number;
    };
  }
}

// ---- Ring definition -------------------------------------------------------

interface RingDef {
  innerRadius: number;
  outerRadius: number;
  rotationSpeed: number;
  tiltX: number;
}

const RING_DEFS: RingDef[] = [
  { innerRadius: 0.08, outerRadius: 0.14, rotationSpeed: 0.2, tiltX: 0 },
  { innerRadius: 0.2, outerRadius: 0.28, rotationSpeed: 0.12, tiltX: 0.05 },
  { innerRadius: 0.34, outerRadius: 0.44, rotationSpeed: 0.08, tiltX: -0.04 },
  { innerRadius: 0.5, outerRadius: 0.6, rotationSpeed: 0.06, tiltX: 0.03 },
  { innerRadius: 0.66, outerRadius: 0.74, rotationSpeed: 0.05, tiltX: 0 },
];

// ---- Performance levels: 0 = full, 1 = 3 rings, 2 = 2 rings ---------------

function getRingDefs(perfLevel: number): RingDef[] {
  if (perfLevel === 2) return RING_DEFS.slice(0, 2);
  if (perfLevel === 1) return RING_DEFS.slice(0, 3);
  return RING_DEFS;
}

// ---- Individual ring mesh --------------------------------------------------

interface RingMeshProps {
  def: RingDef;
  mat: CalderaMaterialType;
  reducedMotion: boolean;
}

function RingMesh({ def, mat, reducedMotion }: RingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.z += def.rotationSpeed * delta;
  });

  return (
    <mesh ref={meshRef} rotation={[def.tiltX, 0, 0]}>
      <ringGeometry args={[def.innerRadius, def.outerRadius, 128]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ---- Scene -----------------------------------------------------------------

interface SceneProps {
  reducedMotion: boolean;
  sensoryLight: boolean;
}

function Scene({ reducedMotion, sensoryLight }: SceneProps) {
  const matRef = useRef<CalderaMaterialType>(new CalderaMaterialImpl() as CalderaMaterialType);

  const isPlaying = usePlayerStore((s) => s.isPlaying);

  // Performance monitoring: rolling FPS over 2s.
  const [perfLevel, setPerfLevel] = useState(0);
  const fpsHistory = useRef<number[]>([]);
  const lastTime = useRef(performance.now());

  // Read neon colors from CSS custom properties on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mat = matRef.current;
    const style = getComputedStyle(document.documentElement);
    const purple = style.getPropertyValue("--color-neon-purple").trim();
    const blue = style.getPropertyValue("--color-neon-blue").trim();
    const green = style.getPropertyValue("--color-neon-green").trim();

    // Fallback to hex if CSS custom property resolution fails.
    try {
      mat.uColorPurple.set(purple || "#A855F7");
      mat.uColorBlue.set(blue || "#3B82F6");
      mat.uColorGreen.set(green || "#10B981");
    } catch {
      mat.uColorPurple.set("#A855F7");
      mat.uColorBlue.set("#3B82F6");
      mat.uColorGreen.set("#10B981");
    }
  }, []);

  const stopped = reducedMotion || sensoryLight;

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;

    // Advance time only when motion is allowed.
    if (!stopped) {
      mat.uTime += delta;
    }

    // Drive uIntensity: 0 when paused; gentle two-frequency breathing when playing.
    // Two layered sines (~1.6 Hz + ~0.42 Hz) feel organic without strobing.
    const t = mat.uTime;
    const breathing = 0.7 + Math.sin(t * 1.6) * 0.2 + Math.sin(t * 0.42) * 0.1;
    const target = isPlaying && !stopped ? breathing : 0.0;
    mat.uIntensity += (target - mat.uIntensity) * 0.05;

    // FPS measurement for adaptive performance tier.
    const now = performance.now();
    const fps = 1000 / (now - lastTime.current);
    lastTime.current = now;
    fpsHistory.current.push(fps);
    // Keep a 2-second rolling window (~120 frames at 60fps).
    if (fpsHistory.current.length > 120) {
      fpsHistory.current.shift();
    }
    if (fpsHistory.current.length >= 60) {
      const len = fpsHistory.current.length;
      const avg = fpsHistory.current.reduce((a, b) => a + b, 0) / len;
      if (avg < 30 && perfLevel < 2) {
        setPerfLevel(2);
      } else if (avg < 50 && perfLevel < 1) {
        setPerfLevel(1);
      }
    }
  });

  const rings = getRingDefs(perfLevel);
  const mat = matRef.current;

  return (
    <>
      {rings.map((def) => (
        <RingMesh key={def.innerRadius} def={def} mat={mat} reducedMotion={stopped} />
      ))}
    </>
  );
}

// ---- WebGL2 detection ------------------------------------------------------

function hasWebGL2(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

// ---- Main export ------------------------------------------------------------

/**
 * Mandala — 3D R3F canvas. Dynamic-import friendly (no SSR).
 *
 * Falls back to <MandalaFallback /> when:
 *   — WebGL2 is unavailable
 *   — prefers-reduced-motion is set
 *   — data-sensory="light" is active
 */
export default function Mandala() {
  const [ready, setReady] = useState(false);
  const [useCanvas, setUseCanvas] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sensoryLight, setSensoryLight] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const handleMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleMq);

    // Watch data-sensory attribute via MutationObserver.
    const observer = new MutationObserver(() => {
      setSensoryLight(document.documentElement.getAttribute("data-sensory") === "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-sensory"],
    });

    setSensoryLight(document.documentElement.getAttribute("data-sensory") === "light");

    setUseCanvas(hasWebGL2());
    setReady(true);

    return () => {
      mq.removeEventListener("change", handleMq);
      observer.disconnect();
    };
  }, []);

  // Before client hydration: show the SVG fallback (same as SSR).
  if (!ready) {
    return <MandalaFallback />;
  }

  // Reduced-motion or sensory-light: static SVG, no canvas.
  if (!useCanvas || reducedMotion || sensoryLight) {
    return <MandalaFallback />;
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 1.8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-label="Caldera mandala — animated geometric identity mark"
      role="img"
    >
      <Scene reducedMotion={reducedMotion} sensoryLight={sensoryLight} />
    </Canvas>
  );
}

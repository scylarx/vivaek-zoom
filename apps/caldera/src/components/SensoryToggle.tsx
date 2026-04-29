"use client";

import { useEffect, useState } from "react";

type SensoryMode = "default" | "light";

const STORAGE_KEY = "caldera-sensory";

function getInitialMode(): SensoryMode {
  if (typeof window === "undefined") return "default";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light") return "light";
  return "default";
}

function applyMode(mode: SensoryMode): void {
  const root = document.documentElement;
  if (mode === "light") {
    root.setAttribute("data-sensory", "light");
  } else {
    root.removeAttribute("data-sensory");
  }
}

/**
 * Sensory toggle: writes/removes data-sensory="light" on <html>.
 * When set:
 *   — CRT scanline overlay is removed (via existing :root[data-sensory="light"] body rule)
 *   — The Mandala canvas reads this attribute and stops rotation
 *   — Neon glow filters reduced (via the data-sensory attribute in CSS)
 * Persisted to localStorage.
 */
export function SensoryToggle() {
  const [mode, setMode] = useState<SensoryMode>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialMode();
    setMode(initial);
    applyMode(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: SensoryMode = mode === "default" ? "light" : "default";
    setMode(next);
    applyMode(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked="false"
        aria-label="Toggle sensory-light mode"
        disabled
        className="border border-[--color-rule] px-3 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.16em] text-[--color-fg-muted] opacity-0"
      >
        calm
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mode === "light"}
      aria-label={mode === "default" ? "Enable sensory-light mode" : "Disable sensory-light mode"}
      onClick={toggle}
      className="border border-[--color-rule] px-3 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.16em] text-[--color-fg-muted] hover:border-[--color-neon-blue] hover:text-[--color-neon-blue] transition-colors duration-150"
    >
      {mode === "default" ? "calm" : "full"}
    </button>
  );
}

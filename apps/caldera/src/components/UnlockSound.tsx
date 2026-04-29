"use client";

import { usePlayerStore } from "@/audio/store";

/**
 * A pulsing tap affordance shown when the player is locked.
 * On click, calls unlock() from the Zustand store (which also persists to
 * sessionStorage via the persist middleware).
 * Once unlocked, this component returns null.
 * Honours prefers-reduced-motion: the pulse animation is CSS-driven and is
 * removed by the global reduced-motion rule in globals.css.
 */
export function UnlockSound() {
  const unlocked = usePlayerStore((s) => s.unlocked);
  const unlock = usePlayerStore((s) => s.unlock);

  if (unlocked) return null;

  return (
    <button
      type="button"
      onClick={unlock}
      aria-label="Tap to enable audio"
      className="relative inline-flex items-center gap-2 border border-[--color-neon-green] px-4 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.2em] text-[--color-neon-green] focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{
        animation: "caldera-unlock-pulse 2s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes caldera-unlock-pulse {
          0%, 100% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--color-neon-green) 40%, transparent); }
          50% { box-shadow: 0 0 0 8px color-mix(in oklch, var(--color-neon-green) 0%, transparent); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes caldera-unlock-pulse { 0%, 100% { box-shadow: none; } }
        }
      `}</style>
      Tap to begin
    </button>
  );
}

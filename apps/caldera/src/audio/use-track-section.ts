"use client";

import { type RefObject, useEffect, useRef } from "react";
import { type Track, usePlayerStore } from "./store";

/**
 * Wires an IntersectionObserver to a section element so that when the section
 * is 60% visible, the associated track becomes active in the player.
 *
 * Debounced at 400ms to prevent thrashing during fast scrolls.
 */
export function useTrackSection(track: Track, ref: RefObject<HTMLElement | null>): void {
  const setTrack = usePlayerStore((s) => s.setTrack);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (debounceRef.current !== null) {
              clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(() => {
              setTrack(track);
            }, 400);
          } else {
            if (debounceRef.current !== null) {
              clearTimeout(debounceRef.current);
              debounceRef.current = null;
            }
          }
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [ref, track, setTrack]);
}

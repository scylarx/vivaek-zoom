"use client";

import { useEffect } from "react";
import { usePlayerStore } from "./store";

const sectionIds = ["top", "sound", "events", "community"];

export function ScrollSoundConductor() {
  const queue = usePlayerStore((state) => state.queue);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const unlocked = usePlayerStore((state) => state.unlocked);
  const setTrack = usePlayerStore((state) => state.setTrack);

  useEffect(() => {
    if (queue.length === 0) return;

    const sections = sectionIds
      .map((id, index) => ({ element: document.getElementById(id), index }))
      .filter((section): section is { element: HTMLElement; index: number } =>
        Boolean(section.element),
      );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const section = sections.find((candidate) => candidate.element === visible.target);
        const track = queue[section ? section.index % queue.length : 0];
        if (!track || track.id === currentTrack?.id) return;

        setTrack(track, { autoplay: unlocked });
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    for (const section of sections) {
      observer.observe(section.element);
    }

    return () => observer.disconnect();
  }, [currentTrack?.id, queue, setTrack, unlocked]);

  return null;
}

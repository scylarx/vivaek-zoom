"use client";

import { useEffect } from "react";
import type { Track } from "./store";
import { usePlayerStore } from "./store";

interface QueueBootstrapProps {
  tracks: Track[];
}

export function QueueBootstrap({ tracks }: QueueBootstrapProps) {
  const setQueue = usePlayerStore((state) => state.setQueue);

  useEffect(() => {
    setQueue(tracks);
  }, [setQueue, tracks]);

  return null;
}

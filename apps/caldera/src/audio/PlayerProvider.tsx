"use client";

import { Howl } from "howler";
import { type ReactNode, useEffect, useRef } from "react";
import { usePlayerStore } from "./store";

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const howlRef = useRef<Howl | null>(null);
  const preloadRef = useRef<Howl | null>(null);
  const rafRef = useRef<number | null>(null);
  const preloadedTrackIdRef = useRef<string | null>(null);

  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const volume = usePlayerStore((state) => state.volume);
  const queue = usePlayerStore((state) => state.queue);
  const seekRequest = usePlayerStore((state) => state.seekRequest);
  const hydrateFromSession = usePlayerStore((state) => state.hydrateFromSession);
  const setPosition = usePlayerStore((state) => state.setPosition);
  const setPlaybackStatus = usePlayerStore((state) => state.setPlaybackStatus);
  const reportError = usePlayerStore((state) => state.reportError);
  const next = usePlayerStore((state) => state.next);

  useEffect(() => {
    hydrateFromSession();
  }, [hydrateFromSession]);

  const trackId = currentTrack?.id ?? null;
  const playbackUrl = currentTrack?.playbackUrl ?? null;
  const sourceKind = currentTrack?.sourceKind ?? null;

  useEffect(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    howlRef.current?.unload();
    howlRef.current = null;

    if (!trackId) {
      setPlaybackStatus("idle");
      return;
    }

    if (sourceKind !== "self-hosted" || !playbackUrl) {
      setPlaybackStatus("external");
      return;
    }

    setPlaybackStatus("loading");

    const howl = new Howl({
      src: [playbackUrl],
      html5: true,
      preload: true,
      volume: usePlayerStore.getState().volume,
      onload: () => {
        setPlaybackStatus(usePlayerStore.getState().isPlaying ? "playing" : "ready");
      },
      onplay: () => {
        setPlaybackStatus("playing");
      },
      onpause: () => {
        setPlaybackStatus("paused");
      },
      onstop: () => {
        setPlaybackStatus("paused");
      },
      onend: () => {
        next();
      },
      onloaderror: (_id, error) => {
        reportError(`Could not load this audio source (${String(error)}).`);
      },
      onplayerror: (_id, error) => {
        reportError(
          `Browser blocked playback (${String(error)}). Tap play again or open externally.`,
        );
      },
    });

    howlRef.current = howl;

    const trackPosition = () => {
      const activeHowl = howlRef.current;
      if (activeHowl?.playing()) {
        const seek = activeHowl.seek();
        if (typeof seek === "number") setPosition(seek * 1000);
      }
      rafRef.current = requestAnimationFrame(trackPosition);
    };
    rafRef.current = requestAnimationFrame(trackPosition);

    return () => {
      howl.unload();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [trackId, playbackUrl, sourceKind, next, reportError, setPlaybackStatus, setPosition]);

  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;
    if (isPlaying) {
      if (!howl.playing()) howl.play();
    } else if (howl.playing()) {
      howl.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    howlRef.current?.volume(volume);
  }, [volume]);

  useEffect(() => {
    const howl = howlRef.current;
    if (!howl || !seekRequest) return;
    howl.seek(seekRequest.ms / 1000);
    setPosition(seekRequest.ms);
  }, [seekRequest, setPosition]);

  useEffect(() => {
    if (!currentTrack || currentTrack.sourceKind !== "self-hosted") return;
    const index = queue.findIndex((track) => track.id === currentTrack.id);
    const nextTrack = queue[index + 1];
    if (!nextTrack?.playbackUrl || nextTrack.sourceKind !== "self-hosted") return;
    if (preloadedTrackIdRef.current === nextTrack.id) return;

    // Capture narrowed values so TS keeps the narrowing inside the closure.
    const nextPlaybackUrl = nextTrack.playbackUrl;
    const nextId = nextTrack.id;

    const interval = window.setInterval(() => {
      const howl = howlRef.current;
      if (!howl) return;
      const duration = howl.duration();
      const seek = howl.seek();
      if (
        typeof duration === "number" &&
        typeof seek === "number" &&
        duration > 0 &&
        seek / duration >= 0.5
      ) {
        preloadRef.current?.unload();
        preloadRef.current = new Howl({
          src: [nextPlaybackUrl],
          html5: true,
          preload: true,
          volume: 0,
        });
        preloadedTrackIdRef.current = nextId;
        window.clearInterval(interval);
      }
    }, 3000);

    return () => window.clearInterval(interval);
  }, [currentTrack, queue]);

  return <>{children}</>;
}

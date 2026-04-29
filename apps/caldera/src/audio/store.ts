"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TrackSourceKind = "self-hosted" | "soundcloud" | "spotify";
export type PlaybackStatus =
  | "idle"
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "external"
  | "error";

export interface Track {
  id: string;
  title: string;
  artist: string;
  sourceKind: TrackSourceKind;
  /**
   * Direct, rights-cleared audio URL. Only self-hosted tracks are played by Howler.
   * SoundCloud/Spotify are represented as external or embedded sources, not rehosted audio.
   */
  playbackUrl?: string | undefined;
  externalUrl?: string | undefined;
  embedUrl?: string | undefined;
  durationMs: number;
  artwork?: string | undefined;
  attribution?: string | undefined;
  rightsNote?: string | undefined;
}

interface PersistedState {
  unlocked: boolean;
  volume: number;
}

interface PlayerState extends PersistedState {
  isPlaying: boolean;
  playbackStatus: PlaybackStatus;
  errorMessage: string | null;
  currentTrack: Track | null;
  queue: Track[];
  position: number;
  seekRequest: { ms: number; nonce: number } | null;

  unlock: () => void;
  setTrack: (track: Track, options?: { autoplay?: boolean }) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setPosition: (ms: number) => void;
  seekTo: (ms: number) => void;
  setVolume: (volume: number) => void;
  setQueue: (tracks: Track[]) => void;
  setPlaybackStatus: (status: PlaybackStatus) => void;
  reportError: (message: string) => void;
  clearError: () => void;
  hydrateFromSession: () => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function canPlayNatively(track: Track | null) {
  return track?.sourceKind === "self-hosted" && Boolean(track.playbackUrl);
}

function statusForTrack(track: Track | null, unlocked: boolean, autoplay: boolean): PlaybackStatus {
  if (!track) return "idle";
  if (!canPlayNatively(track)) return "external";
  if (autoplay && unlocked) return "loading";
  return "ready";
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      unlocked: false,
      isPlaying: false,
      playbackStatus: "idle",
      errorMessage: null,
      currentTrack: null,
      queue: [],
      position: 0,
      seekRequest: null,
      volume: 0.72,

      unlock: () => {
        const { currentTrack, isPlaying } = get();
        set({
          unlocked: true,
          playbackStatus: currentTrack
            ? canPlayNatively(currentTrack) && isPlaying
              ? "loading"
              : statusForTrack(currentTrack, true, false)
            : "idle",
        });
      },

      setTrack: (track, options) => {
        const state = get();
        const autoplay = options?.autoplay ?? true;
        if (state.currentTrack?.id === track.id) {
          if (autoplay && state.unlocked && canPlayNatively(track)) {
            set({ isPlaying: true, playbackStatus: "loading", errorMessage: null });
          }
          return;
        }

        set({
          currentTrack: track,
          position: 0,
          seekRequest: null,
          errorMessage: null,
          isPlaying: autoplay && state.unlocked && canPlayNatively(track),
          playbackStatus: statusForTrack(track, state.unlocked, autoplay),
        });
      },

      play: () => {
        const { currentTrack, unlocked } = get();
        if (!currentTrack) return;
        if (!canPlayNatively(currentTrack)) {
          set({ playbackStatus: "external", isPlaying: false });
          return;
        }
        if (!unlocked) {
          set({ unlocked: true });
        }
        set({ isPlaying: true, playbackStatus: "loading", errorMessage: null });
      },

      pause: () => {
        const { currentTrack } = get();
        set({
          isPlaying: false,
          playbackStatus: currentTrack && canPlayNatively(currentTrack) ? "paused" : "external",
        });
      },

      next: () => {
        const { queue, currentTrack, setTrack } = get();
        if (queue.length === 0) return;
        const currentIndex = currentTrack
          ? queue.findIndex((track) => track.id === currentTrack.id)
          : -1;
        const nextTrack = queue[(currentIndex + 1) % queue.length];
        if (nextTrack) setTrack(nextTrack);
      },

      previous: () => {
        const { queue, currentTrack, setTrack } = get();
        if (queue.length === 0) return;
        const currentIndex = currentTrack
          ? queue.findIndex((track) => track.id === currentTrack.id)
          : 0;
        const previousIndex = currentIndex <= 0 ? queue.length - 1 : currentIndex - 1;
        const previousTrack = queue[previousIndex];
        if (previousTrack) setTrack(previousTrack);
      },

      setPosition: (ms) => {
        const duration = get().currentTrack?.durationMs ?? Number.MAX_SAFE_INTEGER;
        set({ position: clamp(ms, 0, duration) });
      },

      seekTo: (ms) => {
        const duration = get().currentTrack?.durationMs ?? Number.MAX_SAFE_INTEGER;
        const position = clamp(ms, 0, duration);
        set((state) => ({
          position,
          seekRequest: { ms: position, nonce: (state.seekRequest?.nonce ?? 0) + 1 },
        }));
      },

      setVolume: (volume) => {
        set({ volume: clamp(volume, 0, 1) });
      },

      setQueue: (tracks) => {
        set((state) => {
          const currentStillExists =
            state.currentTrack && tracks.some((track) => track.id === state.currentTrack?.id);
          return {
            queue: tracks,
            currentTrack: currentStillExists ? state.currentTrack : (tracks[0] ?? null),
            playbackStatus: currentStillExists
              ? state.playbackStatus
              : statusForTrack(tracks[0] ?? null, state.unlocked, false),
            position: currentStillExists ? state.position : 0,
          };
        });
      },

      setPlaybackStatus: (playbackStatus) => {
        set({ playbackStatus });
      },

      reportError: (message) => {
        set({ errorMessage: message, playbackStatus: "error", isPlaying: false });
      },

      clearError: () => {
        set({ errorMessage: null });
      },

      hydrateFromSession: () => {
        // Zustand persist rehydrates automatically; this action documents that mount step.
      },
    }),
    {
      name: "caldera-player",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.sessionStorage : localStorage,
      ),
      partialize: (state): PersistedState => ({
        unlocked: state.unlocked,
        volume: state.volume,
      }),
    },
  ),
);

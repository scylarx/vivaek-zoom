"use client";

import { type KeyboardEvent, useCallback, useEffect } from "react";
import { usePlayerStore } from "@/audio/store";
import { UnlockSound } from "./UnlockSound";

function formatMs(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function sourceLabel(sourceKind: string | undefined) {
  switch (sourceKind) {
    case "self-hosted":
      return "licensed · hosted";
    case "soundcloud":
      return "external · soundcloud";
    case "spotify":
      return "external · spotify";
    default:
      return "queue waiting";
  }
}

export function PlayerBar() {
  const unlocked = usePlayerStore((state) => state.unlocked);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const playbackStatus = usePlayerStore((state) => state.playbackStatus);
  const errorMessage = usePlayerStore((state) => state.errorMessage);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const position = usePlayerStore((state) => state.position);
  const volume = usePlayerStore((state) => state.volume);
  const queue = usePlayerStore((state) => state.queue);

  const play = usePlayerStore((state) => state.play);
  const pause = usePlayerStore((state) => state.pause);
  const next = usePlayerStore((state) => state.next);
  const previous = usePlayerStore((state) => state.previous);
  const seekTo = usePlayerStore((state) => state.seekTo);
  const setVolume = usePlayerStore((state) => state.setVolume);

  const durationMs = currentTrack?.durationMs ?? 0;
  const nativePlayable =
    currentTrack?.sourceKind === "self-hosted" && Boolean(currentTrack.playbackUrl);
  const externalOnly = Boolean(currentTrack) && !nativePlayable;
  const dimmed = !unlocked && nativePlayable;
  const progressMax = durationMs > 0 ? durationMs : 100;

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    if (isPlaying) pause();
    else play();
  }, [currentTrack, isPlaying, play, pause]);

  const skipBack = useCallback(() => {
    seekTo(Math.max(0, position - 15000));
  }, [position, seekTo]);

  const skipForward = useCallback(() => {
    seekTo(Math.min(progressMax, position + 15000));
  }, [position, progressMax, seekTo]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!currentTrack) return;
      switch (event.key) {
        case " ":
          event.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          event.preventDefault();
          skipBack();
          break;
        case "ArrowRight":
          event.preventDefault();
          skipForward();
          break;
        case "ArrowUp":
          event.preventDefault();
          setVolume(volume + 0.05);
          break;
        case "ArrowDown":
          event.preventDefault();
          setVolume(volume - 0.05);
          break;
        default:
          break;
      }
    },
    [currentTrack, togglePlay, skipBack, skipForward, setVolume, volume],
  );

  useEffect(() => {
    const handler = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || target?.isContentEditable) {
        return;
      }
      const fakeEvent = {
        key: event.key,
        preventDefault: () => event.preventDefault(),
      } as KeyboardEvent<HTMLElement>;
      handleKeyDown(fakeEvent);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKeyDown]);

  return (
    <section
      aria-label="Audio player"
      onKeyDown={handleKeyDown}
      className={[
        "sticky bottom-0 z-30",
        "border-t border-[--color-rule]",
        "bg-[color-mix(in_oklch,var(--color-void)_92%,black)]",
        "px-5 py-3 backdrop-blur-md",
        "sm:px-8",
        "lg:fixed lg:bottom-0 lg:right-0 lg:top-0",
        "lg:h-screen lg:w-80",
        "lg:border-l lg:border-t-0",
        "lg:flex lg:flex-col lg:justify-between",
        "lg:px-6 lg:py-8",
        dimmed ? "opacity-85" : "opacity-100",
        "transition-opacity duration-300",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <TrackIdentity />
          <MobileControls
            dimmed={dimmed}
            externalOnly={externalOnly}
            isPlaying={isPlaying}
            onNext={next}
            onTogglePlay={togglePlay}
          />
        </div>
        <ProgressRail
          disabled={!nativePlayable}
          max={progressMax}
          position={position}
          onSeek={seekTo}
        />
        <PlayerMessage
          errorMessage={errorMessage}
          externalOnly={externalOnly}
          nativePlayable={nativePlayable}
          queueLength={queue.length}
          status={playbackStatus}
        />
        <ExternalEmbed />
      </div>

      <div className="hidden lg:flex lg:flex-col lg:gap-6">
        <div>
          <p className="font-(family-name:--font-mono) text-[0.6rem] uppercase tracking-[0.24em] text-[--color-neon-green]">
            Now playing
          </p>
          <TrackIdentity desktop />
        </div>

        <ProgressRail
          disabled={!nativePlayable}
          max={progressMax}
          position={position}
          onSeek={seekTo}
        />

        {dimmed ? (
          <UnlockSound />
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={previous}
              disabled={queue.length < 2}
              aria-label="Previous track"
              className="player-button"
            >
              prev
            </button>
            {externalOnly && currentTrack?.externalUrl ? (
              <a
                href={currentTrack.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="player-button border-[--color-neon-green] text-center text-[--color-neon-green]"
              >
                open
              </a>
            ) : (
              <button
                type="button"
                onClick={togglePlay}
                disabled={!currentTrack}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="player-button border-[--color-neon-purple] text-[--color-neon-purple]"
              >
                {isPlaying ? "pause" : "play"}
              </button>
            )}
            <button
              type="button"
              onClick={next}
              disabled={queue.length < 2}
              aria-label="Next track"
              className="player-button"
            >
              next
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-(family-name:--font-mono) text-[0.6rem] uppercase tracking-[0.18em] text-[--color-fg-muted]">
            vol
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => setVolume(parseFloat(event.target.value))}
            aria-label="Volume"
            className="w-full accent-[--color-neon-purple]"
          />
          <span className="w-8 text-right font-(family-name:--font-mono) text-[0.6rem] text-[--color-fg-muted]">
            {Math.round(volume * 100)}
          </span>
        </div>

        <PlayerMessage
          errorMessage={errorMessage}
          externalOnly={externalOnly}
          nativePlayable={nativePlayable}
          queueLength={queue.length}
          status={playbackStatus}
        />
        <ExternalEmbed />
        <QueueList />
      </div>

      {currentTrack && (
        <div className="hidden lg:block">
          <p className="font-(family-name:--font-mono) text-[0.55rem] uppercase tracking-[0.18em] text-[--color-fg-muted]">
            {sourceLabel(currentTrack.sourceKind)}
          </p>
          {currentTrack.rightsNote && (
            <p className="mt-2 text-xs leading-relaxed text-[--color-fg-muted]">
              {currentTrack.rightsNote}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function TrackIdentity({ desktop = false }: { desktop?: boolean }) {
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  if (!currentTrack) {
    return (
      <div className={desktop ? "mt-3" : "min-w-0 flex-1"}>
        <p className="font-(family-name:--font-mono) text-[0.65rem] uppercase tracking-[0.2em] text-[--color-fg-muted]">
          No rights-cleared track loaded
        </p>
        <p className="mt-1 text-sm text-[--color-fg-muted]">Waiting for the CMS queue.</p>
      </div>
    );
  }

  return (
    <div className={desktop ? "mt-3" : "min-w-0 flex-1"}>
      <p className="truncate font-(family-name:--font-mono) text-[0.65rem] uppercase tracking-[0.2em] text-[--color-neon-green]">
        {currentTrack.artist}
      </p>
      <p
        className={
          desktop
            ? "mt-1 text-base font-medium leading-snug text-[--color-fg]"
            : "truncate text-sm text-[--color-fg]"
        }
      >
        {currentTrack.title}
      </p>
      {currentTrack.attribution && desktop && (
        <p className="mt-3 text-xs leading-relaxed text-[--color-fg-muted]">
          {currentTrack.attribution}
        </p>
      )}
    </div>
  );
}

function MobileControls({
  dimmed,
  externalOnly,
  isPlaying,
  onNext,
  onTogglePlay,
}: {
  dimmed: boolean;
  externalOnly: boolean;
  isPlaying: boolean;
  onNext: () => void;
  onTogglePlay: () => void;
}) {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const queue = usePlayerStore((state) => state.queue);

  if (dimmed) return <UnlockSound />;

  return (
    <div className="flex shrink-0 items-center gap-2">
      {externalOnly && currentTrack?.externalUrl ? (
        <a
          href={currentTrack.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="border border-[--color-neon-green] px-3 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.14em] text-[--color-neon-green]"
        >
          open
        </a>
      ) : (
        <button
          type="button"
          onClick={onTogglePlay}
          disabled={!currentTrack}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="border border-[--color-neon-purple] px-3 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.14em] text-[--color-neon-purple] active:opacity-70 disabled:opacity-40"
        >
          {isPlaying ? "pause" : "play"}
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={queue.length < 2}
        aria-label="Next track"
        className="border border-[--color-rule] px-3 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.14em] text-[--color-fg-muted] active:opacity-70 disabled:opacity-40"
      >
        next
      </button>
    </div>
  );
}

function ProgressRail({
  disabled,
  max,
  onSeek,
  position,
}: {
  disabled: boolean;
  max: number;
  onSeek: (ms: number) => void;
  position: number;
}) {
  return (
    <div className="flex items-center gap-2 font-(family-name:--font-mono) text-[0.65rem] text-[--color-fg-muted]">
      <span>{formatMs(position)}</span>
      <input
        type="range"
        min={0}
        max={max}
        step={1000}
        value={Math.min(position, max)}
        disabled={disabled}
        onChange={(event) => onSeek(parseFloat(event.target.value))}
        aria-label="Playback progress"
        className="h-2 flex-1 cursor-pointer accent-[--color-neon-blue] disabled:cursor-not-allowed disabled:opacity-40"
      />
      <span>{max > 100 ? formatMs(max) : "--:--"}</span>
    </div>
  );
}

function PlayerMessage({
  errorMessage,
  externalOnly,
  nativePlayable,
  queueLength,
  status,
}: {
  errorMessage: string | null;
  externalOnly: boolean;
  nativePlayable: boolean;
  queueLength: number;
  status: string;
}) {
  if (errorMessage) {
    return <p className="text-xs leading-relaxed text-[--color-neon-purple]">{errorMessage}</p>;
  }

  if (queueLength === 0) {
    return (
      <p className="text-xs leading-relaxed text-[--color-fg-muted]">
        Add rights-cleared tracks in Sanity to activate the queue.
      </p>
    );
  }

  if (externalOnly) {
    return (
      <p className="text-xs leading-relaxed text-[--color-fg-muted]">
        This source opens externally. Caldera never scrapes or rehosts platform audio.
      </p>
    );
  }

  if (nativePlayable) {
    return (
      <p className="font-(family-name:--font-mono) text-[0.6rem] uppercase tracking-[0.18em] text-[--color-fg-muted]">
        {status}
      </p>
    );
  }

  return null;
}

function ExternalEmbed() {
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  if (currentTrack?.sourceKind !== "spotify" || !currentTrack.embedUrl) return null;

  return (
    <iframe
      title={`${currentTrack.title} on Spotify`}
      src={currentTrack.embedUrl}
      loading="lazy"
      allow="encrypted-media; fullscreen; picture-in-picture"
      className="h-20 w-full border-0 lg:h-24"
    />
  );
}

function QueueList() {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const queue = usePlayerStore((state) => state.queue);
  const setTrack = usePlayerStore((state) => state.setTrack);

  if (queue.length < 2) return null;

  return (
    <div>
      <p className="font-(family-name:--font-mono) text-[0.6rem] uppercase tracking-[0.2em] text-[--color-fg-muted]">
        Queue
      </p>
      <div className="mt-3 grid gap-2">
        {queue.slice(0, 6).map((track) => {
          const active = track.id === currentTrack?.id;
          return (
            <button
              type="button"
              key={track.id}
              onClick={() => setTrack(track)}
              className={[
                "border px-3 py-2 text-left transition-colors",
                active
                  ? "border-[--color-neon-green] bg-[color-mix(in_oklch,var(--color-neon-green)_10%,transparent)]"
                  : "border-[--color-rule] hover:border-[--color-neon-blue]",
              ].join(" ")}
            >
              <span className="block truncate text-xs font-medium text-[--color-fg]">
                {track.title}
              </span>
              <span className="mt-1 block truncate font-(family-name:--font-mono) text-[0.55rem] uppercase tracking-[0.14em] text-[--color-fg-muted]">
                {track.artist} · {sourceLabel(track.sourceKind)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

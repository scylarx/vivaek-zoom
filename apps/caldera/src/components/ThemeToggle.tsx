"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
  root.style.colorScheme = theme;
}

/**
 * Two-state theme toggle: Dark / Light.
 * On mount reads localStorage.theme, falls back to prefers-color-scheme.
 * Writes data-theme="light" (or removes it) on <html>.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  };

  // Avoid hydration mismatch — render a neutral shell until mounted.
  if (!mounted) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked="false"
        aria-label="Toggle light mode"
        disabled
        className="border border-[--color-rule] px-3 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.16em] text-[--color-fg-muted] opacity-0"
      >
        light
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "light"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="border border-[--color-rule] px-3 py-2 font-(family-name:--font-mono) text-xs uppercase tracking-[0.16em] text-[--color-fg-muted] hover:border-[--color-neon-purple] hover:text-[--color-neon-purple] transition-colors duration-150"
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

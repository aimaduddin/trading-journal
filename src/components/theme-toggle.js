"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "trading-journal-theme";

const getPreferredTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const preferred = getPreferredTheme();
    document.documentElement.setAttribute("data-theme", preferred);
    setTheme(preferred);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    window.localStorage.setItem(THEME_KEY, theme);
  }, [isMounted, theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  const label = theme === "dark" ? "Switch to day mode" : "Switch to night mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:bg-[var(--surface-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${className}`}
      aria-pressed={theme === "dark"}
      aria-label={label}
    >
      <span
        className="inline-flex h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: theme === "dark" ? "#2374e1" : "#1877f2" }}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap text-xs sm:text-sm">
        {isMounted ? (theme === "dark" ? "Night mode" : "Day mode") : "Theme"}
      </span>
    </button>
  );
}

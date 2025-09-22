"use client";

import { useEffect, useState } from "react";

function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4v-2m0-16V2m10 10h-2M6 12H4m13.657 7.657-1.414-1.414M7.757 8.343 6.343 6.929m12.728 0-1.414 1.414M7.757 15.657 6.343 17.07"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      {isMounted ? (
        theme === "dark" ? (
          <MoonIcon className="h-4 w-4 text-[var(--primary)]" />
        ) : (
          <SunIcon className="h-4 w-4 text-[var(--primary)]" />
        )
      ) : (
        <SunIcon className="h-4 w-4 text-[var(--primary)]" />
      )}
      <span className="whitespace-nowrap text-xs sm:text-sm">
        {isMounted ? (theme === "dark" ? "Night mode" : "Day mode") : "Theme"}
      </span>
    </button>
  );
}

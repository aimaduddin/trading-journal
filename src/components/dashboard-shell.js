"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ToastProvider } from "./toast-provider";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { href: "/dashboard/trades", label: "Trades" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/journal", label: "Journal" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const renderNavItems = (onNavigate) =>
    navItems.map((item) => {
      const isActive = pathname.startsWith(item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
            isActive
              ? "bg-[var(--primary)] text-white shadow-sm"
              : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
          }`}
        >
          {item.label}
        </Link>
      );
    });

  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <ToastProvider>
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-40 flex sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div
            className="absolute inset-0 bg-[rgba(24,25,26,0.65)] backdrop-blur-sm"
            onClick={closeMobileNav}
            aria-hidden="true"
          />
          <div className="relative flex h-full w-64 flex-col gap-6 border-r border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Journal
              </p>
              <h2 className="mt-2 text-xl font-semibold">Control Center</h2>
            </div>
            <button
              type="button"
              onClick={closeMobileNav}
              className="absolute right-5 top-5 rounded-md border border-[var(--border)] px-2 py-1 text-xs font-medium text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
            >
              Close
            </button>
            <ThemeToggle className="w-full justify-between" />
            <nav
              id="mobile-dashboard-navigation"
              className="flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {renderNavItems(closeMobileNav)}
            </nav>
          </div>
        </div>
      )}
      <div className="flex min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
        <aside className="hidden w-60 border-r border-[var(--border)] bg-[var(--surface-muted)] p-6 sm:flex sm:flex-col">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Journal
            </p>
            <h2 className="mt-2 text-xl font-semibold">Control Center</h2>
          </div>

          <nav className="mt-8 flex flex-col gap-1" aria-label="Dashboard navigation">
            {renderNavItems()}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="inline-flex items-center rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] sm:hidden"
                aria-expanded={isMobileNavOpen}
                aria-controls="mobile-dashboard-navigation"
              >
                Menu
              </button>
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--muted)]">
                Trading Journal
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle className="sm:hidden" />
              <ThemeToggle className="hidden sm:flex" />
              <Link
                href="/"
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              >
                Exit
              </Link>
            </div>
          </header>
          <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}

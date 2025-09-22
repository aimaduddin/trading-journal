"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToastProvider } from "./toast-provider";

const navItems = [
  { href: "/dashboard/trades", label: "Trades" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/journal", label: "Journal" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();

  return (
    <ToastProvider>
      <div className="flex min-h-screen w-full bg-neutral-950 text-neutral-100">
        <aside className="hidden w-60 border-r border-neutral-900 bg-neutral-950/60 p-6 sm:flex sm:flex-col">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Journal
            </p>
            <h2 className="mt-2 text-xl font-semibold">Control Center</h2>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-neutral-900 bg-neutral-950/80 px-4 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">
                Trading Journal
              </span>
            </div>
            <Link
              href="/"
              className="rounded-full border border-neutral-800 px-3 py-1 text-xs font-medium text-neutral-300 transition hover:border-neutral-600 hover:text-white"
            >
              Exit
            </Link>
          </header>
          <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}

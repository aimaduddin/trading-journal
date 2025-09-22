import Link from "next/link";

import ThemeToggle from "../components/theme-toggle";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <div className="relative min-h-screen">
      <ThemeToggle className="absolute right-6 top-6" />
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-10 px-6 text-center">
        <div className="space-y-4">
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-[var(--muted)]">
            Trading Journal
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Capture every trade. Surface every insight. Level up your edge.
          </h1>
          <p className="text-lg text-[var(--muted)]">
            A focused workspace for disciplined traders. Log entries, attach
            context, and review performance with analytics that actually help
            you improve.
          </p>
        </div>

        <Link
          href="/dashboard/trades"
          className="rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-white shadow-md transition hover:bg-[var(--primary-hover)]"
        >
          Enter the dashboard
        </Link>

        <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-left shadow-lg">
          <h2 className="text-lg font-semibold">How it works</h2>
          <ul className="mt-4 space-y-2 text-[var(--muted)]">
            <li>• Log trades with instrument, size, screenshots, and notes.</li>
            <li>• Tag strategies and track win rate, R multiples, and expectancy.</li>
            <li>• Review journal entries and analytics from any device.</li>
            <li>• Offline-ready Progressive Web App keeps drafts safe.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-10 px-6 text-center">
      <div className="space-y-4">
        <p className="font-mono text-sm uppercase tracking-[0.35em] text-neutral-400">
          Trading Journal
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Capture every trade. Surface every insight. Level up your edge.
        </h1>
        <p className="text-lg text-neutral-400">
          A focused workspace for disciplined traders. Log entries, attach
          context, and review performance with analytics that actually help you
          improve.
        </p>
      </div>

      <Link
        href="/dashboard/trades"
        className="rounded-full bg-white px-6 py-3 font-medium text-neutral-900 transition hover:bg-neutral-200"
      >
        Enter the dashboard
      </Link>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-left shadow-lg">
        <h2 className="text-lg font-semibold">How it works</h2>
        <ul className="mt-4 space-y-2 text-neutral-300">
          <li>• Log trades with instrument, size, screenshots, and notes.</li>
          <li>• Tag strategies and track win rate, R multiples, and expectancy.</li>
          <li>• Review journal entries and analytics from any device.</li>
          <li>• Offline-ready Progressive Web App keeps drafts safe.</li>
        </ul>
      </div>
    </main>
  );
}

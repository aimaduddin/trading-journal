export default function AnalyticsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col space-y-8 px-4 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold">Analytics</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Visualize performance by strategy, ticker, and timeframe. Upcoming work
          covers Supabase RPC endpoints for aggregates, chart components, and
          caching strategies for lightning-fast insights.
        </p>
      </header>

      <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50 p-6">
        <h2 className="text-lg font-medium">Next build steps</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-neutral-400">
          <li>P&amp;L trendlines and win/loss breakdown charts.</li>
          <li>Expectancy and risk metrics by strategy and tag.</li>
          <li>Weekly/monthly summary cards with downloadable exports.</li>
        </ul>
      </div>
    </div>
  );
}

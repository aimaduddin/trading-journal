const summaryCards = [
  {
    label: "Net P&L (30d)",
    value: "$12,450",
    change: "+8.6%",
    changeLabel: "vs previous 30 days",
    positive: true,
    sparkline: [42, 48, 55, 61, 68, 72, 79, 88],
  },
  {
    label: "Win rate",
    value: "64%",
    change: "+5 pts",
    changeLabel: "vs quarterly average",
    positive: true,
    sparkline: [36, 44, 50, 46, 60, 58, 64, 68],
  },
  {
    label: "Average R multiple",
    value: "1.38R",
    change: "+0.24R",
    changeLabel: "per closed trade",
    positive: true,
    sparkline: [28, 32, 40, 44, 48, 55, 60, 66],
  },
  {
    label: "Loss streak risk",
    value: "3 trades",
    change: "-1 trade",
    changeLabel: "current max drawdown",
    positive: true,
    sparkline: [60, 54, 50, 44, 38, 32, 28, 22],
  },
];

const equityCurve = [54, 52, 55, 59, 61, 66, 70, 73, 78, 82, 88, 93];

const streakMetrics = [
  { label: "Best day", value: "$2,450" },
  { label: "Worst day", value: "-$980" },
  { label: "Longest win streak", value: "6 days" },
  { label: "Longest loss streak", value: "2 days" },
];

const strategyMetrics = [
  {
    name: "Breakout pullback",
    trades: 18,
    winRate: 72,
    expectancy: "1.82R",
    pnl: "$6,820",
    impact: "+41% of P&L",
  },
  {
    name: "Opening range fade",
    trades: 11,
    winRate: 55,
    expectancy: "0.94R",
    pnl: "$2,360",
    impact: "+14% of P&L",
  },
  {
    name: "High tight flag",
    trades: 7,
    winRate: 71,
    expectancy: "1.34R",
    pnl: "$1,980",
    impact: "+11% of P&L",
  },
  {
    name: "Earnings momentum",
    trades: 6,
    winRate: 33,
    expectancy: "-0.42R",
    pnl: "-$640",
    impact: "-4% of P&L",
  },
];

const timeframeDistribution = [
  { label: "Day trades", value: 46 },
  { label: "Swing (2-5d)", value: 32 },
  { label: "Overnight holds", value: 14 },
  { label: "Weekly options", value: 8 },
];

const reviewPipeline = [
  {
    title: "Tag false breakouts",
    description: "10 trades need screen captures to confirm breakout quality.",
  },
  {
    title: "Refine profit targets",
    description: "Compare 1.5R vs 2R scaling for the high tight flag setup.",
  },
  {
    title: "Add market regime notes",
    description: "Layer in index breadth stats to explain slow weeks.",
  },
];

const tagPerformance = [
  {
    tag: "A+ setup",
    winRate: 78,
    avgR: 2.1,
    pnl: "$4,630",
  },
  {
    tag: "Earnings",
    winRate: 48,
    avgR: 0.7,
    pnl: "$1,120",
  },
  {
    tag: "Experimental",
    winRate: 22,
    avgR: -0.5,
    pnl: "-$850",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col space-y-8 px-4 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold">Analytics</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Visualize how capital performs across strategies, timeframes, and
          qualitative tags. Replace the mocked data with Supabase materialized
          views or RPC calls to unlock production-grade insights.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-950/70 p-6"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {card.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
              <p className="mt-2 text-xs text-neutral-500">
                <span className={card.positive ? "text-emerald-400" : "text-rose-400"}>
                  {card.change}
                </span>{" "}
                {card.changeLabel}
              </p>
            </div>
            <div className="mt-6 flex h-20 items-end gap-1">
              {card.sparkline.map((point, index) => (
                <span
                  key={`${card.label}-${index}`}
                  className={`flex-1 rounded-full ${
                    card.positive
                      ? "bg-gradient-to-t from-emerald-500/20 via-emerald-500/70 to-emerald-400"
                      : "bg-gradient-to-t from-rose-500/20 via-rose-500/70 to-rose-400"
                  }`}
                  style={{ height: `${point}%` }}
                />
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-white">Equity curve</h2>
                <p className="text-sm text-neutral-500">Last 90 sessions</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300">
                Simulated data
              </span>
            </div>
            <div className="mt-6 flex h-48 items-end gap-2 rounded-2xl border border-neutral-900 bg-neutral-950/80 p-4">
              {equityCurve.map((point, index) => (
                <span
                  key={`equity-${index}`}
                  className="flex-1 rounded-full bg-gradient-to-t from-emerald-500/10 via-emerald-500/60 to-emerald-400"
                  style={{ height: `${point}%` }}
                />
              ))}
            </div>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-neutral-900 bg-neutral-950/80 p-6">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-400">
              Streak insights
            </h3>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              {streakMetrics.map((item) => (
                <div key={item.label}>
                  <dt className="text-neutral-500">{item.label}</dt>
                  <dd className="mt-1 text-base font-semibold text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 space-y-3 text-xs text-neutral-400">
              <p>
                Use streak data to adapt sizing rules. For example, throttle risk
                after two losses and scale back in on a three-day green run.
              </p>
              <p>
                Hook this card up to a Supabase stored procedure that returns
                rolling streaks, or compute streaks inside a server action before
                rendering the page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="lg:col-span-2 rounded-2xl border border-neutral-900 bg-neutral-950/60">
          <header className="flex items-center justify-between border-b border-neutral-900 px-6 py-4">
            <div>
              <h2 className="text-lg font-medium text-white">Strategy performance</h2>
              <p className="text-sm text-neutral-500">
                Merge trade records with strategy metadata to surface winners.
              </p>
            </div>
            <span className="text-xs text-neutral-500">Mocked sample</span>
          </header>
          <div className="overflow-x-auto px-6 py-4">
            <table className="min-w-full text-left text-sm">
              <thead className="text-neutral-500">
                <tr>
                  <th className="py-2 pr-6 font-medium">Strategy</th>
                  <th className="py-2 pr-6 font-medium">Trades</th>
                  <th className="py-2 pr-6 font-medium">Win rate</th>
                  <th className="py-2 pr-6 font-medium">Expectancy</th>
                  <th className="py-2 pr-6 font-medium">Net P&L</th>
                  <th className="py-2 font-medium">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {strategyMetrics.map((strategy) => (
                  <tr key={strategy.name} className="text-neutral-300">
                    <td className="py-3 pr-6 text-white">{strategy.name}</td>
                    <td className="py-3 pr-6">{strategy.trades}</td>
                    <td className="py-3 pr-6">{strategy.winRate}%</td>
                    <td className="py-3 pr-6">{strategy.expectancy}</td>
                    <td className="py-3 pr-6">{strategy.pnl}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 rounded-full bg-white/10">
                          <div
                            className={`h-2 rounded-full ${
                              strategy.pnl.startsWith("-")
                                ? "bg-rose-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${Math.min(Math.abs(strategy.winRate), 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-neutral-400">
                          {strategy.impact}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-6">
          <h2 className="text-lg font-medium text-white">Timeframe mix</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Monitor position duration trends to balance risk across regimes.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-neutral-300">
            {timeframeDistribution.map((bucket) => (
              <li key={bucket.label}>
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-neutral-500">
                  <span>{bucket.label}</span>
                  <span>{bucket.value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-sky-500/60 via-sky-500 to-sky-400"
                    style={{ width: `${bucket.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-6">
          <h2 className="text-lg font-medium text-white">Tag performance</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Bring qualitative tags into analytics to spot drift early.
          </p>
          <div className="mt-6 space-y-4">
            {tagPerformance.map((item) => (
              <div
                key={item.tag}
                className="rounded-xl border border-neutral-900 bg-neutral-950/80 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{item.tag}</span>
                  <span className="text-xs text-neutral-400">{item.pnl}</span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs text-neutral-400">
                  <div>
                    <dt>Win rate</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">
                      {item.winRate}%
                    </dd>
                  </div>
                  <div>
                    <dt>Average R</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">
                      {item.avgR}R
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50 p-6">
          <h2 className="text-lg font-medium text-white">Review queue</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Translate analytics into deliberate practice with weekly rituals.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-neutral-300">
            {reviewPipeline.map((item) => (
              <li key={item.title} className="rounded-xl border border-neutral-900 bg-neutral-950/80 p-4">
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-2 text-xs text-neutral-400">{item.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-neutral-500">
            Wire this list to Supabase task tables or Notion exports to keep your
            review cadence tight.
          </p>
        </article>
      </section>
    </div>
  );
}

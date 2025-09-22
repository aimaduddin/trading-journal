const highlightCards = [
  {
    title: "Theme for the week",
    insight:
      "Breakout continuation setups outperformed when the first pullback formed above VWAP. Keep tightening the criteria around relative volume and index confirmation.",
    metric: "6 of 8 wins",
    tone: "positive",
  },
  {
    title: "Pattern to re-evaluate",
    insight:
      "Opening drive fades are slipping because entries happen too early. Wait for the one-minute candle to close below the premarket shelf before scaling in.",
    metric: "3 losses in a row",
    tone: "neutral",
  },
  {
    title: "Mindset note",
    insight:
      "Energy dipped midweek after a long research session. Plan lighter sizing on Thursdays and schedule review blocks earlier in the day.",
    metric: "Energy 5/10",
    tone: "warning",
  },
];

const quickCapturePrompts = [
  {
    label: "What felt easy today?",
    description: "Note moments where execution felt automatic. Those tend to highlight repeatable processes.",
  },
  {
    label: "Where did hesitation creep in?",
    description: "Call out the exact signal or market condition that made you pause so you can rehearse it.",
  },
  {
    label: "What should tomorrow's focus be?",
    description: "Limit this to one actionable theme. It keeps the next session intentional.",
  },
  {
    label: "Any follow-ups to schedule?",
    description: "Tag research tasks or trade recaps that deserve a deeper dive later in the week.",
  },
];

const reviewQueue = [
  {
    title: "Tag high quality base breakouts",
    description: "5 trades missing pattern screenshots. Add annotations before Friday's deep dive.",
    due: "Due in 2 days",
  },
  {
    title: "Rebuild playbook checklist",
    description: "Incorporate new pre-trade breath work and risk callouts for position sizing.",
    due: "Blocked until Saturday reset",
  },
  {
    title: "Sync with accountability partner",
    description: "Share week-over-week expectancy updates and confirm next review call.",
    due: "Scheduled Sunday 6pm",
  },
];

const journalEntries = [
  {
    id: "2024-04-18",
    title: "Capturing the NVDA breakout continuation",
    tradeRef: "Trade #482",
    timestamp: "Apr 18, 2024 – Afternoon session",
    sentiment: "Confident",
    tags: ["A+ setup", "Breakout", "Playbook"],
    summary:
      "Patiently waited for the bull flag to retest VWAP with declining volume. Took the third 5-minute candle close and scaled out into the measured move target.",
    takeaways: [
      "Alerts on higher time frame anchored VWAP kept attention where it mattered.",
      "Sizing was right-sized at 0.75R risk after seeing market breadth trend higher.",
    ],
    followUp: "Record a two-minute loom walking through the execution ladder to add to the playbook.",
  },
  {
    id: "2024-04-17",
    title: "Choppy open testing patience",
    tradeRef: "Trade #481",
    timestamp: "Apr 17, 2024 – Opening drive",
    sentiment: "Neutral",
    tags: ["Process", "Mindset"],
    summary:
      "Skipped three marginal setups and focused on reading internals. Noticed the hesitation spike when the first breakout failed and stepped away for ten minutes to reset.",
    takeaways: [
      "Breathing reset broke the tilt loop before it snowballed.",
      "Need a checklist item to reassess market context after two failed attempts.",
    ],
    followUp: "Draft a short visualization script for handling fast market reversals.",
  },
  {
    id: "2024-04-16",
    title: "Reviewing the premature exit on AMD",
    tradeRef: "Trade #480",
    timestamp: "Apr 16, 2024 – Midday",
    sentiment: "Curious",
    tags: ["Review", "Risk", "Experimental"],
    summary:
      "Closed the position at +0.6R after watching the one-minute pullback stall. Later analysis showed the five-minute trend stayed intact and the planned 1.5R target hit.",
    takeaways: [
      "Place alerts at the higher time frame invalidation to avoid reacting to noise.",
      "Experiment with partial take-profits to stay in the trade when conviction remains high.",
    ],
    followUp: "Add this case study to the next mentorship review with annotated charts.",
  },
];

const templates = [
  {
    name: "Daily trading debrief",
    description: "Quick reflection covering market context, playbook alignment, execution grade, and energy levels.",
    cadence: "Daily",
  },
  {
    name: "Weekly narrative reset",
    description: "Long-form entry that ties the week's trades to higher-level themes, upcoming catalysts, and mindset experiments.",
    cadence: "Weekly",
  },
  {
    name: "Strategy teardown",
    description: "Deep dive into a single setup. Capture annotated charts, stats pull from Supabase, and new criteria to test.",
    cadence: "Ad hoc",
  },
];

export default function JournalPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col space-y-8 px-4 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold">Journal</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Keep qualitative notes, link them to trades, and set follow-up prompts.
          The next iteration introduces the editor, trade linking, and reminder
          workflows.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {highlightCards.map((card) => (
          <article
            key={card.title}
            className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                {card.title}
              </p>
              <p className="mt-3 text-sm text-[var(--muted)]">{card.insight}</p>
            </div>
            <span
              className={`mt-6 inline-flex w-max items-center rounded-full px-3 py-1 text-xs font-medium ${
                card.tone === "positive"
                  ? "bg-emerald-500/10 text-emerald-300"
                  : card.tone === "warning"
                    ? "bg-amber-500/10 text-amber-300"
                    : "bg-sky-500/10 text-sky-300"
              }`}
            >
              {card.metric}
            </span>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-medium text-[var(--foreground)]">Quick capture</h2>
              <p className="text-sm text-[var(--muted)]">
                Draft thoughts here before promoting them to a structured entry.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:bg-[var(--surface-hover)]"
            >
              Start new entry
            </button>
          </header>
          <div className="mt-4 space-y-4">
            <textarea
              rows={4}
              readOnly
              placeholder="What stood out from today's session?"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[color:var(--muted)] focus:border-[color:rgba(24,119,242,0.35)] focus:outline-none"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {quickCapturePrompts.map((prompt) => (
                <div
                  key={prompt.label}
                  className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                    {prompt.label}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{prompt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
          <h2 className="text-lg font-medium text-[var(--foreground)]">Review queue</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Upcoming follow-ups and deep work sessions sourced from entries.
          </p>
          <ul className="mt-4 space-y-4 text-sm">
            {reviewQueue.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
              >
                <p className="font-medium text-[var(--foreground)]">{item.title}</p>
                <p className="mt-1 text-[var(--muted)]">{item.description}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-[var(--muted)]">
                  {item.due}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-medium text-[var(--foreground)]">Recent entries</h2>
            <p className="text-sm text-[var(--muted)]">
              Timeline of reflections linked to trades and next steps.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1 text-xs text-[var(--muted)]">
            Syncing from Supabase soon
          </span>
        </header>
        <ol className="mt-6 space-y-6">
          {journalEntries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                    {entry.timestamp}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[var(--foreground)]">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{entry.tradeRef}</p>
                </div>
                <span className="inline-flex w-max rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1 text-xs text-[var(--muted)]">
                  {entry.sentiment}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                {entry.summary}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <li
                    key={`${entry.id}-${tag}`}
                    className="rounded-full bg-[color:rgba(24,119,242,0.12)] px-3 py-1 text-xs font-medium text-[var(--primary)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                {entry.takeaways.map((item, index) => (
                  <p key={`${entry.id}-takeaway-${index}`} className="flex gap-2">
                    <span className="text-[var(--muted)]">•</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Follow-up
                </p>
                <p className="mt-1 text-[var(--muted)]">{entry.followUp}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
        <h2 className="text-lg font-medium text-[var(--foreground)]">Saved templates</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Build structured reflections you can reuse. Attach them to sessions
          and strategies to compare progress over time.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {templates.map((template) => (
            <article
              key={template.name}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-5"
            >
              <p className="text-sm font-medium text-[var(--foreground)]">{template.name}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{template.description}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-[var(--muted)]">
                {template.cadence}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

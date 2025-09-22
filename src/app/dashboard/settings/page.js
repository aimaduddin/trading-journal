export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col space-y-8 px-4 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Manage workspace defaults, notification preferences, and PWA install
          guidance. This page will also surface broker integrations and data
          export tools as they land.
        </p>
      </header>

      <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-6">
        <h2 className="text-lg font-medium text-[var(--foreground)]">Next build steps</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-[var(--muted)]">
          <li>Workspace defaults: timezone, base currency, lot sizing rules.</li>
          <li>Notification channels (email, push) and reminder cadence.</li>
          <li>Manage API keys, exports, and team member invites.</li>
        </ul>
      </div>
    </div>
  );
}

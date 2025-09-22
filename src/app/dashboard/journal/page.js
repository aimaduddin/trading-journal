export default function JournalPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col space-y-8 px-4 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold">Journal</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Keep qualitative notes, link them to trades, and set follow-up prompts.
          The next iteration introduces the editor, trade linking, and reminder
          workflows.
        </p>
      </header>

      <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50 p-6">
        <h2 className="text-lg font-medium">Next build steps</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-neutral-400">
          <li>Rich-text/markdown editor with autosave drafts.</li>
          <li>Link journal entries to trades and tags.</li>
          <li>Reminders for review cadence and follow-up tasks.</li>
        </ul>
      </div>
    </div>
  );
}

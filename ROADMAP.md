# Trading Journal Roadmap

## Immediate Focus
- **Platform foundation first.** Wire up Clerk authentication with Supabase so protected routes and Row Level Security work before touching core features.
- **Data model early.** Lock in tables (trades, tags, strategies, journal entries, media) and RLS policies to avoid churn once UI work begins.
- **PWA scaffolding alongside layout.** Register the service worker, manifest, and basic cache strategy while the surface area is still small to reduce refactors.

## Phase Breakdown
### Phase 1 – Platform Foundation
- Configure Next.js App Router project (Tailwind, shadcn/ui, linting, testing harness).
- Integrate Clerk: middleware-protected routes, user profile UI, Clerk webhooks -> Supabase.
- Create Supabase client helpers (server actions + edge functions) and environment variable management.
- Define database schema & migration scripts; seed with sample data; enable RLS policies.

**Deliverables:** Running dev environment with authenticated Supabase access, schema checked in, CI smoke tests.

### Phase 2 – Core Trade Capture
- Build responsive layout (dashboard shell, navigation, settings drawer).
- Implement trade entry form with validation, tag picker, file uploads to Supabase Storage, and optimistic updates.
- Trade list/table with filters (date range, instrument, strategy), server-side pagination, and offline draft handling.
- Journaling notes linked to trades; basic markdown/WYSIWYG editor.

**Deliverables:** End-to-end flow: log a trade, attach assets, add notes, view/edit in table.

### Phase 3 – Insights & Analysis
- Aggregate queries via Supabase RPC/edge functions for P&L, win rate, expectancy, strategy performance.
- Visualizations (line/bar charts, heatmaps) using TanStack + charting library.
- Weekly/monthly summary views, saved filters, export (CSV/JSON) endpoints.
- Notifications for incomplete data or review reminders (email/Clerk workflows).

**Deliverables:** Analytics dashboard with drill-downs, exports, automated reminders.

### Phase 4 – PWA & Quality Polish
- Harden service worker: offline shell, background sync queue for trade submissions, cache versioning, Supabase fallback messaging.
- Lighthouse PWA + performance audits; accessibility sweep.
- Integration tests (Playwright) covering auth, trade creation, offline/online sync.
- Deployment pipeline: Vercel previews, Supabase migrations CI, monitoring hooks (Logflare/Sentry).

**Deliverables:** Installable PWA passing audits, automated test coverage, production-ready pipeline.

## Supporting Workstreams
- **Design/UX:** Component library tokens, motion guidelines, empty/loading states, mobile-first workflows.
- **DevOps:** Secrets management, environment parity (local/staging/prod), backup strategy for Supabase.
- **Data governance:** Data retention policy, audit logging, migration/versioning checklist.

## Open Decisions to Resolve Early
- Do we need broker API integrations or is manual entry sufficient?
- Should strategies be user-defined only or template-driven?
- Required compliance/export formats (e.g., PDF statements)?
- Notification channels beyond email (mobile push, SMS, Slack)?

## Next Steps (You Can Tackle Now)
1. Configure Clerk + Supabase keys locally; implement server-side helpers ensuring Supabase respects Clerk JWTs.
2. Author initial schema migration in Supabase (tables, enums, RLS) and commit migration scripts.
3. Scaffold dashboard shell with protected routes and stub pages for Trades, Analytics, Journal, Settings.

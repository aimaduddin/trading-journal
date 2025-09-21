# Manual Test Checklist

Use this checklist after configuring Supabase to verify the trading journal flows.

## Prerequisites
- `.env.local` is populated as described in `docs/SETUP.md`.
- `supabase/migrations/0001_initial_schema.sql` has been executed on your Supabase project.
- A row exists in `public.users` whose `clerk_user_id` matches `SUPABASE_DEFAULT_OWNER_ID`.

## Smoke Test
1. Run `npm run dev` and open `http://localhost:3000`.
2. Navigate to `/dashboard/trades`. The "Recent trades" table should render the empty state message.

## Trade Creation Flow
1. In the "Log a trade" form, submit a trade with:
   - Symbol: `AAPL`
   - Side: `Long`
   - Quantity: `100`
   - Optional: add entry/exit prices, timestamps, and notes.
2. Verify the success message appears and the form resets.
3. Confirm the trade now appears in the "Recent trades" table with formatted values.
4. In Supabase, check the `public.trades` table to ensure the record exists and is owned by the shared `SUPABASE_DEFAULT_OWNER_ID`.

## Failure Modes
- Submit the form without a symbol or quantity and ensure a validation error message surfaces.
- Temporarily break `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`, restart the dev server, and confirm the UI reports a fetch error for the trades table.

Document any anomalies in your issue tracker so we can prioritize fixes before building advanced analytics or offline syncing.

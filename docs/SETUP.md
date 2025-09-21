# Local Setup Guide

This project now runs without Clerk authentication. Only Supabase is required for persistence.

## 1. Create and Configure Supabase
1. Sign in to [Supabase](https://supabase.com/) and create a new project.
2. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
3. Open the SQL editor and run the migration in `supabase/migrations/0001_initial_schema.sql`.
4. (Optional) Add a **Storage bucket** named `trade-media` for screenshots or files you plan to upload later.

## 2. Seed a Default Owner
Because the app is public, every trade is associated with a single shared owner. Insert a record into `public.users` where `clerk_user_id` matches the value you plan to use for `SUPABASE_DEFAULT_OWNER_ID` (e.g. `public-user`).

```sql
insert into public.users (clerk_user_id, email, display_name)
values ('public-user', 'demo@example.com', 'Public Workspace')
on conflict (clerk_user_id) do nothing;
```

## 3. Populate `.env.local`
Duplicate `.env.example` to `.env.local` and fill in the values you copied above:

```bash
cp .env.example .env.local
```

Update `.env.local` with the Supabase keys, the shared owner id, and your app URL (typically `http://localhost:3000`).

## 4. Start the App Locally
After environment variables are in place, install dependencies (if you haven’t already) and start the dev server:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to verify the public landing page loads. Navigate to `/dashboard/trades` and save a trade to confirm Supabase writes succeed.

Once these steps are complete, you’re ready to start implementing trade capture features.

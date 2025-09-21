-- Trading Journal initial schema
-- NOTE: Ensure your Clerk JWT template sets `sub` to the Clerk user ID and `aud` to `authenticated`
-- so policies comparing against auth.jwt()->>'sub' work correctly.

begin;

create type trade_side as enum ('long', 'short');
create type trade_status as enum ('planned', 'open', 'closed', 'cancelled');
create type trade_entry_type as enum ('market', 'limit', 'stop', 'stop_limit');

create table public.users (
  clerk_user_id text primary key,
  email text,
  display_name text,
  avatar_url text,
  timezone text default 'UTC',
  base_currency text default 'USD',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.strategies (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null references public.users (clerk_user_id) on delete cascade,
  name text not null,
  description text,
  color text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null references public.users (clerk_user_id) on delete cascade,
  name text not null,
  description text,
  color text,
  created_at timestamptz default now()
);

create table public.trades (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null references public.users (clerk_user_id) on delete cascade,
  strategy_id uuid references public.strategies (id) on delete set null,
  symbol text not null,
  side trade_side not null,
  status trade_status not null default 'planned',
  entry_type trade_entry_type default 'market',
  entry_price numeric(18, 6),
  exit_price numeric(18, 6),
  quantity numeric(18, 4) not null check (quantity > 0),
  risk_amount numeric(18, 2),
  fees numeric(18, 2) default 0,
  notes text,
  executed_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.trade_tags (
  trade_id uuid not null references public.trades (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  owner_id text not null references public.users (clerk_user_id) on delete cascade,
  created_at timestamptz default now(),
  primary key (trade_id, tag_id)
);

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null references public.users (clerk_user_id) on delete cascade,
  title text,
  content text,
  mood text,
  review_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.journal_entry_links (
  journal_entry_id uuid not null references public.journal_entries (id) on delete cascade,
  trade_id uuid not null references public.trades (id) on delete cascade,
  owner_id text not null references public.users (clerk_user_id) on delete cascade,
  created_at timestamptz default now(),
  primary key (journal_entry_id, trade_id)
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null references public.users (clerk_user_id) on delete cascade,
  trade_id uuid references public.trades (id) on delete set null,
  journal_entry_id uuid references public.journal_entries (id) on delete set null,
  storage_path text not null,
  content_type text,
  file_size_kb integer,
  alt_text text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.users enable row level security;
alter table public.strategies enable row level security;
alter table public.tags enable row level security;
alter table public.trades enable row level security;
alter table public.trade_tags enable row level security;
alter table public.journal_entries enable row level security;
alter table public.journal_entry_links enable row level security;
alter table public.media_assets enable row level security;

create policy "Users manage own profile" on public.users
  for all
  using (clerk_user_id = auth.jwt() ->> 'sub')
  with check (clerk_user_id = auth.jwt() ->> 'sub');

create policy "Users manage own strategies" on public.strategies
  for all
  using (owner_id = auth.jwt() ->> 'sub')
  with check (owner_id = auth.jwt() ->> 'sub');

create policy "Users manage own tags" on public.tags
  for all
  using (owner_id = auth.jwt() ->> 'sub')
  with check (owner_id = auth.jwt() ->> 'sub');

create policy "Users manage own trades" on public.trades
  for all
  using (owner_id = auth.jwt() ->> 'sub')
  with check (owner_id = auth.jwt() ->> 'sub');

create policy "Users manage own trade tags" on public.trade_tags
  for all
  using (owner_id = auth.jwt() ->> 'sub')
  with check (owner_id = auth.jwt() ->> 'sub');

create policy "Users manage own journal entries" on public.journal_entries
  for all
  using (owner_id = auth.jwt() ->> 'sub')
  with check (owner_id = auth.jwt() ->> 'sub');

create policy "Users manage own journal links" on public.journal_entry_links
  for all
  using (owner_id = auth.jwt() ->> 'sub')
  with check (owner_id = auth.jwt() ->> 'sub');

create policy "Users manage own media" on public.media_assets
  for all
  using (owner_id = auth.jwt() ->> 'sub')
  with check (owner_id = auth.jwt() ->> 'sub');

commit;

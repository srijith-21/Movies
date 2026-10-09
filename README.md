# reelgood

A responsive movie discovery and watchlist app built with React, Vite, Tailwind CSS, TMDB, and Supabase. Without credentials, the app still works with a curated movie selection and a browser-persistent watchlist.

## Run locally

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set the two optional integrations:

- `VITE_TMDB_API_KEY`: a TMDB **API Read Access Token**. Create one in the API section of your TMDB account settings. The app uses it to load live trending, popular, top-rated, and upcoming titles, search the TMDB catalog, and show movie details, cast, directors, and trailers. Without it, a curated catalog and local search are available.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`: the project URL and publishable/anon key from your Supabase project settings. Without them, sign-in displays setup guidance and the watchlist and mood preference are stored in this browser.

Restart Vite after changing `.env.local`. These are browser-side Vite variables: only use the TMDB read token and Supabase publishable/anon key here, never a Supabase service-role key.

## Supabase database setup

Run this SQL in the Supabase SQL Editor. Row-level security scopes watchlists and preferences to the signed-in user; no service-role key is needed.

```sql
create table if not exists public.watchlist (
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id bigint not null,
  movie jsonb not null,
  watched boolean not null default false,
  favorite boolean not null default false,
  rating smallint not null default 0 check (rating between 0 and 5),
  created_at timestamptz not null default now(),
  primary key (user_id, movie_id)
);

alter table public.watchlist enable row level security;
drop policy if exists "Users manage their own watchlist" on public.watchlist;
create policy "Users manage their own watchlist"
  on public.watchlist for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_preferences enable row level security;
drop policy if exists "Users manage their own preferences" on public.user_preferences;
create policy "Users manage their own preferences"
  on public.user_preferences for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

Accounts use Supabase Auth. The display name is stored in Auth user metadata; watchlist state, watched/favorite flags, and personal ratings are stored in `watchlist`; the selected discovery mood is stored in `user_preferences`. Guest data remains local to the browser.

## Features

- Browse trending and recommended titles, discover films by mood, or use Surprise Me.
- Search the live TMDB catalog and filter by genre, release year, language, and rating.
- Inspect movie details, cast, director, ratings, runtime, and available trailers.
- Add or remove titles from a watchlist, mark them watched, favorite them, and save a personal 1–5-star rating.
- Create an account, sign in/out, and sync watchlist and mood across sessions using Supabase.
- Responsive layouts, loading and empty states, error notices, and keyboard-accessible movie details.

## Scripts

- `npm run dev` — start Vite.
- `npm run build` — create the production build.
- `npm run lint` — run ESLint.

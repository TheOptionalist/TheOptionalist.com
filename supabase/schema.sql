create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  program text,
  course text,
  created_at timestamptz not null default now()
);

create index if not exists profiles_created_at_idx on public.profiles (created_at desc);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Profiles can be inserted by owner"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "Profiles can be updated by owner"
  on public.profiles
  for update
  using (auth.uid() = id);

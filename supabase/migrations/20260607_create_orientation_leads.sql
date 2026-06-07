create extension if not exists pgcrypto;

create table if not exists public.orientation_leads (
  id uuid primary key default gen_random_uuid(),
  submission_id text not null unique,
  created_at timestamptz not null default timezone('utc', now()),
  first_name text not null,
  last_name text not null,
  age_range text not null,
  residence text not null,
  email text not null,
  whatsapp text not null,
  current_situation text not null,
  desired_outcome text not null,
  objective text not null,
  interest_area text not null,
  current_level text not null,
  education_background text not null,
  weekly_availability text not null,
  preferred_modality text not null,
  investment_range text not null,
  financing_interest text not null,
  start_timing text not null,
  additional_context text not null,
  privacy_accepted boolean not null check (privacy_accepted = true),
  lead_score integer not null default 0 check (lead_score >= 0 and lead_score <= 100),
  lead_temperature text not null check (lead_temperature in ('cold', 'warm', 'hot')),
  lead_tags text[] not null default '{}',
  lead_summary text not null default '',
  raw_answers jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists orientation_leads_created_at_idx on public.orientation_leads (created_at desc);
create index if not exists orientation_leads_email_idx on public.orientation_leads (email);

alter table public.orientation_leads enable row level security;

revoke all on public.orientation_leads from anon, authenticated;
grant select, insert, update, delete on public.orientation_leads to service_role;

drop policy if exists service_role_manage_orientation_leads on public.orientation_leads;

create policy service_role_manage_orientation_leads
  on public.orientation_leads
  as permissive
  for all
  to service_role
  using (true)
  with check (true);


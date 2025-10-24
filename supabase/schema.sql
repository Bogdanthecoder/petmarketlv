-- Minimal schema without RLS (for fastest MVP). Add RLS later if needed.

create table if not exists sellers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null, -- email or phone
  city text,
  created_at timestamptz default now()
);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references sellers(id) on delete cascade,
  title text not null,
  description text,
  species text not null, -- dog, cat, other
  breed text,
  age_weeks int,
  price numeric,
  location text,
  is_chipped boolean default false,
  is_vaccinated boolean default false,
  created_at timestamptz default now(),
  published boolean default true,
  flagged boolean default false
);

create table if not exists listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete cascade,
  path text not null,
  created_at timestamptz default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id) on delete cascade,
  reporter_contact text,
  reason text,
  created_at timestamptz default now()
);

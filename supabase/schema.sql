-- STRIGLO MVP v1 schema
-- Database-only foundation for mock-to-real migration.
--
-- Assumptions:
-- - public.users.id is a standalone UUID for MVP schema planning.
--   Later, when Supabase Auth is connected, this can be changed to reference auth.users(id)
--   or mapped through a profile table migration.
-- - Weekday uses 0-6, where 0 = Sunday and 6 = Saturday.
-- - Service prices are stored as integer minor units: BYN kopecks.
-- - RLS policies are intentionally not created in this task.

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  phone text unique,
  name text,
  role text not null default 'client',
  created_at timestamptz not null default now(),
  constraint users_role_check check (role in ('client', 'barber', 'admin')),
  constraint users_phone_not_blank_check check (phone is null or length(trim(phone)) > 0)
);

create table if not exists public.barbers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete set null,
  name text not null,
  avatar_url text,
  bio text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint barbers_name_not_blank_check check (length(trim(name)) > 0)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  duration_minutes integer not null,
  price integer not null,
  is_active boolean not null default true,
  constraint services_title_not_blank_check check (length(trim(title)) > 0),
  constraint services_duration_positive_check check (duration_minutes > 0),
  constraint services_price_non_negative_check check (price >= 0)
);

create table if not exists public.barber_services (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid not null references public.barbers(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  constraint barber_services_unique_pair unique (barber_id, service_id)
);

create table if not exists public.barber_availability (
  id uuid primary key default gen_random_uuid(),
  barber_id uuid not null references public.barbers(id) on delete cascade,
  weekday integer not null,
  start_time time not null,
  end_time time not null,
  is_go_available boolean not null default false,
  constraint barber_availability_weekday_check check (weekday between 0 and 6),
  constraint barber_availability_time_order_check check (end_time > start_time)
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete restrict,
  barber_id uuid not null references public.barbers(id) on delete restrict,
  service_id uuid not null references public.services(id) on delete restrict,
  date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'pending',
  type text not null default 'salon',
  created_at timestamptz not null default now(),
  constraint bookings_status_check check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  constraint bookings_type_check check (type in ('salon', 'go')),
  constraint bookings_time_order_check check (end_time > start_time)
);

create table if not exists public.go_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete restrict,
  barber_id uuid references public.barbers(id) on delete set null,
  service_id uuid not null references public.services(id) on delete restrict,
  address text not null,
  proposed_date date not null,
  proposed_time time not null,
  status text not null default 'pending',
  barber_message text,
  created_at timestamptz not null default now(),
  constraint go_requests_address_not_blank_check check (length(trim(address)) > 0),
  constraint go_requests_status_check check (
    status in ('pending', 'accepted', 'declined', 'proposed_new_time', 'cancelled')
  )
);

create table if not exists public.go_proposals (
  id uuid primary key default gen_random_uuid(),
  go_request_id uuid not null references public.go_requests(id) on delete cascade,
  barber_id uuid not null references public.barbers(id) on delete restrict,
  proposed_date date not null,
  proposed_time time not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  constraint go_proposals_status_check check (status in ('pending', 'accepted', 'declined'))
);

create table if not exists public.haircut_recommendations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  tags text[] not null default '{}',
  description text,
  constraint haircut_recommendations_title_not_blank_check check (length(trim(title)) > 0)
);

create index if not exists bookings_user_date_idx
  on public.bookings (user_id, date);

create index if not exists bookings_barber_date_idx
  on public.bookings (barber_id, date);

create index if not exists bookings_status_idx
  on public.bookings (status);

create index if not exists go_requests_user_status_idx
  on public.go_requests (user_id, status);

create index if not exists go_requests_barber_status_idx
  on public.go_requests (barber_id, status);

create index if not exists barber_availability_barber_weekday_idx
  on public.barber_availability (barber_id, weekday);

create index if not exists barber_services_barber_idx
  on public.barber_services (barber_id);

create index if not exists barber_services_service_idx
  on public.barber_services (service_id);

-- Future RLS notes:
-- - Enable RLS once Supabase Auth is wired.
-- - Clients should read/write their own bookings and GO requests.
-- - Barbers should read assigned bookings, their availability, and relevant GO requests.
-- - Admins should have management access through explicit policies.
-- No RLS policies are created here by design.

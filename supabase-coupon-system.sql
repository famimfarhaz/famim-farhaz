-- Create coupons table
create table if not exists public.coupons (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  code text not null unique,
  discount_percent numeric not null,
  is_active boolean default true,
  expires_at timestamp with time zone null,
  constraint coupons_pkey primary key (id)
);

-- Add missing columns to orders table
alter table public.orders 
add column if not exists phone text,
add column if not exists coupon_code text;

-- Optional: Add some initial coupons
insert into public.coupons (code, discount_percent)
values 
  ('SAVE10', 10),
  ('FAMIM20', 20)
on conflict (code) do nothing;

-- Enable Row Level Security (RLS) if not already enabled
-- Note: You may need to adjust your existing policies
-- alter table public.coupons enable row level security;
-- alter table public.orders enable row level security;

-- Example Policies:
-- create policy "Allow public read-only access to coupons"
--   on public.coupons for select
--   using (is_active = true and (expires_at is null or expires_at > now()));

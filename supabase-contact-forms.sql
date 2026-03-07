-- Create contact_forms table (if it doesn't already exist)
create table if not exists public.contact_forms (
  id uuid not null default gen_random_uuid (),
  name character varying(255) not null,
  email character varying(255) not null,
  company character varying(255) null,
  phone character varying(50) null,
  activate_free_demo boolean null default false,
  project_type character varying(100) null,
  role character varying(100) null,
  budget character varying(50) null,
  timeline character varying(50) null,
  message text null,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  ip_address character varying(45) null,
  user_agent text null,
  is_potential_bot boolean null default false,
  constraint contact_forms_pkey primary key (id)
) TABLESPACE pg_default;

-- Create indexes for frequently queried columns
create index if not exists idx_contact_forms_email on public.contact_forms using btree (email) TABLESPACE pg_default;

create index if not exists idx_contact_forms_created_at on public.contact_forms using btree (created_at desc) TABLESPACE pg_default;

create index if not exists idx_contact_forms_activate_free_demo on public.contact_forms using btree (activate_free_demo) TABLESPACE pg_default;

create index if not exists idx_contact_forms_ip_address on public.contact_forms using btree (ip_address) TABLESPACE pg_default;

-- Create trigger function for updating updated_at column
create or replace function update_updated_at_column ()
returns trigger as $$ begin
  new.updated_at = timezone ('utc'::text, now());
  return new;
end; $$ language plpgsql;

-- Drop existing trigger if it exists, then create a new one
drop trigger if exists update_contact_forms_updated_at on contact_forms;

-- Create trigger to auto-update the updated_at column
create trigger update_contact_forms_updated_at before
update on contact_forms for each row
execute function update_updated_at_column ();

-- Enable RLS (Row Level Security) for the table
alter table public.contact_forms enable row level security;

-- Drop existing policies if they exist, then create new ones
drop policy if exists "Allow public insert on contact_forms" on public.contact_forms;
drop policy if exists "Allow authenticated users to read contact_forms" on public.contact_forms;

-- Create RLS policy for inserting new contact forms (allows anyone - even unauthenticated)
create policy "Allow anyone to insert contact forms" on public.contact_forms
  for insert to anon, authenticated
  with check (true);

-- Create RLS policy for selecting contact forms (only authenticated users/admins for viewing)
create policy "Allow authenticated users to read contact_forms" on public.contact_forms
  for select
  to authenticated
  using (true);

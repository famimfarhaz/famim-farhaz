-- Simple fix: Disable RLS on contact_forms table
-- This allows public inserts for contact form submissions
alter table public.contact_forms disable row level security;

-- Confirm the change
select tablename, rowsecurity 
from pg_tables 
where tablename = 'contact_forms';

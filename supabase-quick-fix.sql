-- Quick fix for Row Level Security issue
-- Run this single command in your Supabase SQL editor

ALTER TABLE contact_forms DISABLE ROW LEVEL SECURITY;
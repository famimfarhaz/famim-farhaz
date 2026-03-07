-- ============================================================
-- Migration: Simplify contact_forms + drop orders/coupons tables
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Drop meeting-related columns from contact_forms
ALTER TABLE contact_forms
  DROP COLUMN IF EXISTS selected_action,
  DROP COLUMN IF EXISTS meeting_topic,
  DROP COLUMN IF EXISTS preferred_date,
  DROP COLUMN IF EXISTS preferred_time,
  DROP COLUMN IF EXISTS timezone,
  DROP COLUMN IF EXISTS custom_timezone,
  DROP COLUMN IF EXISTS meeting_platform,
  DROP COLUMN IF EXISTS meeting_notes,
  DROP COLUMN IF EXISTS custom_project_type;

-- 2. Drop the orders table (checkout flow removed)
DROP TABLE IF EXISTS orders;

-- 3. Drop the coupons table (coupon system removed)
DROP TABLE IF EXISTS coupons;

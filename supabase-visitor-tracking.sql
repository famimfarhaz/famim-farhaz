-- Create visitor tracking table for security and bot detection
-- Run this SQL in your Supabase SQL editor

CREATE TABLE visitor_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL, -- Supports both IPv4 and IPv6
  user_agent TEXT,
  referer TEXT,
  page_url TEXT,
  country VARCHAR(2), -- Country code (e.g., 'US', 'BD')
  city VARCHAR(100),
  device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet', 'bot'
  browser VARCHAR(50),
  os VARCHAR(50),
  is_bot BOOLEAN DEFAULT FALSE,
  visit_count INTEGER DEFAULT 1, -- How many times this IP visited
  first_visit TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_visitor_logs_ip_address ON visitor_logs(ip_address);
CREATE INDEX idx_visitor_logs_created_at ON visitor_logs(created_at DESC);
CREATE INDEX idx_visitor_logs_is_bot ON visitor_logs(is_bot);
CREATE INDEX idx_visitor_logs_last_visit ON visitor_logs(last_visit DESC);

-- Create function to update last visit timestamp
CREATE OR REPLACE FUNCTION update_visitor_last_visit()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_visit = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update last_visit on updates
CREATE TRIGGER update_visitor_logs_last_visit 
    BEFORE UPDATE ON visitor_logs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_visitor_last_visit();

-- Update contact_forms table to include visitor tracking
ALTER TABLE contact_forms ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45);
ALTER TABLE contact_forms ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE contact_forms ADD COLUMN IF NOT EXISTS is_potential_bot BOOLEAN DEFAULT FALSE;

-- Create index for contact form IP tracking
CREATE INDEX IF NOT EXISTS idx_contact_forms_ip_address ON contact_forms(ip_address);

-- Disable RLS for visitor logs to allow public tracking
ALTER TABLE visitor_logs DISABLE ROW LEVEL SECURITY;

-- Optional: Create a view to get visitor statistics
CREATE OR REPLACE VIEW visitor_stats AS
SELECT 
  DATE(created_at) as visit_date,
  COUNT(*) as total_visits,
  COUNT(DISTINCT ip_address) as unique_visitors,
  COUNT(*) FILTER (WHERE is_bot = true) as bot_visits,
  COUNT(*) FILTER (WHERE is_bot = false) as human_visits,
  COUNT(*) FILTER (WHERE device_type = 'mobile') as mobile_visits,
  COUNT(*) FILTER (WHERE device_type = 'desktop') as desktop_visits
FROM visitor_logs 
GROUP BY DATE(created_at) 
ORDER BY visit_date DESC;
-- Create contact_forms table in Supabase
-- Run this SQL in your Supabase SQL editor

CREATE TABLE contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  activate_free_demo BOOLEAN DEFAULT FALSE,
  selected_action VARCHAR(20), -- 'meeting' or 'hire'
  
  -- Meeting specific fields
  meeting_topic TEXT,
  preferred_date DATE,
  preferred_time TIME,
  timezone VARCHAR(100),
  custom_timezone VARCHAR(100),
  meeting_platform VARCHAR(50),
  meeting_notes TEXT,
  
  -- Hire specific fields
  project_type VARCHAR(100),
  custom_project_type VARCHAR(255),
  role VARCHAR(100),
  budget VARCHAR(50),
  timeline VARCHAR(50),
  message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index for faster queries on email and created_at
CREATE INDEX idx_contact_forms_email ON contact_forms(email);
CREATE INDEX idx_contact_forms_created_at ON contact_forms(created_at DESC);
CREATE INDEX idx_contact_forms_activate_free_demo ON contact_forms(activate_free_demo);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at on row updates
CREATE TRIGGER update_contact_forms_updated_at 
    BEFORE UPDATE ON contact_forms 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Disable Row Level Security to allow public form submissions
-- You can enable this later and create proper policies if needed
ALTER TABLE contact_forms DISABLE ROW LEVEL SECURITY;

-- Alternative: If you want to keep RLS enabled, use these policies instead:
-- ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable insert for everyone" ON contact_forms FOR INSERT TO public WITH CHECK (true);
-- CREATE POLICY "Enable read for authenticated users only" ON contact_forms FOR SELECT TO authenticated USING (true);

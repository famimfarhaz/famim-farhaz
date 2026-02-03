-- Create project_ratings table in Supabase
-- Run this SQL in your Supabase SQL editor

CREATE TABLE project_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
  user_fingerprint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Ensure one rating per user per project
  UNIQUE(project_id, user_fingerprint)
);

-- Create indexes for faster queries
CREATE INDEX idx_project_ratings_project_id ON project_ratings(project_id);
CREATE INDEX idx_project_ratings_user_fingerprint ON project_ratings(user_fingerprint);
CREATE INDEX idx_project_ratings_created_at ON project_ratings(created_at DESC);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_project_ratings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at on row updates
CREATE TRIGGER update_project_ratings_updated_at 
    BEFORE UPDATE ON project_ratings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_project_ratings_updated_at();

-- Disable Row Level Security to allow public rating submissions
-- You can enable this later and create proper policies if needed
ALTER TABLE project_ratings DISABLE ROW LEVEL SECURITY;

-- Alternative: If you want to keep RLS enabled, use these policies instead:
-- ALTER TABLE project_ratings ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable insert for everyone" ON project_ratings FOR INSERT TO public WITH CHECK (true);
-- CREATE POLICY "Enable read for everyone" ON project_ratings FOR SELECT TO public USING (true);
-- CREATE POLICY "Enable update for everyone" ON project_ratings FOR UPDATE TO public USING (true);

-- Optional: Create a view to get rating statistics per project
CREATE OR REPLACE VIEW project_rating_stats AS
SELECT 
  project_id,
  COUNT(*) as total_ratings,
  ROUND(AVG(rating)::numeric, 2) as average_rating,
  MAX(rating) as highest_rating,
  MIN(rating) as lowest_rating,
  MODE() WITHIN GROUP (ORDER BY rating) as most_common_rating,
  COUNT(*) FILTER (WHERE rating >= 8) as excellent_count,
  COUNT(*) FILTER (WHERE rating >= 6 AND rating < 8) as good_count,
  COUNT(*) FILTER (WHERE rating >= 4 AND rating < 6) as average_count,
  COUNT(*) FILTER (WHERE rating < 4) as poor_count
FROM project_ratings 
GROUP BY project_id 
ORDER BY average_rating DESC;

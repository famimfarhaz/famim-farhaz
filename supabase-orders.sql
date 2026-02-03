-- Create a table for storing client orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  client_name TEXT NOT NULL,
  package_name TEXT, -- Custom name for the package
  email TEXT NOT NULL,
  requirements TEXT, -- Additional notes or requirements
  package_details JSONB NOT NULL, -- Stores the list of selected services or package info
  total_price NUMERIC, -- Estimated price
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'negotiating', 'accepted', 'rejected', 'completed')),
  order_type TEXT DEFAULT 'fixed' CHECK (order_type IN ('fixed', 'negotiation')),
  contact_info JSONB -- scalable for phone, company name etc without schema migration
);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert orders (public submission)
CREATE POLICY "Allow public insert to orders"
ON orders FOR INSERT
WITH CHECK (true);

-- Policy: Allow only authenticated admins to view/update orders (assuming admin role exists, or just service_role usage)
-- For now, we'll keep it simple for the portfolio owner to access via Supabase Dashboard

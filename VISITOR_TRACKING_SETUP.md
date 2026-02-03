# Visitor Tracking Setup Guide

The error you're seeing occurs because the visitor tracking system requires a properly configured Supabase database.

## Quick Fix Options

### Option 1: Configure Supabase (Recommended for Production)

1. **Create/Login to Supabase Account**
   - Go to https://supabase.com
   - Create a new project or use an existing one

2. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy the Project URL and anon/public key

3. **Update `.env.local`**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Create Database Table**
   Run this SQL in Supabase SQL Editor:
   ```sql
   -- Create visitor_logs table
   CREATE TABLE IF NOT EXISTS visitor_logs (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     ip_address TEXT NOT NULL UNIQUE,
     user_agent TEXT,
     referer TEXT,
     page_url TEXT,
     country TEXT,
     city TEXT,
     device_type TEXT,
     browser TEXT,
     os TEXT,
     is_bot BOOLEAN DEFAULT false,
     visit_count INTEGER DEFAULT 1,
     first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create index for better query performance
   CREATE INDEX IF NOT EXISTS idx_visitor_logs_ip ON visitor_logs(ip_address);
   CREATE INDEX IF NOT EXISTS idx_visitor_logs_last_visit ON visitor_logs(last_visit);

   -- Create visitor_stats view for analytics
   CREATE OR REPLACE VIEW visitor_stats AS
   SELECT
     DATE(last_visit) as date,
     COUNT(*) as unique_visitors,
     SUM(visit_count) as total_visits,
     COUNT(CASE WHEN is_bot = true THEN 1 END) as bot_visits,
     COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) as mobile_visitors,
     COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) as desktop_visitors,
     COUNT(CASE WHEN device_type = 'tablet' THEN 1 END) as tablet_visitors
   FROM visitor_logs
   GROUP BY DATE(last_visit)
   ORDER BY DATE(last_visit) DESC;
   ```

5. **Restart Your Development Server**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   # or
   pnpm dev
   ```

### Option 2: Disable Visitor Tracking (Quick Development Fix)

If you don't need visitor tracking right now, the code has been updated to gracefully handle missing Supabase configuration. The error will no longer crash your app - it will just log a warning.

**What I've Fixed:**
- ✅ Added validation to check if Supabase is configured before attempting to track
- ✅ Changed error responses to not throw 500 errors when database is not configured
- ✅ Updated client-side hook to handle tracking failures gracefully
- ✅ Errors are now logged as warnings instead of errors

The tracking will silently fail with a console message: "Visitor tracking is currently disabled"

## Verify the Fix

After applying these changes, restart your dev server and check:

1. The error should no longer appear
2. Check browser console - you should see either:
   - "Visitor tracking is currently disabled" (if Supabase not configured)
   - Or successful tracking (if Supabase is configured)

## Testing Visitor Tracking

Once configured, you can test the API directly:

```bash
# Test the endpoint
curl -X POST http://localhost:3000/api/track-visitor \
  -H "Content-Type: application/json" \
  -d '{
    "user_agent": "Test Browser",
    "page_url": "http://localhost:3000",
    "referer": ""
  }'
```

Expected response (if configured):
```json
{
  "success": true,
  "message": "New visitor tracked",
  "tracked": true,
  "is_bot": false
}
```

Expected response (if not configured):
```json
{
  "success": false,
  "message": "Visitor tracking is currently disabled",
  "tracked": false
}
```

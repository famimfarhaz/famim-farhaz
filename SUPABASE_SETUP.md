# Supabase Contact Form Integration Setup

## 🚀 Quick Setup Instructions

### 1. Create Supabase Table
1. Go to your Supabase project dashboard: https://mzsnwxovnmaplsocxlnz.supabase.co
2. Navigate to **SQL Editor**
3. Copy and paste the content from `supabase-table-setup.sql`
4. Run the SQL script to create the `contact_forms` table

### 2. Environment Variables
The environment variables are already set up in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://mzsnwxovnmaplsocxlnz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Testing the Integration
1. Start your development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out the form and submit
4. Check your Supabase dashboard > Table Editor > `contact_forms` to see the submitted data

## 📊 Database Schema

The `contact_forms` table includes:

### Basic Fields:
- `name` (required)
- `email` (required) 
- `company` (optional)
- `phone` (optional)
- `activate_free_demo` (boolean) ✅ **This tracks if user selected the FREE Demo checkbox**
- `selected_action` ('meeting' or 'hire')

### Meeting Fields:
- `meeting_topic`
- `preferred_date`
- `preferred_time`
- `timezone`
- `meeting_platform`
- `meeting_notes`

### Hire Fields:
- `project_type`
- `role`
- `budget`
- `timeline`
- `message`

### System Fields:
- `id` (UUID, auto-generated)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 🔍 Viewing Form Submissions

### In Supabase Dashboard:
1. Go to **Table Editor**
2. Select `contact_forms` table
3. View all submissions with full details

### Key Information Captured:
- ✅ User's basic contact information
- ✅ Whether they selected "Activate Your FREE Demo" checkbox
- ✅ Whether they chose meeting or hire option
- ✅ All form fields based on their selection
- ✅ Submission timestamp

## 🛡️ Security Features

- **Row Level Security (RLS)** enabled
- **Insert policy** allows anyone to submit forms
- **Read access** can be restricted to authenticated users only
- **Environment variables** keep credentials secure

## 🚨 Important Notes

1. The form will show success/error messages
2. All form data is stored in Supabase immediately upon submission
3. The "Activate Your FREE Demo" checkbox status is tracked in the `activate_free_demo` column
4. Form validation ensures required fields are filled

## 📧 Form Data Structure

When a user submits the form, all data is captured including:
```javascript
{
  name: "John Doe",
  email: "john@example.com", 
  company: "Tech Corp",
  phone: "+1234567890",
  activate_free_demo: true, // TRUE if checkbox was selected
  selected_action: "hire", // 'meeting' or 'hire'
  // ... other fields based on selection
}
```

The integration is now complete and ready to capture all form submissions in your Supabase database!

---

## 🔒 **Visitor Tracking & Security Features**

### **IP Address & Bot Detection Setup:**

1. **Run Visitor Tracking SQL:**
   - Copy content from `supabase-visitor-tracking.sql`
   - Run in Supabase SQL Editor
   - This creates `visitor_logs` table and updates `contact_forms`

2. **Automatic Features:**
   - ✅ **IP Address Tracking** - Every visitor's IP is logged
   - ✅ **Bot Detection** - Identifies bots, crawlers, scrapers
   - ✅ **Device Detection** - Desktop, mobile, tablet classification
   - ✅ **Browser & OS Detection** - Chrome, Firefox, Windows, etc.
   - ✅ **Visit Counter** - Tracks repeat visits from same IP
   - ✅ **Suspicious Activity Detection** - Flags rapid requests

### **Security Tables Created:**

#### **`visitor_logs` Table:**
- `ip_address` - Real visitor IP address
- `user_agent` - Browser/device information
- `is_bot` - Boolean flag for bot detection
- `device_type` - desktop, mobile, tablet, bot
- `browser` - Chrome, Firefox, Safari, etc.
- `os` - Windows, macOS, Linux, etc.
- `visit_count` - Number of visits from this IP
- `first_visit` / `last_visit` - Timestamps
- `page_url` / `referer` - Navigation tracking

#### **Updated `contact_forms` Table:**
- `ip_address` - IP of form submitter
- `user_agent` - Browser info of submitter
- `is_potential_bot` - Bot detection flag

### **Real-time Monitoring:**

#### **View Visitor Stats:**
```sql
SELECT * FROM visitor_stats ORDER BY visit_date DESC LIMIT 7;
```

#### **Find Suspicious Activity:**
```sql
SELECT ip_address, visit_count, is_bot, last_visit 
FROM visitor_logs 
WHERE is_bot = true OR visit_count > 50
ORDER BY visit_count DESC;
```

#### **Check Form Submissions by IP:**
```sql
SELECT ip_address, COUNT(*) as form_submissions, is_potential_bot
FROM contact_forms 
GROUP BY ip_address, is_potential_bot
ORDER BY form_submissions DESC;
```

### **Bot Detection Features:**

The system automatically detects:
- 🤖 **Search Engine Bots** (Google, Bing, Yahoo)
- 🕷️ **Web Crawlers** (Facebook, Twitter, LinkedIn)
- 🔧 **Developer Tools** (curl, wget, Postman)
- 📱 **Social Media Bots** (scrapers, automated tools)
- ⚡ **Rapid Fire Requests** (suspicious activity patterns)

### **Dashboard Queries:**

#### **Daily Stats:**
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_visits,
  COUNT(DISTINCT ip_address) as unique_visitors,
  COUNT(*) FILTER (WHERE is_bot = true) as bot_visits
FROM visitor_logs 
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### **🚨 Security Benefits:**

1. **Bot Protection** - Identify and flag automated submissions
2. **IP Tracking** - Monitor visitor patterns and detect abuse
3. **Repeat Visitor Detection** - Track user engagement
4. **Suspicious Activity Alerts** - Flag rapid/unusual requests
5. **Form Submission Security** - Associate submissions with visitor data

### **🔍 Monitoring Your Website:**

After setup, you can:
- View all visitor IPs in `visitor_logs` table
- See bot detection results in real-time
- Monitor form submission sources
- Identify suspicious activity patterns
- Track genuine vs automated traffic

The security system is now active and protecting your website!

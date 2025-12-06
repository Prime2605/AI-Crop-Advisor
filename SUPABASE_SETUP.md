# Supabase Setup Guide

## Step 1: Create Database Tables

1. Go to your Supabase project: https://tpmpjkfmkdbukusgarkr.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `backend/supabase-schema.sql`
5. Click **Run** to execute the SQL

This will create all necessary tables:
- `locations` - Stores geographic coordinates
- `weather_data` - Stores weather information
- `recommendations` - Stores crop recommendations
- `ai_models` - Stores AI model configurations
- `analytics` - Stores analytics events

## Step 2: Configure Environment Variables

### Backend (.env file)

Create a `.env` file in the `backend/` directory with:

```env
# Windy API Keys
WINDY_POINT_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN
WINDY_MAP_API_KEY=n0HATHjcJTliIOKd3jXeCm440JutQdSN

# Supabase Configuration
SUPABASE_URL=https://tpmpjkfmkdbukusgarkr.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbXBqa2Zta2RidWt1c2dhcmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjEyMTYsImV4cCI6MjA4MDU5NzIxNn0.Br5Pitq77LnZ09_CHbbLADMiC9p1blCdsPNSutF7KWk

# Server Configuration
PORT=3001
NODE_ENV=development
```

## Step 3: Install Dependencies

```bash
cd backend
npm install
```

This will install `@supabase/supabase-js` which is required for database operations.

## Step 4: Test the Connection

Start your backend server:

```bash
npm run dev
```

You should see:
```
✅ Connected to Supabase
✅ Supabase connection verified
🚀 Server running on http://localhost:3001
```

## Step 5: Verify Tables in Supabase

1. Go to **Table Editor** in Supabase dashboard
2. You should see all 5 tables:
   - locations
   - weather_data
   - recommendations
   - ai_models
   - analytics

## Database Schema Overview

### locations
- `id` (UUID, Primary Key)
- `lat` (Double Precision)
- `lon` (Double Precision)
- `created_at`, `updated_at` (Timestamps)

### weather_data
- `id` (UUID, Primary Key)
- `location_id` (UUID, Foreign Key → locations)
- `temperature`, `precipitation`, `wind_speed`, etc.
- `forecast_data` (JSONB)
- `created_at`, `updated_at` (Timestamps)

### recommendations
- `id` (UUID, Primary Key)
- `location_id` (UUID, Foreign Key → locations)
- `crop_name`, `suitability`, `expected_yield_index`
- `sustainability_tag` (High/Medium/Low)
- `reasons` (Text Array)
- `model_version`
- `created_at`, `updated_at` (Timestamps)

### ai_models
- `id` (UUID, Primary Key)
- `name` (Unique)
- `version`, `description`
- `status` (active/training/deprecated)
- `accuracy`, `metrics`, `config` (JSONB)
- `created_at`, `updated_at` (Timestamps)

### analytics
- `id` (UUID, Primary Key)
- `date` (Timestamp)
- `metric` (Text)
- `value` (Double Precision)
- `metadata` (JSONB)
- `created_at` (Timestamp)

## Row Level Security (RLS)

The schema includes RLS policies that allow all operations for development. For production:

1. Go to **Authentication** → **Policies** in Supabase
2. Review and adjust policies based on your security requirements
3. Consider implementing user authentication

## Troubleshooting

### Connection Issues
- Verify `SUPABASE_URL` and `SUPABASE_KEY` are correct
- Check that tables exist in Supabase dashboard
- Ensure RLS policies allow your operations

### Table Not Found Errors
- Run the SQL schema again in Supabase SQL Editor
- Check table names match exactly (case-sensitive)

### Permission Errors
- Verify RLS policies are set correctly
- Check that you're using the anon key (not service role key) for client-side operations

## Next Steps

1. ✅ Database tables created
2. ✅ Environment variables configured
3. ✅ Backend connected to Supabase
4. ⏳ Test API endpoints
5. ⏳ Deploy to Vercel with Supabase credentials


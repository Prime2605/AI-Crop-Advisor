-- Supabase Database Schema for AI Crop Advisor
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lat DOUBLE PRECISION NOT NULL,
  lon DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lat, lon)
);

-- Weather data table
CREATE TABLE IF NOT EXISTS weather_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  temperature DOUBLE PRECISION NOT NULL,
  precipitation DOUBLE PRECISION NOT NULL,
  wind_speed DOUBLE PRECISION NOT NULL,
  wind_direction DOUBLE PRECISION NOT NULL,
  humidity DOUBLE PRECISION NOT NULL,
  pressure DOUBLE PRECISION NOT NULL,
  cloud_cover DOUBLE PRECISION NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  forecast_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  suitability DOUBLE PRECISION NOT NULL,
  expected_yield_index DOUBLE PRECISION NOT NULL,
  sustainability_tag TEXT NOT NULL CHECK (sustainability_tag IN ('High', 'Medium', 'Low')),
  reasons TEXT[],
  model_version TEXT DEFAULT 'v1.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Models table
CREATE TABLE IF NOT EXISTS ai_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  version TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'training', 'deprecated')),
  accuracy DOUBLE PRECISION,
  metrics JSONB,
  config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metric TEXT NOT NULL,
  value DOUBLE PRECISION NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_weather_data_location_id ON weather_data(location_id);
CREATE INDEX IF NOT EXISTS idx_weather_data_timestamp ON weather_data(timestamp);
CREATE INDEX IF NOT EXISTS idx_weather_data_created_at ON weather_data(created_at);

CREATE INDEX IF NOT EXISTS idx_recommendations_location_id ON recommendations(location_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_crop_name ON recommendations(crop_name);
CREATE INDEX IF NOT EXISTS idx_recommendations_suitability ON recommendations(suitability);
CREATE INDEX IF NOT EXISTS idx_recommendations_created_at ON recommendations(created_at);

CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date);
CREATE INDEX IF NOT EXISTS idx_analytics_metric ON analytics(metric);

-- Enable Row Level Security (RLS) - Optional, adjust based on your needs
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your security needs)
-- For development, you can allow all operations
-- Drop existing policies first to make script idempotent
DROP POLICY IF EXISTS "Allow all operations on locations" ON locations;
DROP POLICY IF EXISTS "Allow all operations on weather_data" ON weather_data;
DROP POLICY IF EXISTS "Allow all operations on recommendations" ON recommendations;
DROP POLICY IF EXISTS "Allow all operations on ai_models" ON ai_models;
DROP POLICY IF EXISTS "Allow all operations on analytics" ON analytics;

CREATE POLICY "Allow all operations on locations" ON locations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on weather_data" ON weather_data FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on recommendations" ON recommendations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on ai_models" ON ai_models FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on analytics" ON analytics FOR ALL USING (true) WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers first to make script idempotent
DROP TRIGGER IF EXISTS update_locations_updated_at ON locations;
DROP TRIGGER IF EXISTS update_weather_data_updated_at ON weather_data;
DROP TRIGGER IF EXISTS update_recommendations_updated_at ON recommendations;
DROP TRIGGER IF EXISTS update_ai_models_updated_at ON ai_models;

-- Create triggers for updated_at
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weather_data_updated_at BEFORE UPDATE ON weather_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recommendations_updated_at BEFORE UPDATE ON recommendations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_models_updated_at BEFORE UPDATE ON ai_models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

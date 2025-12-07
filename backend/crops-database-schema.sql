-- World Crops Database Schema for AI Crop Advisor
-- This schema stores comprehensive crop information optimized for AI model training

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search optimization

-- =====================================================
-- CROP TAXONOMY AND BASIC INFORMATION
-- =====================================================

-- Taxonomy: Orders
CREATE TABLE IF NOT EXISTS crop_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Taxonomy: Families
CREATE TABLE IF NOT EXISTS crop_families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  order_id UUID REFERENCES crop_orders(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Taxonomy: Genera
CREATE TABLE IF NOT EXISTS crop_genera (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  family_id UUID REFERENCES crop_families(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Main Crops Table
CREATE TABLE IF NOT EXISTS crops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Taxonomy
  scientific_name TEXT NOT NULL,
  genus_id UUID REFERENCES crop_genera(id) ON DELETE SET NULL,
  species TEXT NOT NULL,
  
  -- Basic Information
  common_name TEXT NOT NULL,
  is_crop_group BOOLEAN DEFAULT FALSE,
  crop_group_info TEXT,
  
  -- Description
  description TEXT,
  summary TEXT,
  
  -- Cultivation
  cultivation_status TEXT CHECK (cultivation_status IN ('cultivated', 'wild', 'semi-wild', 'domesticated')),
  origin TEXT,
  distribution TEXT,
  
  -- Metadata
  image_url TEXT,
  priority_rank INTEGER DEFAULT 50, -- For sorting (1-100, higher = more important)
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(scientific_name)
);

-- =====================================================
-- CROP NAMES (Multilingual Support)
-- =====================================================

CREATE TABLE IF NOT EXISTS crop_names (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  language TEXT NOT NULL, -- 'scientific', 'english', 'dutch', 'spanish', 'french', 'german', 'italian', 'other'
  is_synonym BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(crop_id, name, language)
);

-- =====================================================
-- CROP CATEGORIES (Multi-Category Support)
-- =====================================================

CREATE TABLE IF NOT EXISTS crop_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE, -- URL-friendly version
  description TEXT,
  parent_category_id UUID REFERENCES crop_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for crops and categories (many-to-many)
CREATE TABLE IF NOT EXISTS crop_category_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
  category_id UUID REFERENCES crop_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(crop_id, category_id)
);

-- =====================================================
-- CROP CHARACTERISTICS (AI Model Features)
-- =====================================================

CREATE TABLE IF NOT EXISTS crop_characteristics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE UNIQUE,
  
  -- Climate requirements
  climate_zones TEXT[], -- ['tropical', 'subtropical', 'temperate', 'arid', 'cool_temperate']
  min_temperature DOUBLE PRECISION, -- Celsius
  max_temperature DOUBLE PRECISION, -- Celsius
  optimal_temperature_min DOUBLE PRECISION,
  optimal_temperature_max DOUBLE PRECISION,
  
  -- Water requirements
  water_requirement TEXT CHECK (water_requirement IN ('low', 'medium', 'high', 'very_high')),
  drought_tolerance TEXT CHECK (drought_tolerance IN ('low', 'medium', 'high')),
  flood_tolerance TEXT CHECK (flood_tolerance IN ('low', 'medium', 'high')),
  
  -- Soil requirements
  soil_types TEXT[], -- ['clay', 'sand', 'loam', 'silt', 'peat']
  soil_ph_min DOUBLE PRECISION,
  soil_ph_max DOUBLE PRECISION,
  
  -- Growing conditions
  sunlight_requirement TEXT CHECK (sunlight_requirement IN ('full_sun', 'partial_shade', 'shade')),
  altitude_min INTEGER, -- meters
  altitude_max INTEGER, -- meters
  
  -- Growing period
  growing_period_days INTEGER, -- Days to maturity
  planting_season TEXT[], -- ['spring', 'summer', 'fall', 'winter', 'year_round']
  
  -- Yield and productivity
  average_yield_per_hectare DOUBLE PRECISION, -- kg/ha
  yield_variability TEXT CHECK (yield_variability IN ('low', 'medium', 'high')),
  
  -- Sustainability
  nitrogen_fixing BOOLEAN DEFAULT FALSE,
  erosion_control BOOLEAN DEFAULT FALSE,
  water_use_efficiency TEXT CHECK (water_use_efficiency IN ('low', 'medium', 'high')),
  
  -- Additional metadata
  characteristics_metadata JSONB, -- For flexible additional data
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CROP USES AND APPLICATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS crop_uses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE,
  
  -- Use categories
  use_type TEXT NOT NULL CHECK (use_type IN (
    'food', 'vegetable', 'fruit', 'cereal', 'legume', 'nut',
    'spice', 'herb', 'beverage', 'oil', 'fiber', 'timber',
    'medicinal', 'ornamental', 'fodder', 'cover_crop',
    'industrial', 'biofuel', 'dye', 'other'
  )),
  
  -- Specific use details
  edible_parts TEXT[], -- ['fruit', 'leaves', 'seeds', 'roots', 'stems', 'flowers']
  processing_required BOOLEAN DEFAULT FALSE,
  processing_methods TEXT[],
  
  -- Nutritional value (for food crops)
  nutritional_value JSONB, -- {protein: 10, carbs: 20, fat: 5, vitamins: ['A', 'C']}
  
  -- Economic importance
  importance TEXT CHECK (importance IN ('major', 'minor', 'subsistence')),
  global_production_tonnes DOUBLE PRECISION,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(crop_id, use_type)
);

-- =====================================================
-- CROP STATISTICS (Database Metadata)
-- =====================================================

CREATE TABLE IF NOT EXISTS crop_database_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Counts
  total_crops INTEGER,
  total_crop_groups INTEGER,
  total_orders INTEGER,
  total_families INTEGER,
  total_genera INTEGER,
  total_names INTEGER,
  
  -- Breakdown by language
  names_by_language JSONB, -- {english: 2112, dutch: 996, ...}
  
  -- Category counts
  crops_by_category JSONB,
  
  -- Last update
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Text search indexes
CREATE INDEX IF NOT EXISTS idx_crops_scientific_name ON crops USING gin(scientific_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_crops_common_name ON crops USING gin(common_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_crop_names_name ON crop_names USING gin(name gin_trgm_ops);

-- Foreign key indexes
CREATE INDEX IF NOT EXISTS idx_crops_genus_id ON crops(genus_id);
CREATE INDEX IF NOT EXISTS idx_crop_genera_family_id ON crop_genera(family_id);
CREATE INDEX IF NOT EXISTS idx_crop_families_order_id ON crop_families(order_id);
CREATE INDEX IF NOT EXISTS idx_crop_names_crop_id ON crop_names(crop_id);
CREATE INDEX IF NOT EXISTS idx_crop_category_assignments_crop_id ON crop_category_assignments(crop_id);
CREATE INDEX IF NOT EXISTS idx_crop_category_assignments_category_id ON crop_category_assignments(category_id);

-- Characteristic indexes for AI queries
CREATE INDEX IF NOT EXISTS idx_crop_characteristics_crop_id ON crop_characteristics(crop_id);
CREATE INDEX IF NOT EXISTS idx_crop_characteristics_climate_zones ON crop_characteristics USING gin(climate_zones);
CREATE INDEX IF NOT EXISTS idx_crop_characteristics_soil_types ON crop_characteristics USING gin(soil_types);
CREATE INDEX IF NOT EXISTS idx_crop_characteristics_water_requirement ON crop_characteristics(water_requirement);

-- Use indexes
CREATE INDEX IF NOT EXISTS idx_crop_uses_crop_id ON crop_uses(crop_id);
CREATE INDEX IF NOT EXISTS idx_crop_uses_use_type ON crop_uses(use_type);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE crop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_genera ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_category_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_characteristics ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_uses ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_database_stats ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read on crop_orders" ON crop_orders FOR SELECT USING (true);
CREATE POLICY "Allow public read on crop_families" ON crop_families FOR SELECT USING (true);
CREATE POLICY "Allow public read on crop_genera" ON crop_genera FOR SELECT USING (true);
CREATE POLICY "Allow public read on crops" ON crops FOR SELECT USING (true);
CREATE POLICY "Allow public read on crop_names" ON crop_names FOR SELECT USING (true);
CREATE POLICY "Allow public read on crop_categories" ON crop_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read on crop_category_assignments" ON crop_category_assignments FOR SELECT USING (true);
CREATE POLICY "Allow public read on crop_characteristics" ON crop_characteristics FOR SELECT USING (true);
CREATE POLICY "Allow public read on crop_uses" ON crop_uses FOR SELECT USING (true);
CREATE POLICY "Allow public read on crop_database_stats" ON crop_database_stats FOR SELECT USING (true);

-- Full access for development (adjust for production)
CREATE POLICY "Allow all operations on crop_orders" ON crop_orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crop_families" ON crop_families FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crop_genera" ON crop_genera FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crops" ON crops FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crop_names" ON crop_names FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crop_categories" ON crop_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crop_category_assignments" ON crop_category_assignments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crop_characteristics" ON crop_characteristics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crop_uses" ON crop_uses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on crop_database_stats" ON crop_database_stats FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- FUNCTION FOR UPDATED_AT TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE TRIGGER update_crop_orders_updated_at BEFORE UPDATE ON crop_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crop_families_updated_at BEFORE UPDATE ON crop_families
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crop_genera_updated_at BEFORE UPDATE ON crop_genera
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON crops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crop_characteristics_updated_at BEFORE UPDATE ON crop_characteristics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MATERIALIZED VIEW FOR FAST CROP SEARCH
-- =====================================================

CREATE MATERIALIZED VIEW IF NOT EXISTS crop_search_index AS
SELECT 
  c.id,
  c.scientific_name,
  c.common_name,
  c.description,
  string_agg(DISTINCT cn.name, ' ') as all_names,
  string_agg(DISTINCT cat.name, ',') as categories,
  g.name as genus_name,
  f.name as family_name,
  o.name as order_name
FROM crops c
LEFT JOIN crop_names cn ON c.id = cn.crop_id
LEFT JOIN crop_category_assignments cca ON c.id = cca.crop_id
LEFT JOIN crop_categories cat ON cca.category_id = cat.id
LEFT JOIN crop_genera g ON c.genus_id = g.id
LEFT JOIN crop_families f ON g.family_id = f.id
LEFT JOIN crop_orders o ON f.order_id = o.id
GROUP BY c.id, c.scientific_name, c.common_name, c.description, g.name, f.name, o.name;

CREATE INDEX IF NOT EXISTS idx_crop_search_all_names ON crop_search_index USING gin(all_names gin_trgm_ops);

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_crop_search_index()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY crop_search_index;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

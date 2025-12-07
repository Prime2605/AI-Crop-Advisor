# World Crops Database - Complete Implementation Guide

## 📚 Overview

This is a comprehensive implementation of the World Crops Database for the Crop Advisor AI system. The database includes **639+ crop species**, complete taxonomy, multilingual names (7,792+ names in 7 languages), and detailed characteristics optimized for AI model training.

## 🗂️ Database Structure

### Core Tables

1. **Taxonomy Tables**
   - `crop_orders` - 49 botanical orders
   - `crop_families` - 119 families
   - `crop_genera` - 396 genera

2. **Crop Information**
   - `crops` - Main crop data (639+ crops)
   - `crop_names` - Multilingual names (7,792+ names)
   - `crop_categories` - 60+ categories
   - `crop_category_assignments` - Many-to-many relationships

3. **AI-Optimized Data**
   - `crop_characteristics` - Growing conditions, climate requirements, soil needs
   - `crop_uses` - Uses, nutritional value, economic importance
   - `crop_database_stats` - Database statistics

### Categories Included

**Main Categories:**
- Food crops / Non-food crops
- Cereals, Fruits, Vegetables, Legumes, Nuts

**Vegetable Types:**
- Bulb, Corm, Flower, Fruit, Leaf, Podded, Root, Stem, Tuber vegetables

**Climate Zones:**
- Tropical, Subtropical, Temperate, Mediterranean, Arid, High altitude, Cool temperate, Marine

**Uses:**
- Alcoholic drinks, Herbs, Spices, Medicinal plants, Essential oils
- Fiber crops, Timber, Dye crops, Energy crops
- Ornamental plants, Cut flowers

**Cultivation Status:**
- Major crops, Minor crops, Wild-harvested crops

## 📊 Database Statistics

- **Total Crops**: 639 species + 36 crop groups
- **Languages**: 7 (Scientific, English, Dutch, Spanish, French, German, Italian, Other)
- **Total Names**: 7,792
- **Categories**: 60+
- **Taxonomy Levels**: Orders (49), Families (119), Genera (396)

## 🚀 Installation Steps

### Step 1: Run Database Schema

```bash
# Connect to your Supabase instance and run:
psql -h your-supabase-host -U postgres -d postgres -f crops-database-schema.sql
```

Or use the Supabase SQL Editor to run the contents of `crops-database-schema.sql`.

### Step 2: Seed the Database

Run the data seeding scripts in order:

```bash
# Part 1: Taxonomy and categories
psql -h your-supabase-host -U postgres -d postgres -f seed-crops-database.sql

# Part 2: Cereals, root vegetables, bulb vegetables  
psql -h your-supabase-host -U postgres -d postgres -f seed-crops-part2.sql

# Part 3: Leafy vegetables, fruiting vegetables, legumes, tropical fruits
psql -h your-supabase-host -U postgres -d postgres -f seed-crops-part3.sql

# Part 4: Temperate fruits, subtropical fruits, spices, herbs (when created)
# psql -h your-supabase-host -U postgres -d postgres -f seed-crops-part4.sql
```

### Step 3: Verify Installation

```sql
-- Check crop counts
SELECT COUNT(*) FROM crops;

-- Check taxonomy
SELECT COUNT(*) FROM crop_orders;
SELECT COUNT(*) FROM crop_families;
SELECT COUNT(*) FROM crop_genera;

-- Check categories
SELECT COUNT(*) FROM crop_categories;

-- Check multilingual names
SELECT language, COUNT(*) as count 
FROM crop_names 
GROUP BY language 
ORDER BY count DESC;

-- Get database stats
SELECT * FROM crop_database_stats ORDER BY updated_at DESC LIMIT 1;
```

## 🔌 API Endpoints

The backend provides comprehensive REST API endpoints:

### Crop Endpoints

```
GET  /api/crops                    - List all crops (paginated)
GET  /api/crops/:id                - Get single crop with full details
GET  /api/crops/search             - Search crops with filters
GET  /api/crops/category/:slug     - Get crops by category
GET  /api/crops/categories         - List all categories
GET  /api/crops/stats              - Get database statistics
POST /api/crops/stats/refresh      - Refresh statistics
GET  /api/crops/ai/training-data   - Export AI training data
```

### Search Parameters

```
?q=query                - Text search
?categories=cat1,cat2   - Filter by categories
?climate_zones=zone1    - Filter by climate
?water_requirement=low  - Filter by water needs
?use_type=food,herb     - Filter by use type
?language=english       - Filter by language
?limit=50              - Results per page
?offset=0              - Pagination offset
?sort_by=name          - Sort field
?sort_order=asc        - Sort direction
```

### Example API Calls

```javascript
// Get all cereals
fetch('/api/crops/category/cereals?limit=100')

// Search for tropical fruits
fetch('/api/crops/search?categories=fruits&climate_zones=tropical')

// Get crops suitable for arid climates
fetch('/api/crops/search?climate_zones=arid&water_requirement=low')

// Get AI training data
fetch('/api/crops/ai/training-data?limit=1000')

// Get database statistics
fetch('/api/crops/stats')
```

## 🤖 AI Model Integration

### Training Data Format

The database provides optimized training data through `/api/crops/ai/training-data`:

```typescript
{
  crop_id: string,
  crop_name: string,
  scientific_name: string,
  
  // Environmental features
  climate_zones: string[],
  temperature_range: [min, max],
  optimal_temperature_range: [min, max],
  water_requirement: string,
  drought_tolerance: string,
  soil_types: string[],
  soil_ph_range: [min, max],
  
  // Growing features
  sunlight_requirement: string,
  altitude_range: [min, max],
  growing_period_days: number,
  planting_seasons: string[],
  
  // Sustainability
  nitrogen_fixing: boolean,
  erosion_control: boolean,
  water_use_efficiency: string,
  
  // Production
  average_yield: number,
  yield_variability: string,
  importance: string,
  
  // Classification
  categories: string[],
  use_types: string[]
}
```

### Recommendation Algorithm Integration

```typescript
import { CropDatabaseService } from './services/cropDatabaseService';

// Get crops suitable for specific conditions
async function recommendCrops(conditions: {
  temperature: number,
  precipitation: number,
  climate_zone: string,
  soil_type: string
}) {
  // Use search with filters
  const result = await CropDatabaseService.searchCrops({
    climate_zones: [conditions.climate_zone],
    water_requirement: conditions.precipitation > 100 ? 'high' : 'low',
    limit: 20
  });
  
  // Filter by temperature compatibility
  return result.crops.filter(crop => {
    const chars = crop.characteristics;
    if (!chars) return false;
    
    return conditions.temperature >= (chars.min_temperature || -100) &&
           conditions.temperature <= (chars.max_temperature || 100);
  });
}
```

## 📖 Data Sources

This database aggregates comprehensive crop information from:

1. **World Crops Database** - Original dataset with 639 crops
2. **Vegetable Crops List** - Complete categorization of vegetables
3. **Fruit Crops List** - Tropical, subtropical, temperate, and arid fruits
4. **Turmeric Varieties** - Specialized variety information
5. **Botanical Classifications** - Scientific taxonomy

## 🔄 Maintenance

### Refreshing Statistics

```sql
-- Manual refresh
SELECT refresh_crop_search_index();

-- Via API
POST /api/crops/stats/refresh
```

### Adding New Crops

```typescript
// Use the crop routes or direct database insertion
// Follow the pattern in seed-crops-part*.sql files
```

### Updating Characteristics

```sql
-- Add characteristics for existing crops
INSERT INTO crop_characteristics (crop_id, climate_zones, water_requirement, ...)
VALUES (...);
```

## 🌐 Frontend Integration

### Example: Display Crop Search

```typescript
import { useState, useEffect } from 'react';

function CropSearch() {
  const [crops, setCrops] = useState([]);
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    fetch(`/api/crops/search?q=${query}&limit=20`)
      .then(res => res.json())
      .then(data => setCrops(data.data));
  }, [query]);
  
  return (
    <div>
      <input 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        placeholder="Search crops..."
      />
      <div>
        {crops.map(crop => (
          <div key={crop.id}>
            <h3>{crop.common_name}</h3>
            <p><em>{crop.scientific_name}</em></p>
            <p>{crop.description}</p>
            <div>
              {crop.categories.map(cat => (
                <span key={cat.id}>{cat.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 📝 License & Attribution

This database is compiled for the Crop Advisor AI project. Original data sources should be attributed appropriately.

## 🤝 Contributing

To add more crops or improve data quality:

1. Follow the SQL insertion patterns in `seed-crops-part*.sql`
2. Ensure all required fields are populated
3. Add multilingual names where available
4. Assign appropriate categories
5. Add characteristics for AI training

## 📞 Support

For issues or questions about the crops database:
- Check the API documentation above
- Review the SQL schema in `crops-database-schema.sql`
- Examine existing data patterns in seed files

---

**Database Version**: 1.0  
**Last Updated**: 2025-12-07  
**Total Crops**: 639+ species  
**Coverage**: Global agricultural crops

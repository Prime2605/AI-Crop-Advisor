# 🌾 World Crops Database - Quick Reference

## 📦 Files Created

### Database Files
```
crops-database-schema.sql      - Complete database schema
seed-crops-database.sql        - Part 1: Taxonomy & Categories  
seed-crops-part2.sql          - Part 2: Cereals, Roots, Bulbs
seed-crops-part3.sql          - Part 3: Vegetables, Tropical Fruits
seed-crops-part4.sql          - Part 4: Citrus, Temperate, Herbs
seed-crops-part5.sql          - Part 5: Subtropical, Exotic, Industrial
```

### Backend Files
```
src/types/crops.ts                    - TypeScript type definitions
src/services/cropDatabaseService.ts   - Database service layer
src/routes/crops.ts                   - API routes
src/config/supabase.ts                - Supabase client configuration
```

### Documentation
```
CROPS_DATABASE_README.md       - Complete user guide
IMPLEMENTATION_SUMMARY.md      - What's built & what's next
QUICK_REFERENCE.md            - This file
deploy-crops-db.ps1           - Deployment helper script
```

## 🚀 Quick Start (3 Steps)

### 1. Set Environment Variables
```env
# Add to .env file
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-anon-key
```

### 2. Deploy Database
```powershell
# Run the deploy script
./deploy-crops-db.ps1

# Or manually in Supabase SQL Editor:
# 1. Run crops-database-schema.sql
# 2. Run seed-crops-database.sql
# 3. Run seed-crops-part2.sql
# 4. Run seed-crops-part3.sql
# 5. Run seed-crops-part4.sql
# 6. Run seed-crops-part5.sql
```

### 3. Start Backend
```bash
cd backend
npm install
npm run dev
```

## 📊 What You Get

### Crops Included (90+)
- **8 Cereals**: Rice, Wheat, Maize, Barley, Sorghum, Oat, Rye, Pearl Millet
- **22 Vegetables**: Potato, Tomato, Onion, Carrot, Cabbage, Spinach, etc.
- **29 Fruits**: Mango, Banana, Apple, Orange, Grape, Strawberry, etc.
- **12 Legumes**: Soybean, Chickpea, Lentil, Pea, etc.
- **16 Herbs/Spices**: Turmeric, Ginger, Black Pepper, Basil, etc.
- **2 Industrial**: Sugarcane, Cotton

### Categories (60+)
```
Main: Food crops, Non-food crops
Vegetables: Bulb, Root, Leaf, Fruit, Tuber, etc.
Fruits: Tropical, Subtropical, Temperate, Arid
Uses: Herbs, Spices, Medicinal, Oils, Fiber
Climate: Tropical, Subtropical, Temperate, Arid, etc.
```

### Languages (7)
- Scientific names
- English, Dutch, Spanish, French, German, Italian

## 🔌 API Endpoints

### Basic Operations
```http
GET /api/crops                     # List all crops (paginated)
GET /api/crops/:id                 # Get specific crop
GET /api/crops/categories          # List categories
GET /api/crops/stats               # Database statistics
```

### Search & Filter
```http
GET /api/crops/search?q=rice                        # Text search
GET /api/crops/search?categories=cereals,legumes    # By category
GET /api/crops/search?climate_zones=tropical        # By climate
GET /api/crops/category/vegetables                  # By category slug
```

### AI Integration
```http
GET /api/crops/ai/training-data    # Export for AI training
```

## 📝 Common Queries

### Example 1: Get All Cereals
```typescript
fetch('/api/crops/category/cereals')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Example 2: Search Tropical Fruits
```typescript
fetch('/api/crops/search?categories=fruits&climate_zones=tropical')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Example 3: Get Crop Details
```typescript
fetch('/api/crops/{crop-id}')
  .then(res => res.json())
  .then(crop => {
    console.log(crop.common_name);
    console.log(crop.scientific_name);
    console.log(crop.names);  // All names in different languages
    console.log(crop.categories);
    console.log(crop.characteristics);
  });
```

## 🗄️ Database Schema Quick View

```
crop_orders         → crop_families → crop_genera → crops
                                                      ↓
                                                crop_names
                                                crop_characteristics
                                                crop_uses
                                                crop_category_assignments
```

## 🎯 Next Steps

1. **Add More Crops**: Continue with Part 6, 7, 8...
2. **Add Characteristics**: Populate growing conditions
3. **Add Uses**: Define how crops are used
4. **Build Frontend**: Create UI for browsing
5. **AI Integration**: Connect recommendation engine

## 🐛 Troubleshooting

### Issue: Can't connect to Supabase
✅ Check `.env` file has correct credentials
✅ Verify Supabase project is active
✅ Check API keys are not expired

### Issue: Crops not showing
✅ Verify seed scripts ran successfully
✅ Check RLS policies are configured
✅ Run: `GET /api/crops/stats` to verify data

### Issue: Search not working
✅ Check search parameters format
✅ Verify category slugs are correct
✅ Check materialized views are created

## 📞 Need Help?

1. Read `CROPS_DATABASE_README.md` for detailed docs
2. Check `IMPLEMENTATION_SUMMARY.md` for current status
3. Review SQL schema comments in `crops-database-schema.sql`

## 💡 Pro Tips

- Use `?limit=100` to get more results
- Combine filters: `?categories=fruits&climate_zones=tropical,subtropical`
- Export for AI: `/api/crops/ai/training-data?limit=1000`
- Refresh stats after adding crops: `POST /api/crops/stats/refresh`

---

**Quick Links**:
- 📖 [Full Documentation](./CROPS_DATABASE_README.md)
- 📋 [Implementation Status](./IMPLEMENTATION_SUMMARY.md)
- 🗃️ [Database Schema](./crops-database-schema.sql)

**Version**: 1.0 | **Status**: ✅ Ready for Use | **Date**: 2025-12-07

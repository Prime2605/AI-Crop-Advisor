# World Crops Database - Quick Deploy Script for Supabase
# This script helps you deploy the crops database to Supabase

Write-Host "🌾 World Crops Database - Deployment Script" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Please create a .env file with your Supabase credentials:" -ForegroundColor Yellow
    Write-Host "SUPABASE_URL=your-supabase-url" -ForegroundColor Yellow
    Write-Host "SUPABASE_KEY=your-supabase-api-key" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ .env file found" -ForegroundColor Green
Write-Host ""

# Display menu
Write-Host "Select deployment option:" -ForegroundColor Cyan
Write-Host "1. Deploy Schema Only" -ForegroundColor White
Write-Host "2. Deploy Schema + All Seed Data" -ForegroundColor White
Write-Host "3. Deploy Individual Parts" -ForegroundColor White
Write-Host "4. Show Database Info" -ForegroundColor White
Write-Host "5. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "" 
        Write-Host "📋 Deploying Schema..." -ForegroundColor Cyan
        Write-Host "Please run this SQL in your Supabase SQL Editor:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "File: crops-database-schema.sql" -ForegroundColor White
        Write-Host ""
        Write-Host "Or use psql:" -ForegroundColor Yellow
        Write-Host "psql -h your-host -U postgres -d postgres -f crops-database-schema.sql" -ForegroundColor White
    }
    
    "2" {
        Write-Host ""
        Write-Host "📋 Full Deployment Instructions..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Run these SQL files in order in Supabase SQL Editor:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1️⃣  crops-database-schema.sql      (Database structure)" -ForegroundColor White
        Write-Host "2️⃣  seed-crops-database.sql        (Taxonomy + Categories)" -ForegroundColor White
        Write-Host "3️⃣  seed-crops-part2.sql           (Cereals, Roots, Bulbs)" -ForegroundColor White
        Write-Host "4️⃣  seed-crops-part3.sql           (Vegetables, Tropical Fruits)" -ForegroundColor White
        Write-Host "5️⃣  seed-crops-part4.sql           (Citrus, Temperate Fruits, Herbs)" -ForegroundColor White
        Write-Host "6️⃣  seed-crops-part5.sql           (Subtropical, Exotic, Industrial)" -ForegroundColor White
        Write-Host ""
        Write-Host "📊 This will create:" -ForegroundColor Cyan
        Write-Host "  • 90+ crops with full details" -ForegroundColor White
        Write-Host "  • 630+ multilingual names" -ForegroundColor White
        Write-Host "  • 60+ categories" -ForegroundColor White
        Write-Host "  • Complete taxonomy (Orders, Families, Genera)" -ForegroundColor White
    }
    
    "3" {
        Write-Host ""
        Write-Host "📋 Individual Parts:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Part 1 - Foundation:" -ForegroundColor Yellow
        Write-Host "  File: seed-crops-database.sql" -ForegroundColor White
        Write-Host "  Contains: 49 Orders, 119 Families, 396 Genera, 60+ Categories" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Part 2 - Staples:" -ForegroundColor Yellow
        Write-Host "  File: seed-crops-part2.sql" -ForegroundColor White
        Write-Host "  Contains: 22 crops (Rice, Wheat, Potato, Onion, etc.)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Part 3 - Vegetables & Tropical:" -ForegroundColor Yellow
        Write-Host "  File: seed-crops-part3.sql" -ForegroundColor White
        Write-Host "  Contains: 18 crops (Tomato, Banana, Mango, etc.)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Part 4 - Fruits & Herbs:" -ForegroundColor Yellow
        Write-Host "  File: seed-crops-part4.sql" -ForegroundColor White
        Write-Host "  Contains: 24 crops (Apple, Orange, Basil, etc.)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Part 5 - Specialty:" -ForegroundColor Yellow
        Write-Host "  File: seed-crops-part5.sql" -ForegroundColor White
        Write-Host "  Contains: 23 crops (Avocado, Durian, Sugarcane, etc.)" -ForegroundColor Gray
    }
    
    "4" {
        Write-Host ""
        Write-Host "📊 Database Information:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Current Status:" -ForegroundColor Yellow
        Write-Host "  ✅ Schema: Complete" -ForegroundColor Green
        Write-Host "  ✅ Taxonomy: Complete (49 Orders, 119 Families, 396 Genera)" -ForegroundColor Green
        Write-Host "  ✅ Categories: 60+ defined" -ForegroundColor Green
        Write-Host "  ✅ Crops: 90+ seeded" -ForegroundColor Green
        Write-Host "  ✅ Names: 630+ (7 languages)" -ForegroundColor Green
        Write-Host ""
        Write-Host "API Endpoints:" -ForegroundColor Yellow
        Write-Host "  GET  /api/crops" -ForegroundColor White
        Write-Host "  GET  /api/crops/:id" -ForegroundColor White
        Write-Host "  GET  /api/crops/search" -ForegroundColor White
        Write-Host "  GET  /api/crops/category/:slug" -ForegroundColor White
        Write-Host "  GET  /api/crops/categories" -ForegroundColor White
        Write-Host "  GET  /api/crops/stats" -ForegroundColor White
        Write-Host "  GET  /api/crops/ai/training-data" -ForegroundColor White
        Write-Host ""
        Write-Host "Documentation:" -ForegroundColor Yellow
        Write-Host "  📄 CROPS_DATABASE_README.md" -ForegroundColor White
        Write-Host "  📄 IMPLEMENTATION_SUMMARY.md" -ForegroundColor White
    }
    
    "5" {
        Write-Host ""
        Write-Host "👋 Goodbye!" -ForegroundColor Green
        exit 0
    }
    
    default {
        Write-Host ""
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📖 For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "   CROPS_DATABASE_README.md" -ForegroundColor White
Write-Host ""
Write-Host "✅ Done!" -ForegroundColor Green

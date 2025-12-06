# Common Commands - Quick Reference

## ✅ Correct Commands

### Install Dependencies
```bash
npm install
```
**NOT** `npm install dev` ❌

### Start Development Server
```bash
npm run dev
```
**NOT** `npm install dev` ❌

### Build for Production
```bash
npm run build
```

## 🔍 Understanding the Difference

- **`npm install`** - Installs packages from package.json
- **`npm run dev`** - Runs the "dev" script defined in package.json
- **`npm install dev`** - ❌ Tries to install a package called "dev" (doesn't exist)

## 📋 Project Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
```

## ⚠️ Common Mistakes

1. **`npm install dev`** ❌
   - Should be: `npm run dev` ✅

2. **`npm dev`** ❌
   - Should be: `npm run dev` ✅

3. **`npm start dev`** ❌
   - Should be: `npm run dev` ✅

## 💡 Remember

- `npm install` = Install packages
- `npm run <script>` = Run a script from package.json
- Scripts are defined in the `"scripts"` section of package.json


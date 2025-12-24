# Git Commands to Push Your Project

## Initial Setup (First Time Only)

```bash
# 1. Initialize Git repository
git init

# 2. Add remote repository
git remote add origin https://github.com/Prime2605/AI-Crop-Advisor.git

# 3. Set your name and email (if not set globally)
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Push to GitHub

```bash
# 4. Check what will be committed
git status

# 5. Add all files (respecting .gitignore)
git add .

# 6. Create first commit
git commit -m "Initial commit: AI Crop Advisor - Premium Agriculture Platform"

# 7. Set main branch
git branch -M main

# 8. Push to GitHub
git push -u origin main
```

## Future Updates

```bash
# After making changes:
git add .
git commit -m "Your commit message"
git push
```

## Important Notes

✅ **Protected Files** (Already in .gitignore):
- `.env` files (API keys are safe!)
- `node_modules/`
- `dist/` build folders
- All logs and temp files

⚠️ **Before Pushing:**
1. Make sure `.env` files are NOT staged
2. Check `git status` to verify
3. Never commit API keys or secrets

🎉 **Your project is ready to push!**

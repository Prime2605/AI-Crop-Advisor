@echo off
echo Starting Crop Advisor with pnpm...
echo.

:: Start backend
echo [1/2] Starting backend on port 3001...
start "Backend" cmd /k "cd backend && pnpm dev"
timeout /t 3 /nobreak >nul

:: Start frontend
echo [2/2] Starting frontend on port 5173...
start "Frontend" cmd /k "cd frontend && pnpm dev"
timeout /t 2 /nobreak >nul

echo.
echo ✅ Servers starting!
echo 📦 Backend: http://localhost:3001
echo 🌐 Frontend: http://localhost:5173
echo.
pause

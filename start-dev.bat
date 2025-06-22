@echo off
echo 🔍 Sleep Plus Project Verification Script
echo ==========================================

cd /d "C:\Users\Andybeats\Desktop\Claude Projects\vargas\sleep-plus-new"

echo.
echo 📦 1. Checking package installation...
if not exist "node_modules" (
    echo ❌ Node modules not found. Installing...
    npm install
) else (
    echo ✅ Node modules found
)

echo.
echo 🔧 2. TypeScript compilation check...
npx tsc --noEmit
if %errorlevel% equ 0 (
    echo ✅ TypeScript compilation successful
) else (
    echo ❌ TypeScript compilation failed
)

echo.
echo 🏗️  3. Building project...
npm run build
if %errorlevel% equ 0 (
    echo ✅ Build successful
) else (
    echo ❌ Build failed
)

echo.
echo 🔄 4. Backend connectivity test...
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Local backend is running
) else (
    echo ⚠️  Local backend not running. Starting backend...
    cd backend
    start "Backend Server" cmd /k "npm start"
    cd ..
    timeout /t 3 >nul
)

echo.
echo 🚀 5. Starting development server...
echo Frontend will be available at: http://localhost:5173
echo.
echo 👤 Test credentials:
echo Admin: admin@lamattressstore.com / admin123
echo Manager: john.smith@lamattressstore.com / demo123
echo Agent: demo@lamattressstore.com / demo123
echo.

npm run dev

pause

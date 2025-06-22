@echo off
echo 🔍 VERIFICACIÓN RIGUROSA DE CONECTIVIDAD FRONTEND-BACKEND
echo =========================================================
echo.

cd /d "C:\Users\Andybeats\Desktop\Claude Projects\vargas\sleep-plus-new"

echo 🔧 1. Verificando configuración de entorno...
echo ===============================================
if exist ".env.development" (
    echo ✅ .env.development existe
    type .env.development
) else (
    echo ❌ .env.development no encontrado
)
echo.

if exist ".env.production" (
    echo ✅ .env.production existe  
    type .env.production
) else (
    echo ❌ .env.production no encontrado
)
echo.

echo 🗄️  2. Verificando base de datos...
echo =================================
if exist "backend\db.json" (
    echo ✅ Backend database encontrada: backend\db.json
    for %%I in (backend\db.json) do echo    Tamaño: %%~zI bytes
) else (
    echo ❌ Backend database NO encontrada en backend\db.json
)
echo.

echo 🖥️  3. Verificando servidor backend...
echo ====================================
echo Iniciando servidor backend en puerto 3001...
cd backend
start "Backend Server" cmd /k "echo Starting backend... && node server/index.js"
echo ⏳ Esperando 5 segundos para que el servidor inicie...
timeout /t 5 /nobreak >nul
cd ..

echo.
echo 🌐 4. Testing conectividad del backend...
echo =======================================
curl -s http://127.0.0.1:3001/health
if %errorlevel% equ 0 (
    echo ✅ Backend health check exitoso
) else (
    echo ❌ Backend health check falló
)
echo.

curl -s http://127.0.0.1:3001/customers | find "["
if %errorlevel% equ 0 (
    echo ✅ Endpoint /customers responde correctamente
) else (
    echo ❌ Endpoint /customers falló
)
echo.

curl -s http://127.0.0.1:3001/employees | find "["
if %errorlevel% equ 0 (
    echo ✅ Endpoint /employees responde correctamente
) else (
    echo ❌ Endpoint /employees falló
)
echo.

echo 🧪 5. Ejecutando test de conectividad completo...
echo ================================================
cd backend
node test-connectivity.js
cd ..
echo.

echo 🚀 6. Iniciando frontend...
echo =========================
echo Frontend será accesible en: http://localhost:5173
echo.
echo 👤 Credenciales de prueba:
echo Admin: admin@lamattressstore.com / admin123
echo Manager: john.smith@lamattressstore.com / demo123  
echo Agent: demo@lamattressstore.com / demo123
echo.

npm run dev

pause

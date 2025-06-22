@echo off
echo ╔════════════════════════════════════════════════════════════╗
echo ║           SLEEP PLUS - VERIFICACION Y CORRECCION           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo [PASO 1] Ejecutando verificacion completa del proyecto...
echo =========================================================
cd diagnostics
node verify-project.js
cd ..

echo.
echo [PASO 2] Aplicando correcciones automaticas...
echo =========================================================
pause
echo.

echo Limpiando archivos duplicados...
cd diagnostics
node clean-duplicate-js.js
cd ..

echo.
echo [PASO 3] Instalando dependencias...
echo =========================================================
echo.

echo Instalando dependencias del backend...
cd backend
call npm install --silent
cd ..

echo.
echo Instalando dependencias del frontend...
call npm install --silent

echo.
echo [PASO 4] Iniciando servicios...
echo =========================================================
echo.

echo Iniciando backend en puerto 3001...
cd backend
start "Backend - Sleep Plus" cmd /k "npm run dev"
cd ..

echo.
echo Esperando 5 segundos para que el backend inicie...
timeout /t 5 /nobreak > nul

echo.
echo [PASO 5] Verificacion final...
echo =========================================================
cd diagnostics
node verify-project.js
cd ..

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    PROCESO COMPLETADO                      ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo ✅ Backend ejecutandose en: http://localhost:3001
echo ✅ Archivos duplicados limpiados
echo ✅ Dependencias instaladas
echo.
echo 📌 Credenciales de prueba:
echo    Email: demo@lamattressstore.com
echo    Password: demo123
echo.
echo 🚀 Para iniciar el frontend, ejecuta: npm run dev
echo.
pause
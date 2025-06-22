@echo off
echo ========================================
echo   SLEEP PLUS - SCRIPT DE CORRECCION
echo ========================================
echo.

echo [1/5] Limpiando archivos duplicados...
cd diagnostics
call node clean-duplicate-js.js
cd ..

echo.
echo [2/5] Instalando dependencias del backend...
cd backend
call npm install
cd ..

echo.
echo [3/5] Instalando dependencias del frontend...
call npm install

echo.
echo [4/5] Iniciando el backend...
cd backend
start cmd /k "npm run dev"
cd ..

echo.
echo [5/5] Esperando 5 segundos para que el backend inicie...
timeout /t 5

echo.
echo ========================================
echo   CORRECCION COMPLETADA
echo ========================================
echo.
echo El backend esta ejecutandose en: http://localhost:3001
echo.
echo Ahora puedes iniciar el frontend con: npm run dev
echo.
pause
@echo off
echo ===================================
echo   Sleep+ Admin - Desarrollo Local
echo ===================================
echo.

echo [1/3] Iniciando Backend...
cd backend
start cmd /k "npm install && npm run dev"

echo [2/3] Esperando que el backend inicie...
timeout /t 5 /nobreak > nul

echo [3/3] Iniciando Frontend...
cd ../frontend
start cmd /k "npm install && npm run dev"

echo.
echo ===================================
echo   Aplicacion iniciada!
echo ===================================
echo.
echo   Backend:  http://localhost:3001
echo   Frontend: http://localhost:5173
echo.
echo   Cierra las ventanas de comandos para detener los servicios.
echo.
pause

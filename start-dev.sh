#!/bin/bash

echo "🚀 Iniciando Sleep+ Admin en modo desarrollo..."

# Iniciar backend
echo "🔧 Iniciando backend..."
cd backend && npm install && npm run dev &
BACKEND_PID=$!

# Esperar a que el backend esté listo
sleep 5

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd ../frontend && npm install && npm run dev &
FRONTEND_PID=$!

echo "✅ Aplicación iniciada!"
echo "   Backend: http://localhost:3001"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Presiona Ctrl+C para detener..."

# Esperar y limpiar al salir
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait

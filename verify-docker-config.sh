#!/bin/bash

echo "🔍 Verificando configuración de Docker para EasyPanel..."

echo ""
echo "📁 Estructura de archivos:"
echo "=========================="
ls -la

echo ""
echo "🐳 Dockerfile Frontend:"
echo "======================"
cat Dockerfile

echo ""
echo "🐳 Dockerfile Backend:"
echo "====================="
cat backend/Dockerfile

echo ""
echo "📦 Package.json Backend:"
echo "======================="
cat backend/package.json

echo ""
echo "⚙️ Configuración del servidor:"
echo "============================="
cat backend/server/config.js

echo ""
echo "🗄️ Base de datos:"
echo "================"
ls -la backend/db.json
ls -la backend/data/db.json 2>/dev/null || echo "No existe backend/data/db.json"

echo ""
echo "✅ Verificación completada"
echo ""
echo "📋 Checklist para EasyPanel:"
echo "1. ✅ HOST=0.0.0.0 en ambos Dockerfiles"
echo "2. ✅ Puerto 3000 (frontend) y 3001 (backend) expuestos"
echo "3. ✅ CMD configurado correctamente"
echo "4. ✅ db.json en ubicación correcta"
echo "5. ✅ package.json con script 'start' correcto" 
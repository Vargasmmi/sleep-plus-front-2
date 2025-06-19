#!/bin/bash

echo "🚀 Preparando proyecto para EasyPanel..."
echo "========================================"
echo ""

# Verificar que las carpetas existen
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Primero ejecuta ./separate-project.sh"
    exit 1
fi

echo "¿Cómo quieres subir a EasyPanel?"
echo "1) Dos repositorios separados (Recomendado)"
echo "2) Un repositorio con subcarpetas"
echo ""
read -p "Elige opción (1 o 2): " opcion

case $opcion in
    1)
        echo ""
        echo "📦 Preparando dos repositorios separados..."
        
        # Backend
        cd backend
        if [ ! -d ".git" ]; then
            git init
            echo "node_modules/" > .gitignore
            echo ".env" >> .gitignore
            echo "data/*.json" >> .gitignore
            git add .
            git commit -m "Initial backend setup for EasyPanel"
            echo "✅ Backend listo para subir"
        else
            echo "⚠️  Backend ya tiene git"
        fi
        
        # Frontend
        cd ../frontend
        if [ ! -d ".git" ]; then
            git init
            echo "node_modules/" > .gitignore
            echo "dist/" >> .gitignore
            echo ".env" >> .gitignore
            echo ".env.local" >> .gitignore
            git add .
            git commit -m "Initial frontend setup for EasyPanel"
            echo "✅ Frontend listo para subir"
        else
            echo "⚠️  Frontend ya tiene git"
        fi
        
        cd ..
        echo ""
        echo "✅ Listo! Ahora:"
        echo "   1. Crea dos repos en GitHub"
        echo "   2. En backend/: git remote add origin [URL_BACKEND]"
        echo "   3. En frontend/: git remote add origin [URL_FRONTEND]"
        echo "   4. Push ambos: git push -u origin main"
        ;;
        
    2)
        echo ""
        echo "📦 Preparando un repositorio con subcarpetas..."
        
        # Crear .gitignore principal
        cat > .gitignore << 'EOF'
# Node
node_modules/
npm-debug.log*

# Env files
.env
.env.local
*.local

# Build
dist/
build/

# Data
backend/data/*.json
!backend/data/.gitkeep

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
EOF

        # Asegurar que data tiene .gitkeep
        touch backend/data/.gitkeep
        
        # Git init si no existe
        if [ ! -d ".git" ]; then
            git init
            git add .
            git commit -m "Sleep+ Admin ready for EasyPanel deployment"
            echo "✅ Repositorio listo"
        else
            echo "⚠️  Ya existe un repositorio git"
        fi
        
        echo ""
        echo "✅ Listo! Ahora:"
        echo "   1. Crea un repo en GitHub"
        echo "   2. git remote add origin [URL]"
        echo "   3. git push -u origin main"
        echo "   4. En EasyPanel, crea 2 apps apuntando a:"
        echo "      - /backend"
        echo "      - /frontend"
        ;;
        
    *)
        echo "❌ Opción no válida"
        exit 1
        ;;
esac

echo ""
echo "📋 Configuración en EasyPanel:"
echo ""
echo "BACKEND:"
echo "  Build Path: /backend (si usas opción 2)"
echo "  Port: 3001"
echo "  Environment:"
echo "    NODE_ENV=production"
echo "    CORS_ORIGIN=https://[tu-frontend].easypanel.host"
echo "  Volume: /app/data"
echo ""
echo "FRONTEND:"
echo "  Build Path: /frontend (si usas opción 2)"
echo "  Port: 80"
echo "  Build Args:"
echo "    VITE_API_URL=https://[tu-backend].easypanel.host"
echo ""
echo "🎯 URLs finales:"
echo "  Frontend: https://[nombre].easypanel.host"
echo "  Backend: https://[nombre]-api.easypanel.host"
echo ""

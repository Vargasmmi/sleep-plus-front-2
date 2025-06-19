#!/bin/bash
# verify-setup.sh - Script para verificar que la separación se completó correctamente

echo "🔍 Verificando la separación del proyecto Sleep+ Admin..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Función para verificar archivos
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

# Función para verificar directorios
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

errors=0

echo "📁 Verificando estructura del Backend:"
check_dir "backend" "Carpeta backend" || ((errors++))
check_dir "backend/server" "Carpeta server" || ((errors++))
check_dir "backend/data" "Carpeta data" || ((errors++))
check_file "backend/package.json" "package.json" || ((errors++))
check_file "backend/Dockerfile" "Dockerfile" || ((errors++))
check_file "backend/server/server-simple.js" "server-simple.js" || ((errors++))
check_file "backend/data/db.json" "db.json" || ((errors++))

echo ""
echo "📁 Verificando estructura del Frontend:"
check_dir "frontend" "Carpeta frontend" || ((errors++))
check_dir "frontend/src" "Carpeta src" || ((errors++))
check_dir "frontend/public" "Carpeta public" || ((errors++))
check_file "frontend/package.json" "package.json" || ((errors++))
check_file "frontend/Dockerfile" "Dockerfile" || ((errors++))
check_file "frontend/nginx.conf" "nginx.conf" || ((errors++))
check_file "frontend/vite.config.ts" "vite.config.ts" || ((errors++))
check_file "frontend/.env" ".env (desarrollo)" || echo -e "${YELLOW}  ⚠ Crear .env desde .env.example${NC}"

echo ""
echo "📄 Verificando archivos de configuración:"
check_file "docker-compose.dev.yml" "docker-compose.dev.yml" || ((errors++))
check_file "start-dev.sh" "start-dev.sh" || ((errors++))
check_file "start-dev.bat" "start-dev.bat (Windows)" || ((errors++))

echo ""
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✅ ¡Separación completada exitosamente!${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. Para desarrollo: ejecuta './start-dev.sh' o 'start-dev.bat'"
    echo "2. Para Docker: 'docker-compose -f docker-compose.dev.yml up'"
    echo "3. Para producción: sigue la guía en GUIA_SEPARACION_PROYECTO.md"
else
    echo -e "${RED}❌ Se encontraron $errors errores${NC}"
    echo ""
    echo "Por favor revisa los archivos faltantes y ejecuta el script de separación nuevamente si es necesario."
fi

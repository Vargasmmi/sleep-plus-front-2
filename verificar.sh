#!/bin/bash

# Colores
GREEN=$'\033[0;32m'
RED=$'\033[0;31m'
YELLOW=$'\033[1;33m'
BLUE=$'\033[0;34m'
NC=$'\033[0m'

echo "${BLUE}========================================"
echo "  Sleep+ Admin - Verificación Rápida"
echo "========================================${NC}"
echo

# Verificar Node.js
echo "Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "${GREEN}[OK]${NC} Node.js instalado: $NODE_VERSION"
    
    # Verificar versión mínima (18)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1 | sed 's/v//')
    if [ $NODE_MAJOR -lt 18 ]; then
        echo "${YELLOW}[ADVERTENCIA]${NC} Se recomienda Node.js 18 o superior"
    fi
else
    echo "${RED}[ERROR]${NC} Node.js no está instalado"
    echo "        Descarga desde: https://nodejs.org/"
    exit 1
fi
echo

# Verificar npm
echo "Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "${GREEN}[OK]${NC} npm instalado: $NPM_VERSION"
else
    echo "${RED}[ERROR]${NC} npm no está instalado"
    exit 1
fi
echo

# Verificar estructura de carpetas
echo "Verificando estructura del proyecto..."
if [ -f "backend/server/server-simple.js" ]; then
    echo "${GREEN}[OK]${NC} Backend encontrado"
else
    echo "${RED}[ERROR]${NC} Backend no encontrado"
    echo "        Ejecuta primero: ./separate-project.sh"
fi

if [ -f "frontend/src/App.tsx" ]; then
    echo "${GREEN}[OK]${NC} Frontend encontrado"
else
    echo "${RED}[ERROR]${NC} Frontend no encontrado"
    echo "        Ejecuta primero: ./separate-project.sh"
fi
echo

# Verificar archivos de configuración
echo "Verificando archivos de configuración..."
if [ -f "backend/.env" ]; then
    echo "${GREEN}[OK]${NC} Backend .env encontrado"
else
    echo "${YELLOW}[ADVERTENCIA]${NC} Backend .env no encontrado"
    echo "              Se creará automáticamente"
fi

if [ -f "frontend/.env" ]; then
    echo "${GREEN}[OK]${NC} Frontend .env encontrado"
else
    echo "${YELLOW}[ADVERTENCIA]${NC} Frontend .env no encontrado"
    echo "              Se creará automáticamente"
fi
echo

# Verificar base de datos
echo "Verificando base de datos..."
if [ -f "backend/data/db.json" ]; then
    echo "${GREEN}[OK]${NC} Base de datos encontrada"
    # Verificar tamaño
    DB_SIZE=$(du -h backend/data/db.json | cut -f1)
    echo "     Tamaño: $DB_SIZE"
else
    echo "${BLUE}[INFO]${NC} Base de datos no encontrada"
    echo "       Se creará automáticamente al iniciar el backend"
fi
echo

# Verificar puertos
echo "Verificando disponibilidad de puertos..."

# Función para verificar puerto
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "${YELLOW}[ADVERTENCIA]${NC} Puerto $port puede estar en uso"
        echo "              PID usando el puerto: $(lsof -Pi :$port -sTCP:LISTEN -t)"
        return 1
    else
        echo "${GREEN}[OK]${NC} Puerto $port disponible"
        return 0
    fi
}

check_port 3001
BACKEND_PORT_OK=$?

check_port 5173
FRONTEND_PORT_OK=$?
echo

# Verificar si los servidores ya están corriendo
echo "Verificando servidores en ejecución..."
if curl -s http://localhost:3001/health >/dev/null 2>&1; then
    echo "${GREEN}[INFO]${NC} Backend ya está ejecutándose"
else
    echo "${BLUE}[INFO]${NC} Backend no está ejecutándose"
fi

if curl -s http://localhost:5173 >/dev/null 2>&1; then
    echo "${GREEN}[INFO]${NC} Frontend ya está ejecutándose"
else
    echo "${BLUE}[INFO]${NC} Frontend no está ejecutándose"
fi
echo

# Resumen
echo "${BLUE}========================================"
echo "  Resumen de Verificación"
echo "========================================${NC}"
echo

if [ -f "backend/server/server-simple.js" ] && [ -f "frontend/src/App.tsx" ]; then
    echo "${GREEN}✅ Proyecto separado correctamente${NC}"
    echo
    echo "Para iniciar los servidores ejecuta:"
    echo "  ${YELLOW}./start-dev.sh${NC}"
    echo
    if [ $BACKEND_PORT_OK -ne 0 ] || [ $FRONTEND_PORT_OK -ne 0 ]; then
        echo "${YELLOW}Nota: Hay puertos en uso. Puede que necesites:${NC}"
        echo "  - Detener los servicios existentes"
        echo "  - O cambiar los puertos en los archivos .env"
    fi
else
    echo "${RED}❌ El proyecto no está separado${NC}"
    echo
    echo "Ejecuta primero:"
    echo "  ${YELLOW}chmod +x separate-project.sh${NC}"
    echo "  ${YELLOW}./separate-project.sh${NC}"
fi
echo

# Información adicional
echo "${BLUE}Información adicional:${NC}"
echo "  📁 Backend:  http://localhost:3001"
echo "  🎨 Frontend: http://localhost:5173"
echo "  📊 Health:   http://localhost:3001/health"
echo

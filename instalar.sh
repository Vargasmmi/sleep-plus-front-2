#!/bin/bash

# Script de instalación inicial para Sleep+ Admin
# Este script prepara todo para el desarrollo local

echo "🚀 Sleep+ Admin - Instalación Inicial"
echo "===================================="
echo ""

# Colores
GREEN=$'\033[0;32m'
BLUE=$'\033[0;34m'
YELLOW=$'\033[1;33m'
NC=$'\033[0m'

# Detectar sistema operativo
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    IS_WINDOWS=true
    echo "📍 Sistema detectado: Windows"
else
    IS_WINDOWS=false
    echo "📍 Sistema detectado: Unix/Linux/Mac"
fi
echo ""

# Paso 1: Dar permisos de ejecución
echo "${BLUE}1. Configurando permisos de scripts...${NC}"
chmod +x *.sh 2>/dev/null
echo "${GREEN}✅ Permisos configurados${NC}"
echo ""

# Paso 2: Ejecutar separación
echo "${BLUE}2. Separando el proyecto en backend y frontend...${NC}"
if [ -d "backend" ] || [ -d "frontend" ]; then
    echo "${YELLOW}⚠️  Las carpetas backend/frontend ya existen${NC}"
    read -p "¿Deseas eliminarlas y volver a separar? (s/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        rm -rf backend frontend
        ./separate-project.sh
    else
        echo "Saltando separación..."
    fi
else
    ./separate-project.sh
fi
echo ""

# Paso 3: Verificar instalación
echo "${BLUE}3. Verificando instalación...${NC}"
./verificar.sh
echo ""

# Paso 4: Preguntar si iniciar servidores
echo "${BLUE}4. ¿Deseas iniciar los servidores ahora?${NC}"
read -p "Iniciar backend y frontend (s/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo "${GREEN}Iniciando servidores...${NC}"
    echo ""
    
    if [ "$IS_WINDOWS" = true ]; then
        echo "Ejecutando: start-dev.cmd"
        echo "Se abrirán dos ventanas de CMD con los servidores"
        cmd.exe /c start-dev.cmd
    else
        echo "Ejecutando: ./start-dev.sh"
        echo "Presiona Ctrl+C para detener los servidores"
        ./start-dev.sh
    fi
else
    echo ""
    echo "${YELLOW}Para iniciar los servidores más tarde:${NC}"
    if [ "$IS_WINDOWS" = true ]; then
        echo "  Ejecuta: ${GREEN}start-dev.cmd${NC}"
    else
        echo "  Ejecuta: ${GREEN}./start-dev.sh${NC}"
    fi
fi

echo ""
echo "${GREEN}✅ Instalación completada${NC}"
echo ""
echo "📚 Documentación disponible:"
echo "  - COMANDOS_RAPIDOS.md - Referencia rápida"
echo "  - PRUEBAS_LOCALES.md - Guía de pruebas"
echo "  - GUIA_SEPARACION_PROYECTO.md - Documentación completa"
echo ""
echo "🎯 URLs de la aplicación:"
echo "  - Frontend: http://localhost:5173"
echo "  - Backend: http://localhost:3001"
echo ""

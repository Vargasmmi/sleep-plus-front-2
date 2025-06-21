#!/bin/bash

# Script de migración para Sleep Plus Backend
# Este script actualiza el backend con el modelo completo de datos

echo "🚀 Iniciando migración del backend Sleep Plus..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Directorio del backend
BACKEND_DIR="./backend"

# Verificar que estamos en el directorio correcto
if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${RED}❌ Error: No se encuentra el directorio backend${NC}"
    echo "   Asegúrate de ejecutar este script desde la raíz del proyecto"
    exit 1
fi

echo -e "${YELLOW}📦 Paso 1: Haciendo backup de la base de datos actual...${NC}"
if [ -f "$BACKEND_DIR/db.json" ]; then
    cp "$BACKEND_DIR/db.json" "$BACKEND_DIR/db.backup-$(date +%Y%m%d-%H%M%S).json"
    echo -e "${GREEN}✅ Backup creado${NC}"
else
    echo -e "${YELLOW}⚠️  No se encontró db.json existente${NC}"
fi

echo -e "${YELLOW}📦 Paso 2: Instalando dependencias adicionales...${NC}"
cd $BACKEND_DIR

# Verificar si axios y stripe están instalados
if ! grep -q "axios" package.json; then
    echo "Instalando axios..."
    npm install axios
fi

if ! grep -q "stripe" package.json; then
    echo "Instalando stripe..."
    npm install stripe
fi

echo -e "${GREEN}✅ Dependencias instaladas${NC}"

echo -e "${YELLOW}📦 Paso 3: Aplicando nueva estructura de base de datos...${NC}"

# Preguntar al usuario qué hacer
echo ""
echo "¿Qué deseas hacer con la base de datos?"
echo "1) Usar la estructura completa nueva (reemplazar todo)"
echo "2) Mantener los datos actuales y agregar las nuevas entidades"
echo "3) No modificar la base de datos"
read -p "Selecciona una opción (1-3): " option

case $option in
    1)
        echo -e "${YELLOW}Aplicando estructura completa nueva...${NC}"
        cp db-complete.json db.json
        echo -e "${GREEN}✅ Base de datos actualizada con estructura completa${NC}"
        ;;
    2)
        echo -e "${YELLOW}Fusionando datos...${NC}"
        # Aquí podrías implementar una lógica de fusión más compleja
        echo -e "${YELLOW}⚠️  Por ahora, debes fusionar manualmente los datos${NC}"
        echo "   Revisa db-complete.json y agrega las entidades que necesites a db.json"
        ;;
    3)
        echo -e "${YELLOW}Base de datos sin cambios${NC}"
        ;;
    *)
        echo -e "${RED}❌ Opción inválida${NC}"
        ;;
esac

echo -e "${YELLOW}📦 Paso 4: Verificando archivos de configuración...${NC}"

if [ -f "routes.json" ]; then
    echo -e "${GREEN}✅ routes.json encontrado${NC}"
else
    echo -e "${RED}❌ routes.json no encontrado${NC}"
fi

if [ -f "config.js" ]; then
    echo -e "${GREEN}✅ config.js encontrado${NC}"
else
    echo -e "${RED}❌ config.js no encontrado${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Migración completada!${NC}"
echo ""
echo "Próximos pasos:"
echo "1. Revisa y ajusta la configuración en config.js"
echo "2. Configura las variables de entorno necesarias (.env)"
echo "3. Prueba el backend localmente: npm start"
echo "4. Revisa la guía completa en MIGRATION_GUIDE.md"
echo ""
echo -e "${YELLOW}⚠️  Importante:${NC}"
echo "- Ajusta las entidades según las necesidades reales de Sleep Plus"
echo "- Configura las integraciones (Stripe, etc.) con tus propias credenciales"
echo "- Implementa autenticación antes de ir a producción"

cd ..

#!/bin/bash

echo "🧪 Probando la instalación local de Sleep+ Admin..."
echo "================================================"
echo ""

# Colores
GREEN=$'\033[0;32m'
RED=$'\033[0;31m'
YELLOW=$'\033[1;33m'
BLUE=$'\033[0;34m'
NC=$'\033[0m'

# Variables
BACKEND_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:5173"
ALL_GOOD=true

# Función para probar endpoint
test_endpoint() {
    local url=$1
    local name=$2
    
    if curl -s -f "$url" > /dev/null; then
        echo "${GREEN}✅ $name${NC}"
        return 0
    else
        echo "${RED}❌ $name${NC}"
        ALL_GOOD=false
        return 1
    fi
}

# Función para probar endpoint con datos
test_endpoint_with_data() {
    local url=$1
    local name=$2
    
    response=$(curl -s "$url")
    if [ $? -eq 0 ] && [ ! -z "$response" ]; then
        # Contar elementos si es un array
        if [[ $response == \[* ]]; then
            count=$(echo "$response" | grep -o "\"id\"" | wc -l)
            echo "${GREEN}✅ $name (${count} elementos)${NC}"
        else
            echo "${GREEN}✅ $name${NC}"
        fi
        return 0
    else
        echo "${RED}❌ $name${NC}"
        ALL_GOOD=false
        return 1
    fi
}

# Pruebas del Backend
echo "${BLUE}🔧 Probando Backend (API)...${NC}"
echo "   URL: $BACKEND_URL"
echo ""

# Health check
test_endpoint "$BACKEND_URL/health" "Health Check"

# Endpoints principales
test_endpoint_with_data "$BACKEND_URL/employees" "Empleados"
test_endpoint_with_data "$BACKEND_URL/stores" "Tiendas"
test_endpoint_with_data "$BACKEND_URL/customers" "Clientes"
test_endpoint_with_data "$BACKEND_URL/permissions" "Permisos"

echo ""

# Pruebas del Frontend
echo "${BLUE}🎨 Probando Frontend (React)...${NC}"
echo "   URL: $FRONTEND_URL"
echo ""

if curl -s "$FRONTEND_URL" | grep -q "<title>" > /dev/null; then
    echo "${GREEN}✅ Servidor de desarrollo Vite${NC}"
    
    # Verificar que puede cargar recursos estáticos
    if curl -s -f "$FRONTEND_URL/src/main.tsx" > /dev/null; then
        echo "${GREEN}✅ Archivos estáticos accesibles${NC}"
    else
        echo "${YELLOW}⚠️  No se pueden verificar archivos estáticos (normal en producción)${NC}"
    fi
else
    echo "${RED}❌ Frontend no responde${NC}"
    ALL_GOOD=false
fi

echo ""

# Prueba de conectividad Frontend -> Backend
echo "${BLUE}🔗 Probando conectividad Frontend -> Backend...${NC}"
echo ""

# Verificar CORS
cors_test=$(curl -s -H "Origin: $FRONTEND_URL" -I "$BACKEND_URL/health" 2>/dev/null | grep -i "access-control-allow-origin")
if [ ! -z "$cors_test" ]; then
    echo "${GREEN}✅ CORS configurado correctamente${NC}"
    echo "   $cors_test"
else
    echo "${YELLOW}⚠️  CORS puede no estar configurado${NC}"
    echo "   Esto podría causar problemas al conectar frontend con backend"
fi

echo ""

# Resumen
echo "${BLUE}================================================${NC}"
echo "${BLUE}📊 RESUMEN DE PRUEBAS${NC}"
echo "${BLUE}================================================${NC}"
echo ""

if [ "$ALL_GOOD" = true ]; then
    echo "${GREEN}✅ ¡Todo funciona correctamente!${NC}"
    echo ""
    echo "Puedes acceder a:"
    echo "  - Frontend: ${BLUE}$FRONTEND_URL${NC}"
    echo "  - Backend API: ${BLUE}$BACKEND_URL${NC}"
    echo "  - Health: ${BLUE}$BACKEND_URL/health${NC}"
    echo ""
    echo "${GREEN}¡La aplicación está lista para desarrollo!${NC}"
else
    echo "${RED}❌ Se encontraron algunos problemas${NC}"
    echo ""
    echo "Verifica que:"
    echo "  1. Los servidores estén ejecutándose (./start-dev.sh)"
    echo "  2. No haya errores en las consolas"
    echo "  3. Los puertos 3001 y 5173 estén disponibles"
    echo ""
    echo "Para más detalles, revisa:"
    echo "  - Los logs de las terminales"
    echo "  - El archivo PRUEBAS_LOCALES.md"
fi

echo ""
echo "${BLUE}================================================${NC}"

# Información adicional si hay problemas
if [ "$ALL_GOOD" = false ]; then
    echo ""
    echo "${YELLOW}💡 Comandos útiles para debugging:${NC}"
    echo ""
    echo "# Ver logs del backend:"
    echo "cd backend && npm run dev"
    echo ""
    echo "# Ver logs del frontend:"
    echo "cd frontend && npm run dev"
    echo ""
    echo "# Verificar puertos:"
    echo "lsof -i :3001"
    echo "lsof -i :5173"
fi

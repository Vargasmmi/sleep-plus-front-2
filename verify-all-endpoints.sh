#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# URL base del backend
BASE_URL="https://sleep-plus-front-2-backend.dqyvuv.easypanel.host"

echo "🔍 Verificando todos los endpoints del backend..."
echo "================================================"

# Lista de endpoints a verificar
endpoints=(
    "/health"
    "/api-docs"
    "/api/users"
    "/api/sleep-records"
    "/api/customers"
    "/api/employees"
    "/api/subscriptions"
    "/api/shopify/orders"
    "/api/shopify/customers"
    "/api/shopify/products"
    "/api/stripe/customers"
    "/api/stripe/subscriptions"
    "/api/stripe/payments"
    "/api/webhooks/stripe"
    "/api/webhooks/shopify"
    "/api/stats/overview"
    "/api/stats/revenue"
    "/api/stats/sleep-analysis"
)

# Función para verificar endpoint
check_endpoint() {
    local endpoint=$1
    local response=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${endpoint}")
    
    if [ "$response" == "200" ] || [ "$response" == "201" ] || [ "$response" == "204" ]; then
        echo -e "${GREEN}✅ ${endpoint} - ${response}${NC}"
        return 0
    elif [ "$response" == "404" ]; then
        echo -e "${RED}❌ ${endpoint} - ${response} (Not Found)${NC}"
        return 1
    elif [ "$response" == "405" ]; then
        echo -e "${YELLOW}⚠️  ${endpoint} - ${response} (Method Not Allowed - Normal for POST endpoints)${NC}"
        return 0
    else
        echo -e "${RED}❌ ${endpoint} - ${response}${NC}"
        return 1
    fi
}

# Verificar cada endpoint
total=0
success=0

for endpoint in "${endpoints[@]}"; do
    ((total++))
    if check_endpoint "$endpoint"; then
        ((success++))
    fi
    sleep 0.5  # Pequeña pausa entre requests
done

echo "================================================"
echo "📊 Resumen: ${success}/${total} endpoints respondiendo"

# Verificar endpoint crítico de documentación
echo ""
echo "🔍 Verificando disponibilidad de la documentación API..."
if curl -s "${BASE_URL}/api-docs" | grep -q "Sleep Plus API Documentation"; then
    echo -e "${GREEN}✅ Documentación API disponible y funcionando${NC}"
else
    echo -e "${RED}❌ Documentación API no disponible o incompleta${NC}"
fi

# Verificar algunos datos específicos
echo ""
echo "📋 Verificando datos de ejemplo..."

# Verificar usuarios
users_count=$(curl -s "${BASE_URL}/api/users" | grep -o '"id"' | wc -l)
echo "👥 Usuarios encontrados: $users_count"

# Verificar registros de sueño
sleep_records=$(curl -s "${BASE_URL}/api/sleep-records" | grep -o '"id"' | wc -l)
echo "😴 Registros de sueño encontrados: $sleep_records"

echo ""
echo "✅ Verificación completa"

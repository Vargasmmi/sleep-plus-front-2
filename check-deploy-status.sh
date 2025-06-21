#!/bin/bash

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BASE_URL="https://sleep-plus-front-2-backend.dqyvuv.easypanel.host"

echo -e "${BLUE}🚀 Monitoreando deploy del backend...${NC}"
echo "================================================"
echo "Verificando si el nuevo endpoint /api-docs está disponible..."
echo ""

# Función para verificar el endpoint crítico
check_api_docs() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api-docs")
    echo "$response"
}

# Monitoreo inicial
start_time=$(date +%s)
attempt=0

while true; do
    ((attempt++))
    current_time=$(date +%s)
    elapsed=$((current_time - start_time))
    
    status=$(check_api_docs)
    
    if [ "$status" == "200" ]; then
        echo -e "\n${GREEN}✅ ¡Deploy completado exitosamente!${NC}"
        echo -e "⏱️  Tiempo total: ${elapsed} segundos"
        echo -e "📖 Documentación disponible en: ${BASE_URL}/api-docs"
        break
    else
        echo -ne "\r⏳ Intento $attempt - Estado: ${YELLOW}Desplegando...${NC} (HTTP: $status) - Tiempo: ${elapsed}s"
        
        # Verificar cada 5 segundos
        sleep 5
        
        # Timeout después de 10 minutos
        if [ $elapsed -gt 600 ]; then
            echo -e "\n${RED}❌ Timeout: El deploy no se completó en 10 minutos${NC}"
            exit 1
        fi
    fi
done

echo -e "\n\n${BLUE}🔍 Verificando todos los endpoints...${NC}"
sleep 2

# Verificar todos los endpoints
echo ""
bash verify-all-endpoints.sh

echo -e "\n${GREEN}✅ Proceso completado${NC}"

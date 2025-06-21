#!/bin/bash

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BASE_URL="https://sleep-plus-front-2-backend.dqyvuv.easypanel.host"
API_DOCS_URL="${BASE_URL}/api-docs"

echo -e "${BLUE}🚀 Monitoreando el progreso del deploy...${NC}"
echo "================================================"
echo "Esperando a que el nuevo backend esté disponible..."
echo ""

attempt=0
max_attempts=60  # 10 minutos máximo
sleep_time=10    # 10 segundos entre intentos

while [ $attempt -lt $max_attempts ]; do
    ((attempt++))
    
    # Verificar si api-docs está disponible (indicador de que el nuevo deploy está activo)
    response=$(curl -s -o /dev/null -w "%{http_code}" "$API_DOCS_URL")
    
    if [ "$response" == "200" ]; then
        echo -e "\n${GREEN}✅ ¡Deploy completado exitosamente!${NC}"
        echo -e "${GREEN}La documentación API está disponible en: ${API_DOCS_URL}${NC}"
        break
    else
        echo -ne "\r⏳ Intento $attempt/$max_attempts - Estado: ${YELLOW}Desplegando...${NC} (Código HTTP: $response)"
        sleep $sleep_time
    fi
done

if [ $attempt -eq $max_attempts ]; then
    echo -e "\n${RED}❌ El deploy no se completó en el tiempo esperado${NC}"
    exit 1
fi

echo -e "\n\n${BLUE}🔍 Verificando todos los endpoints...${NC}"
sleep 2

# Ejecutar verificación completa
bash verify-all-endpoints.sh

echo -e "\n${GREEN}✅ Proceso completado${NC}"
echo -e "${BLUE}📖 Puedes ver la documentación interactiva en: ${API_DOCS_URL}${NC}"

#!/bin/bash

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# URLs de los servicios
FRONTEND_WORKING="https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host"
FRONTEND_TO_FIX="https://sleep-plus-admin-sleep-plus-admin-app.dqyvuv.easypanel.host"

echo -e "${CYAN}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     🚀 SLEEP PLUS ADMIN - FRONTEND DEPLOY MONITOR    ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📍 Frontend funcionando:${NC} $FRONTEND_WORKING"
echo -e "${BLUE}📍 Frontend a reparar:${NC} $FRONTEND_TO_FIX"
echo ""

# Función para verificar el estado del frontend
check_frontend_status() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_TO_FIX")
    echo "$response"
}

# Monitoreo inicial
start_time=$(date +%s)
attempt=0

echo -e "${YELLOW}⏳ Esperando que el deploy del frontend se complete...${NC}"
echo ""

while true; do
    ((attempt++))
    current_time=$(date +%s)
    elapsed=$((current_time - start_time))
    minutes=$((elapsed / 60))
    seconds=$((elapsed % 60))
    
    status=$(check_frontend_status)
    
    if [ "$status" == "200" ]; then
        echo -e "\n${GREEN}✅ ¡FRONTEND DESPLEGADO EXITOSAMENTE!${NC}"
        echo -e "${GREEN}⏱️  Tiempo total: ${minutes}m ${seconds}s${NC}"
        echo -e "${GREEN}🌐 Frontend disponible en: ${FRONTEND_TO_FIX}${NC}"
        break
    else
        printf "\r${YELLOW}🔄 Intento #${attempt}${NC} - Estado: ${RED}HTTP $status${NC} - Tiempo: ${CYAN}${minutes}m ${seconds}s${NC}"
        
        # Verificar cada 5 segundos
        sleep 5
        
        # Timeout después de 10 minutos
        if [ $elapsed -gt 600 ]; then
            echo -e "\n\n${RED}❌ TIMEOUT: El deploy no se completó en 10 minutos${NC}"
            echo -e "${YELLOW}Por favor verifica manualmente en:${NC}"
            echo -e "   http://168.231.92.67:3000/projects/sleep-plus-admin/app/sleep-plus-admin-app"
            exit 1
        fi
    fi
done

# Comparación de funcionalidades
echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║         🔍 COMPARACIÓN DE FRONTENDS                  ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}📊 Verificando ambos frontends:${NC}"
echo "────────────────────────────────────────────────────────"

# Verificar el frontend de referencia
echo -e "\n${GREEN}✅ Frontend de referencia (sleep-plus-front-2):${NC}"
response_ref=$(curl -s -o /dev/null -w "HTTP Status: %{http_code}, Size: %{size_download} bytes, Time: %{time_total}s" "$FRONTEND_WORKING")
echo "   $response_ref"
echo "   URL: $FRONTEND_WORKING"

# Verificar el frontend reparado
echo -e "\n${GREEN}✅ Frontend reparado (sleep-plus-admin):${NC}"
response_fix=$(curl -s -o /dev/null -w "HTTP Status: %{http_code}, Size: %{size_download} bytes, Time: %{time_total}s" "$FRONTEND_TO_FIX")
echo "   $response_fix"
echo "   URL: $FRONTEND_TO_FIX"

# Verificar contenido básico
echo ""
echo -e "${BLUE}📄 Verificando contenido HTML:${NC}"
echo "────────────────────────────────────────────────────────"

# Verificar título de la página
title_ref=$(curl -s "$FRONTEND_WORKING" | grep -o '<title>[^<]*</title>' | head -1)
title_fix=$(curl -s "$FRONTEND_TO_FIX" | grep -o '<title>[^<]*</title>' | head -1)

echo -e "Título de referencia: ${YELLOW}$title_ref${NC}"
echo -e "Título reparado: ${YELLOW}$title_fix${NC}"

# Resumen final
echo ""
echo "────────────────────────────────────────────────────────"
echo -e "${GREEN}✅ DEPLOY COMPLETADO${NC}"
echo ""
echo -e "${CYAN}🔗 Enlaces:${NC}"
echo -e "   🎛️  Panel EasyPanel: ${BLUE}http://168.231.92.67:3000/projects/sleep-plus-admin${NC}"
echo -e "   🖥️  Frontend reparado: ${BLUE}$FRONTEND_TO_FIX${NC}"
echo -e "   📋 Backend asociado: ${BLUE}https://sleep-plus-front-2-backend.dqyvuv.easypanel.host${NC}"
echo ""

# Instrucciones adicionales
echo -e "${CYAN}📝 Próximos pasos:${NC}"
echo "   1. Verifica que la aplicación funcione correctamente"
echo "   2. Prueba las principales funcionalidades"
echo "   3. Revisa la conexión con el backend"
echo ""
echo -e "${CYAN}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║            ✨ FRONTEND ACTUALIZADO ✨                ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════╝${NC}"

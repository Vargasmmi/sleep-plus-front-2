#!/bin/bash

# deploy-backend.sh
# Script para desplegar el backend en EasyPanel

# Configuración
API_TOKEN="c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58"
EASYPANEL_URL="http://168.231.92.67:3000"
PROJECT_NAME="sleep-plus-backend"
SERVICE_NAME="api"
BACKEND_REPO="[URL_DEL_REPO_BACKEND]" # Actualizar con la URL real del repositorio

echo "🚀 Iniciando despliegue del backend Sleep Plus..."

# 1. Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de ejecutar este script desde la raíz del backend."
    exit 1
fi

# 2. Instalar dependencias y probar localmente
echo "📦 Instalando dependencias..."
npm install

echo "🧪 Probando el servidor localmente..."
timeout 10s npm start > /dev/null 2>&1
if [ $? -eq 124 ]; then
    echo "✅ Servidor iniciado correctamente (timeout esperado)"
else
    echo "⚠️  El servidor podría tener problemas"
fi

# 3. Commit y push de cambios
echo "📝 Guardando cambios..."
git add .
git commit -m "feat: Backend v2.0 con modelo completo y funcionalidades mejoradas" || echo "No hay cambios nuevos"
git push origin main || echo "⚠️  No se pudo hacer push. Verifica tu repositorio."

# 4. Crear proyecto en EasyPanel
echo "🏗️  Creando proyecto en EasyPanel..."
curl -X POST $EASYPANEL_URL/api/trpc/projects.createProject \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"json\":{\"name\":\"$PROJECT_NAME\"}}" \
  || echo "⚠️  El proyecto ya existe o hubo un error"

echo ""

# 5. Crear servicio
echo "🛠️  Creando servicio backend..."
curl -X POST $EASYPANEL_URL/api/trpc/services.app.createService \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "projectName": "'$PROJECT_NAME'",
      "serviceName": "'$SERVICE_NAME'",
      "source": {
        "type": "git",
        "repo": "'$BACKEND_REPO'",
        "ref": "main",
        "path": "/"
      },
      "build": {
        "type": "dockerfile",
        "file": "Dockerfile"
      },
      "env": "NODE_ENV=production\nPORT=3001\nHOST=0.0.0.0\nCORS_ORIGIN=https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host",
      "ports": [{
        "published": 3001,
        "target": 3001,
        "protocol": "tcp"
      }]
    }
  }'

echo ""
echo "✅ Despliegue iniciado!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Verifica el estado en: $EASYPANEL_URL"
echo "2. La URL del backend será: https://$PROJECT_NAME-$SERVICE_NAME.dqyvuv.easypanel.host"
echo "3. También disponible en: http://168.231.92.67:3001"
echo ""
echo "🔧 Para ver los logs:"
echo "docker logs ${PROJECT_NAME}_${SERVICE_NAME} -f"
echo ""
echo "🌐 Actualiza el frontend con la URL del backend:"
echo "VITE_API_URL=https://$PROJECT_NAME-$SERVICE_NAME.dqyvuv.easypanel.host"
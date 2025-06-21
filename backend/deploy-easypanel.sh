#!/bin/bash

# Sleep Plus Backend - Deploy to EasyPanel Script
# Este script despliega el backend en EasyPanel con las actualizaciones

set -e

echo "🚀 Iniciando deploy del backend en EasyPanel..."

# Variables
API_TOKEN="c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58"
EASYPANEL_URL="http://168.231.92.67:3000"
PROJECT_NAME="sleep-plus-backend"
SERVICE_NAME="api"

# 1. Verificar que el proyecto existe
echo "📋 Verificando proyecto..."
PROJECTS=$(curl -s -X GET "$EASYPANEL_URL/api/trpc/projects.listProjects" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json")

if echo "$PROJECTS" | grep -q "\"$PROJECT_NAME\""; then
  echo "✅ Proyecto encontrado: $PROJECT_NAME"
else
  echo "❌ Error: Proyecto no encontrado"
  exit 1
fi

# 2. Crear directorio temporal para deploy
echo "📁 Preparando archivos para deploy..."
TEMP_DIR=$(mktemp -d)
cp -r . "$TEMP_DIR/"
cd "$TEMP_DIR"

# 3. Asegurar que el Dockerfile está correcto
echo "🐳 Verificando Dockerfile..."
cat > Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci --only=production

# Copiar todo el código
COPY . .

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3001
ENV HOST=0.0.0.0

# Exponer puerto
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "server/server.js"]
EOF

echo "✅ Dockerfile actualizado"

# 4. Crear archivo de configuración del servicio
echo "⚙️ Creando configuración del servicio..."
cat > easypanel-service.json << EOF
{
  "json": {
    "projectName": "$PROJECT_NAME",
    "serviceName": "$SERVICE_NAME",
    "source": {
      "type": "local"
    },
    "build": {
      "type": "dockerfile",
      "file": "Dockerfile"
    },
    "env": "NODE_ENV=production\nPORT=3001\nHOST=0.0.0.0\nCORS_ORIGIN=*",
    "ports": [{
      "published": 3001,
      "target": 3001,
      "protocol": "tcp"
    }],
    "domains": [{
      "name": "sleep-plus-backend-api.dqyvuv.easypanel.host"
    }]
  }
}
EOF

# 5. Desplegar el servicio
echo "🚀 Desplegando servicio..."
echo "📍 URL del backend: https://sleep-plus-backend-api.dqyvuv.easypanel.host"
echo "📚 Documentación API: https://sleep-plus-backend-api.dqyvuv.easypanel.host/api-docs"

# Nota: Como no podemos hacer push directo desde el script local,
# el usuario deberá:
# 1. Crear/actualizar el servicio manualmente en EasyPanel
# 2. O usar el webhook de deploy si está configurado

echo ""
echo "⚠️ IMPORTANTE: Para completar el deploy:"
echo "1. Ve a EasyPanel: $EASYPANEL_URL"
echo "2. Navega al proyecto: $PROJECT_NAME"
echo "3. Si el servicio existe, haz click en 'Deploy'"
echo "4. Si no existe, crea un nuevo servicio con:"
echo "   - Source: GitHub (si tienes el repo) o Docker Hub"
echo "   - Build: Dockerfile"
echo "   - Port: 3001"
echo "   - Domain: sleep-plus-backend-api.dqyvuv.easypanel.host"
echo ""
echo "📋 Endpoints disponibles después del deploy:"
echo "   - Health: https://sleep-plus-backend-api.dqyvuv.easypanel.host/health"
echo "   - API Docs: https://sleep-plus-backend-api.dqyvuv.easypanel.host/api-docs"
echo "   - Customers: https://sleep-plus-backend-api.dqyvuv.easypanel.host/customers"
echo "   - Subscriptions: https://sleep-plus-backend-api.dqyvuv.easypanel.host/subscriptions"

# Limpiar
cd -
rm -rf "$TEMP_DIR"

echo "✅ Script completado"

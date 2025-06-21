#!/bin/bash

# deploy-manual.sh
# Script para despliegue manual en EasyPanel

echo "📦 Creando archivo comprimido del backend..."
cd /Users/josemichaelhernandezvargas/Desktop/sleep-plus-admin-easy-panel
tar -czf backend.tar.gz backend/

echo "📤 El archivo está listo en: backend.tar.gz"
echo ""
echo "📋 Instrucciones para despliegue manual:"
echo "1. Sube backend.tar.gz a un servidor temporal o GitHub Release"
echo "2. Crea un Dockerfile temporal en EasyPanel que descargue y extraiga el archivo"
echo "3. O crea un nuevo repositorio en GitHub con el código del backend"
echo ""
echo "🔧 Comando para crear el servicio (actualiza REPO_URL):"
echo ""
cat << 'EOF'
curl -X POST http://168.231.92.67:3000/api/trpc/services.app.createService \
  -H "Authorization: Bearer c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58" \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "projectName": "sleep-plus-backend",
      "serviceName": "api",
      "source": {
        "type": "git",
        "repo": "https://github.com/Vargasmmi/sleep-plus-backend.git",
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
EOF
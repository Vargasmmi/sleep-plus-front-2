curl -X DELETE http://168.231.92.67:3000/api/trpc/services.remove \
  -H "Authorization: Bearer c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58" \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "projectName": "sleep-plus-backend",
      "serviceName": "api"
    }
  }'

# Espera 5 segundos
sleep 5

# Crear nuevo servicio con el repositorio correcto
curl -X POST http://168.231.92.67:3000/api/trpc/services.app.createService \
  -H "Authorization: Bearer c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58" \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "projectName": "sleep-plus-backend",
      "serviceName": "api",
      "source": {
        "type": "git",
        "repo": "https://github.com/[TU_USUARIO]/sleep-plus-backend.git",
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
      }],
      "domains": [{
        "name": "sleep-plus-backend-api.dqyvuv.easypanel.host",
        "port": 3001,
        "https": true
      }]
    }
  }'
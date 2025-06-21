# Sleep Plus Frontend & Backend

Sistema de seguimiento de sueño con frontend React y backend JSON Server.

## 🚀 Estado de Despliegue

### Frontend
- **URL:** https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host
- **Estado:** ✅ Desplegado y funcionando
- **Puerto:** 3000

### Backend
- **URL con dominio temporal:** https://sleep-plus-front-2-backend.dqyvuv.easypanel.host
- **URL directa (alternativa):** http://168.231.92.67:3001
- **Estado:** ✅ Desplegado y funcionando
- **Puerto:** 3001
- **Dominio:** ✅ Configurado y funcionando

## 📁 Estructura del Proyecto

```
sleep-plus-front-2/
├── src/                    # Código fuente del frontend
│   ├── pages/             # Páginas de la aplicación
│   ├── services/          # Servicios API
│   │   └── api.ts        # Cliente API para el backend
│   └── App.tsx           # Componente principal
├── backend/               # Backend con JSON Server
│   ├── server.js         # Servidor Express
│   ├── db.json          # Base de datos JSON
│   ├── package.json     # Dependencias
│   └── Dockerfile       # Configuración Docker
├── .env.development      # Variables de entorno desarrollo
├── .env.production       # Variables de entorno producción
└── Dockerfile           # Docker del frontend
```

## 🛠️ Tecnologías

### Frontend
- React + TypeScript
- Vite
- Refine Framework
- Ant Design

### Backend
- Node.js + Express
- JSON Server
- CORS habilitado

## 📡 API Endpoints

Base URL: `https://sleep-plus-front-2-backend.dqyvuv.easypanel.host`

- `GET /health` - Estado del servidor
- `GET /api` - Información de la API
- `GET/POST/PUT/DELETE /api/users` - Gestión de usuarios
- `GET/POST/PUT/DELETE /api/sleep-records` - Registros de sueño
- `GET/POST/PUT/DELETE /api/sleep-goals` - Metas de sueño
- `GET /api/statistics` - Estadísticas

## 🧪 Pruebas de API

```bash
# Health check
curl https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/health

# Obtener usuarios
curl https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/users

# Crear registro de sueño
curl -X POST https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/sleep-records \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "date": "2024-03-23",
    "bedTime": "23:00",
    "wakeTime": "07:00",
    "duration": 8,
    "quality": 5,
    "notes": "Buena noche de sueño"
  }'
```

## 💻 Desarrollo Local

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## 🚀 Despliegue en EasyPanel

### Frontend (ya desplegado)
```bash
# Actualizar frontend
git add .
git commit -m "Update frontend"
git push origin main

# Redesplegar
curl -X POST http://168.231.92.67:3000/api/trpc/services.app.deployService \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"json":{"projectName":"sleep-plus-front-2","serviceName":"frontend","forceRebuild":true}}'
```

### Backend (ya desplegado)
```bash
# El backend se ejecuta en el puerto 3001
# Accesible en: http://168.231.92.67:3001
```

## 📝 Notas Importantes

1. El backend tiene dominio temporal asignado: `https://sleep-plus-front-2-backend.dqyvuv.easypanel.host`
2. También accesible por puerto directo: `http://168.231.92.67:3001`
3. El frontend está configurado para conectarse al backend correctamente
4. Los datos se almacenan en `backend/db.json` (no persistente entre reinicios)


## 📈 Próximos Pasos

1. Migrar a una base de datos persistente
2. Implementar autenticación real
3. Agregar validación de datos
4. Mejorar la interfaz de usuario
5. Implementar más funcionalidades de seguimiento de sueño

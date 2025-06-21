# Sleep Plus Frontend & Backend

Sistema de seguimiento de sueño con frontend React y backend JSON Server.

## 🚀 Estado de Despliegue

### Frontend
- **URL:** https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host
- **Estado:** ✅ Desplegado y funcionando
- **Puerto:** 3000

### Backend
- **URL directa:** http://168.231.92.67:3001
- **Estado:** ✅ Desplegado y funcionando
- **Puerto:** 3001
- **Nota:** El backend no tiene dominio temporal de EasyPanel, usar la URL con puerto directo

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

Base URL: `http://168.231.92.67:3001`

- `GET /health` - Estado del servidor
- `GET /api` - Información de la API
- `GET/POST/PUT/DELETE /api/users` - Gestión de usuarios
- `GET/POST/PUT/DELETE /api/sleep-records` - Registros de sueño
- `GET/POST/PUT/DELETE /api/sleep-goals` - Metas de sueño
- `GET /api/statistics` - Estadísticas

## 🧪 Pruebas de API

```bash
# Health check
curl http://168.231.92.67:3001/health

# Obtener usuarios
curl http://168.231.92.67:3001/api/users

# Crear registro de sueño
curl -X POST http://168.231.92.67:3001/api/sleep-records \
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

1. El backend no tiene dominio temporal asignado en EasyPanel
2. Usar la URL con puerto directo: `http://168.231.92.67:3001`
3. El frontend está configurado para conectarse al backend correctamente
4. Los datos se almacenan en `backend/db.json` (no persistente entre reinicios)

## 🔧 Configuración Manual del Dominio (EasyPanel)

Si necesitas asignar un dominio al backend:

1. Accede a EasyPanel: http://168.231.92.67:3000
2. Ve a: Proyectos → sleep-plus-front-2 → backend
3. En "Domains", configura:
   - Host: sleep-plus-front-2-backend.dqyvuv.easypanel.host
   - Port: 3001
   - HTTPS: Habilitado

## 📈 Próximos Pasos

1. Migrar a una base de datos persistente
2. Implementar autenticación real
3. Agregar validación de datos
4. Mejorar la interfaz de usuario
5. Implementar más funcionalidades de seguimiento de sueño

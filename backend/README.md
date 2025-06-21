# Sleep Plus Backend

Backend API para Sleep Plus usando json-server.

## Características

- API REST completa con json-server
- CORS configurado para el frontend
- Endpoints para usuarios, registros de sueño, metas y estadísticas
- Health check endpoint
- Base de datos JSON con datos de ejemplo

## Endpoints

- `GET /health` - Estado del servidor
- `GET /api` - Información de la API
- `GET /api/users` - Listar usuarios
- `GET /api/sleep-records` - Listar registros de sueño
- `GET /api/sleep-goals` - Listar metas de sueño
- `GET /api/statistics` - Listar estadísticas

## Desarrollo Local

```bash
npm install
npm run dev
```

## Producción

```bash
npm start
```

El servidor se ejecuta en el puerto 3001 por defecto.

# Sleep Plus Backend - Configuración EasyPanel

## Estado Actual

El backend está desplegado y funcionando en EasyPanel:
- **URL directa:** http://168.231.92.67:3001
- **Proyecto:** sleep-plus-front-2
- **Servicio:** backend

## Acceso al Backend

Aunque no tiene un dominio temporal de EasyPanel, el backend es accesible mediante:

### 1. Puerto directo (Recomendado para desarrollo)
```
http://168.231.92.67:3001
```

### 2. Endpoints disponibles:
- Health check: http://168.231.92.67:3001/health
- API info: http://168.231.92.67:3001/api
- Users: http://168.231.92.67:3001/api/users
- Sleep records: http://168.231.92.67:3001/api/sleep-records
- Sleep goals: http://168.231.92.67:3001/api/sleep-goals
- Statistics: http://168.231.92.67:3001/api/statistics

## Configuración Manual del Dominio en EasyPanel

Para asignar un dominio temporal al backend:

1. Accede al panel de EasyPanel: http://168.231.92.67:3000
2. Navega a: Proyectos → sleep-plus-front-2 → backend
3. En la sección "Domains", agrega:
   - Host: sleep-plus-front-2-backend.dqyvuv.easypanel.host
   - Port: 3001
   - HTTPS: Habilitado

## Frontend Configurado

El frontend ya está configurado para usar el backend:
- Archivo: `.env.production`
- URL: `http://168.231.92.67:3001/api`

## Verificación

Puedes verificar que el backend funciona correctamente:

```bash
# Health check
curl http://168.231.92.67:3001/health

# Obtener usuarios
curl http://168.231.92.67:3001/api/users

# Crear un registro de sueño
curl -X POST http://168.231.92.67:3001/api/sleep-records \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"date":"2024-03-23","bedTime":"23:00","wakeTime":"07:00","duration":8,"quality":5}'
```

# Sleep Plus Backend - Configuración EasyPanel

## Estado Actual

El backend está desplegado y funcionando en EasyPanel:
- **URL con dominio temporal:** https://sleep-plus-front-2-backend.dqyvuv.easypanel.host ✅
- **URL directa:** http://168.231.92.67:3001
- **Proyecto:** sleep-plus-front-2
- **Servicio:** backend
- **Dominio:** Configurado y funcionando

## Acceso al Backend

El backend es accesible mediante:

### 1. Dominio temporal de EasyPanel (Recomendado)
```
https://sleep-plus-front-2-backend.dqyvuv.easypanel.host
```

### 2. Puerto directo (Alternativa)
```
http://168.231.92.67:3001
```

### 3. Endpoints disponibles:
- Health check: https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/health
- API info: https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api
- Users: https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/users
- Sleep records: https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/sleep-records
- Sleep goals: https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/sleep-goals
- Statistics: https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/statistics

## Frontend Configurado

El frontend ya está configurado para usar el backend:
- Archivo: `.env.production`
- URL: `https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api`

## Verificación

Puedes verificar que el backend funciona correctamente:

```bash
# Health check
curl https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/health

# Obtener usuarios
curl https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/users

# Crear un registro de sueño
curl -X POST https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/api/sleep-records \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"date":"2024-03-23","bedTime":"23:00","wakeTime":"07:00","duration":8,"quality":5}'
```

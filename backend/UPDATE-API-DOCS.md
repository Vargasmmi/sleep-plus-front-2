# 📋 Actualización: Documentación API Interactiva

## 🎉 Cambios Realizados

### 1. **Nueva Documentación API Interactiva**
- ✅ Creado archivo `server/api-documentation.html` con documentación completa
- ✅ Lista todos los endpoints disponibles del backend
- ✅ Permite probar cada endpoint directamente desde el navegador
- ✅ Muestra el estado del servidor en tiempo real

### 2. **Modificaciones en server.js**
- ✅ Añadido endpoint `/api-docs` para acceder a la documentación
- ✅ Configurado para servir la documentación cuando no hay frontend
- ✅ Actualizado el log de inicio para mostrar la ruta de documentación

## 🚀 Cómo Acceder a la Documentación

### Localmente:
```bash
# Iniciar el servidor
npm start

# Abrir en el navegador
http://localhost:3001/api-docs
```

### En EasyPanel (después del deploy):
```
https://sleep-plus-backend-api.dqyvuv.easypanel.host/api-docs
```

## 📚 Endpoints Disponibles

### Documentación
- `GET /api-docs` - Documentación interactiva completa

### Health Check
- `GET /health` - Estado del servidor
- `GET /api/debug/files` - Estructura de archivos

### Shopify Integration
- `POST /api/shopify/test-connection`
- `POST /api/shopify/products`
- `POST /api/shopify/customers`
- `POST /api/shopify/price-rules`
- `POST /api/shopify/price-rules/create`
- `POST /api/shopify/discount-codes/:id`

### Stripe Integration
- `GET /api/stripe/config`
- `POST /api/stripe/config`
- `GET /api/stripe/payment-links`
- `POST /api/stripe/payment-links`
- `GET /api/stripe/stats`

### Subscriptions
- `GET /api/subscriptions/stats`
- `POST /api/subscriptions/:id/pause`
- `POST /api/subscriptions/:id/resume`
- `POST /api/subscriptions/sync-stripe`

### JSON Server (Base de Datos)
- `GET /users`
- `GET /customers`
- `GET /employees`
- `GET /subscriptions`
- `GET /evaluations`
- Y muchos más...

### Webhooks
- `GET /api/webhook-events`
- `POST /api/webhooks/trade-evaluation`
- `POST /api/webhooks/shopify/:event`

## 🛠️ Para Hacer el Deploy en EasyPanel

### Opción 1: Deploy Manual desde EasyPanel

1. Ve a EasyPanel: http://168.231.92.67:3000
2. Navega al proyecto `sleep-plus-backend`
3. Ve al servicio `api`
4. Haz click en "Deploy" o "Redeploy"

### Opción 2: Si el servicio no está creado

1. En EasyPanel, crea un nuevo servicio en el proyecto `sleep-plus-backend`
2. Configuración:
   - Name: `api`
   - Source: GitHub (si tienes acceso al repo) o local
   - Build: Dockerfile
   - Port: 3001
   - Environment Variables:
     ```
     NODE_ENV=production
     PORT=3001
     HOST=0.0.0.0
     ```
   - Domain: `sleep-plus-backend-api.dqyvuv.easypanel.host`

### Opción 3: Deploy con Git (si tienes acceso al repositorio)

```bash
# Hacer push de los cambios
git add .
git commit -m "feat: Agregar documentación API interactiva"
git push origin main

# El webhook de EasyPanel debería detectar los cambios y hacer deploy automático
```

## 🔍 Verificar el Deploy

Después del deploy, verifica que todo funcione:

1. **Health Check**:
   ```bash
   curl https://sleep-plus-backend-api.dqyvuv.easypanel.host/health
   ```

2. **Documentación API**:
   - Abre en el navegador: https://sleep-plus-backend-api.dqyvuv.easypanel.host/api-docs

3. **Test de endpoints**:
   ```bash
   # Listar usuarios
   curl https://sleep-plus-backend-api.dqyvuv.easypanel.host/users
   
   # Listar clientes
   curl https://sleep-plus-backend-api.dqyvuv.easypanel.host/customers
   ```

## ⚠️ Notas Importantes

1. **Sin acceso a Git**: Los cambios están guardados localmente pero no se pudieron hacer push al repositorio GitHub por falta de permisos.

2. **Deploy Manual**: Necesitarás hacer el deploy manualmente desde EasyPanel o configurar las credenciales de Git correctamente.

3. **Documentación Siempre Disponible**: Incluso si el frontend no está disponible, la documentación API se mostrará en la raíz del servidor.

## 📝 Archivos Modificados

1. `server/api-documentation.html` - Nueva documentación interactiva
2. `server/server.js` - Añadidas rutas para servir la documentación
3. `deploy-easypanel.sh` - Script de ayuda para deploy (informativo)
4. `UPDATE-API-DOCS.md` - Este archivo con instrucciones

---

**Fecha de actualización**: 21 de Junio de 2025
**Autor**: Asistente IA

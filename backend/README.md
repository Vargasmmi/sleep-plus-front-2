# Sleep Plus Admin Backend - v2.0

Backend API para Sleep Plus Admin con funcionalidades completas de gestión de clientes, suscripciones, evaluaciones, call center, comisiones e integraciones con Shopify y Stripe.

## 🚀 Características

- **Gestión de Clientes**: CRUD completo con seguimiento de historial
- **Gestión de Suscripciones**: Crear, pausar, reanudar y cancelar suscripciones
- **Sistema de Evaluaciones**: Evaluación con IA simulada para trade-ins
- **Call Center**: Seguimiento de llamadas, scripts y campañas
- **Comisiones**: Cálculo automático de comisiones para empleados
- **Integración Shopify**: Sincronización de productos, clientes y descuentos
- **Integración Stripe**: Creación de payment links y gestión de pagos
- **Webhooks**: Soporte para webhooks de Shopify, Stripe y trade-ins
- **API RESTful**: Endpoints completos con rutas personalizadas

## 📦 Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]

# Instalar dependencias
npm install

# Copiar archivo de configuración
cp .env.example .env

# Iniciar en desarrollo
npm run dev

# Iniciar en producción
npm start
```

## 🔧 Configuración

### Variables de Entorno

```env
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
CORS_ORIGIN=https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host
```

### Estructura de la Base de Datos

El archivo `db.json` contiene las siguientes entidades:

- `users`: Usuarios del sistema
- `customers`: Clientes
- `subscriptions`: Suscripciones activas
- `evaluations`: Evaluaciones de productos
- `employees`: Empleados/Agentes
- `stores`: Tiendas físicas
- `calls`: Registro de llamadas
- `sales`: Ventas realizadas
- `campaigns`: Campañas de marketing
- `achievements`: Logros desbloqueados
- `scripts`: Guiones de llamadas
- `commissions`: Comisiones calculadas
- `shopifySettings`: Configuración de Shopify
- `shopifyProducts`: Productos sincronizados
- `shopifyCustomers`: Clientes de Shopify
- Y más...

## 🌐 Endpoints Principales

### Clientes
- `GET /api/customers` - Listar clientes
- `POST /api/customers` - Crear cliente
- `GET /api/customers/:id` - Obtener cliente
- `PUT /api/customers/:id` - Actualizar cliente
- `DELETE /api/customers/:id` - Eliminar cliente

### Suscripciones
- `GET /api/subscriptions` - Listar suscripciones
- `POST /api/subscriptions` - Crear suscripción
- `POST /api/subscriptions/:id/pause` - Pausar suscripción
- `POST /api/subscriptions/:id/resume` - Reanudar suscripción

### Evaluaciones
- `POST /api/evaluations/analyze` - Analizar con IA (simulado)
- `GET /api/evaluations/:id` - Obtener evaluación
- `POST /api/evaluations/:id/approve` - Aprobar evaluación

### Integraciones
- `POST /api/shopify/test-connection` - Probar conexión Shopify
- `POST /api/shopify/products/sync` - Sincronizar productos
- `POST /api/stripe/test-connection` - Probar conexión Stripe
- `POST /api/stripe/payment-links/create` - Crear payment link

### Webhooks
- `POST /api/webhooks/trade-in` - Webhook para trade-ins
- `POST /api/webhooks/shopify` - Webhook de Shopify
- `POST /api/webhooks/stripe` - Webhook de Stripe

### Estadísticas
- `GET /api/stats/dashboard` - Estadísticas del dashboard
- `POST /api/commissions/calculate` - Calcular comisiones

### Rutas Personalizadas
- `GET /api/customers/:id/subscriptions` - Suscripciones de un cliente
- `GET /api/employees/:id/sales` - Ventas de un empleado
- `GET /api/stores/:id/employees` - Empleados de una tienda

## 🐳 Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
ENV PORT=3001
ENV HOST=0.0.0.0
EXPOSE 3001
CMD ["npm", "start"]
```

## 🚀 Despliegue en EasyPanel

1. Crear proyecto en EasyPanel
2. Configurar variables de entorno
3. Asegurar que el puerto esté configurado en 3001
4. Desplegar usando el Dockerfile incluido

### Comando de Despliegue

```bash
curl -X POST http://168.231.92.67:3000/api/trpc/services.app.createService \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "projectName": "sleep-plus-backend",
      "serviceName": "api",
      "source": {
        "type": "git",
        "repo": "[REPO_URL]",
        "ref": "main",
        "path": "/"
      },
      "build": {
        "type": "dockerfile",
        "file": "Dockerfile"
      },
      "env": "NODE_ENV=production\nPORT=3001\nHOST=0.0.0.0",
      "ports": [{
        "published": 3001,
        "target": 3001,
        "protocol": "tcp"
      }]
    }
  }'
```

## 📝 Notas de Migración

Esta versión 2.0 incluye:
- ✅ Modelo de datos completo con todas las entidades
- ✅ Endpoints personalizados para integraciones
- ✅ Sistema de webhooks
- ✅ Rutas personalizadas para relaciones entre entidades
- ✅ Configuración optimizada para EasyPanel
- ✅ CORS configurado para el frontend desplegado

## 🔒 Seguridad

- Variables de entorno para datos sensibles
- CORS configurado para dominios específicos
- Validación de datos en endpoints críticos
- Logs de todas las operaciones

## 📚 Documentación Adicional

Para más información sobre las entidades y sus relaciones, consultar el archivo `MIGRATION_GUIDE.md` en el frontend.

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
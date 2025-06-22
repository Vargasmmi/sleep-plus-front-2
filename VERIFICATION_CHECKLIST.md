# 🔍 CHECKLIST DE VERIFICACIÓN - SLEEP PLUS ADMIN

## 1. ESTRUCTURA DEL PROYECTO ✅

### 1.1 Archivos de Configuración
- [ ] `package.json` - Verificar dependencias y scripts
- [ ] `tsconfig.json` - Configuración de TypeScript
- [ ] `vite.config.ts` - Configuración de Vite
- [ ] `.env.development` - Variables de desarrollo
- [ ] `.env.production` - Variables de producción
- [ ] `Dockerfile` - Configuración para Docker/EasyPanel

### 1.2 Estructura de Carpetas
```
src/
├── components/       # Componentes reutilizables
├── hooks/           # Custom hooks
├── interfaces/      # Tipos e interfaces TypeScript
├── pages/           # Páginas/vistas de la aplicación
├── providers/       # Providers (auth, data, etc.)
└── services/        # Servicios y utilidades
```

## 2. AUTENTICACIÓN Y AUTORIZACIÓN 🔐

### 2.1 AuthProvider (`src/providers/authProvider.ts`)
- [ ] Login funciona correctamente
- [ ] Logout limpia el localStorage
- [ ] Check verifica sesión activa
- [ ] GetIdentity retorna datos del usuario
- [ ] GetPermissions retorna el rol
- [ ] Manejo de errores 401

### 2.2 Usuarios de Prueba
- [ ] Admin: admin@lamattressstore.com / admin123
- [ ] Manager: john.smith@lamattressstore.com / demo123
- [ ] Agent: maria.garcia@lamattressstore.com / demo123
- [ ] Demo: demo@lamattressstore.com / demo123

### 2.3 AccessControlProvider (`src/providers/accessControlProvider.ts`)
- [ ] Permisos por rol definidos correctamente
- [ ] Admin tiene acceso total
- [ ] Manager tiene restricciones específicas
- [ ] Agent solo acceso a operaciones básicas

## 3. DATA PROVIDER Y API 🌐

### 3.1 DataProvider (`src/providers/dataProvider.ts`)
- [ ] Configuración de URL base correcta
- [ ] Métodos CRUD implementados (getList, getOne, create, update, delete)
- [ ] Manejo de paginación
- [ ] Manejo de filtros
- [ ] Manejo de ordenamiento
- [ ] Logging de actividades integrado

### 3.2 Endpoints del Backend
```
Base URL Development: http://localhost:3001
Base URL Production: http://168.231.92.67:3001
```

### 3.3 Recursos Disponibles
- [ ] `/customers` - Clientes
- [ ] `/subscriptions` - Suscripciones
- [ ] `/employees` - Empleados
- [ ] `/stores` - Tiendas
- [ ] `/calls` - Llamadas
- [ ] `/sales` - Ventas
- [ ] `/campaigns` - Campañas
- [ ] `/commissions` - Comisiones
- [ ] `/achievements` - Logros
- [ ] `/evaluations` - Evaluaciones
- [ ] `/scripts` - Guiones
- [ ] `/activity-logs` - Logs de actividad
- [ ] `/webhooks` - Webhooks

## 4. PÁGINAS Y COMPONENTES 📄

### 4.1 Dashboard
- [ ] `AdminDashboard` - Métricas generales
- [ ] `ManagerDashboard` - Métricas de equipo
- [ ] `AgentDashboard` - Métricas personales
- [ ] Carga según rol del usuario

### 4.2 Módulos CRUD Básicos
Cada módulo debe tener:
- [ ] List - Listado con tabla paginada
- [ ] Create - Formulario de creación
- [ ] Edit - Formulario de edición
- [ ] Show - Vista de detalle
- [ ] Delete - Confirmación de eliminación

#### Verificar para cada recurso:
- [ ] **Customers** (Clientes)
- [ ] **Subscriptions** (Suscripciones)
- [ ] **Employees** (Empleados)
- [ ] **Stores** (Tiendas)
- [ ] **Calls** (Llamadas)
- [ ] **Sales** (Ventas)
- [ ] **Campaigns** (Campañas)
- [ ] **Commissions** (Comisiones)
- [ ] **Achievements** (Logros)
- [ ] **Evaluations** (Evaluaciones)
- [ ] **Scripts** (Guiones)

### 4.3 Módulos Especiales
- [ ] **Call Center** - Vista integrada de llamadas
- [ ] **Leaderboard** - Tabla de líderes
- [ ] **Tasks** - Tareas diarias
- [ ] **Profile** - Perfil de usuario
- [ ] **Activity Logs** - Registro de actividades
- [ ] **Webhooks** - Gestión de webhooks

### 4.4 Integraciones
- [ ] **Stripe Management** - Gestión de pagos
- [ ] **Shopify** - Productos, clientes, cupones
- [ ] **Medical** (Nuevo) - Appointments, Doctors, Patients

## 5. SERVICIOS Y UTILIDADES 🛠️

### 5.1 Servicios Implementados
- [ ] `activityLogService` - Logging de actividades
- [ ] `stripeService` - Integración con Stripe
- [ ] `shopifyService` - Integración con Shopify
- [ ] `subscriptionService` - Gestión de suscripciones
- [ ] `webhookService` - Manejo de webhooks

### 5.2 Verificar Funcionalidades
- [ ] Formateo de moneda
- [ ] Formateo de fechas
- [ ] Validaciones de formularios
- [ ] Manejo de errores global
- [ ] Notificaciones toast

## 6. INTERFACES Y TIPOS 📝

### 6.1 Interfaces Principales
- [ ] `IEmployee` - Estructura de empleado
- [ ] `ICustomer` - Estructura de cliente
- [ ] `ISubscription` - Estructura de suscripción
- [ ] `ISale` - Estructura de venta
- [ ] `ICall` - Estructura de llamada
- [ ] `ICampaign` - Estructura de campaña
- [ ] `IStore` - Estructura de tienda
- [ ] `IScript` - Estructura de guión
- [ ] `IActivityLog` - Estructura de log

### 6.2 Interfaces de Integración
- [ ] `IShopifyProduct` - Productos de Shopify
- [ ] `IShopifyCustomer` - Clientes de Shopify
- [ ] `IShopifyCoupon` - Cupones de Shopify
- [ ] `IStripePaymentLink` - Enlaces de pago
- [ ] `IWebhook` - Estructura de webhook

## 7. COMPONENTES REUTILIZABLES 🔧

### 7.1 Layout y Navegación
- [ ] `AuthenticatedLayout` - Layout principal
- [ ] `CustomHeader` - Header personalizado
- [ ] `ThemedLayoutWithDynamicMenu` - Menú dinámico por permisos
- [ ] `Loading` - Componente de carga
- [ ] `AuthError` - Página de error de auth

### 7.2 Componentes de Stripe
- [ ] `StripeConfigForm` - Configuración de Stripe
- [ ] `PaymentLinkGenerator` - Generador de enlaces
- [ ] `PaymentLinksList` - Lista de enlaces
- [ ] `StripeStats` - Estadísticas de Stripe
- [ ] `SubscriptionStats` - Estadísticas de suscripciones
- [ ] `SubscriptionStripeDashboard` - Dashboard integrado

## 8. RUTAS Y NAVEGACIÓN 🗺️

### 8.1 Rutas Públicas
- [ ] `/login` - Página de login

### 8.2 Rutas Protegidas
- [ ] `/` - Dashboard principal
- [ ] `/customers/*` - Gestión de clientes
- [ ] `/subscriptions/*` - Gestión de suscripciones
- [ ] `/employees/*` - Gestión de empleados
- [ ] `/stores/*` - Gestión de tiendas
- [ ] `/calls/*` - Gestión de llamadas
- [ ] `/sales/*` - Gestión de ventas
- [ ] `/campaigns/*` - Gestión de campañas
- [ ] `/stripe` - Gestión de Stripe
- [ ] `/shopify/*` - Integración Shopify
- [ ] `/admin/*` - Configuración admin

## 9. ESTADO Y MANEJO DE DATOS 📊

### 9.1 Hooks de Refine
- [ ] `useList` - Listar recursos
- [ ] `useOne` - Obtener un recurso
- [ ] `useCreate` - Crear recursos
- [ ] `useUpdate` - Actualizar recursos
- [ ] `useDelete` - Eliminar recursos
- [ ] `useForm` - Manejo de formularios
- [ ] `useTable` - Manejo de tablas
- [ ] `useSelect` - Selects relacionados

### 9.2 Estado Global
- [ ] Información del usuario actual
- [ ] Permisos y roles
- [ ] Configuración de la aplicación
- [ ] Notificaciones activas

## 10. VALIDACIONES Y REGLAS DE NEGOCIO 📋

### 10.1 Validaciones de Formularios
- [ ] Campos requeridos marcados
- [ ] Validación de email
- [ ] Validación de teléfono
- [ ] Validación de montos
- [ ] Validación de fechas
- [ ] Validaciones personalizadas

### 10.2 Reglas de Negocio
- [ ] Solo admin puede crear empleados
- [ ] Manager no puede ver comisiones de otros
- [ ] Agent solo ve sus propios datos
- [ ] Validación de duplicados (email, teléfono)
- [ ] Estados de suscripción coherentes
- [ ] Cálculo automático de comisiones

## 11. INTEGRACIÓN CON BACKEND 🔌

### 11.1 Verificar Endpoints
```bash
# Clientes
GET    /customers
GET    /customers/:id
POST   /customers
PUT    /customers/:id
DELETE /customers/:id

# Suscripciones
GET    /subscriptions
GET    /subscriptions/:id
POST   /subscriptions
PUT    /subscriptions/:id
DELETE /subscriptions/:id
POST   /subscriptions/:id/cancel
POST   /subscriptions/:id/pause
POST   /subscriptions/:id/resume

# Empleados
GET    /employees
GET    /employees/:id
POST   /employees
PUT    /employees/:id
DELETE /employees/:id

# Continuar para cada recurso...
```

### 11.2 Manejo de Errores
- [ ] Errores 400 - Bad Request
- [ ] Errores 401 - No autorizado
- [ ] Errores 403 - Prohibido
- [ ] Errores 404 - No encontrado
- [ ] Errores 500 - Error del servidor
- [ ] Timeout de red

## 12. PERFORMANCE Y OPTIMIZACIÓN ⚡

### 12.1 Optimizaciones
- [ ] Lazy loading de componentes
- [ ] Paginación en listas grandes
- [ ] Debounce en búsquedas
- [ ] Caché de datos estáticos
- [ ] Compresión de imágenes
- [ ] Minificación de assets

### 12.2 Métricas
- [ ] Tiempo de carga inicial < 3s
- [ ] Tiempo de respuesta API < 500ms
- [ ] Bundle size < 1MB
- [ ] Lighthouse score > 80

## 13. SEGURIDAD 🔒

### 13.1 Frontend
- [ ] No hay credenciales hardcodeadas
- [ ] Tokens almacenados de forma segura
- [ ] Sanitización de inputs
- [ ] Prevención de XSS
- [ ] HTTPS en producción

### 13.2 API
- [ ] Autenticación en todos los endpoints
- [ ] Validación de permisos
- [ ] Rate limiting
- [ ] CORS configurado correctamente
- [ ] Headers de seguridad

## 14. TESTING 🧪

### 14.1 Pruebas Manuales
- [ ] Login con cada rol
- [ ] CRUD completo de cada recurso
- [ ] Validación de permisos
- [ ] Navegación entre páginas
- [ ] Responsive design
- [ ] Manejo de errores

### 14.2 Casos de Uso Críticos
- [ ] Crear cliente → Crear suscripción → Registrar venta
- [ ] Registrar llamada → Crear evaluación
- [ ] Generar payment link → Verificar webhook
- [ ] Sincronizar con Shopify
- [ ] Exportar reportes
- [ ] Cambiar configuración de permisos

## 15. DEPLOYMENT 🚀

### 15.1 Build de Producción
- [ ] `npm run build` sin errores
- [ ] Variables de entorno configuradas
- [ ] API URL apuntando a producción
- [ ] Optimizaciones aplicadas

### 15.2 EasyPanel
- [ ] Dockerfile actualizado
- [ ] Puerto 3000 expuesto
- [ ] Healthcheck configurado
- [ ] Logs disponibles
- [ ] Backups configurados

## 16. DOCUMENTACIÓN 📚

### 16.1 Código
- [ ] Comentarios en funciones complejas
- [ ] JSDoc en servicios
- [ ] README.md actualizado
- [ ] CHANGELOG.md mantenido

### 16.2 Usuario
- [ ] Manual de usuario
- [ ] Guía de inicio rápido
- [ ] FAQ
- [ ] Troubleshooting

## 17. MONITOREO 📈

### 17.1 Logs
- [ ] Logs de aplicación
- [ ] Logs de errores
- [ ] Logs de actividad
- [ ] Logs de API

### 17.2 Métricas
- [ ] Usuarios activos
- [ ] Uso por módulo
- [ ] Errores frecuentes
- [ ] Performance metrics

## 🔄 PROCESO DE VERIFICACIÓN

1. **Ejecutar localmente**
   ```bash
   npm install
   npm run dev
   ```

2. **Probar cada rol**
   - Login como admin, manager, agent
   - Verificar menús disponibles
   - Probar permisos

3. **Verificar CRUD**
   - Crear, leer, actualizar, eliminar
   - Para cada recurso principal

4. **Probar integraciones**
   - Stripe configuration
   - Shopify sync
   - Webhooks

5. **Build de producción**
   ```bash
   npm run build
   npm run preview
   ```

6. **Verificar en EasyPanel**
   - Deploy exitoso
   - Aplicación funcionando
   - Logs sin errores

## 🚨 PROBLEMAS COMUNES

1. **"Unrecognized Role"**
   - Limpiar localStorage
   - Verificar authProvider
   - Re-login

2. **API no responde**
   - Verificar .env
   - Verificar CORS
   - Verificar backend running

3. **Permisos incorrectos**
   - Verificar accessControlProvider
   - Verificar rol del usuario
   - Verificar configuración de recursos

4. **Build falla**
   - Corregir errores TypeScript
   - Verificar imports
   - Limpiar node_modules

## ✅ CRITERIOS DE ÉXITO

- [ ] Todos los usuarios pueden hacer login
- [ ] Dashboard carga según el rol
- [ ] CRUD funciona para todos los recursos
- [ ] Permisos se respetan correctamente
- [ ] Integraciones funcionan
- [ ] Build de producción exitoso
- [ ] Deploy en EasyPanel funcional
- [ ] Sin errores en consola
- [ ] Performance aceptable
- [ ] UX fluida y coherente

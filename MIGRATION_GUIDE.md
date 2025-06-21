# 📋 Guía de Migración: Sleep Plus Admin Backend

## 🎯 Objetivo
Migrar el modelo de datos y endpoints del backend de LA Mattress Store (sleep-plus-admin-easy-panel) al backend actual de Sleep Plus.

## 📊 Análisis del Backend de Referencia

### Tecnologías Identificadas
- **Base:** Node.js + Express + JSON Server
- **Integraciones:** 
  - Shopify API (productos, clientes, descuentos)
  - Stripe API (pagos, suscripciones)
- **Base de datos:** JSON (db.json)
- **Autenticación:** No implementada (usar json-server simple)

### Entidades Principales

#### 1. **Customers** (Clientes)
```json
{
  "id": "string",
  "phone": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string"
  },
  "tier": "gold|silver|bronze",
  "source": "store|online|phone",
  "tags": ["string"],
  "lifetimeValue": "number",
  "firstPurchaseDate": "ISO date",
  "lastPurchaseDate": "ISO date",
  "lastContactDate": "ISO date",
  "purchasedItems": ["string"],
  "isEliteMember": "boolean",
  "membershipStatus": "active|inactive",
  "totalTrades": "number",
  "totalCreditEarned": "number",
  "currentCredit": "number",
  "doNotCall": "boolean",
  "notes": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 2. **Subscriptions** (Suscripciones)
```json
{
  "id": "string",
  "customerId": "string",
  "plan": "elite|premium|basic",
  "status": "active|paused|cancelled",
  "pricing": {
    "monthly": "number",
    "annual": "number",
    "currency": "USD"
  },
  "billing": {
    "frequency": "monthly|annual",
    "nextBillingDate": "ISO date",
    "paymentMethod": "stripe|card|ach",
    "stripeCustomerId": "string",
    "stripeSubscriptionId": "string",
    "stripePriceId": "string",
    "lastFour": "string"
  },
  "services": {
    "cleaningsTotal": "number",
    "cleaningsUsed": "number",
    "protectionActive": "boolean",
    "inspectionsTotal": "number",
    "inspectionsUsed": "number"
  },
  "credits": {
    "accumulated": "number",
    "used": "number",
    "expiration": "ISO date"
  },
  "startDate": "ISO date",
  "cancelledAt": "ISO date",
  "cancelReason": "string",
  "pausedAt": "ISO date",
  "soldBy": "string (employeeId)",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 3. **Evaluations** (Evaluaciones de Colchones)
```json
{
  "id": "string",
  "customerId": "string",
  "mattress": {
    "brand": "string",
    "model": "string",
    "size": "twin|full|queen|king|california-king",
    "age": "number",
    "condition": "excellent|good|fair|poor"
  },
  "photos": ["string (URLs o base64)"],
  "aiEvaluation": {
    "conditionScore": "number",
    "brandScore": "number",
    "ageScore": "number",
    "sizeScore": "number",
    "finalScore": "number",
    "confidence": "number"
  },
  "creditApproved": "number",
  "status": "pending|approved|redeemed|expired",
  "couponCode": "string",
  "shopifyPriceRuleId": "string",
  "shopifyDiscountCodeId": "string",
  "customer": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "zipCode": "string"
  },
  "employeeId": "string",
  "storeId": "string",
  "createdAt": "ISO date",
  "expiresAt": "ISO date",
  "redeemedAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 4. **Employees** (Empleados/Agentes)
```json
{
  "id": "string",
  "employeeId": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "agent|manager|admin",
  "storeId": "string",
  "phoneExtension": "string",
  "avatar": "string",
  "status": "active|calling|break|offline",
  "shift": "morning|afternoon|evening|full",
  "hiredAt": "ISO date",
  "commissions": {
    "totalEvaluations": "number",
    "totalCommissionEarned": "number",
    "currentMonthEvaluations": "number",
    "currentMonthCommission": "number"
  },
  "performance": {
    "callsToday": "number",
    "callsTarget": "number",
    "conversionsToday": "number",
    "conversionRate": "number",
    "averageCallDuration": "number"
  },
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 5. **Stores** (Tiendas)
```json
{
  "id": "string",
  "name": "string",
  "code": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string"
  },
  "phone": "string",
  "managerId": "string",
  "hours": {
    "monday": { "open": "string", "close": "string" },
    "tuesday": { "open": "string", "close": "string" },
    // ... todos los días
  },
  "serviceArea": {
    "zipCodes": ["string"],
    "radius": "number"
  },
  "performance": {
    "monthlyTarget": "number",
    "currentSales": "number"
  },
  "status": "active|inactive",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 6. **Calls** (Llamadas)
```json
{
  "id": "string",
  "customerId": "string",
  "userId": "string (employeeId)",
  "type": "inbound|outbound",
  "status": "completed|missed|voicemail",
  "disposition": "sale|interested|not_interested|callback",
  "duration": "number (seconds)",
  "startTime": "ISO date",
  "endTime": "ISO date",
  "notes": "string",
  "script": {
    "id": "string",
    "name": "string",
    "version": "string"
  },
  "objections": ["string"],
  "nextAction": {
    "type": "none|callback|email",
    "scheduledFor": "ISO date",
    "notes": "string"
  },
  "metadata": {
    "campaignId": "string"
  },
  "createdAt": "ISO date"
}
```

#### 7. **Sales** (Ventas)
```json
{
  "id": "string",
  "subscriptionId": "string",
  "customerId": "string",
  "userId": "string (employeeId)",
  "storeId": "string",
  "type": "new|renewal|upgrade",
  "channel": "phone|store|online",
  "amount": {
    "gross": "number",
    "discount": "number",
    "net": "number",
    "tax": "number",
    "total": "number"
  },
  "commission": {
    "base": "number",
    "bonus": "number",
    "total": "number",
    "status": "pending|approved|paid"
  },
  "contract": {
    "signed": "boolean",
    "signedAt": "ISO date"
  },
  "paymentStatus": "pending|completed|failed",
  "callId": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 8. **Campaigns** (Campañas)
```json
{
  "id": "string",
  "name": "string",
  "type": "retention|seasonal|upgrade|winback",
  "status": "draft|active|paused|completed",
  "targeting": {
    "customerTiers": ["gold", "silver", "bronze"],
    "lastPurchaseRange": {
      "min": "number",
      "max": "number"
    },
    "hasSubscription": "boolean",
    "productTypes": ["string"]
  },
  "script": {
    "opening": "string",
    "valueProps": ["string"],
    "closing": "string",
    "objectionHandlers": {
      "key": "string"
    }
  },
  "offer": {
    "type": "percentage|fixed",
    "value": "number",
    "validUntil": "ISO date"
  },
  "metrics": {
    "totalCalls": "number",
    "contacted": "number",
    "converted": "number",
    "revenue": "number"
  },
  "assignedTo": ["employeeId"],
  "startDate": "ISO date",
  "endDate": "ISO date",
  "createdBy": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 9. **Achievements** (Logros)
```json
{
  "id": "string",
  "code": "string",
  "name": "string",
  "description": "string",
  "icon": "string",
  "category": "sales|calls|quality",
  "criteria": {
    "type": "count|percentage",
    "metric": "string",
    "target": "number",
    "timeframe": "day|week|month|all_time"
  },
  "rewards": {
    "points": "number",
    "bonus": "number",
    "badge": "boolean"
  },
  "tier": "bronze|silver|gold|platinum",
  "unlockedBy": [{
    "userId": "string",
    "unlockedAt": "ISO date"
  }],
  "createdAt": "ISO date"
}
```

#### 10. **Scripts** (Guiones de Llamadas)
```json
{
  "id": "string",
  "name": "string",
  "type": "cold|warm|renewal|winback",
  "version": "string",
  "status": "draft|active|archived",
  "segments": [{
    "id": "string",
    "type": "opening|pitch|discovery|closing",
    "content": "string",
    "conditions": {
      "customerTier": ["string"],
      "hasSubscription": "boolean",
      "lastPurchaseRange": {
        "min": "number",
        "max": "number"
      }
    },
    "branches": [{
      "condition": "string",
      "nextSegmentId": "string"
    }]
  }],
  "variables": ["string"],
  "successRate": "number",
  "usageCount": "number",
  "createdBy": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 11. **Commissions** (Comisiones)
```json
{
  "id": "string",
  "userId": "string (employeeId)",
  "period": {
    "month": "number",
    "year": "number",
    "startDate": "ISO date",
    "endDate": "ISO date"
  },
  "earnings": {
    "baseSales": "number",
    "bonuses": {
      "conversion": "number",
      "volume": "number",
      "retention": "number",
      "other": "number"
    },
    "deductions": "number",
    "total": "number"
  },
  "sales": {
    "count": "number",
    "revenue": "number",
    "saleIds": ["string"]
  },
  "status": "calculating|pending|approved|paid",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 12. **Shopify Settings** (Configuración de Shopify)
```json
{
  "id": "string",
  "storeName": "string",
  "shopifyDomain": "string",
  "apiKey": "string",
  "apiSecretKey": "string",
  "accessToken": "string",
  "webhookApiVersion": "string",
  "isActive": "boolean",
  "lastSync": "ISO date",
  "syncSettings": {
    "autoSyncProducts": "boolean",
    "autoSyncCustomers": "boolean",
    "autoSyncOrders": "boolean",
    "syncInterval": "number"
  },
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

#### 13. **Shopify Products** (Productos de Shopify)
```json
{
  "id": "string",
  "shopifyId": "string",
  "title": "string",
  "handle": "string",
  "description": "string (HTML)",
  "vendor": "string",
  "productType": "string",
  "status": "active|draft|archived",
  "tags": ["string"],
  "images": [{
    "id": "string",
    "src": "string",
    "alt": "string"
  }],
  "variants": [{
    "id": "string",
    "title": "string",
    "price": "string",
    "compareAtPrice": "string",
    "sku": "string",
    "inventoryQuantity": "number"
  }],
  "createdAt": "ISO date",
  "updatedAt": "ISO date",
  "publishedAt": "ISO date"
}
```

#### 14. **Shopify Customers** (Clientes de Shopify)
```json
{
  "id": "string",
  "shopifyId": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "totalSpent": "string",
  "ordersCount": "number",
  "state": "enabled|disabled",
  "tags": ["string"],
  "note": "string",
  "verifiedEmail": "boolean",
  "taxExempt": "boolean",
  "currency": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date",
  "lastOrderId": "string",
  "lastOrderName": "string",
  "addresses": [{
    "id": "string",
    "address1": "string",
    "address2": "string",
    "city": "string",
    "province": "string",
    "country": "string",
    "zip": "string",
    "phone": "string",
    "default": "boolean"
  }]
}
```

### 📍 Rutas Personalizadas
```json
{
  "/api/*": "/$1",
  "/customers/:id/subscriptions": "/subscriptions?customerId=:id",
  "/customers/:id/evaluations": "/evaluations?customerId=:id",
  "/customers/:id/calls": "/calls?customerId=:id",
  "/customers/:id/sales": "/sales?customerId=:id",
  "/employees/:id/calls": "/calls?userId=:id",
  "/employees/:id/sales": "/sales?userId=:id",
  "/employees/:id/commissions": "/commissions?userId=:id",
  "/stores/:id/employees": "/employees?storeId=:id",
  "/stores/:id/sales": "/sales?storeId=:id",
  "/campaigns/:id/calls": "/calls?metadata.campaignId=:id"
}
```

## 🛠️ Plan de Implementación

### Fase 1: Actualizar el Backend Básico ✅
1. **Actualizar `db.json`** con todas las entidades nuevas
2. **Configurar `routes.json`** para las rutas personalizadas
3. **Actualizar `server.js`** para incluir lógica adicional

### Fase 2: Implementar Integraciones 🔄
1. **Shopify API Proxy**
   - Test de conexión
   - Obtener productos
   - Obtener clientes
   - Crear reglas de precio
   - Crear códigos de descuento

2. **Stripe Integration**
   - Configuración
   - Payment Links
   - Webhooks
   - Estadísticas

3. **Webhooks**
   - Trade-in evaluation
   - Shopify events
   - Stripe events

### Fase 3: Lógica de Negocio 📊
1. **Pausar/Reanudar suscripciones**
2. **Sincronización con Stripe**
3. **Cálculo de comisiones**
4. **Evaluación de colchones con IA (simulado)**

## 📝 Archivos a Crear/Actualizar

### 1. `backend/db.json`
Reemplazar contenido actual con estructura completa de entidades.

### 2. `backend/routes.json`
Agregar rutas personalizadas para relaciones entre entidades.

### 3. `backend/server.js`
Actualizar para incluir:
- Integración con Shopify
- Integración con Stripe
- Endpoints de webhooks
- Lógica de negocio específica

### 4. `backend/config.js`
```javascript
module.exports = {
  port: process.env.PORT || 3001,
  host: process.env.HOST || '0.0.0.0',
  cors: {
    origin: [
      'https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host',
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    credentials: true
  }
};
```

### 5. `backend/package.json`
Agregar dependencias:
```json
{
  "dependencies": {
    "json-server": "^0.17.4",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "stripe": "^14.0.0"
  }
}
```

## 🚀 Pasos de Migración

### Paso 1: Backup
```bash
cp backend/db.json backend/db.backup.json
```

### Paso 2: Actualizar Estructura
1. Copiar el contenido de `data/db.json` del backend de referencia
2. Adaptarlo al contexto de Sleep Plus
3. Mantener las entidades actuales si son necesarias

### Paso 3: Actualizar Server
1. Copiar la lógica del servidor de referencia
2. Adaptar las URLs y configuraciones
3. Remover o modificar funcionalidades específicas de colchones si no aplican

### Paso 4: Testing
```bash
# Probar localmente
cd backend
npm install
npm start

# Endpoints de prueba
curl http://localhost:3001/health
curl http://localhost:3001/api/customers
curl http://localhost:3001/api/subscriptions
```

### Paso 5: Deploy
```bash
git add .
git commit -m "feat: Migrate to complete Sleep Plus Admin backend model"
git push origin main
```

## ⚠️ Consideraciones Importantes

1. **Datos Sensibles**: Las API keys de Shopify y Stripe deben manejarse con variables de entorno
2. **Adaptación**: Modificar entidades según el contexto real de Sleep Plus (no es una tienda de colchones)
3. **Simplificación**: Algunas funcionalidades pueden no ser necesarias inicialmente
4. **Seguridad**: Implementar autenticación antes de producción

## 📊 Mapeo de Entidades Sleep Plus

Si Sleep Plus es para seguimiento de sueño, considerar adaptar:
- `customers` → `users` (usuarios de la app)
- `evaluations` → `sleep-assessments` (evaluaciones de calidad de sueño)
- `subscriptions` → mantener para planes premium
- `stores` → `clinics` o remover si no aplica
- `products` → `sleep-products` (dispositivos, apps, etc.)

## 🎯 Resultado Esperado

Un backend completo con:
- ✅ Modelo de datos robusto
- ✅ Integraciones con servicios externos
- ✅ Webhooks para eventos en tiempo real
- ✅ Lógica de negocio implementada
- ✅ API RESTful completa
- ✅ Preparado para escalar

---

**Nota**: Esta guía proporciona la estructura completa del backend de referencia. La implementación debe adaptarse según las necesidades específicas de Sleep Plus y su modelo de negocio real.

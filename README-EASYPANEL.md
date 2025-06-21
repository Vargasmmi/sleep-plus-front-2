# Sleep+ Admin - EasyPanel Integration

Este documento describe cómo integrar y desplegar Sleep+ Admin en EasyPanel.

## 📋 Archivos de Integración

### 1. `easypanel-integration.js`
Cliente JavaScript para interactuar con la API de EasyPanel. Incluye métodos para:
- Autenticación
- Gestión de proyectos
- Creación de servicios (apps, bases de datos)
- Despliegue de servicios
- Monitoreo

### 2. `deploy-to-easypanel.js`
Script automatizado para desplegar Sleep+ Admin en EasyPanel. Ejecutar con:
```bash
node deploy-to-easypanel.js
```

### 3. `easypanel.dockerfile`
Dockerfile optimizado para construir y ejecutar tanto el frontend como el backend en un solo contenedor.

### 4. `easypanel-schema.json`
Esquema de configuración para importar el proyecto directamente en EasyPanel.

## 🚀 Despliegue Rápido

### Opción 1: Script Automatizado
```bash
# Instalar dependencias
npm install

# Ejecutar el script de despliegue
node deploy-to-easypanel.js
```

### Opción 2: Manual via EasyPanel UI
1. Acceder a EasyPanel: http://168.231.92.67:3000
2. Crear un nuevo proyecto: "sleep-plus-admin"
3. Importar el archivo `easypanel-schema.json`
4. Configurar las variables de entorno necesarias
5. Desplegar los servicios

### Opción 3: Docker
```bash
# Construir la imagen
docker build -f easypanel.dockerfile -t sleep-plus-admin .

# Subir a un registro (opcional)
docker tag sleep-plus-admin your-registry/sleep-plus-admin
docker push your-registry/sleep-plus-admin
```

## 🔧 Configuración

### Variables de Entorno - Backend
- `NODE_ENV`: production
- `PORT`: 3001
- `DATABASE_HOST`: database
- `DATABASE_NAME`: sleepplus
- `DATABASE_USER`: sleepplus
- `DATABASE_PASSWORD`: [generado automáticamente]

### Variables de Entorno - Frontend
- `NODE_ENV`: production
- `VITE_API_URL`: https://api.sleep-plus.yourdomain.com
- `VITE_APP_NAME`: Sleep+ Admin

## 📡 Endpoints

### Desarrollo Local
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### EasyPanel (ejemplo con nip.io)
- Frontend: http://sleep-plus.168.231.92.67.nip.io
- Backend: http://api-sleep-plus.168.231.92.67.nip.io
- Panel de Control: http://168.231.92.67:3000

## 🔐 Credenciales EasyPanel

- **URL**: http://168.231.92.67:3000
- **Token API**: c86df06feae92526658731f8fefb0c208bc00ff1d7538c6461a23fe0b9657a58

## 📚 API de EasyPanel

### Autenticación
```javascript
const response = await fetch('http://168.231.92.67:3000/api/trpc/auth.login', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    json: {
      email: 'your-email@example.com',
      password: 'your-password'
    }
  })
});
```

### Crear Proyecto
```javascript
const response = await fetch('http://168.231.92.67:3000/api/trpc/projects.createProject', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    json: {
      name: 'sleep-plus-admin'
    }
  })
});
```

### Listar Proyectos
```javascript
const response = await fetch('http://168.231.92.67:3000/api/trpc/projects.listProjects', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});
```

## 🛠️ Solución de Problemas

### Error: Project already exists
- El proyecto ya existe en EasyPanel
- Solución: Usar un nombre diferente o eliminar el proyecto existente

### Error: Port already in use
- Los puertos 3001 o 5173 ya están en uso
- Solución: Cambiar los puertos en la configuración

### Error: Database connection failed
- La base de datos no está accesible
- Solución: Verificar que el servicio de base de datos esté corriendo

## 📦 Estructura del Proyecto en EasyPanel

```
sleep-plus-admin/
├── database (MySQL 8)
├── backend (Node.js API)
└── frontend (Vite + React)
```

## 🔄 Actualizaciones

Para actualizar el proyecto en EasyPanel:

1. **Via Git (recomendado)**:
   - Configurar el repositorio Git en cada servicio
   - Hacer push de los cambios
   - EasyPanel detectará y desplegará automáticamente

2. **Via Docker**:
   - Construir nueva imagen
   - Actualizar la imagen en EasyPanel
   - Redesplegar el servicio

3. **Via API**:
   ```bash
   node deploy-to-easypanel.js --force-rebuild
   ```

## 📞 Soporte

Para soporte con EasyPanel:
- Documentación: https://easypanel.io/docs
- API Reference: Ver archivo `easypanel_openapi.json`
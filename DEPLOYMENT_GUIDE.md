# 🚀 Guía de Despliegue en EasyPanel - Sleep+ Admin

## 📋 Resumen de Opciones

### Opción 1: Un Solo Repositorio (Recomendado) ✅
```
sleep-plus-admin/
├── backend/
│   ├── server/
│   ├── data/
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

### Opción 2: Repositorios Separados
- `sleep-plus-admin-backend` (repo separado)
- `sleep-plus-admin-frontend` (repo separado)

---

## 🛠️ Preparación del Proyecto

### 1. Ejecutar el Script de Separación

```bash
# En Windows (Git Bash)
./separate-project.sh

# O en Windows (CMD)
bash separate-project.sh
```

Este script:
- ✅ Separa backend y frontend en carpetas
- ✅ Configura package.json para cada parte
- ✅ Ajusta las rutas y configuraciones
- ✅ Crea archivos .env de ejemplo

### 2. Verificar la Separación

```bash
# Probar localmente
cd backend
npm install
npm run dev

# En otra terminal
cd frontend
npm install
npm run dev
```

---

## 📦 Opción 1: Un Solo Repositorio (Recomendado)

### Paso 1: Preparar para Git

```bash
# En la raíz del proyecto
git init
git add .
git commit -m "Initial commit - Sleep+ Admin ready for EasyPanel"
```

### Paso 2: Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com/new)
2. Crea un nuevo repositorio: `sleep-plus-admin`
3. **NO** inicialices con README

### Paso 3: Subir a GitHub

```bash
git remote add origin https://github.com/TU_USUARIO/sleep-plus-admin.git
git branch -M main
git push -u origin main
```

### Paso 4: Configurar en EasyPanel

#### 4.1 Crear App Backend

1. En EasyPanel, crear nueva app: `sleep-admin-api`
2. Configurar:
   ```yaml
   Source:
     - Repository: github.com/TU_USUARIO/sleep-plus-admin
     - Branch: main
     - Build Path: /backend
   
   Build:
     - Dockerfile Path: ./Dockerfile
   
   Deploy:
     - Port: 3001
   
   Environment Variables:
     NODE_ENV: production
     PORT: 3001
     CORS_ORIGIN: https://sleep-admin.easypanel.host
   
   Volumes:
     - Mount Path: /app/data
     - Size: 1GB
   ```

#### 4.2 Crear App Frontend

1. Crear nueva app: `sleep-admin`
2. Configurar:
   ```yaml
   Source:
     - Repository: github.com/TU_USUARIO/sleep-plus-admin
     - Branch: main
     - Build Path: /frontend
   
   Build:
     - Dockerfile Path: ./Dockerfile
     - Build Args:
       VITE_API_URL: https://sleep-admin-api.easypanel.host
   
   Deploy:
     - Port: 80
   ```

---

## 📦 Opción 2: Repositorios Separados

### Backend

```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/TU_USUARIO/sleep-admin-backend.git
git push -u origin main
```

### Frontend

```bash
cd frontend
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin https://github.com/TU_USUARIO/sleep-admin-frontend.git
git push -u origin main
```

---

## 🔧 Configuración de Variables de Entorno

### Backend (.env)
```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://sleep-admin.easypanel.host

# Base de datos
DB_PATH=./data/db.json

# Stripe (opcional)
STRIPE_SECRET_KEY=sk_live_...
```

### Frontend (Build Args en EasyPanel)
```env
VITE_API_URL=https://sleep-admin-api.easypanel.host
```

---

## 📊 Estructura de URLs en EasyPanel

### Producción:
- Frontend: `https://sleep-admin.easypanel.host`
- Backend API: `https://sleep-admin-api.easypanel.host`

### Desarrollo Local:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

---

## 🐳 Prueba con Docker (Opcional)

```bash
# Construir y ejecutar localmente
docker-compose -f docker-compose.local.yml up --build

# Acceder a:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:3001
```

---

## ✅ Checklist de Despliegue

- [ ] Proyecto separado con `./separate-project.sh`
- [ ] Dockerfiles creados en backend/ y frontend/
- [ ] Repositorio(s) creado(s) en GitHub
- [ ] Código subido a GitHub
- [ ] Apps creadas en EasyPanel
- [ ] Variables de entorno configuradas
- [ ] Build exitoso en EasyPanel
- [ ] Volumen configurado para backend/data
- [ ] CORS configurado correctamente
- [ ] Aplicación funcionando en producción

---

## 🚨 Solución de Problemas

### Error de CORS
```javascript
// Verificar en backend/server/config.js
cors: {
  origin: process.env.CORS_ORIGIN || 'https://sleep-admin.easypanel.host'
}
```

### Error de conexión API
```javascript
// Verificar en frontend que VITE_API_URL está configurado
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### Base de datos no persiste
- Verificar que el volumen está montado en `/app/data`
- Verificar permisos del directorio

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs en EasyPanel
2. Verifica las variables de entorno
3. Asegúrate de que los puertos son correctos
4. Revisa la configuración de CORS

---

## 🎯 Usuarios de Prueba

```
Admin:
- Email: admin@lamattressstore.com
- Password: admin123

Manager:
- Email: john.smith@lamattressstore.com
- Password: demo123

Agent:
- Email: demo@lamattressstore.com
- Password: demo123
```

#!/bin/bash

# Script de separación automatizada para Sleep+ Admin
# Compatible con Windows (Git Bash) y Linux/Mac

set -e

echo "🚀 Iniciando separación de Sleep+ Admin..."

# Colores para output (compatibles con Git Bash)
RED=$'\033[0;31m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[1;33m'
NC=$'\033[0m' # No Color

# Detectar sistema operativo
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    echo "Sistema detectado: Windows"
    IS_WINDOWS=true
else
    echo "Sistema detectado: Unix/Linux/Mac"
    IS_WINDOWS=false
fi

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ] || [ ! -d "server" ] || [ ! -d "src" ]; then
    echo -e "${RED}Error: Este script debe ejecutarse desde la raíz del proyecto Sleep+ Admin${NC}"
    exit 1
fi

# Crear directorios principales
echo -e "${YELLOW}📁 Creando estructura de directorios...${NC}"
mkdir -p backend/server
mkdir -p backend/data
mkdir -p frontend/src
mkdir -p frontend/public

# ===== BACKEND =====
echo -e "${YELLOW}🔧 Configurando Backend...${NC}"

# Copiar archivos del servidor
cp -r server/* backend/server/

# Copiar y renombrar db.json
if [ -f "db.json" ]; then
    cp db.json backend/data/
else
    echo "⚠️  db.json no encontrado, copiando initial-data.json como db.json"
    cp initial-data.json backend/data/db.json
fi

# Copiar routes.json si existe
if [ -f "routes.json" ]; then
    cp routes.json backend/
fi

# Actualizar server-simple.js para la nueva estructura
cat > backend/server/server-simple.js << 'EOF'
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config');

const server = jsonServer.create();

// Asegurar que el archivo db.json existe
const dbPath = path.join(__dirname, '..', 'data', 'db.json');
if (!fs.existsSync(dbPath)) {
  console.log('📝 Creando archivo db.json inicial...');
  const initialData = {
    employees: [],
    customers: [],
    subscriptions: [],
    evaluations: [],
    stores: [],
    calls: [],
    sales: [],
    campaigns: [],
    achievements: [],
    scripts: [],
    commissions: [],
    shopifySettings: [],
    shopifyProducts: [],
    shopifyCustomers: [],
    shopifyCoupons: [],
    activityLogs: [],
    webhooks: [],
    webhookEvents: [],
    permissions: [],
    userPermissionOverrides: [],
    dailyGoals: [],
    dailyProgress: [],
    paymentLinks: [],
    stripeConfig: [],
    stripeSubscriptions: [],
    stripeWebhooks: []
  };
  
  // Crear directorio si no existe
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Configurar CORS
server.use(cors(config.cors));

// Middleware de logging
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Usar middlewares por defecto de JSON Server
server.use(middlewares);

// Agregar middleware para manejar PATCH como PUT
server.use((req, res, next) => {
  if (req.method === 'PATCH') {
    console.log(`🔄 Converting PATCH to PUT for: ${req.originalUrl}`);
    req.method = 'PUT';
  }
  next();
});

// Usar el router de JSON Server
server.use(router);

// Endpoint de salud
server.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.environment,
    dbPath: dbPath
  });
});

// Iniciar servidor
const PORT = config.port;
server.listen(PORT, config.host, () => {
  console.log(`🚀 JSON Server running on http://${config.host}:${PORT}`);
  console.log(`📊 Environment: ${config.environment}`);
  console.log(`🌐 CORS Origins: ${JSON.stringify(config.cors.origin)}`);
  console.log(`📝 Database: ${dbPath}`);
  console.log(`✅ Server ready to handle requests`);
});
EOF

# Actualizar config.js para asegurar CORS correcto
cat > backend/server/config.js << 'EOF'
// server/config.js
const config = {
  // Puerto del servidor
  port: process.env.PORT || 3001,
  
  // Host del servidor
  host: process.env.HOST || '0.0.0.0',
  
  // Configuración de CORS
  cors: {
    origin: function(origin, callback) {
      const allowedOrigins = process.env.CORS_ORIGIN 
        ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
        : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'];
      
      // Permitir requests sin origin (ej: Postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn(`CORS bloqueado para origen: ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Shopify-Access-Token'],
    exposedHeaders: ['Content-Length', 'X-Request-Id']
  },
  
  // Configuración de la base de datos
  database: {
    path: process.env.DB_PATH || './data/db.json'
  },
  
  // Configuración del entorno
  environment: process.env.NODE_ENV || 'development'
};

module.exports = config;
EOF

# Crear package.json para backend
cat > backend/package.json << 'EOF'
{
  "name": "sleep-plus-admin-backend",
  "version": "1.0.0",
  "description": "Backend API para Sleep+ Admin",
  "main": "server/server-simple.js",
  "scripts": {
    "start": "node server/server-simple.js",
    "dev": "node server/server-simple.js",
    "start:prod": "NODE_ENV=production node server/server-simple.js"
  },
  "dependencies": {
    "json-server": "^0.17.4",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "stripe": "^14.17.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Crear .env.example para backend
cat > backend/.env.example << 'EOF'
# Server Configuration
PORT=3001
HOST=0.0.0.0
NODE_ENV=development

# CORS Configuration (separar por comas si hay múltiples orígenes)
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173

# Database
DB_PATH=./data/db.json

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
EOF

# Copiar .env.example como .env para desarrollo local
cp backend/.env.example backend/.env

# ===== FRONTEND =====
echo -e "${YELLOW}🎨 Configurando Frontend...${NC}"

# Copiar archivos del frontend
cp -r src/* frontend/src/
cp -r public/* frontend/public/
cp index.html frontend/
cp vite.config.ts frontend/
cp tsconfig.json frontend/
cp tsconfig.node.json frontend/

# Copiar .eslintrc.json si existe
if [ -f ".eslintrc.json" ]; then
    cp .eslintrc.json frontend/
fi

# Actualizar el dataProvider para asegurar compatibilidad
cat > frontend/src/providers/dataProvider.ts << 'EOF'
import { DataProvider } from "@refinedev/core";
import axios from "axios";
import { activityLogService } from "../services/activityLogService";
import { ACTIVITY_RESOURCES } from "../interfaces/activityLog";

// Función para obtener la URL base de la API
const getApiUrl = () => {
  // Usar variable de entorno o localhost por defecto
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
  console.log('🔧 API URL configurada:', apiUrl);
  return apiUrl;
};

const API_URL = getApiUrl();

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response for ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ API Error for ${error.config?.url}:`, error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

// Helper function to get resource name for activity logging
const getActivityResource = (resource: string): string => {
  const resourceMap: { [key: string]: string } = {
    customers: ACTIVITY_RESOURCES.CUSTOMERS,
    subscriptions: ACTIVITY_RESOURCES.SUBSCRIPTIONS,
    evaluations: ACTIVITY_RESOURCES.EVALUATIONS,
    employees: ACTIVITY_RESOURCES.EMPLOYEES,
    stores: ACTIVITY_RESOURCES.STORES,
    calls: ACTIVITY_RESOURCES.CALLS,
    sales: ACTIVITY_RESOURCES.SALES,
    campaigns: ACTIVITY_RESOURCES.CAMPAIGNS,
    commissions: ACTIVITY_RESOURCES.COMMISSIONS,
    achievements: ACTIVITY_RESOURCES.ACHIEVEMENTS,
    scripts: ACTIVITY_RESOURCES.SCRIPTS,
    shopifySettings: ACTIVITY_RESOURCES.SHOPIFY_SETTINGS,
    shopifyProducts: ACTIVITY_RESOURCES.SHOPIFY_PRODUCTS,
    shopifyCustomers: ACTIVITY_RESOURCES.SHOPIFY_CUSTOMERS,
    shopifyCoupons: ACTIVITY_RESOURCES.SHOPIFY_COUPONS,
  };
  
  return resourceMap[resource] || resource;
};

export const customDataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters }) => {
    console.log(`📋 Getting list for resource: ${resource}`);
    
    try {
      const response = await axiosInstance.get(`/${resource}`);
      
      // json-server returns array directly
      const data = Array.isArray(response.data) ? response.data : [];
      
      // Log view activity for important resources
      if (['customers', 'employees', 'sales'].includes(resource)) {
        activityLogService.logView(getActivityResource(resource), 'list', {
          count: data.length,
          filters,
        });
      }
      
      return {
        data: data,
        total: data.length,
      };
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);
      throw error;
    }
  },

  getOne: async ({ resource, id }) => {
    const response = await axiosInstance.get(`/${resource}/${id}`);
    
    // Log view activity
    activityLogService.logView(getActivityResource(resource), id, {
      timestamp: new Date().toISOString(),
    });
    
    return {
      data: response.data,
    };
  },

  create: async ({ resource, variables }) => {
    const response = await axiosInstance.post(`/${resource}`, variables);
    
    // Log create activity
    activityLogService.logCreate(getActivityResource(resource), response.data.id, {
      data: variables,
    });
    
    return {
      data: response.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    // Get current data for comparison
    let previousData = null;
    try {
      const currentResponse = await axiosInstance.get(`/${resource}/${id}`);
      previousData = currentResponse.data;
    } catch (error) {
      console.warn('Could not fetch previous data for comparison');
    }
    
    // json-server prefers PUT for updates with full data
    let response;
    
    // For permissions and systemSettings, we need to send the full object
    if (['permissions', 'systemSettings'].includes(resource) && previousData) {
      response = await axiosInstance.put(`/${resource}/${id}`, {
        ...previousData,
        ...variables,
        updatedAt: new Date().toISOString()
      });
    } else {
      // For other resources, use PUT instead of PATCH for better JSON Server compatibility
      const updateData = previousData ? { ...previousData, ...variables } : variables;
      response = await axiosInstance.put(`/${resource}/${id}`, updateData);
    }
    
    // Log update activity
    activityLogService.logUpdate(
      getActivityResource(resource),
      id,
      variables,
      previousData
    );
    
    return {
      data: response.data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    // Get data before deletion for logging
    let deletedData = null;
    try {
      const response = await axiosInstance.get(`/${resource}/${id}`);
      deletedData = response.data;
    } catch (error) {
      console.warn('Could not fetch data before deletion');
    }
    
    const response = await axiosInstance.delete(`/${resource}/${id}`);
    
    // Log delete activity
    activityLogService.logDelete(getActivityResource(resource), id, {
      deletedData,
      timestamp: new Date().toISOString(),
    });
    
    return {
      data: response.data,
    };
  },

  getMany: async ({ resource, ids }) => {
    console.log(`Getting many for resource: ${resource}, ids:`, ids);
    
    const responses = await Promise.allSettled(
      ids.map(async (id) => {
        try {
          const response = await axiosInstance.get(`/${resource}/${id}`);
          return response.data;
        } catch (error) {
          console.warn(`Failed to fetch ${resource}/${id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out failed requests and extract successful data
    const data = responses
      .filter((response): response is PromiseFulfilledResult<any> => 
        response.status === 'fulfilled' && response.value !== null
      )
      .map(response => response.value);
    
    return {
      data,
    };
  },

  createMany: async ({ resource, variables }) => {
    const response = await Promise.all(
      variables.map((item) => axiosInstance.post(`/${resource}`, item))
    );
    
    // Log bulk create activity
    activityLogService.logCreate(getActivityResource(resource), 'bulk', {
      count: variables.length,
      ids: response.map((res) => res.data.id),
    });
    
    return {
      data: response.map((res) => res.data),
    };
  },

  deleteMany: async ({ resource, ids }) => {
    const response = await Promise.all(
      ids.map((id) => axiosInstance.delete(`/${resource}/${id}`))
    );
    
    // Log bulk delete activity
    activityLogService.logDelete(getActivityResource(resource), 'bulk', {
      count: ids.length,
      ids,
    });
    
    return {
      data: response.map((res) => res.data),
    };
  },

  updateMany: async ({ resource, ids, variables }) => {
    const response = await Promise.all(
      ids.map((id) => axiosInstance.put(`/${resource}/${id}`, variables))
    );
    
    // Log bulk update activity
    activityLogService.logUpdate(getActivityResource(resource), 'bulk', variables, {
      count: ids.length,
      ids,
    });
    
    return {
      data: response.map((res) => res.data),
    };
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    let requestUrl = `${url}`;

    if (query) {
      const queryString = new URLSearchParams(query).toString();
      requestUrl = `${requestUrl}?${queryString}`;
    }

    const response = await axiosInstance({
      url: requestUrl,
      method,
      data: payload,
      headers,
    });

    return {
      data: response.data,
    };
  },

  getApiUrl: () => API_URL,
};
EOF

# Crear package.json para frontend
cat > frontend/package.json << 'EOF'
{
  "name": "sleep-plus-admin-frontend",
  "version": "1.0.0",
  "description": "Frontend para Sleep+ Admin",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:prod": "vite build --mode production",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@ant-design/charts": "^2.0.3",
    "@ant-design/icons": "^5.3.7",
    "@ant-design/pro-layout": "^7.19.12",
    "@refinedev/antd": "^5.43.0",
    "@refinedev/core": "^4.54.0",
    "@refinedev/devtools": "^1.2.7",
    "@refinedev/kbar": "^1.3.12",
    "@refinedev/react-hook-form": "^4.9.0",
    "@refinedev/react-router-v6": "^4.6.0",
    "@refinedev/simple-rest": "^5.0.8",
    "@stripe/react-stripe-js": "^2.4.0",
    "@stripe/stripe-js": "^2.4.0",
    "antd": "^5.20.6",
    "axios": "^1.7.7",
    "dayjs": "^1.11.13",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-phone-input-2": "^2.15.1",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "uuid": "^10.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.16.5",
    "@types/react": "^18.3.8",
    "@types/react-dom": "^18.3.0",
    "@types/uuid": "^10.0.0",
    "@typescript-eslint/eslint-plugin": "^7.16.0",
    "@typescript-eslint/parser": "^7.16.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.37.1",
    "typescript": "^5.6.2",
    "vite": "^5.4.8"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Crear .env para desarrollo local en frontend
cat > frontend/.env << 'EOF'
# API Configuration
VITE_API_URL=http://localhost:3001

# App Configuration
VITE_APP_NAME=Sleep+ Admin
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_DEVTOOLS=true
EOF

# Crear .env.example para frontend
cp frontend/.env frontend/.env.example

# Actualizar vite.config.ts para eliminar el proxy (ya no es necesario)
cat > frontend/vite.config.ts << 'EOF'
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true, // Permitir acceso desde la red local
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    define: {
      'process.env': {},
      'global': {},
    },
    optimizeDeps: {
      exclude: ['shopify-api-node'],
      include: ['react', 'react-dom', 'antd', '@ant-design/icons']
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              if (id.includes('antd') || id.includes('@ant-design')) {
                return 'antd-vendor';
              }
              if (id.includes('@refinedev')) {
                return 'refine-vendor';
              }
              if (id.includes('recharts') || id.includes('d3')) {
                return 'charts-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
EOF

# Crear scripts de inicio para Windows y Unix

# Script para Windows (CMD)
cat > start-dev.cmd << 'EOF'
@echo off
echo 🚀 Iniciando Sleep+ Admin en modo desarrollo...
echo.

echo 🔧 Iniciando backend...
cd backend
start cmd /k "npm install && npm run dev"

timeout /t 5 /nobreak > nul

echo 🎨 Iniciando frontend...
cd ../frontend
start cmd /k "npm install && npm run dev"

echo.
echo ✅ Aplicación iniciada!
echo    Backend: http://localhost:3001
echo    Frontend: http://localhost:5173
echo.
echo Cierra las ventanas de CMD para detener los servidores.
pause
EOF

# Script para Unix/Mac/Git Bash
cat > start-dev.sh << 'EOF'
#!/bin/bash

echo "🚀 Iniciando Sleep+ Admin en modo desarrollo..."

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "⏹️  Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

# Iniciar backend
echo "🔧 Iniciando backend..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Esperar a que el backend esté listo
echo "⏳ Esperando a que el backend esté listo..."
sleep 5

# Verificar que el backend está funcionando
if ! curl -s http://localhost:3001/health > /dev/null; then
    echo "❌ Error: El backend no se inició correctamente"
    exit 1
fi

echo "✅ Backend iniciado correctamente"

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Aplicación iniciada!"
echo "   Backend: http://localhost:3001"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Presiona Ctrl+C para detener..."

# Esperar
wait
EOF

# Hacer ejecutable el script de Unix
chmod +x start-dev.sh

# Crear script de prueba
cat > test-local.sh << 'EOF'
#!/bin/bash

echo "🧪 Probando la instalación local..."
echo ""

# Colores
GREEN=$'\033[0;32m'
RED=$'\033[0;31m'
NC=$'\033[0m'

# Verificar backend
echo "Probando Backend..."
if curl -s http://localhost:3001/health | grep -q "OK"; then
    echo "${GREEN}✅ Backend funcionando correctamente${NC}"
    echo "   Health endpoint respondiendo"
    
    # Probar algunos endpoints
    if curl -s http://localhost:3001/employees > /dev/null; then
        echo "   ✅ Endpoint /employees accesible"
    else
        echo "   ❌ Error accediendo a /employees"
    fi
else
    echo "${RED}❌ Backend no responde${NC}"
    echo "   Verifica que el backend esté ejecutándose en el puerto 3001"
fi

echo ""

# Verificar frontend
echo "Probando Frontend..."
if curl -s http://localhost:5173 | grep -q "<title>"; then
    echo "${GREEN}✅ Frontend funcionando correctamente${NC}"
    echo "   Servidor de desarrollo Vite respondiendo"
else
    echo "${RED}❌ Frontend no responde${NC}"
    echo "   Verifica que el frontend esté ejecutándose en el puerto 5173"
fi

echo ""
echo "📝 Prueba completada"
EOF

chmod +x test-local.sh

# Crear .gitignore para cada proyecto
cat > backend/.gitignore << 'EOF'
node_modules/
.env
.env.local
data/db.json
*.log
.DS_Store
EOF

cat > frontend/.gitignore << 'EOF'
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
EOF

# Resumen final
echo ""
echo -e "${GREEN}✅ Separación completada exitosamente!${NC}"
echo ""
echo "📁 Estructura creada:"
echo "   backend/     - API del servidor (Puerto 3001)"
echo "   frontend/    - Aplicación React (Puerto 5173)"
echo ""
echo "🚀 Para iniciar en desarrollo local:"
echo ""
if [ "$IS_WINDOWS" = true ]; then
    echo "   Opción 1 (Windows CMD):"
    echo "   ${YELLOW}start-dev.cmd${NC}"
    echo ""
    echo "   Opción 2 (Git Bash):"
    echo "   ${YELLOW}./start-dev.sh${NC}"
else
    echo "   ${YELLOW}./start-dev.sh${NC}"
fi
echo ""
echo "🧪 Para probar que todo funciona:"
echo "   1. Inicia los servidores con uno de los comandos anteriores"
echo "   2. En otra terminal ejecuta: ${YELLOW}./test-local.sh${NC}"
echo ""
echo "📝 Configuración:"
echo "   - Backend .env está en: backend/.env"
echo "   - Frontend .env está en: frontend/.env"
echo "   - La base de datos está en: backend/data/db.json"
echo ""
echo -e "${YELLOW}⚠️  Importante para desarrollo local:${NC}"
echo "   - El backend corre en http://localhost:3001"
echo "   - El frontend corre en http://localhost:5173"
echo "   - CORS está configurado para permitir localhost"
echo "   - Los datos iniciales están en backend/data/db.json"

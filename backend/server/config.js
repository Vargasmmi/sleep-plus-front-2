// backend/server/config.js
// Configuración del servidor para diferentes entornos

const config = {
  // Puerto del servidor
  port: process.env.PORT || 3001,
  
  // Host del servidor
  host: process.env.HOST || '0.0.0.0',
  
  // Configuración de CORS
  cors: {
    origin: process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',')
      : ['http://localhost:5173', 'http://localhost:3001', 'http://127.0.0.1:5173', 'http://127.0.0.1:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Shopify-Access-Token'],
    exposedHeaders: ['Content-Length', 'X-Request-Id']
  },
  
  // Configuración de la base de datos - ACTUALIZADO para la nueva estructura
  database: {
    path: process.env.DB_PATH || './data/db.json'
  },
  
  // Configuración de Shopify
  shopify: {
    apiVersion: process.env.SHOPIFY_API_VERSION || '2024-01'
  },
  
  // Configuración de Stripe
  stripe: {
    // Las claves se obtendrán de la base de datos o variables de entorno
  },
  
  // Configuración del entorno
  environment: process.env.NODE_ENV || 'development',
  
  // URLs base para diferentes servicios
  urls: {
    frontend: process.env.FRONTEND_URL || 'http://localhost:5173',
    api: process.env.API_URL || `http://127.0.0.1:${process.env.PORT || 3001}`
  }
};

module.exports = config;

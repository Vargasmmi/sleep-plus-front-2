module.exports = {
  port: process.env.PORT || 3001,
  host: process.env.HOST || '0.0.0.0',
  cors: {
    origin: [
      'https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host',
      'https://sleep-plus-front-2-backend.dqyvuv.easypanel.host',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://168.231.92.67:8080',
      'http://168.231.92.67:3001'
    ],
    credentials: true
  },
  // Configuración de integraciones (usar variables de entorno en producción)
  integrations: {
    stripe: {
      enabled: false, // Cambiar a true cuando se configure
      publicKey: process.env.STRIPE_PUBLIC_KEY || '',
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
    },
    // Sleep Plus no necesita Shopify, pero podría integrarse con:
    healthKit: {
      enabled: false
    },
    googleFit: {
      enabled: false
    },
    fitbit: {
      enabled: false
    }
  },
  // Configuración de features
  features: {
    subscriptions: true,
    coaching: true,
    achievements: true,
    notifications: true,
    analytics: true,
    export: true
  }
};

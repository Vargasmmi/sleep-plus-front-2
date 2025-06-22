const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

console.log('🚀 Starting Sleep Plus Backend...');
console.log(`📍 Server will run on: http://${HOST}:${PORT}`);

// Middleware
const corsOptions = {
  origin: [
    'https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host',
    'https://sleep-plus-front-2-backend.dqyvuv.easypanel.host',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://168.231.92.67:8080',
    'http://168.231.92.67:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

app.use(cors(corsOptions));

// Log all requests
app.use((req, res, next) => {
  console.log(`📞 ${req.method} ${req.path} - Origin: ${req.get('Origin') || 'No origin'}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    server: 'Sleep Plus Backend',
    version: '1.0.0'
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Sleep Plus API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      customers: '/api/customers',
      subscriptions: '/api/subscriptions',
      evaluations: '/api/evaluations',
      employees: '/api/employees',
      stores: '/api/stores',
      calls: '/api/calls',
      sales: '/api/sales',
      campaigns: '/api/campaigns',
      commissions: '/api/commissions',
      achievements: '/api/achievements',
      scripts: '/api/scripts',
      shopifySettings: '/api/shopifySettings',
      shopifyProducts: '/api/shopifyProducts',
      shopifyCustomers: '/api/shopifyCustomers'
    }
  });
});

// Create json-server router
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  logger: true
});

// Use json-server middlewares
app.use(middlewares);

// Custom middleware to log data operations
router.render = (req, res) => {
  const method = req.method;
  const url = req.url;
  console.log(`✅ ${method} ${url} - Response sent`);
  res.jsonp(res.locals.data);
};

// Add custom routes before json-server router
app.use('/api', router);

// Catch all for unmatched routes
app.get('*', (req, res) => {
  console.log(`❓ Unmatched route: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Route not found',
    availableEndpoints: [
      '/health',
      '/api',
      '/api/customers',
      '/api/employees',
      '/api/subscriptions'
    ]
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`✅ Sleep Plus Backend running on http://${HOST}:${PORT}`);
  console.log(`🏥 Health check: http://${HOST}:${PORT}/health`);
  console.log(`📋 API endpoints: http://${HOST}:${PORT}/api`);
  console.log('🔧 CORS enabled for:', corsOptions.origin);
});

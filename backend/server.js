const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(cors({
  origin: [
    'https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://168.231.92.67:8080'
  ],
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Sleep Plus API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users',
      sleepRecords: '/api/sleep-records',
      sleepGoals: '/api/sleep-goals',
      statistics: '/api/statistics'
    }
  });
});

// Create json-server router
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Use json-server middlewares
app.use(middlewares);

// Add custom routes before json-server router
app.use('/api', router);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Sleep Plus Backend running on http://${HOST}:${PORT}`);
  console.log(`Health check: http://${HOST}:${PORT}/health`);
  console.log(`API endpoints: http://${HOST}:${PORT}/api`);
});

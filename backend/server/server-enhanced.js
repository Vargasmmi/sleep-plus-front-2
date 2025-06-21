const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const express = require('express');
const config = require('./config');
const stripe = require('stripe');
const axios = require('axios');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));
const middlewares = jsonServer.defaults();

// Cargar rutas personalizadas
server.use(jsonServer.rewriter(require('../routes.json')));

// Configurar CORS
server.use(cors(config.cors));

// Middleware de logging
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Usar middlewares por defecto de JSON Server
server.use(middlewares);

// Servir archivos estáticos
const fs = require('fs');
server.use(express.static(path.join(__dirname, '..', 'public')));

// API Documentation endpoint
server.get('/api-docs', (req, res) => {
  const apiDocsPath = path.join(__dirname, 'api-documentation.html');
  if (fs.existsSync(apiDocsPath)) {
    res.sendFile(apiDocsPath);
  } else {
    res.status(404).send('API Documentation not found');
  }
});

// Middleware para parsear JSON
server.use(express.json());

// Agregar middleware para manejar PATCH como PUT
server.use((req, res, next) => {
  if (req.method === 'PATCH') {
    console.log(`🔄 Converting PATCH to PUT for: ${req.originalUrl}`);
    req.method = 'PUT';
  }
  next();
});

// ==================== SHOPIFY ENDPOINTS ====================

// Test Shopify Connection
server.post('/api/shopify/test-connection', async (req, res) => {
  try {
    const { apiKey, apiSecretKey, accessToken, shopifyDomain } = req.body;
    
    // Aquí iría la lógica para probar la conexión con Shopify
    // Por ahora, simulamos una respuesta exitosa
    res.json({
      success: true,
      message: 'Shopify connection successful',
      shop: {
        name: shopifyDomain,
        email: 'shop@example.com',
        plan: 'Shopify Plus'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Sync Shopify Products
server.post('/api/shopify/products/sync', async (req, res) => {
  try {
    // Simulamos sincronización de productos
    const products = [
      {
        id: 'prod_1',
        shopifyId: '1234567890',
        title: 'Sleep Tracker Pro',
        handle: 'sleep-tracker-pro',
        description: 'Advanced sleep tracking device',
        vendor: 'Sleep Plus',
        productType: 'Device',
        status: 'active',
        tags: ['tracker', 'premium'],
        images: [{
          id: 'img_1',
          src: 'https://example.com/image.jpg',
          alt: 'Sleep Tracker Pro'
        }],
        variants: [{
          id: 'var_1',
          title: 'Default',
          price: '199.99',
          sku: 'SLEEP-001',
          inventoryQuantity: 100
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    // Guardar productos en db.json
    const db = router.db.getState();
    db.shopifyProducts = products;
    router.db.setState(db);
    
    res.json({
      success: true,
      message: `Synced ${products.length} products`,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Create Shopify Discount
server.post('/api/shopify/discounts/create', async (req, res) => {
  try {
    const { code, value, type } = req.body;
    
    const discount = {
      id: `disc_${Date.now()}`,
      code,
      value,
      type,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    const db = router.db.getState();
    if (!db.shopifyDiscounts) db.shopifyDiscounts = [];
    db.shopifyDiscounts.push(discount);
    router.db.setState(db);
    
    res.json({
      success: true,
      discount
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== STRIPE ENDPOINTS ====================

// Test Stripe Connection
server.post('/api/stripe/test-connection', async (req, res) => {
  try {
    const { secretKey } = req.body;
    
    // Aquí iría la lógica para probar la conexión con Stripe
    res.json({
      success: true,
      message: 'Stripe connection successful',
      account: {
        id: 'acct_1234567890',
        businessProfile: {
          name: 'Sleep Plus',
          url: 'https://sleepplus.com'
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Create Payment Link
server.post('/api/stripe/payment-links/create', async (req, res) => {
  try {
    const { amount, description, customerId } = req.body;
    
    const paymentLink = {
      id: `link_${Date.now()}`,
      url: `https://pay.stripe.link/${Date.now()}`,
      amount,
      description,
      customerId,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      paymentLink
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== SUBSCRIPTION MANAGEMENT ====================

// Pause Subscription
server.post('/api/subscriptions/:id/pause', async (req, res) => {
  try {
    const { id } = req.params;
    const db = router.db.getState();
    const subscription = db.subscriptions.find(s => s.id === id);
    
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    subscription.status = 'paused';
    subscription.pausedAt = new Date().toISOString();
    router.db.setState(db);
    
    res.json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Resume Subscription
server.post('/api/subscriptions/:id/resume', async (req, res) => {
  try {
    const { id } = req.params;
    const db = router.db.getState();
    const subscription = db.subscriptions.find(s => s.id === id);
    
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    
    subscription.status = 'active';
    delete subscription.pausedAt;
    subscription.updatedAt = new Date().toISOString();
    router.db.setState(db);
    
    res.json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== EVALUATION ENDPOINTS ====================

// AI Evaluation (simulado)
server.post('/api/evaluations/analyze', async (req, res) => {
  try {
    const { photos, mattress } = req.body;
    
    // Simulamos evaluación con IA
    const evaluation = {
      conditionScore: Math.floor(Math.random() * 5) + 5,
      brandScore: Math.floor(Math.random() * 5) + 5,
      ageScore: Math.floor(Math.random() * 5) + 5,
      sizeScore: Math.floor(Math.random() * 5) + 5,
      finalScore: Math.floor(Math.random() * 5) + 5,
      confidence: Math.random() * 0.3 + 0.7, // 70-100%
      creditApproved: Math.floor(Math.random() * 300) + 100
    };
    
    res.json({
      success: true,
      evaluation
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== WEBHOOK ENDPOINTS ====================

// Trade-in Webhook
server.post('/api/webhooks/trade-in', async (req, res) => {
  try {
    const event = req.body;
    
    // Log webhook event
    console.log('📥 Trade-in webhook received:', event);
    
    const db = router.db.getState();
    if (!db.webhooks) db.webhooks = [];
    db.webhooks.push({
      id: `webhook_${Date.now()}`,
      type: 'trade-in',
      event,
      receivedAt: new Date().toISOString()
    });
    router.db.setState(db);
    
    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Shopify Webhook
server.post('/api/webhooks/shopify', async (req, res) => {
  try {
    const event = req.body;
    const topic = req.headers['x-shopify-topic'];
    
    console.log('📥 Shopify webhook received:', topic);
    
    const db = router.db.getState();
    if (!db.webhooks) db.webhooks = [];
    db.webhooks.push({
      id: `webhook_${Date.now()}`,
      type: 'shopify',
      topic,
      event,
      receivedAt: new Date().toISOString()
    });
    router.db.setState(db);
    
    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Stripe Webhook
server.post('/api/webhooks/stripe', async (req, res) => {
  try {
    const event = req.body;
    
    console.log('📥 Stripe webhook received:', event.type);
    
    const db = router.db.getState();
    if (!db.webhooks) db.webhooks = [];
    db.webhooks.push({
      id: `webhook_${Date.now()}`,
      type: 'stripe',
      eventType: event.type,
      event,
      receivedAt: new Date().toISOString()
    });
    router.db.setState(db);
    
    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== STATISTICS & REPORTING ====================

// Get Dashboard Stats
server.get('/api/stats/dashboard', async (req, res) => {
  try {
    const db = router.db.getState();
    
    const stats = {
      totalCustomers: db.customers?.length || 0,
      activeSubscriptions: db.subscriptions?.filter(s => s.status === 'active').length || 0,
      totalRevenue: db.sales?.reduce((sum, sale) => sum + (sale.amount?.total || 0), 0) || 0,
      pendingEvaluations: db.evaluations?.filter(e => e.status === 'pending').length || 0,
      todayCalls: db.calls?.filter(c => {
        const today = new Date().toISOString().split('T')[0];
        return c.startTime?.startsWith(today);
      }).length || 0
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== COMMISSION CALCULATION ====================

// Calculate Commissions
server.post('/api/commissions/calculate', async (req, res) => {
  try {
    const { userId, period } = req.body;
    const db = router.db.getState();
    
    // Simular cálculo de comisiones
    const commission = {
      id: `comm_${Date.now()}`,
      userId,
      period,
      earnings: {
        baseSales: Math.floor(Math.random() * 2000) + 1000,
        bonuses: {
          conversion: Math.floor(Math.random() * 300) + 100,
          volume: Math.floor(Math.random() * 200) + 50,
          retention: Math.floor(Math.random() * 150) + 50,
          other: 0
        },
        deductions: 0,
        total: 0
      },
      sales: {
        count: Math.floor(Math.random() * 20) + 5,
        revenue: Math.floor(Math.random() * 10000) + 5000,
        saleIds: []
      },
      status: 'calculating',
      createdAt: new Date().toISOString()
    };
    
    // Calcular total
    commission.earnings.total = commission.earnings.baseSales + 
      Object.values(commission.earnings.bonuses).reduce((a, b) => a + b, 0) -
      commission.earnings.deductions;
    
    res.json({
      success: true,
      commission
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==================== HEALTH & STATUS ====================

// Health Check Endpoint
server.get('/health', (req, res) => {
  const db = router.db.getState();
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.environment,
    database: {
      customers: db.customers?.length || 0,
      subscriptions: db.subscriptions?.length || 0,
      evaluations: db.evaluations?.length || 0,
      employees: db.employees?.length || 0
    }
  });
});

// API Info
server.get('/api/info', (req, res) => {
  res.json({
    name: 'Sleep Plus Admin API',
    version: '2.0.0',
    environment: config.environment,
    features: [
      'Customer Management',
      'Subscription Management',
      'Evaluation System',
      'Call Center Operations',
      'Commission Tracking',
      'Shopify Integration',
      'Stripe Integration',
      'Webhook Support'
    ]
  });
});

// Usar el router de JSON Server
server.use(router);

// Iniciar servidor
const PORT = config.port;
server.listen(PORT, config.host, () => {
  console.log(`🚀 Sleep Plus Admin API running on http://${config.host}:${PORT}`);
  console.log(`📚 API Documentation: http://${config.host}:${PORT}/api-docs`);
  console.log(`📊 Environment: ${config.environment}`);
  console.log(`🌐 CORS Origins: ${JSON.stringify(config.cors.origin)}`);
  console.log(`📝 Database: ${path.join(__dirname, '..', 'db.json')}`);
  console.log(`🔧 Routes: ${path.join(__dirname, '..', 'routes.json')}`);
  console.log(`✅ Server ready with enhanced features!`);
});
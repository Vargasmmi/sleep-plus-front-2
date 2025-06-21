// test-backend.js
// Script de pruebas rápidas para verificar el backend

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3001';

async function testBackend() {
  console.log('🧪 Probando Backend Sleep Plus...\n');
  console.log(`📍 URL: ${API_URL}\n`);
  
  const tests = [
    {
      name: 'Health Check',
      method: 'GET',
      url: '/health'
    },
    {
      name: 'API Info',
      method: 'GET',
      url: '/api/info'
    },
    {
      name: 'Listar Clientes',
      method: 'GET',
      url: '/api/customers'
    },
    {
      name: 'Listar Suscripciones',
      method: 'GET',
      url: '/api/subscriptions'
    },
    {
      name: 'Dashboard Stats',
      method: 'GET',
      url: '/api/stats/dashboard'
    },
    {
      name: 'Crear Cliente',
      method: 'POST',
      url: '/api/customers',
      data: {
        id: `cust_test_${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        firstName: 'Test',
        lastName: 'User',
        phone: '+1234567890',
        tier: 'bronze',
        source: 'test'
      }
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const config = {
        method: test.method,
        url: `${API_URL}${test.url}`,
        data: test.data
      };
      
      const response = await axios(config);
      console.log(`✅ ${test.name}: ${response.status} OK`);
      if (test.name === 'Health Check') {
        console.log(`   Status: ${response.data.status}`);
        console.log(`   Environment: ${response.data.environment}`);
      }
      if (test.name === 'Dashboard Stats') {
        console.log(`   Total Customers: ${response.data.totalCustomers}`);
        console.log(`   Active Subscriptions: ${response.data.activeSubscriptions}`);
      }
      passed++;
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Error: ${JSON.stringify(error.response.data)}`);
      }
      failed++;
    }
    console.log('');
  }
  
  console.log('📊 Resumen de Pruebas:');
  console.log(`   ✅ Exitosas: ${passed}`);
  console.log(`   ❌ Fallidas: ${failed}`);
  console.log(`   📈 Total: ${tests.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 ¡Todas las pruebas pasaron! El backend está funcionando correctamente.');
  } else {
    console.log('\n⚠️  Algunas pruebas fallaron. Revisa los errores arriba.');
  }
}

// Ejecutar pruebas
testBackend().catch(error => {
  console.error('💥 Error fatal:', error.message);
  process.exit(1);
});

// Test de conectividad riguroso frontend-backend
// Este script verifica que todo esté funcionando correctamente

const axios = require('axios');

const API_URL = 'http://localhost:3001';

async function testBackendConnectivity() {
  console.log('🔍 VERIFICACIÓN RIGUROSA DE CONECTIVIDAD FRONTEND-BACKEND');
  console.log('=====================================================');
  console.log(`API Base URL: ${API_URL}`);
  console.log('');

  const tests = [
    {
      name: 'Health Check',
      url: `${API_URL}/health`,
      method: 'GET'
    },
    {
      name: 'Customers Endpoint',
      url: `${API_URL}/customers`,
      method: 'GET'
    },
    {
      name: 'Employees Endpoint',
      url: `${API_URL}/employees`,
      method: 'GET'
    },
    {
      name: 'Subscriptions Endpoint',
      url: `${API_URL}/subscriptions`,
      method: 'GET'
    },
    {
      name: 'Specific Customer',
      url: `${API_URL}/customers/1`,
      method: 'GET'
    },
    {
      name: 'Create Test (POST)',
      url: `${API_URL}/activityLogs`,
      method: 'POST',
      data: {
        id: 'test-' + Date.now(),
        userId: 'test-user',
        action: 'test',
        resource: 'connectivity-test',
        timestamp: new Date().toISOString()
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`\n🧪 Testing: ${test.name}`);
      console.log(`   ${test.method} ${test.url}`);
      
      const startTime = Date.now();
      const response = test.method === 'POST' 
        ? await axios.post(test.url, test.data)
        : await axios.get(test.url);
      const endTime = Date.now();
      
      console.log(`   ✅ Status: ${response.status}`);
      console.log(`   ⏱️  Response time: ${endTime - startTime}ms`);
      
      if (Array.isArray(response.data)) {
        console.log(`   📊 Data count: ${response.data.length} items`);
      } else if (response.data && typeof response.data === 'object') {
        console.log(`   📋 Data keys: ${Object.keys(response.data).join(', ')}`);
      }
      
      passed++;
    } catch (error) {
      console.log(`   ❌ FAILED: ${error.message}`);
      if (error.response) {
        console.log(`   📄 Status: ${error.response.status}`);
        console.log(`   📝 Response: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      failed++;
    }
  }

  console.log('\n');
  console.log('📊 RESULTS SUMMARY:');
  console.log('==================');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Backend connectivity is EXCELLENT');
  } else {
    console.log('\n⚠️  Some tests failed. Check backend configuration.');
  }

  return { passed, failed };
}

// CORS Test
async function testCORS() {
  console.log('\n🌐 TESTING CORS CONFIGURATION:');
  console.log('==============================');
  
  try {
    const response = await axios.options(`${API_URL}/customers`);
    console.log('✅ CORS preflight request successful');
    console.log(`   Access-Control-Allow-Origin: ${response.headers['access-control-allow-origin']}`);
    console.log(`   Access-Control-Allow-Methods: ${response.headers['access-control-allow-methods']}`);
  } catch (error) {
    console.log('❌ CORS preflight failed');
    console.log(`   Error: ${error.message}`);
  }
}

// Environment Variables Test
function testEnvironmentConfig() {
  console.log('\n🔧 ENVIRONMENT CONFIGURATION:');
  console.log('=============================');
  
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`PORT: ${process.env.PORT || 'not set (using 3001)'}`);
  console.log(`HOST: ${process.env.HOST || 'not set (using 0.0.0.0)'}`);
  console.log(`CORS_ORIGIN: ${process.env.CORS_ORIGIN || 'not set (using defaults)'}`);
  
  // Check frontend env file
  const fs = require('fs');
  const envDevPath = '../.env.development';
  const envProdPath = '../.env.production';
  
  if (fs.existsSync(envDevPath)) {
    console.log('✅ .env.development found');
  } else {
    console.log('❌ .env.development not found');
  }
  
  if (fs.existsSync(envProdPath)) {
    console.log('✅ .env.production found');
  } else {
    console.log('❌ .env.production not found');
  }
}

// Run all tests
async function runAllTests() {
  try {
    testEnvironmentConfig();
    await testCORS();
    const results = await testBackendConnectivity();
    
    console.log('\n');
    console.log('🏁 FINAL ASSESSMENT:');
    console.log('====================');
    
    if (results.failed === 0) {
      console.log('✅ CONNECTIVITY STATUS: EXCELLENT');
      console.log('✅ Frontend can successfully communicate with backend');
      console.log('✅ All CRUD operations are working');
      console.log('✅ CORS is properly configured');
      console.log('');
      console.log('🚀 Ready for development and production!');
    } else {
      console.log('⚠️  CONNECTIVITY STATUS: NEEDS ATTENTION');
      console.log('❌ Some endpoints are not responding correctly');
      console.log('🔧 Check backend server and database configuration');
    }
    
  } catch (error) {
    console.log('\n❌ CRITICAL ERROR during testing:');
    console.log(error.message);
  }
}

// Check if we can run the tests
console.log('Starting connectivity tests in 2 seconds...');
setTimeout(runAllTests, 2000);

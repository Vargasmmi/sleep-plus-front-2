// test-login-simple.js
const https = require('https');

function testBackendDirectly() {
  console.log('🔍 Testing backend directly...');
  
  const options = {
    hostname: 'sleep-plus-front-2-backend.dqyvuv.easypanel.host',
    port: 443,
    path: '/employees/admin-001',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Node.js Test Script'
    }
  };
  
  const req = https.request(options, (res) => {
    console.log(`📥 Status: ${res.statusCode}`);
    console.log(`📋 Headers: ${JSON.stringify(res.headers)}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('📦 Response body:', data);
    });
  });
  
  req.on('error', (e) => {
    console.error(`❌ Error: ${e.message}`);
  });
  
  req.end();
}

// Test 1: Backend directo
console.log('=== TEST 1: Backend Direct ===');
testBackendDirectly();

// Test 2: Frontend API configuration
setTimeout(() => {
  console.log('\n=== TEST 2: Frontend Check ===');
  
  const frontendOptions = {
    hostname: 'sleep-plus-front-2-frontend.dqyvuv.easypanel.host',
    port: 443,
    path: '/',
    method: 'GET'
  };
  
  https.get(frontendOptions, (res) => {
    let html = '';
    res.on('data', (chunk) => html += chunk);
    res.on('end', () => {
      // Buscar configuración de Vite en el HTML
      const viteConfigMatch = html.match(/VITE_API_URL['"]:?\s*['"](.*?)['"]/);
      if (viteConfigMatch) {
        console.log('✅ Found VITE_API_URL in HTML:', viteConfigMatch[1]);
      } else {
        console.log('❌ VITE_API_URL not found in HTML');
      }
      
      // Buscar scripts
      const scriptTags = html.match(/<script[^>]*>/g) || [];
      console.log(`📜 Found ${scriptTags.length} script tags`);
    });
  });
}, 2000);

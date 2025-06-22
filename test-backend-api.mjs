// test-backend-api.mjs
import https from 'https';
import http from 'http';

async function fetchFromBackend(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'sleep-plus-front-2-backend.dqyvuv.easypanel.host',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    
    console.log(`\n📡 Fetching: https://${options.hostname}${path}`);
    
    const req = https.request(options, (res) => {
      console.log(`📥 Status: ${res.statusCode} ${res.statusText}`);
      console.log(`📋 Headers:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`📦 Response:`, data.substring(0, 200) + (data.length > 200 ? '...' : ''));
        resolve({ status: res.statusCode, data, headers: res.headers });
      });
    });
    
    req.on('error', (e) => {
      console.error(`❌ Error:`, e.message);
      reject(e);
    });
    
    req.end();
  });
}

async function testFrontendHTML() {
  return new Promise((resolve, reject) => {
    https.get('https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host/', (res) => {
      let html = '';
      res.on('data', (chunk) => html += chunk);
      res.on('end', () => {
        console.log('\n🌐 Frontend HTML Analysis:');
        console.log(`📏 HTML Length: ${html.length} bytes`);
        
        // Buscar el script principal
        const scriptMatch = html.match(/<script[^>]*src=["']([^"']*\.js)["'][^>]*>/g);
        if (scriptMatch) {
          console.log('📜 Found scripts:', scriptMatch);
        }
        
        // Buscar configuración inline
        const inlineConfig = html.match(/window\.__[A-Z_]+__\s*=\s*["']([^"']+)["']/g);
        if (inlineConfig) {
          console.log('⚙️ Found inline config:', inlineConfig);
        }
        
        resolve(html);
      });
    });
  });
}

async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  
  // Test 1: Backend root
  console.log('=== TEST 1: Backend Root ===');
  await fetchFromBackend('/');
  
  // Test 2: Employees endpoint
  console.log('\n=== TEST 2: Employees Endpoint ===');
  await fetchFromBackend('/employees');
  
  // Test 3: Specific employee
  console.log('\n=== TEST 3: Specific Employee ===');
  await fetchFromBackend('/employees/admin-001');
  
  // Test 4: Frontend HTML
  console.log('\n=== TEST 4: Frontend HTML ===');
  await testFrontendHTML();
  
  // Test 5: Check CORS
  console.log('\n=== TEST 5: CORS Test ===');
  try {
    const corsTest = await fetch('https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/employees', {
      method: 'GET',
      headers: {
        'Origin': 'https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host',
        'Referer': 'https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host/'
      }
    });
    console.log('✅ CORS fetch successful:', corsTest.status);
  } catch (e) {
    console.log('❌ CORS error:', e.message);
  }
}

runTests().catch(console.error);

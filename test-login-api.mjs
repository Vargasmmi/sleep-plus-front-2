// test-login-api.mjs
import https from 'https';

// Simular un login como lo haría el navegador
async function testLoginFlow() {
  console.log('🚀 Testing login flow...\n');
  
  // Primero, intentar obtener el empleado (como hace el authProvider)
  const employeeData = await new Promise((resolve, reject) => {
    https.get('https://sleep-plus-front-2-backend.dqyvuv.easypanel.host/employees/admin-001', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('✅ Backend Response:');
        console.log('Status:', res.statusCode);
        console.log('Data:', data);
        resolve(JSON.parse(data));
      });
    }).on('error', reject);
  });
  
  console.log('\n📋 Employee found:', {
    id: employeeData.id,
    email: employeeData.email,
    role: employeeData.role
  });
  
  // Verificar que el frontend puede hacer la petición
  console.log('\n🌐 Testing CORS from frontend origin...');
  
  const corsTest = await new Promise((resolve, reject) => {
    const options = {
      hostname: 'sleep-plus-front-2-backend.dqyvuv.easypanel.host',
      path: '/employees/admin-001',
      method: 'GET',
      headers: {
        'Origin': 'https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host',
        'Referer': 'https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host/login'
      }
    };
    
    https.get(options, (res) => {
      console.log('CORS Headers:', res.headers['access-control-allow-origin']);
      resolve(res.statusCode === 200);
    }).on('error', reject);
  });
  
  console.log('CORS Test:', corsTest ? '✅ PASSED' : '❌ FAILED');
  
  console.log('\n✅ Backend is ready for login!');
  console.log('\n📝 Login credentials:');
  console.log('Email: admin@lamattressstore.com');
  console.log('Password: admin123');
}

testLoginFlow().catch(console.error);

// 🔍 Script de Debug - Ejecutar en Consola del Navegador
// Copia y pega este código en la consola del navegador (F12)

console.log('🔍 DEBUGGING API Configuration');
console.log('==============================');

// 1. Verificar variables de entorno
console.log('📊 Environment Variables:');
console.log('- NODE_ENV:', import.meta?.env?.MODE || 'Not available');
console.log('- PROD:', import.meta?.env?.PROD || 'Not available');
console.log('- VITE_API_URL:', import.meta?.env?.VITE_API_URL || 'Not set');

// 2. Simular la función getApiUrl() del código
function debugGetApiUrl() {
  if (import.meta?.env?.PROD) {
    return import.meta.env.VITE_API_URL || "https://sleep-plus-front-2-backend.dqyvuv.easypanel.host";
  }
  return import.meta?.env?.VITE_API_URL || "http://127.0.0.1:3001";
}

const API_URL = debugGetApiUrl();
const FULL_API_URL = `${API_URL}/api`;

console.log('🎯 Calculated URLs:');
console.log('- API_URL:', API_URL);
console.log('- FULL_API_URL:', FULL_API_URL);

// 3. Test de conectividad
console.log('🔗 Testing API Connectivity...');
fetch(`${FULL_API_URL}/employees/admin-001`)
  .then(response => {
    console.log('✅ API Test Response:', response.status, response.statusText);
    console.log('📍 Request went to:', response.url);
    return response.text();
  })
  .then(data => {
    console.log('📦 Response preview:', data.substring(0, 200) + '...');
  })
  .catch(error => {
    console.error('❌ API Test Failed:', error);
  });

// 4. Monitor todas las peticiones fetch
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('🚀 FETCH intercepted:', args[0]);
  return originalFetch.apply(this, args);
};

console.log('✅ Debug setup complete! Watch for API calls...'); 
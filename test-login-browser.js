// test-login-browser.js
// Script para probar el login directamente en el navegador

console.log(`
🔍 INSTRUCCIONES PARA PROBAR EL LOGIN:

1. Abre tu navegador
2. Abre las DevTools (F12)
3. Ve a la pestaña "Network" 
4. Navega a: https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host/login
5. Pega este código en la consola:

// ========== COPIAR DESDE AQUÍ ==========

// Interceptar fetch para ver las peticiones
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('🎯 FETCH INTERCEPTED:', {
    url: args[0],
    method: args[1]?.method || 'GET',
    body: args[1]?.body
  });
  
  return originalFetch.apply(this, args)
    .then(response => {
      console.log('✅ Response:', response.status, response.url);
      return response;
    })
    .catch(error => {
      console.error('❌ Fetch error:', error);
      throw error;
    });
};

// Función para probar el login
async function testLogin() {
  console.log('🚀 Starting login test...');
  
  // Verificar configuración
  console.log('📋 Environment:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    NODE_ENV: import.meta.env.MODE,
    isProd: import.meta.env.PROD
  });
  
  // Buscar campos del formulario
  const emailInput = document.querySelector('input[type="email"], input[name="email"], input[id="email"], input[id="basic_email"]');
  const passwordInput = document.querySelector('input[type="password"], input[name="password"], input[id="password"], input[id="basic_password"]');
  const submitButton = document.querySelector('button[type="submit"], button.ant-btn-primary');
  
  if (emailInput && passwordInput) {
    // Llenar formulario
    emailInput.value = 'admin@lamattressstore.com';
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    emailInput.dispatchEvent(new Event('change', { bubbles: true }));
    
    passwordInput.value = 'admin123';
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
    
    console.log('✅ Form filled, ready to submit');
    
    if (submitButton) {
      console.log('🖱️ Clicking submit...');
      submitButton.click();
    } else {
      console.log('❌ Submit button not found');
    }
  } else {
    console.log('❌ Form fields not found');
  }
}

// Ejecutar test
testLogin();

// ========== COPIAR HASTA AQUÍ ==========

6. Observa en la consola y en la pestaña Network:
   - ¿A qué URL se hace la petición?
   - ¿Es al backend o al frontend?
   - ¿Cuál es el status de la respuesta?

7. Reporta los resultados
`);

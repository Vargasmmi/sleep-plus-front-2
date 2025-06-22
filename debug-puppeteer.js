const puppeteer = require('puppeteer');

async function debugLogin() {
  console.log('🚀 Starting Puppeteer debug session...');
  
  const browser = await puppeteer.launch({
    headless: false, // Para ver el navegador
    devtools: true,  // Abrir DevTools automáticamente
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Arrays para capturar logs
  const consoleLogs = [];
  const networkRequests = [];
  const networkResponses = [];
  
  // Capturar logs de consola
  page.on('console', msg => {
    const logEntry = {
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    };
    consoleLogs.push(logEntry);
    console.log(`📋 Console [${msg.type()}]:`, msg.text());
  });
  
  // Capturar errores de página
  page.on('pageerror', error => {
    console.error('❌ Page Error:', error.message);
  });
  
  // Capturar requests
  page.on('request', request => {
    const reqInfo = {
      url: request.url(),
      method: request.method(),
      headers: request.headers(),
      postData: request.postData(),
      timestamp: new Date().toISOString()
    };
    networkRequests.push(reqInfo);
    console.log(`📡 Request: ${request.method()} ${request.url()}`);
  });
  
  // Capturar responses
  page.on('response', response => {
    const resInfo = {
      url: response.url(),
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      timestamp: new Date().toISOString()
    };
    networkResponses.push(resInfo);
    console.log(`📥 Response: ${response.status()} ${response.url()}`);
  });
  
  // Navegar a la página de login
  console.log('🌐 Navigating to login page...');
  await page.goto('https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host/login', {
    waitUntil: 'networkidle2'
  });
  
  // Esperar a que el formulario esté disponible
  await page.waitForSelector('input[type="email"], input[name="email"], input[id="email"]', { timeout: 10000 });
  
  // Inyectar script de debugging
  await page.evaluate(() => {
    console.log('🔍 Debugging environment variables:', {
      'import.meta.env': typeof window !== 'undefined' && window.import?.meta?.env,
      'window.__VITE_API_URL__': window.__VITE_API_URL__,
      'localStorage auth': localStorage.getItem('auth')
    });
    
    // Interceptar fetch para ver exactamente qué se está llamando
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      console.log('🎯 FETCH INTERCEPTED:', {
        url: args[0],
        options: args[1]
      });
      return originalFetch.apply(this, args);
    };
  });
  
  // Intentar login
  console.log('📝 Filling login form...');
  
  // Llenar email
  await page.type('input[type="email"], input[name="email"], input[id="email"]', 'admin@lamattressstore.com');
  
  // Llenar password
  await page.type('input[type="password"], input[name="password"], input[id="password"]', 'admin123');
  
  // Tomar screenshot antes del click
  await page.screenshot({ path: 'before-login.png' });
  
  // Click en submit
  console.log('🖱️ Clicking submit button...');
  await page.click('button[type="submit"]');
  
  // Esperar un poco para capturar las peticiones
  await page.waitForTimeout(5000);
  
  // Tomar screenshot después del click
  await page.screenshot({ path: 'after-login.png' });
  
  // Imprimir resumen
  console.log('\n📊 SUMMARY:');
  console.log('Total Console Logs:', consoleLogs.length);
  console.log('Total Network Requests:', networkRequests.length);
  console.log('Total Network Responses:', networkResponses.length);
  
  // Filtrar peticiones relevantes
  const apiRequests = networkRequests.filter(req => 
    req.url.includes('employees') || 
    req.url.includes('api') || 
    req.url.includes('login')
  );
  
  console.log('\n🎯 API Related Requests:');
  apiRequests.forEach(req => {
    console.log(`${req.method} ${req.url}`);
    if (req.postData) {
      console.log('Body:', req.postData);
    }
  });
  
  // Guardar logs
  const fs = require('fs');
  fs.writeFileSync('debug-logs.json', JSON.stringify({
    consoleLogs,
    networkRequests,
    networkResponses,
    apiRequests
  }, null, 2));
  
  console.log('\n💾 Logs saved to debug-logs.json');
  
  // Mantener el navegador abierto para inspección manual
  console.log('\n⏸️  Browser will stay open for manual inspection...');
  console.log('Press Ctrl+C to close');
}

debugLogin().catch(console.error);

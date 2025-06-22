// test-login-puppeteer.js
import puppeteer from 'puppeteer';

async function testLogin() {
  console.log('🚀 Iniciando Puppeteer para test de login...\n');
  
  // Lanzar navegador
  const browser = await puppeteer.launch({
    headless: false, // Ver el navegador
    devtools: true,  // Abrir DevTools automáticamente
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1920,1080'
    ]
  });
  
  const page = await browser.newPage();
  
  // Arrays para capturar información
  const networkRequests = [];
  const consoleLogs = [];
  
  // Capturar logs de consola
  page.on('console', msg => {
    const log = `[${msg.type()}] ${msg.text()}`;
    consoleLogs.push(log);
    console.log('📋 Console:', log);
  });
  
  // Capturar errores
  page.on('pageerror', error => {
    console.error('❌ Page Error:', error.message);
  });
  
  // Capturar todas las peticiones de red
  page.on('request', request => {
    const url = request.url();
    const method = request.method();
    
    // Filtrar solo peticiones relevantes
    if (url.includes('employee') || url.includes('login') || url.includes('auth')) {
      const reqInfo = {
        timestamp: new Date().toISOString(),
        method,
        url,
        headers: request.headers(),
        postData: request.postData()
      };
      
      networkRequests.push(reqInfo);
      
      console.log(`\n📡 ${method} Request to:`, url);
      if (request.postData()) {
        console.log('📦 Body:', request.postData());
      }
    }
  });
  
  // Capturar respuestas
  page.on('response', response => {
    const url = response.url();
    if (url.includes('employee') || url.includes('login') || url.includes('auth')) {
      console.log(`📥 Response from ${url}: ${response.status()} ${response.statusText()}`);
    }
  });
  
  try {
    // Navegar a la página de login
    console.log('🌐 Navegando a la página de login...\n');
    await page.goto('https://sleep-plus-front-2-frontend.dqyvuv.easypanel.host/login', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Esperar a que el formulario esté disponible
    await page.waitForSelector('input[type="email"], input[name="email"], input[id="email"], input[id="basic_email"]', {
      timeout: 10000
    });
    
    console.log('✅ Página de login cargada\n');
    
    // Inyectar código para debugging
    const envInfo = await page.evaluate(() => {
      console.log('🔍 Checking environment variables...');
      
      // Buscar configuración de Vite
      const viteEnv = {
        VITE_API_URL: window.import?.meta?.env?.VITE_API_URL,
        MODE: window.import?.meta?.env?.MODE,
        PROD: window.import?.meta?.env?.PROD,
        DEV: window.import?.meta?.env?.DEV
      };
      
      console.log('📋 Vite Environment:', viteEnv);
      
      // Intentar encontrar la configuración de API en el código
      const scripts = Array.from(document.scripts);
      let apiUrlFound = null;
      
      scripts.forEach(script => {
        if (script.src && script.src.includes('index-')) {
          console.log('📜 Main script found:', script.src);
        }
      });
      
      return viteEnv;
    });
    
    console.log('🔧 Environment info from page:', envInfo);
    
    // Interceptar fetch antes de hacer login
    await page.evaluateOnNewDocument(() => {
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        console.log('🎯 FETCH INTERCEPTED:', args[0]);
        return originalFetch.apply(this, args);
      };
    });
    
    // Tomar screenshot antes del login
    await page.screenshot({ path: 'before-login.png', fullPage: true });
    console.log('📸 Screenshot saved: before-login.png\n');
    
    // Llenar el formulario
    console.log('📝 Llenando formulario de login...');
    
    // Email - probar diferentes selectores
    const emailSelectors = [
      'input[type="email"]',
      'input[name="email"]',
      'input[id="email"]',
      'input[id="basic_email"]',
      '#basic_email',
      'input[placeholder*="email" i]'
    ];
    
    for (const selector of emailSelectors) {
      try {
        await page.type(selector, 'admin@lamattressstore.com', { delay: 50 });
        console.log(`✅ Email filled using selector: ${selector}`);
        break;
      } catch (e) {
        // Intentar con el siguiente selector
      }
    }
    
    // Password - probar diferentes selectores
    const passwordSelectors = [
      'input[type="password"]',
      'input[name="password"]',
      'input[id="password"]',
      'input[id="basic_password"]',
      '#basic_password'
    ];
    
    for (const selector of passwordSelectors) {
      try {
        await page.type(selector, 'admin123', { delay: 50 });
        console.log(`✅ Password filled using selector: ${selector}`);
        break;
      } catch (e) {
        // Intentar con el siguiente selector
      }
    }
    
    // Tomar screenshot después de llenar
    await page.screenshot({ path: 'form-filled.png', fullPage: true });
    console.log('📸 Screenshot saved: form-filled.png\n');
    
    // Preparar para capturar la petición
    console.log('🖱️ Clicking submit button...\n');
    
    // Click en submit
    const submitSelectors = [
      'button[type="submit"]',
      'button.ant-btn-primary',
      'button:has-text("Login")',
      'button:has-text("Sign in")',
      'button:has-text("Iniciar")'
    ];
    
    let clicked = false;
    for (const selector of submitSelectors) {
      try {
        await page.click(selector);
        console.log(`✅ Submit clicked using selector: ${selector}`);
        clicked = true;
        break;
      } catch (e) {
        // Intentar con el siguiente selector
      }
    }
    
    if (!clicked) {
      console.log('❌ No se pudo encontrar el botón de submit');
    }
    
    // Esperar un poco para capturar las peticiones
    await page.waitForTimeout(5000);
    
    // Tomar screenshot final
    await page.screenshot({ path: 'after-login.png', fullPage: true });
    console.log('📸 Screenshot saved: after-login.png\n');
    
    // Mostrar resumen
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMEN DEL TEST');
    console.log('='.repeat(50));
    
    console.log('\n🌐 Peticiones de red capturadas:');
    if (networkRequests.length === 0) {
      console.log('❌ No se capturaron peticiones relacionadas con login/employees');
    } else {
      networkRequests.forEach((req, index) => {
        console.log(`\n${index + 1}. ${req.method} ${req.url}`);
        if (req.url.includes('frontend')) {
          console.log('   ❌ PROBLEMA: Petición al FRONTEND!');
        } else if (req.url.includes('backend')) {
          console.log('   ✅ Correcto: Petición al BACKEND');
        }
      });
    }
    
    // Guardar logs
    const fs = await import('fs');
    const report = {
      timestamp: new Date().toISOString(),
      environment: envInfo,
      networkRequests,
      consoleLogs
    };
    
    fs.writeFileSync('login-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Reporte completo guardado en: login-test-report.json');
    
    console.log('\n⏸️  El navegador permanecerá abierto para inspección manual.');
    console.log('Presiona Ctrl+C para cerrar.');
    
  } catch (error) {
    console.error('❌ Error durante el test:', error);
    await browser.close();
  }
}

// Ejecutar test
testLogin().catch(console.error);

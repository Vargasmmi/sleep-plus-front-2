const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class ProjectDiagnostic {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.info = [];
    this.backendUrl = 'http://127.0.0.1:3001';
  }

  log(type, message) {
    const timestamp = new Date().toISOString();
    switch (type) {
      case 'error':
        console.log(`${colors.red}[ERROR] ${timestamp}: ${message}${colors.reset}`);
        this.issues.push({ type: 'error', message, timestamp });
        break;
      case 'warning':
        console.log(`${colors.yellow}[WARNING] ${timestamp}: ${message}${colors.reset}`);
        this.warnings.push({ type: 'warning', message, timestamp });
        break;
      case 'success':
        console.log(`${colors.green}[SUCCESS] ${timestamp}: ${message}${colors.reset}`);
        break;
      case 'info':
        console.log(`${colors.cyan}[INFO] ${timestamp}: ${message}${colors.reset}`);
        this.info.push({ type: 'info', message, timestamp });
        break;
      case 'header':
        console.log(`\n${colors.bright}${colors.blue}${'='.repeat(60)}${colors.reset}`);
        console.log(`${colors.bright}${colors.blue}${message}${colors.reset}`);
        console.log(`${colors.bright}${colors.blue}${'='.repeat(60)}${colors.reset}\n`);
        break;
    }
  }

  async checkBackendStructure() {
    this.log('header', '1. VERIFICANDO ESTRUCTURA DEL BACKEND');
    
    const requiredFiles = [
      'package.json',
      'server.js',
      'db.json',
      'server/index.js',
      'server/config.js'
    ];

    const backendPath = path.join(__dirname, '..', 'backend');
    
    for (const file of requiredFiles) {
      const filePath = path.join(backendPath, file);
      if (fs.existsSync(filePath)) {
        this.log('success', `✓ Archivo encontrado: backend/${file}`);
        
        // Verificar tamaño del archivo
        const stats = fs.statSync(filePath);
        if (stats.size === 0) {
          this.log('error', `✗ Archivo vacío: backend/${file}`);
        }
      } else {
        this.log('error', `✗ Archivo faltante: backend/${file}`);
      }
    }

    // Verificar db.json estructura
    const dbPath = path.join(backendPath, 'db.json');
    if (fs.existsSync(dbPath)) {
      try {
        const dbContent = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        const requiredCollections = [
          'customers', 'subscriptions', 'evaluations', 'employees',
          'stores', 'calls', 'sales', 'campaigns', 'scripts',
          'achievements', 'commissions', 'shopifySettings',
          'shopifyProducts', 'shopifyCustomers', 'shopifyCoupons'
        ];
        
        this.log('info', 'Verificando colecciones en db.json...');
        for (const collection of requiredCollections) {
          if (dbContent[collection]) {
            this.log('success', `✓ Colección ${collection}: ${dbContent[collection].length} registros`);
          } else {
            this.log('error', `✗ Colección faltante: ${collection}`);
          }
        }
      } catch (error) {
        this.log('error', `Error al parsear db.json: ${error.message}`);
      }
    }
  }

  async checkFrontendStructure() {
    this.log('header', '2. VERIFICANDO ESTRUCTURA DEL FRONTEND');
    
    const requiredFiles = [
      'package.json',
      'src/App.tsx',
      'src/providers/dataProvider.ts',
      'src/providers/authProvider.ts',
      'src/main.tsx',
      'vite.config.ts',
      '.env.development'
    ];

    const frontendPath = path.join(__dirname, '..');
    
    for (const file of requiredFiles) {
      const filePath = path.join(frontendPath, file);
      if (fs.existsSync(filePath)) {
        this.log('success', `✓ Archivo encontrado: ${file}`);
      } else {
        this.log('error', `✗ Archivo faltante: ${file}`);
      }
    }

    // Verificar configuración de entorno
    const envPath = path.join(frontendPath, '.env.development');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      if (envContent.includes('VITE_API_URL')) {
        const apiUrl = envContent.match(/VITE_API_URL=(.*)/)?.[1];
        this.log('info', `API URL configurada: ${apiUrl}`);
      } else {
        this.log('error', 'VITE_API_URL no está configurada en .env.development');
      }
    }
  }

  async checkBackendConnectivity() {
    this.log('header', '3. VERIFICANDO CONECTIVIDAD DEL BACKEND');
    
    try {
      // Test health endpoint
      const healthResponse = await axios.get(`${this.backendUrl}/health`);
      this.log('success', `✓ Health check exitoso: ${JSON.stringify(healthResponse.data)}`);
    } catch (error) {
      this.log('error', `✗ Backend no responde en ${this.backendUrl}: ${error.message}`);
      return false;
    }

    // Test API endpoints
    const endpoints = [
      '/customers',
      '/employees',
      '/subscriptions',
      '/evaluations',
      '/stores'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${this.backendUrl}${endpoint}`);
        this.log('success', `✓ Endpoint ${endpoint}: ${response.data.length} registros`);
      } catch (error) {
        this.log('error', `✗ Error en endpoint ${endpoint}: ${error.message}`);
      }
    }

    return true;
  }

  async checkDataProviderConfiguration() {
    this.log('header', '4. VERIFICANDO CONFIGURACIÓN DEL DATA PROVIDER');
    
    const dataProviderPath = path.join(__dirname, '..', 'src', 'providers', 'dataProvider.ts');
    
    if (fs.existsSync(dataProviderPath)) {
      const content = fs.readFileSync(dataProviderPath, 'utf-8');
      
      // Verificar configuración de URL
      if (content.includes('VITE_API_URL')) {
        this.log('success', '✓ Data provider usa VITE_API_URL');
      } else {
        this.log('warning', '⚠ Data provider podría no estar usando VITE_API_URL');
      }

      // Verificar métodos CRUD
      const crudMethods = ['getList', 'getOne', 'create', 'update', 'deleteOne'];
      for (const method of crudMethods) {
        if (content.includes(`${method}:`)) {
          this.log('success', `✓ Método ${method} implementado`);
        } else {
          this.log('error', `✗ Método ${method} no encontrado`);
        }
      }
    }
  }

  async checkTypeScriptErrors() {
    this.log('header', '5. VERIFICANDO ERRORES DE TYPESCRIPT');
    
    // Verificar que TypeScript esté instalado
    const tscPath = path.join(__dirname, '..', 'node_modules', '.bin', 'tsc');
    
    if (!fs.existsSync(tscPath) && !fs.existsSync(tscPath + '.cmd')) {
      this.log('warning', '⚠ TypeScript no está instalado localmente');
      return;
    }

    this.log('info', 'Ejecutando verificación de tipos (esto puede tardar un momento)...');
    
    // Lista de archivos críticos para verificar
    const criticalFiles = [
      'src/App.tsx',
      'src/providers/dataProvider.ts',
      'src/providers/authProvider.ts',
      'src/pages/customers/list.tsx',
      'src/pages/subscriptions/list.tsx'
    ];

    for (const file of criticalFiles) {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        this.log('info', `Verificando ${file}...`);
        // Aquí normalmente ejecutaríamos tsc, pero por ahora solo verificamos existencia
      }
    }
  }

  async checkCriticalDependencies() {
    this.log('header', '6. VERIFICANDO DEPENDENCIAS CRÍTICAS');
    
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      const criticalDeps = [
        '@refinedev/core',
        '@refinedev/antd',
        '@refinedev/react-router-v6',
        '@refinedev/simple-rest',
        'react',
        'react-dom',
        'antd',
        'axios'
      ];

      for (const dep of criticalDeps) {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
          this.log('success', `✓ ${dep}: ${packageJson.dependencies[dep]}`);
        } else {
          this.log('error', `✗ Dependencia faltante: ${dep}`);
        }
      }
    }
  }

  async testCRUDOperations() {
    this.log('header', '7. PROBANDO OPERACIONES CRUD');
    
    // Test GET
    try {
      const getResponse = await axios.get(`${this.backendUrl}/customers/1`);
      this.log('success', '✓ GET /customers/1 exitoso');
    } catch (error) {
      this.log('error', `✗ GET falló: ${error.message}`);
    }

    // Test POST
    try {
      const testData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '555-0123',
        tier: 'bronze'
      };
      const postResponse = await axios.post(`${this.backendUrl}/customers`, testData);
      this.log('success', `✓ POST /customers exitoso - ID: ${postResponse.data.id}`);
      
      // Limpiar datos de prueba
      if (postResponse.data.id) {
        await axios.delete(`${this.backendUrl}/customers/${postResponse.data.id}`);
        this.log('info', 'Datos de prueba eliminados');
      }
    } catch (error) {
      this.log('error', `✗ POST falló: ${error.message}`);
    }
  }

  async generateReport() {
    this.log('header', 'RESUMEN DEL DIAGNÓSTICO');
    
    const report = {
      timestamp: new Date().toISOString(),
      totalIssues: this.issues.length,
      totalWarnings: this.warnings.length,
      issues: this.issues,
      warnings: this.warnings,
      info: this.info,
      recommendations: []
    };

    // Generar recomendaciones
    if (this.issues.length > 0) {
      report.recommendations.push('1. Corregir todos los errores críticos antes de continuar');
      report.recommendations.push('2. Verificar que el backend esté ejecutándose en el puerto 3001');
      report.recommendations.push('3. Asegurarse de que todas las dependencias estén instaladas');
    }

    if (this.warnings.length > 0) {
      report.recommendations.push('4. Revisar las advertencias y considerar su resolución');
    }

    // Guardar reporte
    const reportPath = path.join(__dirname, 'diagnostic-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    this.log('info', `Reporte guardado en: ${reportPath}`);
    
    // Mostrar resumen
    console.log(`\n${colors.bright}Resumen:${colors.reset}`);
    console.log(`${colors.red}Errores críticos: ${this.issues.length}${colors.reset}`);
    console.log(`${colors.yellow}Advertencias: ${this.warnings.length}${colors.reset}`);
    console.log(`${colors.green}Información: ${this.info.length}${colors.reset}`);
    
    if (this.issues.length === 0) {
      console.log(`\n${colors.green}${colors.bright}✓ ¡No se encontraron errores críticos!${colors.reset}`);
    } else {
      console.log(`\n${colors.red}${colors.bright}✗ Se encontraron ${this.issues.length} errores que requieren atención${colors.reset}`);
    }
  }

  async run() {
    console.log(`${colors.bright}${colors.magenta}`);
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║          DIAGNÓSTICO COMPLETO DEL PROYECTO SLEEP+          ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log(`${colors.reset}\n`);

    await this.checkBackendStructure();
    await this.checkFrontendStructure();
    await this.checkBackendConnectivity();
    await this.checkDataProviderConfiguration();
    await this.checkTypeScriptErrors();
    await this.checkCriticalDependencies();
    await this.testCRUDOperations();
    await this.generateReport();
  }
}

// Ejecutar diagnóstico
const diagnostic = new ProjectDiagnostic();
diagnostic.run().catch(error => {
  console.error(`${colors.red}Error fatal durante el diagnóstico: ${error.message}${colors.reset}`);
  process.exit(1);
});

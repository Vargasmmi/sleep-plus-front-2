// Script de verificación exhaustiva del proyecto
const fs = require('fs');
const path = require('path');
const axios = require('axios');

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

class ProjectVerifier {
  constructor() {
    this.issues = [];
    this.fixes = [];
    this.projectRoot = path.join(__dirname, '..');
  }

  log(type, message, detail = '') {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      fix: '🔧'
    };

    const colorMap = {
      success: colors.green,
      error: colors.red,
      warning: colors.yellow,
      info: colors.cyan,
      fix: colors.magenta
    };

    console.log(`${colorMap[type]}${icons[type]} ${message}${colors.reset}${detail ? ': ' + detail : ''}`);
  }

  async checkDuplicateFiles() {
    console.log(`\n${colors.bright}🔍 Verificando archivos duplicados...${colors.reset}`);
    
    const srcPath = path.join(this.projectRoot, 'src');
    const duplicates = this.findDuplicateFiles(srcPath);
    
    if (duplicates.length > 0) {
      this.log('error', `Encontrados ${duplicates.length} archivos JS duplicados`);
      duplicates.forEach(file => {
        this.log('warning', `Duplicado: ${file}`);
        this.issues.push({
          type: 'duplicate_file',
          file: file,
          fix: `Mover ${file} a ${file}.backup`
        });
      });
      this.fixes.push('Ejecutar: node diagnostics/clean-duplicate-js.js');
    } else {
      this.log('success', 'No se encontraron archivos duplicados');
    }
  }

  findDuplicateFiles(dir, duplicates = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.includes('node_modules')) {
        this.findDuplicateFiles(filePath, duplicates);
      } else if (file.endsWith('.js') && !file.includes('.config.') && !file.includes('.backup')) {
        const tsxFile = filePath.replace('.js', '.tsx');
        const tsFile = filePath.replace('.js', '.ts');
        
        if (fs.existsSync(tsxFile) || fs.existsSync(tsFile)) {
          duplicates.push(filePath.replace(this.projectRoot, ''));
        }
      }
    });
    
    return duplicates;
  }

  async checkBackendStatus() {
    console.log(`\n${colors.bright}🔍 Verificando estado del backend...${colors.reset}`);
    
    try {
      const response = await axios.get('http://127.0.0.1:3001/health');
      this.log('success', 'Backend respondiendo correctamente', JSON.stringify(response.data));
      return true;
    } catch (error) {
      this.log('error', 'Backend no está respondiendo');
      this.issues.push({
        type: 'backend_down',
        error: error.message,
        fix: 'cd backend && npm run dev'
      });
      this.fixes.push('Iniciar backend: cd backend && npm run dev');
      return false;
    }
  }

  async checkDatabaseIntegrity() {
    console.log(`\n${colors.bright}🔍 Verificando integridad de la base de datos...${colors.reset}`);
    
    const dbPath = path.join(this.projectRoot, 'backend', 'db.json');
    
    if (!fs.existsSync(dbPath)) {
      this.log('error', 'Archivo db.json no encontrado');
      this.issues.push({
        type: 'missing_db',
        fix: 'Crear archivo db.json con estructura inicial'
      });
      return;
    }

    try {
      const dbContent = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      const requiredCollections = [
        'customers', 'subscriptions', 'evaluations', 'employees',
        'stores', 'calls', 'sales', 'campaigns', 'scripts',
        'achievements', 'commissions', 'shopifySettings',
        'shopifyProducts', 'shopifyCustomers', 'shopifyCoupons'
      ];

      let missingCollections = [];
      let emptyCollections = [];

      requiredCollections.forEach(collection => {
        if (!dbContent[collection]) {
          missingCollections.push(collection);
        } else if (dbContent[collection].length === 0) {
          emptyCollections.push(collection);
        }
      });

      if (missingCollections.length > 0) {
        this.log('error', `Colecciones faltantes: ${missingCollections.join(', ')}`);
        this.issues.push({
          type: 'missing_collections',
          collections: missingCollections,
          fix: 'Agregar colecciones faltantes a db.json'
        });
      }

      if (emptyCollections.length > 0) {
        this.log('warning', `Colecciones vacías: ${emptyCollections.join(', ')}`);
      }

      // Resumen de datos
      console.log(`\n${colors.cyan}📊 Resumen de datos:${colors.reset}`);
      Object.keys(dbContent).forEach(collection => {
        if (Array.isArray(dbContent[collection])) {
          console.log(`   ${collection}: ${dbContent[collection].length} registros`);
        }
      });

    } catch (error) {
      this.log('error', 'Error al parsear db.json', error.message);
      this.issues.push({
        type: 'invalid_db',
        error: error.message,
        fix: 'Verificar formato JSON de db.json'
      });
    }
  }

  async checkEnvironmentVariables() {
    console.log(`\n${colors.bright}🔍 Verificando variables de entorno...${colors.reset}`);
    
    const envFiles = ['.env.development', '.env.production'];
    
    envFiles.forEach(envFile => {
      const envPath = path.join(this.projectRoot, envFile);
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8');
        if (content.includes('VITE_API_URL')) {
          const apiUrl = content.match(/VITE_API_URL=(.*)/)?.[1];
          this.log('success', `${envFile} configurado`, apiUrl);
        } else {
          this.log('warning', `${envFile} no contiene VITE_API_URL`);
        }
      } else {
        this.log('warning', `${envFile} no encontrado`);
      }
    });
  }

  async checkDependencies() {
    console.log(`\n${colors.bright}🔍 Verificando dependencias...${colors.reset}`);
    
    // Check frontend dependencies
    const frontendPackage = path.join(this.projectRoot, 'package.json');
    const backendPackage = path.join(this.projectRoot, 'backend', 'package.json');
    
    const checkPackage = (packagePath, name) => {
      if (fs.existsSync(packagePath)) {
        const nodeModulesPath = path.join(path.dirname(packagePath), 'node_modules');
        if (fs.existsSync(nodeModulesPath)) {
          this.log('success', `${name} node_modules presente`);
        } else {
          this.log('error', `${name} node_modules faltante`);
          this.fixes.push(`cd ${path.dirname(packagePath).replace(this.projectRoot, '.')} && npm install`);
        }
      }
    };

    checkPackage(frontendPackage, 'Frontend');
    checkPackage(backendPackage, 'Backend');
  }

  async checkEndpoints() {
    console.log(`\n${colors.bright}🔍 Verificando endpoints del API...${colors.reset}`);
    
    const endpoints = [
      '/health',
      '/customers',
      '/employees',
      '/subscriptions',
      '/evaluations',
      '/stores'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`http://127.0.0.1:3001${endpoint}`);
        const count = Array.isArray(response.data) ? response.data.length : 'N/A';
        this.log('success', `${endpoint}`, `${count} registros`);
      } catch (error) {
        this.log('error', `${endpoint} falló`, error.message);
      }
    }
  }

  generateReport() {
    console.log(`\n${colors.bright}${colors.blue}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.bright}📋 REPORTE FINAL${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

    if (this.issues.length === 0) {
      console.log(`${colors.green}${colors.bright}✨ ¡No se encontraron problemas críticos!${colors.reset}`);
      console.log(`${colors.green}El proyecto está listo para ejecutarse.${colors.reset}`);
    } else {
      console.log(`${colors.red}${colors.bright}Se encontraron ${this.issues.length} problemas:${colors.reset}\n`);
      
      this.issues.forEach((issue, index) => {
        console.log(`${colors.red}${index + 1}. ${issue.type}${colors.reset}`);
        if (issue.error) console.log(`   Error: ${issue.error}`);
        if (issue.fix) console.log(`   ${colors.yellow}Fix: ${issue.fix}${colors.reset}`);
      });

      if (this.fixes.length > 0) {
        console.log(`\n${colors.magenta}${colors.bright}🔧 Correcciones sugeridas:${colors.reset}\n`);
        this.fixes.forEach((fix, index) => {
          console.log(`${colors.magenta}${index + 1}. ${fix}${colors.reset}`);
        });
      }
    }

    // Guardar reporte
    const reportPath = path.join(__dirname, 'verification-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      issues: this.issues,
      fixes: this.fixes
    }, null, 2));
    
    console.log(`\n${colors.cyan}📄 Reporte completo guardado en: ${reportPath}${colors.reset}`);
  }

  async run() {
    console.log(`${colors.bright}${colors.magenta}`);
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║        VERIFICACIÓN EXHAUSTIVA - SLEEP PLUS ADMIN          ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log(`${colors.reset}\n`);

    await this.checkDuplicateFiles();
    await this.checkEnvironmentVariables();
    await this.checkDependencies();
    await this.checkDatabaseIntegrity();
    
    const backendOk = await this.checkBackendStatus();
    if (backendOk) {
      await this.checkEndpoints();
    }

    this.generateReport();
  }
}

// Ejecutar verificación
const verifier = new ProjectVerifier();
verifier.run().catch(error => {
  console.error(`${colors.red}Error fatal: ${error.message}${colors.reset}`);
  process.exit(1);
});

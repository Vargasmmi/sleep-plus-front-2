// debug-env.js
// Script para verificar las variables de entorno durante el build

console.log('🔍 Verificando configuración de ambiente...\n');

console.log('Variables de entorno del sistema:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VITE_API_URL:', process.env.VITE_API_URL);

console.log('\nContenido de .env.production:');
const fs = require('fs');
const path = require('path');

try {
  const envContent = fs.readFileSync(path.join(__dirname, '.env.production'), 'utf8');
  console.log(envContent);
} catch (e) {
  console.log('❌ No se pudo leer .env.production');
}

console.log('\nContenido de vite.config.ts:');
try {
  const viteConfig = fs.readFileSync(path.join(__dirname, 'vite.config.ts'), 'utf8');
  console.log(viteConfig.substring(0, 500) + '...');
} catch (e) {
  console.log('❌ No se pudo leer vite.config.ts');
}

console.log('\n📋 Para probar el build localmente:');
console.log('1. npm run build');
console.log('2. npm run preview');
console.log('3. Abrir http://localhost:3000 y verificar en DevTools');

// Script para limpiar archivos .js duplicados
const fs = require('fs');
const path = require('path');

function cleanDuplicateFiles(dir) {
  const files = fs.readdirSync(dir);
  let cleaned = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.includes('node_modules')) {
      cleaned += cleanDuplicateFiles(filePath);
    } else if (file.endsWith('.js') && !file.includes('.config.') && !file.includes('.backup')) {
      // Verificar si existe un archivo .tsx con el mismo nombre
      const tsxFile = filePath.replace('.js', '.tsx');
      const tsFile = filePath.replace('.js', '.ts');
      
      if (fs.existsSync(tsxFile) || fs.existsSync(tsFile)) {
        const backupPath = filePath + '.backup';
        fs.renameSync(filePath, backupPath);
        console.log(`Respaldado: ${filePath} -> ${backupPath}`);
        cleaned++;
      }
    }
  });
  
  return cleaned;
}

console.log('Limpiando archivos .js duplicados...\n');

const srcPath = path.join(__dirname, '..', 'src');
const totalCleaned = cleanDuplicateFiles(srcPath);

console.log(`\nTotal de archivos limpiados: ${totalCleaned}`);

// import-sample-data.js
// Script para importar datos de ejemplo al backend

const fs = require('fs');
const path = require('path');

console.log('📥 Importando datos de ejemplo...\n');

try {
  // Leer datos actuales
  const dbPath = path.join(__dirname, 'db.json');
  const currentData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  // Leer datos de ejemplo
  const sampleDataPath = path.join(__dirname, 'data', 'sample-data.json');
  const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));
  
  // Merge datos
  let updatedCount = 0;
  
  Object.keys(sampleData).forEach(entity => {
    if (!currentData[entity]) {
      currentData[entity] = [];
    }
    
    const existingIds = new Set(currentData[entity].map(item => item.id));
    const newItems = sampleData[entity].filter(item => !existingIds.has(item.id));
    
    if (newItems.length > 0) {
      currentData[entity].push(...newItems);
      console.log(`✅ ${entity}: Agregados ${newItems.length} registros`);
      updatedCount += newItems.length;
    } else {
      console.log(`ℹ️  ${entity}: No hay nuevos registros para agregar`);
    }
  });
  
  // Guardar datos actualizados
  fs.writeFileSync(dbPath, JSON.stringify(currentData, null, 2));
  
  console.log(`\n🎉 Importación completada! Se agregaron ${updatedCount} registros en total.`);
  console.log('\n📊 Estado actual de la base de datos:');
  
  Object.keys(currentData).forEach(entity => {
    if (currentData[entity].length > 0) {
      console.log(`   - ${entity}: ${currentData[entity].length} registros`);
    }
  });
  
} catch (error) {
  console.error('❌ Error al importar datos:', error.message);
  process.exit(1);
}

console.log('\n✨ Base de datos lista para usar!');

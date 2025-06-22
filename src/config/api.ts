// src/config/api.ts
// Configuración DEFINITIVA de la API

// URL del backend - HARDCODED para evitar problemas con variables de entorno
export const BACKEND_URL = 'https://sleep-plus-front-2-backend.dqyvuv.easypanel.host';

// Para desarrollo local
export const LOCAL_URL = 'http://localhost:3001';

// Función para obtener la URL correcta
export const getApiUrl = (): string => {
  // SIEMPRE usar la URL de producción en EasyPanel
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Si estamos en EasyPanel (cualquier subdominio de easypanel.host)
    if (hostname.includes('easypanel.host')) {
      console.log('🌐 EasyPanel detected - Using backend URL:', BACKEND_URL);
      return BACKEND_URL;
    }
    
    // Si estamos en desarrollo local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      console.log('🔧 Local development - Using local URL:', LOCAL_URL);
      return LOCAL_URL;
    }
  }
  
  // Por defecto, usar backend de producción
  console.log('🚀 Default - Using backend URL:', BACKEND_URL);
  return BACKEND_URL;
};

// Exportar la URL final
export const API_URL = getApiUrl();

// Log para debugging - SIEMPRE visible
console.log(`
╔════════════════════════════════════════════╗
║        API CONFIGURATION LOADED            ║
╠════════════════════════════════════════════╣
║ Current URL: ${API_URL}
║ Hostname: ${typeof window !== 'undefined' ? window.location.hostname : 'SSR'}
║ Backend URL: ${BACKEND_URL}
╚════════════════════════════════════════════╝
`);

// src/config/constants.ts
// Configuración hardcodeada para producción

export const API_CONFIG = {
  // URL del backend en EasyPanel - HARDCODED para producción
  BACKEND_URL: 'https://sleep-plus-front-2-backend.dqyvuv.easypanel.host',
  
  // Para desarrollo local
  DEV_URL: 'http://localhost:3001'
};

// Función para obtener la URL correcta
export const getApiUrl = (): string => {
  // En producción SIEMPRE usar la URL del backend
  if (typeof window !== 'undefined' && window.location.hostname.includes('easypanel.host')) {
    console.log('🌐 Running in EasyPanel - Using production backend URL');
    return API_CONFIG.BACKEND_URL;
  }
  
  // Para desarrollo local
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    console.log('🔧 Running locally - Using development URL');
    return API_CONFIG.DEV_URL;
  }
  
  // Default a producción
  console.log('🚀 Default - Using production backend URL');
  return API_CONFIG.BACKEND_URL;
};

// Export la URL final
export const API_URL = getApiUrl();

// Log para debugging
if (typeof window !== 'undefined') {
  console.log('🔍 API Configuration:', {
    hostname: window.location.hostname,
    apiUrl: API_URL,
    isEasyPanel: window.location.hostname.includes('easypanel.host')
  });
}

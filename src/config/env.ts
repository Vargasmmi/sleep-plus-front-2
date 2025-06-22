// config/env.ts
// Configuración centralizada de URLs de API

export const getApiUrl = (): string => {
  // Primero intentar con la variable de entorno de Vite
  if (import.meta.env.VITE_API_URL) {
    console.log('🔧 Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Si estamos en producción, usar la URL del backend de EasyPanel
  if (import.meta.env.PROD) {
    console.log('🔧 Using production URL');
    return 'https://sleep-plus-front-2-backend.dqyvuv.easypanel.host';
  }
  
  // En desarrollo
  console.log('🔧 Using development URL');
  return 'http://localhost:3001';
};

export const API_URL = getApiUrl();
export const IS_PRODUCTION = import.meta.env.PROD;

// Log para debugging
console.log('🌐 Environment Configuration:', {
  mode: import.meta.env.MODE,
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
  apiUrl: API_URL,
  viteApiUrl: import.meta.env.VITE_API_URL
});

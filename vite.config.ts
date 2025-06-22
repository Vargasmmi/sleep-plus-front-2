import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno basadas en el modo
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist'
    },
    server: {
      port: 5173,
      host: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      // Asegurarse de que las variables de entorno se pasen correctamente
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://sleep-plus-front-2-backend.dqyvuv.easypanel.host')
    }
  }
})

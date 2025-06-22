FROM node:18-alpine
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Variables de entorno críticas para EasyPanel
ENV NODE_ENV=production
ENV PORT=3001
ENV HOST=0.0.0.0

# Exponer puerto
EXPOSE 3001

# Verificar que el archivo db.json existe
RUN ls -la db.json || echo "db.json not found, will be created at runtime"

# IMPORTANTE: Escuchar en todas las interfaces (0.0.0.0)
CMD ["npm", "start"]
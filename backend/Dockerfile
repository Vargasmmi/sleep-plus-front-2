FROM node:18-alpine
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3001
ENV HOST=0.0.0.0

# Exponer puerto
EXPOSE 3001

# IMPORTANTE: Escuchar en todas las interfaces
CMD ["npm", "start"]
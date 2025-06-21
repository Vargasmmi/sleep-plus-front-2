FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3001

# Variables de entorno
ENV HOST=0.0.0.0
ENV PORT=3001
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["npm", "start"]

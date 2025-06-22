FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Force serve to listen on all interfaces (CRÍTICO para EasyPanel)
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the application with proper configuration for EasyPanel
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:3000 --no-clipboard"]

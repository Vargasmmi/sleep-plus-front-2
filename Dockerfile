FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
RUN npm install

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source code
COPY . .

# Build the frontend application
RUN cd frontend && npm run build

# Copy built files to the expected location
RUN cp -r frontend/dist ./dist

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Force serve to listen on all interfaces
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the application
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:3000 --no-clipboard"]

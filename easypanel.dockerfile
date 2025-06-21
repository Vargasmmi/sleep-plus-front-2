# Dockerfile for Sleep+ Admin deployment to EasyPanel

# Build stage for frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Build stage for backend
FROM node:18-alpine as backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install serve for frontend
RUN npm install -g serve

# Copy backend
COPY --from=backend-build /app/backend ./backend

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copy startup script
COPY <<EOF ./start.sh
#!/bin/sh

# Start backend
cd /app/backend
node server/server-simple.js &

# Start frontend
cd /app/frontend
serve -s dist -l 5173 &

# Keep container running
wait
EOF

RUN chmod +x start.sh

# Expose ports
EXPOSE 3001 5173

# Start both services
CMD ["./start.sh"]
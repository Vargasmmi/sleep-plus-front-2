#!/bin/sh

# Script de inicio para Sleep Plus Admin
echo "🚀 Starting Sleep Plus Admin..."

# Configurar API URL si está definida
if [ -n "$API_URL" ]; then
    echo "📡 Configuring API URL: $API_URL"
    ./replace-api-url.sh
fi

# Iniciar el servidor
echo "🏃 Starting server on port ${PORT:-80}"
exec node server/index.js 
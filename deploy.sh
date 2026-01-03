#!/bin/bash

# Villa Lily Blue - Production Deployment Script

set -e

echo "🏠 Villa Lily Blue - Deploying to production..."

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker compose --profile production down

# Build and start production container
echo "🔨 Building production image..."
docker compose --profile production up -d --build app-prod

# Wait for container to be ready
echo "⏳ Waiting for server to start..."
sleep 5

# Health check
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8166/fr | grep -q "200"; then
    echo "✅ Deployment successful!"
    echo "🌐 Site available at http://localhost:8166"
else
    echo "❌ Deployment failed - health check failed"
    docker compose --profile production logs app-prod
    exit 1
fi

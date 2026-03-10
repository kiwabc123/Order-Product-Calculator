#!/bin/bash
set -e

echo "Waiting for n8n to be ready..."
max_attempts=60
attempt=0

# Wait for n8n API to be ready
while [ $attempt -lt $max_attempts ]; do
  if curl -s http://localhost:5678/api/v1/workflows > /dev/null 2>&1; then
    echo "✓ n8n is ready!"
    break
  fi
  
  echo "Attempt $((attempt + 1))/$max_attempts - waiting for n8n..."
  sleep 2
  attempt=$((attempt + 1))
done

if [ $attempt -eq $max_attempts ]; then
  echo "✗ Timeout waiting for n8n"
  exit 1
fi

echo "Importing workflows..."

# Import order-analytics-workflow
if [ -f "/home/node/.n8n/workflows-import/order-analytics-workflow.json" ]; then
  echo "Importing order-analytics-workflow..."
  curl -X POST http://localhost:5678/api/v1/workflows \
    -H "Content-Type: application/json" \
    -d @/home/node/.n8n/workflows-import/order-analytics-workflow.json
  echo "✓ order-analytics-workflow imported"
fi

# Import get-orders-api
if [ -f "/home/node/.n8n/workflows-import/get-orders-api.json" ]; then
  echo "Importing get-orders-api..."
  curl -X POST http://localhost:5678/api/v1/workflows \
    -H "Content-Type: application/json" \
    -d @/home/node/.n8n/workflows-import/get-orders-api.json
  echo "✓ get-orders-api imported"
fi

echo "All workflows imported successfully!"

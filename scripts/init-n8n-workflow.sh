#!/bin/bash

# Wait for n8n to be ready
echo "Waiting for n8n to start..."
max_attempts=60
attempt=0

while [ $attempt -lt $max_attempts ]; do
  if curl -s http://localhost:5678/api/v1/workflows > /dev/null 2>&1; then
    echo "✓ n8n is ready!"
    break
  fi
  
  echo "Attempt $((attempt + 1))/$max_attempts - n8n not ready yet..."
  sleep 2
  attempt=$((attempt + 1))
done

if [ $attempt -eq $max_attempts ]; then
  echo "✗ Timeout waiting for n8n to start"
  exit 1
fi

# Import workflow
echo "Importing order-analytics-workflow..."
WORKFLOW_JSON=$(cat n8n/order-analytics-workflow.json)

curl -X POST http://localhost:5678/api/v1/workflows \
  -H "Content-Type: application/json" \
  -d "$WORKFLOW_JSON"

echo "✓ Workflow imported successfully!"

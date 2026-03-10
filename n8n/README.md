# N8n Workflows

This directory contains n8n workflow definitions for the Order Product Calculator integration.

## Workflows

### order-analytics-workflow.json

**Purpose:** Receives order data from the app and logs to Google Sheets.

**Webhook:** `POST /webhook/order-analytics`

**Payload:**
```json
{
  "name": "Orange",
  "price": 100,
  "quantity": 2,
  "discount": 5,
  "total": 195,
  "timestamp": "2026-03-10T16:22:13Z"
}
```

**Flow:** Webhook → Google Sheets (Append Row)

---

### get-orders-api.json

**Purpose:** Returns order history from Google Sheets for the Analytics page.

**Webhook:** `GET /webhook/orders`

**Response:**
```json
{
  "success": true,
  "data": [
    { "name": "Orange", "price": 100, "quantity": 2, ... },
    { "name": "Red", "price": 50, "quantity": 1, ... }
  ],
  "timestamp": "2026-03-10T17:00:00Z"
}
```

**Flow:** Webhook → Google Sheets (Read) → Respond to Webhook

## Quick Setup

```bash
# Start n8n
docker-compose up -d

# Import and activate workflows
.\scripts\init-n8n-workflow.bat
```

## Manual Import

1. Go to [http://localhost:5678](http://localhost:5678)
2. Click **+** → **Import workflow**
3. Upload both JSON files
4. Configure Google Sheets credentials
5. Activate the workflows

## Testing

**POST Order:**
```bash
curl -X POST http://localhost:5678/webhook/order-analytics \
  -H "Content-Type: application/json" \
  -d '{"name": "Orange", "price": 100, "quantity": 2, "discount": 5, "total": 195}'
```

**GET Orders:**
```bash
curl http://localhost:5678/webhook/orders
```

## Google Sheets Setup

1. Create a Google Sheet with columns: `name`, `price`, `quantity`, `discount`, `total`, `timestamp`
2. In n8n, create Google Sheets OAuth2 credentials
3. Update the workflow nodes with your Sheet ID
4. Activate the workflows

## Documentation

- [N8n Webhook Documentation](https://docs.n8n.io/nodes/n8n-nodes-base.webhook/)
- [N8n Google Sheets Documentation](https://docs.n8n.io/nodes/n8n-nodes-base.googleSheets/)

# N8n Setup Scripts

Automation scripts to initialize n8n workflows when starting the Docker container.

## Quick Start

### After running `docker-compose up -d`:

**On Windows (PowerShell):**
```powershell
.\scripts\init-n8n-workflow.bat
```

**On Mac/Linux:**
```bash
bash scripts/init-n8n-workflow.sh
```

Or use the combined setup script:

**Windows:**
```powershell
docker-compose up -d
Start-Sleep -Seconds 2
.\scripts\init-n8n-workflow.bat
```

**Mac/Linux:**
```bash
docker-compose up -d
bash scripts/init-n8n-workflow.sh
```

## What the Scripts Do

1. ✅ Wait for n8n to be fully ready (10 second startup delay)
2. ✅ Import `n8n/order-analytics-workflow.json` (POST webhook → Google Sheets)
3. ✅ Import `n8n/get-orders-api.json` (GET webhook → Return sheet data)
4. ✅ Activate all workflows automatically
5. ✅ Restart n8n to apply changes

## Manual Setup (Alternative)

If you prefer to import manually:

1. Navigate to [http://localhost:5678](http://localhost:5678)
2. Click **+** → **Import workflow**
3. Upload `n8n/order-analytics-workflow.json`
4. Click **Activate** to enable the workflow

## Troubleshooting

**Script times out waiting for n8n:**
- Ensure n8n container is running: `docker-compose ps`
- Check logs: `docker-compose logs n8n`

**Workflow import fails:**
- Verify n8n is accessible: `curl http://localhost:5678`
- Check n8n logs for API errors

**Need to reset:**
```bash
docker-compose down
rm -rf n8n-data/  # or rmdir n8n-data on Windows
docker-compose up -d
```

## File Structure

```
scripts/
├── init-n8n-workflow.sh   # Bash script (Mac/Linux)
├── init-n8n-workflow.bat  # Batch script (Windows)
└── README.md              # This file

n8n/
├── order-analytics-workflow.json  # POST /webhook/order-analytics
├── get-orders-api.json            # GET /webhook/orders
└── README.md                      # Workflow documentation
```

## Workflows Overview

| Workflow | Method | Path | Function |
|----------|--------|------|----------|
| Order Analytics | POST | `/webhook/order-analytics` | Log orders to Google Sheets |
| Get Orders API | GET | `/webhook/orders` | Fetch order history |

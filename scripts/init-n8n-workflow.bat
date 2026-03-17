@echo off
echo Importing n8n workflows...
echo.

echo Waiting for n8n to be ready...
timeout /t 5 /nobreak > nul

echo Importing order-analytics-workflow...
docker exec order-product-n8n n8n import:workflow --input=/workflows/order-analytics-workflow.json

echo Importing get-orders-api...
docker exec order-product-n8n n8n import:workflow --input=/workflows/get-orders-api.json

echo Importing order-ai-analysis-gemini-workflow...
docker exec order-product-n8n n8n import:workflow --input=/workflows/order-ai-analysis-gemini-workflow.json

echo.
echo Activating workflows...
for /f "tokens=1 delims=|" %%i in ('docker exec order-product-n8n n8n list:workflow') do (
    echo Activating workflow: %%i
    docker exec order-product-n8n n8n publish:workflow --id=%%i
)

echo.
echo Restarting n8n to apply changes...
docker restart order-product-n8n

echo.
echo Workflows imported and activated!
pause

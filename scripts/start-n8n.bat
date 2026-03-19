@echo off
REM Quick start script - starts Docker and imports workflows

echo Starting n8n containers...
docker-compose up -d

echo.
echo Waiting for n8n to be ready...
timeout /t 5 /nobreak

echo.
echo Importing and activating workflows...
.\scripts\init-n8n-workflow.bat

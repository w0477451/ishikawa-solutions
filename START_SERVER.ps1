Write-Host "Starting Ishikawa Solutions Backend Server..." -ForegroundColor Green
Write-Host ""

Set-Location server

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Server will start on http://localhost:5000" -ForegroundColor Cyan
Write-Host "Admin Dashboard: http://localhost:5000/admin" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm start


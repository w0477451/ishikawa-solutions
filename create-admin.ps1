Write-Host "Creating Admin User..." -ForegroundColor Green
Write-Host ""

# Check if server is running
try {
    $healthCheck = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 2
    Write-Host "✅ Backend server is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend server is NOT running!" -ForegroundColor Red
    Write-Host "Please start the server first:" -ForegroundColor Yellow
    Write-Host "  cd server" -ForegroundColor Yellow
    Write-Host "  npm start" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Creating admin user..." -ForegroundColor Yellow

$body = @{
    username = "admin"
    password = "admin123"
    email = "admin@ishikawasolutions.com"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
    
    Write-Host ""
    Write-Host "✅ Admin user created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Login credentials:" -ForegroundColor Cyan
    Write-Host "  Username: admin" -ForegroundColor White
    Write-Host "  Password: admin123" -ForegroundColor White
    Write-Host ""
    Write-Host "You can now login at: http://localhost:5000/admin" -ForegroundColor Cyan
    
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    
    if ($errorResponse -and $errorResponse.error -like "*already exists*") {
        Write-Host ""
        Write-Host "⚠️  Admin user already exists!" -ForegroundColor Yellow
        Write-Host "You can login with:" -ForegroundColor Cyan
        Write-Host "  Username: admin" -ForegroundColor White
        Write-Host "  Password: admin123" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "❌ Error creating admin user:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        if ($errorResponse) {
            Write-Host "Details: $($errorResponse.error)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Read-Host "Press Enter to exit"


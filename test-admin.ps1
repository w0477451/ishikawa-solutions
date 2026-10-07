Write-Host "=== Admin Dashboard Troubleshooting ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if backend is running
Write-Host "1. Testing backend connection..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -UseBasicParsing
    Write-Host "   ✅ Backend is running" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend is NOT running!" -ForegroundColor Red
    Write-Host "   Please start the server: cd server && npm start" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 2: Try to create admin user
Write-Host "2. Creating admin user..." -ForegroundColor Yellow
$createBody = @{
    username = "admin"
    password = "admin123"
    email = "admin@ishikawasolutions.com"
} | ConvertTo-Json

try {
    $createResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $createBody
    Write-Host "   ✅ Admin user created successfully" -ForegroundColor Green
} catch {
    $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($errorDetails -and $errorDetails.error -like "*already exists*") {
        Write-Host "   ⚠️  Admin user already exists (this is OK)" -ForegroundColor Yellow
    } else {
        Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($errorDetails) {
            Write-Host "   Details: $($errorDetails.error)" -ForegroundColor Red
        }
    }
}

Write-Host ""

# Test 3: Try to login
Write-Host "3. Testing login..." -ForegroundColor Yellow
$loginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/admin/login" -Method Post -ContentType "application/json" -Body $loginBody
    Write-Host "   ✅ Login successful!" -ForegroundColor Green
    Write-Host "   Token received: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host "   Username: $($loginResponse.user.username)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "✅ Everything is working! You can now login at:" -ForegroundColor Green
    Write-Host "   http://localhost:5000/admin" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   Username: admin" -ForegroundColor White
    Write-Host "   Password: admin123" -ForegroundColor White
} catch {
    Write-Host "   ❌ Login failed!" -ForegroundColor Red
    $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    if ($errorDetails) {
        Write-Host "   Error: $($errorDetails.error)" -ForegroundColor Red
    } else {
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "   - Admin user not created properly" -ForegroundColor Yellow
    Write-Host "   - MongoDB connection issue" -ForegroundColor Yellow
    Write-Host "   - Wrong password" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Try running this script again to recreate the admin user." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit"


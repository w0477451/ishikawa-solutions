@echo off
echo Starting Ishikawa Solutions Backend Server...
echo.

cd server

echo Checking if dependencies are installed...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting server...
echo.
echo ========================================
echo Server will start on http://localhost:5000
echo Admin Dashboard: http://localhost:5000/admin
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

pause


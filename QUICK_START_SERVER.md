# 🚀 Quick Start - Backend Server

## The Problem
`ERR_CONNECTION_REFUSED` means the backend server is **not running**.

## ✅ Solution: Start the Server

### Method 1: Use the Script (Easiest)

**Windows:**
- Double-click `START_SERVER.bat`
- Or right-click → Run with PowerShell → `START_SERVER.ps1`

### Method 2: Manual Start

1. **Open Terminal/PowerShell**
2. **Navigate to server folder:**
   ```powershell
   cd server
   ```

3. **Install dependencies (first time only):**
   ```powershell
   npm install
   ```

4. **Start the server:**
   ```powershell
   npm start
   ```

5. **You should see:**
   ```
   ✅ MongoDB connected
   🚀 Server running on port 5000
   📊 Admin dashboard: http://localhost:5000/admin
   ```

### Method 3: If MongoDB Error Appears

If you see `❌ MongoDB connection error`:

**Option A: Use MongoDB Atlas (Free Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Create `server/.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ishikawa-solutions
   PORT=5000
   JWT_SECRET=your-secret-key-here
   ```
7. Restart server

**Option B: Install MongoDB Locally**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Default connection will work: `mongodb://localhost:27017/ishikawa-solutions`

## ✅ After Server Starts

1. **Keep the terminal window open** (server runs in it)
2. **Open browser:** http://localhost:5000/admin
3. **Create admin user** (first time only):
   ```powershell
   $body = @{
       username = "admin"
       password = "admin123"
       email = "admin@ishikawasolutions.com"
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
   ```
4. **Login to dashboard:**
   - Username: `admin`
   - Password: `admin123`

## 🔍 Troubleshooting

### Port 5000 Already in Use
If you get "port already in use" error:
1. Change port in `server/.env`:
   ```env
   PORT=5001
   ```
2. Update `admin/admin.js`:
   ```javascript
   const API_URL = 'http://localhost:5001/api';
   ```

### npm Command Not Found
Install Node.js from: https://nodejs.org/

### Still Not Working?
1. Check server console for errors
2. Make sure terminal stays open (server runs in foreground)
3. Try accessing: http://localhost:5000/api/health
4. Should return: `{"status":"ok"}`

## 📝 Important Notes

- **Keep the terminal open** - Closing it stops the server
- **Server must be running** - Admin dashboard needs it
- **MongoDB required** - Use Atlas (cloud) or install locally
- **First time setup** - Need to create admin user


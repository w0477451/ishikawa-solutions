# 🚀 How to Start the Backend Server

## The Error You're Seeing
`ERR_CONNECTION_REFUSED` means **the backend server is not running**.

## ✅ Solution: Start the Server

### Easiest Way (Double-Click)
1. **Double-click** `START_SERVER.bat` in the project root
2. A terminal window will open
3. Wait for: `🚀 Server running on port 5000`
4. **Keep this window open!** (Closing it stops the server)
5. Now open: http://localhost:5000/admin

### Manual Way (Terminal)

1. **Open PowerShell or Command Prompt**

2. **Navigate to project folder:**
   ```powershell
   cd "C:\Users\DELL\Downloads\ishikawa-solutions-redesign"
   ```

3. **Go to server folder:**
   ```powershell
   cd server
   ```

4. **Install dependencies (if not done):**
   ```powershell
   npm install
   ```

5. **Start the server:**
   ```powershell
   npm start
   ```

6. **You should see:**
   ```
   ✅ MongoDB connected
   🚀 Server running on port 5000
   📊 Admin dashboard: http://localhost:5000/admin
   ```

7. **Keep the terminal open!** The server runs in this window.

8. **Open browser:** http://localhost:5000/admin

## ⚠️ Important Notes

- **Keep terminal open** - Server stops if you close it
- **MongoDB needed** - If you see MongoDB error, see below
- **Port 5000** - Make sure nothing else uses it

## 🔧 If You See MongoDB Error

If you see: `❌ MongoDB connection error`

### Quick Fix: Use MongoDB Atlas (Free Cloud)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Create file: `server/.env`
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ishikawa-solutions
   PORT=5000
   JWT_SECRET=my-secret-key-123
   ```
7. Restart server

## 📝 After Server Starts

1. **Create admin user** (first time only):
   
   Open **NEW** PowerShell window:
   ```powershell
   $body = @{
       username = "admin"
       password = "admin123"
       email = "admin@ishikawasolutions.com"
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
   ```

2. **Login to dashboard:**
   - Go to: http://localhost:5000/admin
   - Username: `admin`
   - Password: `admin123`

## ✅ Success Checklist

- [ ] Server terminal shows "Server running on port 5000"
- [ ] Can access: http://localhost:5000/api/health (returns `{"status":"ok"}`)
- [ ] Can access: http://localhost:5000/admin
- [ ] Admin user created
- [ ] Can login to dashboard

## 🆘 Still Not Working?

1. **Check if server is running:**
   - Look at terminal - should show "Server running"
   - If not, check for error messages

2. **Test backend:**
   - Open: http://localhost:5000/api/health
   - Should show: `{"status":"ok"}`

3. **Check port:**
   - Make sure port 5000 is not used by another app
   - Try changing port in `server/.env`: `PORT=5001`

4. **Check firewall:**
   - Windows might block it
   - Allow Node.js through firewall

## 🎯 Quick Commands Reference

```powershell
# Start server
cd server
npm start

# Test if server is running
Invoke-WebRequest http://localhost:5000/api/health

# Create admin user
$body = @{username="admin";password="admin123";email="admin@test.com"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
```


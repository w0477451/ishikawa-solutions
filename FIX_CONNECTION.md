# Fix Admin Dashboard Connection Error

## Quick Diagnosis

### Step 1: Check if Backend is Running

Open terminal and run:
```bash
cd server
npm start
```

**Expected output:**
```
✅ MongoDB connected
🚀 Server running on port 5000
📊 Admin dashboard: http://localhost:5000/admin
🌐 API: http://localhost:5000/api
```

### Step 2: Test Backend Connection

Open this file in your browser:
```
admin/test-connection.html
```

Or test manually:
```bash
# Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/health"

# Mac/Linux
curl http://localhost:5000/api/health
```

**Should return:** `{"status":"ok","timestamp":"..."}`

## Common Fixes

### Fix 1: Backend Not Running

**Problem:** Server not started

**Solution:**
```bash
cd server
npm install  # If not done already
npm start
```

### Fix 2: Wrong Port

**Problem:** Server running on different port

**Check:** Look at server console output for the actual port

**Solution:** Update `admin/admin.js`:
```javascript
const API_URL = 'http://localhost:YOUR_PORT/api';
```

### Fix 3: MongoDB Not Connected

**Problem:** Server can't connect to MongoDB

**Solution A - Use MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ishikawa-solutions
   ```

**Solution B - Install MongoDB Locally:**
- Windows: Download from mongodb.com
- Mac: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

### Fix 4: Use Direct File Access

Instead of `http://localhost:5000/admin`, just open:
```
admin/index.html
```

The file will work as long as backend is running on port 5000.

### Fix 5: CORS Error

**Problem:** Browser blocking requests

**Solution:** Backend already has CORS enabled. If still having issues:
1. Check browser console (F12)
2. Look for CORS errors
3. Make sure backend is running

## Step-by-Step Setup

1. **Start MongoDB:**
   ```bash
   # If installed locally
   mongod
   ```

2. **Start Backend:**
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Create Admin User:**
   ```powershell
   # Windows PowerShell
   $body = @{
       username = "admin"
       password = "admin123"
       email = "admin@test.com"
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
   ```

4. **Open Admin Dashboard:**
   - Option A: `http://localhost:5000/admin`
   - Option B: Open `admin/index.html` directly

5. **Login:**
   - Username: `admin`
   - Password: `admin123`

## Still Not Working?

1. **Check server console** - Look for error messages
2. **Check browser console** (F12) - Look for JavaScript errors
3. **Check network tab** (F12) - See if requests are being made
4. **Try different browser** - Sometimes extensions cause issues
5. **Check firewall** - Make sure port 5000 is not blocked

## Alternative: Use Simple HTTP Server

If Express serving doesn't work:

```bash
# Install http-server globally
npm install -g http-server

# Navigate to admin folder
cd admin

# Start server
http-server -p 8080 -c-1

# Open: http://localhost:8080/index.html
```

Then update `admin/admin.js`:
```javascript
const API_URL = 'http://localhost:5000/api'; // Backend still on 5000
```


# Fix "Failed to login" Error

## The Problem
You're getting "Failed to login" with a 500 error. This usually means **MongoDB is not connected**.

## ✅ Quick Fix

### Step 1: Check MongoDB Connection

Look at your server terminal. You should see:
```
✅ MongoDB connected
```

If you see:
```
❌ MongoDB connection error
```

**This is the problem!** MongoDB needs to be connected.

### Step 2: Fix MongoDB Connection

**Option A: Use MongoDB Atlas (Easiest - Free Cloud)**

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster (takes 3-5 minutes)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Create `server/.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ishikawa-solutions?retryWrites=true&w=majority
   PORT=5000
   JWT_SECRET=my-secret-key-123
   ```
7. **Restart the server** (stop with Ctrl+C, then `npm start` again)

**Option B: Install MongoDB Locally**

- Windows: Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Default connection should work: `mongodb://localhost:27017/ishikawa-solutions`

### Step 3: Create Admin User

After MongoDB is connected, create the admin user:

**Run this in PowerShell:**
```powershell
$body = @{
    username = "admin"
    password = "admin123"
    email = "admin@ishikawasolutions.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
```

**Or use the test script:**
```powershell
.\test-admin.ps1
```

### Step 4: Test Login

```powershell
$body = @{username="admin";password="admin123"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/admin/login" -Method Post -ContentType "application/json" -Body $body
```

Should return a token if successful.

### Step 5: Login to Dashboard

1. Go to: http://localhost:5000/admin
2. Username: `admin`
3. Password: `admin123`
4. Click Login

## 🔍 Diagnostic Steps

### Check Server Status

Look at server terminal for:
- ✅ MongoDB connected
- 🚀 Server running on port 5000

### Check MongoDB Connection

The server will show connection status when it starts. If you see MongoDB error, that's the issue.

### Test Backend API

```powershell
# Health check
Invoke-RestMethod http://localhost:5000/api/health

# Should return: {"status":"ok"}
```

### Check Server Logs

When you try to login, check the server terminal for error messages. It will show:
- MongoDB connection errors
- Database query errors
- Authentication errors

## 🎯 Most Common Issue

**90% of the time, it's MongoDB not connected.**

The server starts fine, but when it tries to query the database for the admin user, it fails because MongoDB isn't connected.

**Solution:** Use MongoDB Atlas (cloud) - it's free and works immediately.

## ✅ Success Checklist

- [ ] MongoDB is connected (server shows "✅ MongoDB connected")
- [ ] Admin user created (got success message)
- [ ] Can test login via API (returns token)
- [ ] Can login via dashboard

## 🆘 Still Not Working?

1. **Check server terminal** - Look for error messages
2. **Check MongoDB connection** - Must show "✅ MongoDB connected"
3. **Try test script:** `.\test-admin.ps1`
4. **Check browser console** (F12) - Look for JavaScript errors
5. **Verify admin user exists** - Try creating it again

The key is: **MongoDB must be connected for login to work!**


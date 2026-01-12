# Troubleshooting Admin Dashboard Connection Error

## Common Issues and Solutions

### Issue: "Connection Error" or "Failed to fetch"

#### Solution 1: Check if Backend Server is Running

1. Open a terminal/command prompt
2. Navigate to server directory:
   ```bash
   cd server
   ```
3. Check if server is running:
   ```bash
   npm start
   ```
4. You should see:
   ```
   🚀 Server running on port 5000
   📊 Admin dashboard: http://localhost:5000/admin
   ```

#### Solution 2: Check Server Port

Make sure nothing else is using port 5000:
- Windows: `netstat -ano | findstr :5000`
- Mac/Linux: `lsof -i :5000`

If port is in use, change it in `server/.env`:
```env
PORT=5001
```
Then update `admin/admin.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

#### Solution 3: Use Direct File Access

Instead of accessing via server, open the file directly:

1. Navigate to `admin` folder
2. Double-click `index.html`
3. Update `admin/admin.js` to point to your backend:
   ```javascript
   const API_URL = 'http://localhost:5000/api';
   ```

#### Solution 4: Check Browser Console

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for errors
4. Common errors:
   - `Failed to fetch` → Backend not running
   - `CORS error` → Backend CORS not configured
   - `404 Not Found` → Wrong API URL

#### Solution 5: Verify MongoDB Connection

The server needs MongoDB to work. Check server console for:
```
✅ MongoDB connected
```
If you see:
```
❌ MongoDB connection error
```

**Fix MongoDB:**
- Install MongoDB locally, OR
- Use MongoDB Atlas (cloud) and update `MONGODB_URI` in `server/.env`

#### Solution 6: Test Backend API Directly

Test if backend is working:
```bash
# Health check
curl http://localhost:5000/api/health

# Should return: {"status":"ok","timestamp":"..."}
```

#### Solution 7: Check File Paths

Make sure the admin folder structure is:
```
project-root/
├── server/
│   └── server.js
└── admin/
    ├── index.html
    └── admin.js
```

## Quick Fix: Alternative Access Method

### Method 1: Use Python Simple Server

```bash
cd admin
python -m http.server 8080
```
Then open: `http://localhost:8080/index.html`

### Method 2: Use VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `admin/index.html`
3. Select "Open with Live Server"

### Method 3: Use Node.js http-server

```bash
npm install -g http-server
cd admin
http-server -p 8080
```

## Still Not Working?

1. **Check server logs** - Look for error messages
2. **Check browser network tab** - See what requests are failing
3. **Verify firewall** - Make sure port 5000 is not blocked
4. **Try different browser** - Sometimes browser extensions cause issues
5. **Clear browser cache** - Old cached files might cause problems

## Test Checklist

- [ ] Backend server is running (`npm start` in server folder)
- [ ] Server shows "Server running on port 5000"
- [ ] MongoDB is connected (or using MongoDB Atlas)
- [ ] Can access `http://localhost:5000/api/health`
- [ ] Admin user is created
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API calls

## Need More Help?

Check:
- Server console output
- Browser developer console (F12)
- Network tab in browser dev tools
- MongoDB connection status


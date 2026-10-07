# Create Admin User - Step by Step

## The Problem
"Failed to login" means the admin user doesn't exist yet.

## ✅ Solution: Create Admin User

### Step 1: Make Sure Server is Running

Open terminal and check:
```powershell
# Should see "Server running on port 5000"
cd server
npm start
```

### Step 2: Create Admin User

**Open a NEW PowerShell window** (keep server running in the first one):

```powershell
$body = @{
    username = "admin"
    password = "admin123"
    email = "admin@ishikawasolutions.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
```

**Expected response:**
```json
{
  "success": true,
  "message": "Admin created successfully"
}
```

### Step 3: Login to Dashboard

1. Go to: http://localhost:5000/admin
2. Username: `admin`
3. Password: `admin123`
4. Click Login

## 🔧 Alternative: Using curl (if PowerShell doesn't work)

**Windows (with curl):**
```bash
curl -X POST http://localhost:5000/api/admin/create -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\",\"email\":\"admin@ishikawasolutions.com\"}"
```

## ⚠️ Common Errors

### Error: "Username already exists"
- Admin user already created
- Try logging in with: `admin` / `admin123`
- Or create different username

### Error: "Connection refused"
- Backend server not running
- Start it: `cd server && npm start`

### Error: "MongoDB connection error"
- MongoDB not connected
- See MongoDB setup in `HOW_TO_START.md`

## ✅ Test Login

After creating admin, test the login API:

```powershell
$body = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/admin/login" -Method Post -ContentType "application/json" -Body $body
```

Should return a token if successful.


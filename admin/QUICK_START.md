# Quick Start - Admin Dashboard Preview

## 🚀 Fastest Way to Preview

### Step 1: Start Backend Server
```bash
cd server
npm install  # Only first time
npm start
```

You should see:
```
🚀 Server running on port 5000
📊 Admin dashboard: http://localhost:5000/admin
```

### Step 2: Create Admin User (First Time Only)

**Windows PowerShell:**
```powershell
$body = @{
    username = "admin"
    password = "admin123"
    email = "admin@ishikawasolutions.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
```

**Mac/Linux Terminal:**
```bash
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@ishikawasolutions.com"
  }'
```

### Step 3: Open Admin Dashboard

**Option 1: Via Backend Server (Recommended)**
- Open browser and go to: **http://localhost:5000/admin**

**Option 2: Direct File**
- Navigate to `admin` folder
- Double-click `index.html`
- Or right-click → Open with → Your Browser

### Step 4: Login
- **Username**: `admin`
- **Password**: `admin123`

## ✅ You're In!

The dashboard will show:
- **Overview**: Stats and charts
- **Contacts**: All form submissions
- **Analytics**: Traffic and conversion data
- **Settings**: Configuration options

## 🧪 Test with Sample Data

1. Start your frontend: `npm run dev`
2. Go to the landing page
3. Fill out the CTA form
4. Submit it
5. Refresh admin dashboard - you'll see the new contact!

## 🔧 Troubleshooting

**"Failed to fetch" Error:**
- Make sure backend is running on port 5000
- Check browser console (F12) for details
- Verify MongoDB is connected

**"Invalid credentials":**
- Make sure you created the admin user
- Check username/password spelling
- Try creating admin again

**Dashboard is blank:**
- Submit a contact form first to generate data
- Check backend console for errors
- Verify MongoDB connection

## 📝 Notes

- Admin dashboard connects to: `http://localhost:5000/api`
- If you change the backend port, update `API_URL` in `admin/admin.js`
- Token is stored in browser localStorage
- Logout clears the token


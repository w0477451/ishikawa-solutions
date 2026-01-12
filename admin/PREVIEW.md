# How to Preview Admin Dashboard

## Quick Steps

### 1. Start the Backend Server

First, make sure your backend server is running:

```bash
cd server
npm install  # if you haven't already
npm start
```

The server should be running on `http://localhost:5000`

### 2. Create an Admin User (First Time Only)

Open a terminal and run:

```bash
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@ishikawasolutions.com"
  }'
```

Or use PowerShell (Windows):

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body '{"username":"admin","password":"admin123","email":"admin@ishikawasolutions.com"}'
```

### 3. Open the Admin Dashboard

**Option A: Direct File Open**
- Simply open `admin/index.html` in your browser
- Double-click the file or right-click → Open with → Browser

**Option B: Using a Local Server (Recommended)**
- If you have Python installed:
  ```bash
  cd admin
  python -m http.server 8080
  ```
  Then open: `http://localhost:8080/index.html`

- Or use VS Code Live Server extension
- Or use any local web server

### 4. Login

- **Username**: `admin` (or whatever you created)
- **Password**: `admin123` (or whatever you set)

## Troubleshooting

### "Failed to fetch" or Connection Error
- Make sure backend server is running on port 5000
- Check browser console for errors
- Verify `API_URL` in `admin/admin.js` is `http://localhost:5000/api`

### "Invalid credentials" Error
- Make sure you created the admin user first
- Check username and password are correct
- Try creating the admin user again

### Dashboard Shows No Data
- Submit a contact form from the main website first
- Check MongoDB is running and connected
- Verify backend server logs for errors

## Testing the Full Flow

1. Start backend: `cd server && npm start`
2. Start frontend: `npm run dev` (in root directory)
3. Open main website: `http://localhost:3000` (or your frontend port)
4. Submit a contact form
5. Open admin dashboard: `admin/index.html`
6. Login and see the submitted contact

## Alternative: Serve Admin from Backend

You can also serve the admin dashboard from the backend server. Add this to `server/server.js`:

```javascript
// Serve admin dashboard
app.use(express.static('../admin'));
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/index.html'));
});
```

Then access at: `http://localhost:5000/admin`


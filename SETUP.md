# Quick Setup Guide

## 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Edit .env with your MongoDB URI and other settings

# Start MongoDB (if using local)
# Make sure MongoDB is running on localhost:27017

# Create admin user (first time only)
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your-secure-password",
    "email": "admin@ishikawasolutions.com"
  }'

# Start backend server
npm start
```

## 3. Configure Google Ads

1. Open `index.html`
2. Replace `GTM-XXXXXXX` with your Google Tag Manager ID
3. Replace `AW-CONVERSION_ID` with your Google Ads conversion ID
4. Replace `YOUR_PIXEL_ID` with your Facebook Pixel ID (optional)

## 4. Configure API Keys

Create `.env` file in root:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

Or update directly in `components/AIChatbot.tsx`:
```typescript
const API_KEY = "your-gemini-api-key-here";
```

## 5. Access Admin Dashboard

1. Open `admin/index.html` in your browser
2. Login with your admin credentials
3. Manage contacts and view analytics

## 6. Test Form Submission

1. Fill out the CTA form on the landing page
2. Check admin dashboard to see the submission
3. Verify email notification (if configured)

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in server/.env
- Try using MongoDB Atlas (cloud) instead

### API Connection Error
- Check if backend server is running on port 5000
- Verify VITE_API_URL in frontend .env
- Check CORS settings in server.js

### Chatbot Not Working
- Verify Gemini API key is correct
- Check browser console for errors
- Ensure API key has proper permissions

### Admin Dashboard Not Loading
- Check if backend is running
- Verify admin credentials
- Check browser console for errors


# Ishikawa Solutions - Landing Page

A modern, responsive landing page with AI chatbot, backend API, and admin dashboard optimized for Google Ads campaigns.

## Features

- ✅ **Fully Responsive Design** - Mobile-friendly across all devices
- ✅ **AI Chatbot** - Powered by Google Gemini API with streaming responses
- ✅ **Backend API** - Node.js/Express server for form submissions and analytics
- ✅ **Admin Dashboard** - Complete dashboard for managing contacts and viewing analytics
- ✅ **Google Ads Integration** - Conversion tracking and UTM parameter tracking
- ✅ **SEO Optimized** - Meta tags, structured data, and Open Graph
- ✅ **Analytics Tracking** - Page views, form submissions, and user interactions

## Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your-gemini-api-key
```

3. Start development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ishikawa-solutions
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@ishikawasolutions.com
```

4. Start MongoDB (if using local):
```bash
# Make sure MongoDB is running
```

5. Create admin user (first time only):
```bash
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your-secure-password",
    "email": "admin@ishikawasolutions.com"
  }'
```

6. Start backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### Admin Dashboard

1. Open `admin/index.html` in your browser
2. Login with your admin credentials
3. Access dashboard at: `http://localhost:5000/admin` (if served from backend) or open `admin/index.html` directly

## Google Ads Setup

1. Replace `GTM-XXXXXXX` in `index.html` with your Google Tag Manager ID
2. Replace `AW-CONVERSION_ID` with your Google Ads conversion ID
3. Replace `YOUR_PIXEL_ID` with your Facebook Pixel ID (if using)

## API Endpoints

### Public Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/analytics` - Track analytics events
- `GET /api/health` - Health check

### Admin Endpoints (Requires Authentication)

- `POST /api/admin/login` - Admin login
- `GET /api/admin/contacts` - Get all contacts
- `PATCH /api/admin/contacts/:id` - Update contact status
- `GET /api/admin/analytics` - Get analytics data
- `POST /api/admin/create` - Create admin user (first time only)

## Project Structure

```
├── components/          # React components
│   ├── AIChatbot.tsx   # AI chatbot component
│   ├── CTA.tsx         # Contact form component
│   └── ...
├── server/             # Backend server
│   ├── server.js       # Express server
│   └── package.json    # Server dependencies
├── admin/              # Admin dashboard
│   ├── index.html      # Dashboard HTML
│   └── admin.js        # Dashboard JavaScript
└── index.html          # Main HTML with SEO
```

## Mobile Responsiveness

All components are fully responsive with:
- Mobile-first design approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized images and layouts

## SEO Features

- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD)
- Canonical URLs
- Sitemap ready
- Fast loading times

## Analytics

The system tracks:
- Page views
- Form submissions
- Chatbot interactions
- Scroll depth
- UTM parameters (source, medium, campaign)
- User behavior

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, GSAP
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **AI**: Google Gemini API
- **Analytics**: Custom tracking + Google Analytics
- **Deployment**: Vite for frontend

## License

MIT

## Support

For issues or questions, please contact support@ishikawasolutions.com

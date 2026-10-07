# Backend Server - Ishikawa Solutions

Express.js backend server for handling form submissions, analytics, and admin operations.

## Features

- Contact form submission handling
- Analytics tracking
- Admin authentication (JWT)
- MongoDB database integration
- Email notifications
- Rate limiting
- CORS enabled

## API Endpoints

### Public

- `POST /api/contact` - Submit contact form
- `POST /api/analytics` - Track analytics events
- `GET /api/health` - Health check

### Admin (Requires JWT Token)

- `POST /api/admin/login` - Admin login
- `GET /api/admin/contacts` - Get all contacts (with pagination and filters)
- `PATCH /api/admin/contacts/:id` - Update contact status
- `GET /api/admin/analytics` - Get analytics dashboard data
- `POST /api/admin/create` - Create admin user (first time only)

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ishikawa-solutions
JWT_SECRET=your-super-secret-jwt-key-change-this
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@ishikawasolutions.com
```

## Database Schema

### Contact
- name (String, required)
- email (String, required)
- phone (String, required)
- company (String)
- service (String, required)
- message (String)
- source (String, default: 'landing-page')
- utm_source, utm_medium, utm_campaign (String)
- status (String: new, contacted, converted, archived)
- createdAt (Date)
- notes (String)

### Analytics
- event (String: page_view, form_submit, chatbot_interaction, etc.)
- page (String)
- userAgent (String)
- ip (String)
- referrer (String)
- utm_source, utm_medium, utm_campaign (String)
- timestamp (Date)

### Admin
- username (String, unique, required)
- password (String, hashed, required)
- email (String, required)
- role (String, default: 'admin')
- createdAt (Date)

## Usage

```bash
# Install dependencies
npm install

# Start server
npm start

# Development mode (with auto-reload)
npm run dev
```

## Creating Admin User

First time setup:

```bash
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "secure-password-123",
    "email": "admin@ishikawasolutions.com"
  }'
```

## Security Notes

- Change JWT_SECRET in production
- Use strong passwords for admin accounts
- Enable HTTPS in production
- Configure proper CORS origins
- Use environment variables for sensitive data
- Consider adding request validation middleware


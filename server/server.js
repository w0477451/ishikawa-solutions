import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize, DataTypes, Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// ==================== DATABASE CONNECTION (Sequelize/MySQL) ====================
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    dialectOptions: {
      // SSL might be required for some remote hosts, usually safe to try without first or set rejectUnauthorized: false if needed
      ssl: {
        require: false,
        rejectUnauthorized: false
      }
    }
  }
);

// Connect and Sync
sequelize.authenticate()
  .then(() => console.log('✅ Remote MySQL connected successfully.'))
  .catch(err => {
    console.error('❌ MySQL connection error:', err);
    console.error('Check if your IP is whitelisted in the hosting provider (Remote MySQL).');
  });

// ==================== MODELS ====================

const Contact = sequelize.define('Contact', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING },
  service: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT },
  source: { type: DataTypes.STRING, defaultValue: 'landing-page' },
  utm_source: { type: DataTypes.STRING },
  utm_medium: { type: DataTypes.STRING },
  utm_campaign: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'new' }, // new, contacted, converted, archived
  notes: { type: DataTypes.TEXT }
});

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'admin' }
});

const Analytics = sequelize.define('Analytics', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  event: { type: DataTypes.STRING, allowNull: false }, // page_view, form_submit, chatbot_interaction
  page: { type: DataTypes.STRING },
  userAgent: { type: DataTypes.STRING },
  ip: { type: DataTypes.STRING },
  referrer: { type: DataTypes.TEXT },
  utm_source: { type: DataTypes.STRING },
  utm_medium: { type: DataTypes.STRING },
  utm_campaign: { type: DataTypes.STRING },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

const Content = sequelize.define('Content', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  section: { type: DataTypes.STRING, allowNull: false }, // e.g., 'hero', 'about'
  key: { type: DataTypes.STRING, allowNull: false, unique: true }, // e.g., 'hero_title'
  value: { type: DataTypes.TEXT, allowNull: false }, // Changed to TEXT for longer content
  imgUrl: { type: DataTypes.STRING }, // Optional image
  lastUpdated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Sync database (creates tables if they don't exist)
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database & tables synced'))
  .catch(err => console.error('❌ Sync error:', err));


// Email configuration (Hostinger SMTP default, or custom)
const RECIPIENT_EMAIL = process.env.ADMIN_EMAIL || 'business@ishikawasolutions.com';

const createEmailTransporter = () => {
  if (process.env.SMTP_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Hostinger / Custom SMTP (Hostinger: smtp.hostinger.com, port 465)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// ==================== PUBLIC ROUTES ====================

// Submit Consultation / Contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, service, message, utm_source, utm_medium, utm_campaign, source } = req.body;

    // Flexible validation for leads
    if (!email && !phone) {
      return res.status(400).json({ error: 'At least Email or Phone is required' });
    }

    const leadSource = source || 'website-form';

    const contact = await Contact.create({
      name: name || 'Anonymous User',
      email: email || '',
      phone: phone || '',
      company: company || '',
      service: service || 'General Inquiry',
      message: message || '',
      utm_source: utm_source || 'direct',
      utm_medium,
      utm_campaign,
      source: leadSource
    });

    // Track analytics
    await Analytics.create({
      event: 'form_submit',
      page: leadSource,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      referrer: req.headers.referer,
      utm_source,
      utm_medium,
      utm_campaign
    });

    // Send email notification to business@ishikawasolutions.com
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createEmailTransporter();
        const mailOptions = {
          from: `"Ishikawa Solutions" <${process.env.EMAIL_USER}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email || undefined,
          subject: `✨ New Consultation Enquiry: ${name || 'Prospective Client'} - ${service || 'General'}`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
              <div style="background: linear-gradient(135deg, #D03BF3 0%, #22D3EE 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px;">New Consultation Request</h1>
                <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 14px;">Ishikawa Solutions • Lead Notification</p>
              </div>

              <div style="padding: 28px 24px;">
                <p style="font-size: 15px; color: #374151; margin-top: 0; line-height: 1.5;">
                  You have received a new consultation enquiry through your website. Here are the client's details:
                </p>

                <table style="width: 100%; border-collapse: collapse; margin-top: 18px; font-size: 14px;">
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: 600; color: #6b7280; width: 35%;">Client Name:</td>
                    <td style="padding: 12px 0; color: #111827; font-weight: 600;">${name || 'Not provided'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Email Address:</td>
                    <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email || 'Not provided'}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Phone Number:</td>
                    <td style="padding: 12px 0;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${phone || 'Not provided'}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Company:</td>
                    <td style="padding: 12px 0; color: #111827;">${company || 'Not provided'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Service Selected:</td>
                    <td style="padding: 12px 0; color: #c026d3; font-weight: bold;">${service || 'General Inquiry'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">Lead Source:</td>
                    <td style="padding: 12px 0; color: #4b5563;">${leadSource}</td>
                  </tr>
                  <tr>
                    <td style="padding: 14px 0 6px 0; font-weight: 600; color: #6b7280; vertical-align: top;">Message:</td>
                    <td style="padding: 14px 0 6px 0; color: #111827; line-height: 1.6;">${message ? message.replace(/\n/g, '<br/>') : '<em>No message provided</em>'}</td>
                  </tr>
                </table>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                  <a href="mailto:${email}?subject=Regarding%20your%20consultation%20with%20Ishikawa%20Solutions" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
                    Reply to ${name || 'Client'}
                  </a>
                </div>
              </div>

              <div style="background-color: #f9fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6;">
                Notification dispatched to <strong>${RECIPIENT_EMAIL}</strong> • Ishikawa Solutions System
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Enquiry email dispatched successfully to ${RECIPIENT_EMAIL}`);
      } catch (mailError) {
        console.error('⚠️ Nodemailer dispatch error (lead was safely stored in database):', mailError.message);
      }
    } else {
      console.log(`ℹ️ Lead recorded in MySQL. To send live email notifications to ${RECIPIENT_EMAIL}, provide EMAIL_USER and EMAIL_PASS in server/.env`);
    }

    res.json({
      success: true,
      message: 'Thank you! We have received your enquiry and will contact you soon.',
      contactId: contact.id
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Track analytics
app.post('/api/analytics', async (req, res) => {
  try {
    const { event, page, utm_source, utm_medium, utm_campaign } = req.body;
    await Analytics.create({
      event: event || 'page_view',
      page,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      referrer: req.headers.referer,
      utm_source, utm_medium, utm_campaign
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to track analytics' });
  }
});

// ==================== CONTENT ROUTES (CMS) ====================

app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.findAll();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/admin/content', authenticateToken, async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) return res.status(400).json({ error: 'Invalid data format' });

    for (const item of items) {
      if (item.key) {
        // Upsert behavior
        const existing = await Content.findOne({ where: { key: item.key } });
        if (existing) {
          await existing.update({
            value: item.value,
            section: item.section || 'general',
            lastUpdated: new Date()
          });
        } else {
          await Content.create({
            key: item.key,
            value: item.value,
            section: item.section || 'general'
          });
        }
      }
    }
    res.json({ success: true, message: 'Content updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// ==================== ADMIN ROUTES ====================

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Required fields missing' });

    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token, user: { username: admin.username, email: admin.email, role: admin.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Get all contacts
app.get('/api/admin/contacts', authenticateToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = status ? { status } : {};

    const { count, rows } = await Contact.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      contacts: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Update contact status
app.patch('/api/admin/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    await contact.update({ status, notes });
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Analytics Dashboard
app.get('/api/admin/analytics', authenticateToken, async (req, res) => {
  try {
    const totalViews = await Analytics.count({ where: { event: 'page_view' } });
    const totalSubmissions = await Analytics.count({ where: { event: 'form_submit' } });
    const totalChatbot = await Analytics.count({ where: { event: 'chatbot_interaction' } });

    res.json({ totalViews, totalSubmissions, totalChatbot });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Create Admin (Run Once)
app.post('/api/admin/create', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({ username, password: hashedPassword, email });
    res.json({ success: true, message: 'Admin created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', db: 'mysql' }));

// Static Admin (Legacy)
app.use('/admin', express.static(path.join(__dirname, '../admin'), { index: false }));
app.get('/admin/*', (req, res) => res.sendFile(path.join(__dirname, '../admin/index.html')));

// Only listen if run directly (not imported)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} (MySQL Mode)`);
  });
}

export default app;

const express  = require('express');
const cors     = require('cors');
const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const User    = require('./models/User');
const Request = require('./models/Request');
const Admin   = require('./models/Admin');
const Project = require('./models/Project');

const app  = express();
const PORT = 4000;
const MONGO_URI    = process.env.MONGO_URI    || 'mongodb://127.0.0.1:27017/coderspalace';
const JWT_SECRET   = process.env.JWT_SECRET   || 'cp-jwt-secret-2026';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'cp-admin-secret-2026';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const GOOGLE_CLIENT_ID     = process.env.GOOGLE_CLIENT_ID     || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

app.use(cors({
  origin: function(origin, callback) {
    const allowed = [
      'http://localhost:5173',
      'http://localhost:5174',
      FRONTEND_URL,
    ].filter(Boolean);

    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    // Allow any vercel.app subdomain for preview deployments
    if (origin.endsWith('.vercel.app') || allowed.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// ── Connect to MongoDB ───────────────────────────────────────
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Seed default admin if none exists
    const exists = await Admin.findOne({ username: 'admin' });
    if (!exists) {
      await Admin.create({ username: 'admin', password: 'password' });
      console.log('Default admin created  →  admin / password');
    }
  })
  .catch((err) => console.error('MongoDB error:', err));

// ── Google OAuth ─────────────────────────────────────────────
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:  `${process.env.SERVER_URL || 'http://localhost:4000'}/api/auth/google/callback`,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) return done(new Error('No email from Google'));

      let user = await User.findOne({ email });
      if (!user) {
        // Create user without password (Google users don't need one)
        user = new User({
          name:     profile.displayName || email.split('@')[0],
          email,
          password: Math.random().toString(36) + Math.random().toString(36), // random, never used
          phone:    '',
        });
        // Skip password hashing for random password — set directly
        user.password = require('bcryptjs').hashSync(user.password, 10);
        await user.save({ validateBeforeSave: false });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // GET /api/auth/google
  app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
  );

  // GET /api/auth/google/callback
  app.get('/api/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${FRONTEND_URL}?auth=error` }),
    (req, res) => {
      const user = req.user;
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      // Redirect to frontend with token in URL — frontend picks it up
      res.redirect(`${FRONTEND_URL}/contact?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&id=${user._id}`);
    }
  );
} else {
  console.log('Google OAuth not configured — add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env');
}

// ── Auth middleware ───────────────────────────────────────────
function userAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.admin = jwt.verify(token, ADMIN_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ════════════════════════════════════════════════════════════
//  USER AUTH
// ════════════════════════════════════════════════════════════

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'name, email and password are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const user = await User.create({ name, email, password, phone });
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', userAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// ════════════════════════════════════════════════════════════
//  CONTACT / REQUESTS  (user must be logged in)
// ════════════════════════════════════════════════════════════

// POST /api/contact  — public, no auth required
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (!phone && !email) return res.status(400).json({ error: 'Phone or email is required' });

    const request = await Request.create({
      userId:    null,
      userName:  name,
      userEmail: email || '',
      userPhone: phone || '',
      service:   service || 'General Inquiry',
      message:   message || '',
    });
    res.status(201).json({ success: true, id: request._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/my-requests  — user sees their own requests
app.get('/api/my-requests', userAuth, async (req, res) => {
  const requests = await Request.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(requests);
});

// ════════════════════════════════════════════════════════════
//  ADMIN AUTH
// ════════════════════════════════════════════════════════════

// POST /api/admin/login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await admin.comparePassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username }, ADMIN_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ════════════════════════════════════════════════════════════
//  ADMIN — REQUESTS
// ════════════════════════════════════════════════════════════

// ── Helper: normalize a Request doc for the admin UI ─────────
function normalizeRequest(doc) {
  const r = doc.toObject ? doc.toObject() : doc;
  return {
    id:        r._id,
    name:      r.userName,
    email:     r.userEmail,
    phone:     r.userPhone,
    service:   r.service,
    message:   r.message,
    status:    r.status,
    adminNote: r.adminNote,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    userId:    r.userId,
  };
}

// GET /api/admin/requests
app.get('/api/admin/requests', adminAuth, async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (search) {
      const q = new RegExp(search, 'i');
      filter.$or = [{ userName: q }, { userEmail: q }, { message: q }, { service: q }];
    }
    const requests = await Request.find(filter).sort({ createdAt: -1 });
    res.json(requests.map(normalizeRequest));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/stats
app.get('/api/admin/stats', adminAuth, async (req, res) => {
  try {
    const [total, pending, accepted, inProgress, delivered] = await Promise.all([
      Request.countDocuments(),
      Request.countDocuments({ status: 'pending' }),
      Request.countDocuments({ status: 'accepted' }),
      Request.countDocuments({ status: 'in_progress' }),
      Request.countDocuments({ status: 'delivered' }),
    ]);
    res.json({ total, pending, accepted, inProgress, delivered });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/admin/requests/:id
app.patch('/api/admin/requests/:id', adminAuth, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const update = {};
    if (status)              update.status    = status;
    if (adminNote !== undefined) update.adminNote = adminNote;
    const request = await Request.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!request) return res.status(404).json({ error: 'Not found' });
    res.json(normalizeRequest(request));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/requests/:id
app.delete('/api/admin/requests/:id', adminAuth, async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/users
app.get('/api/admin/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/change-password
app.post('/api/admin/change-password', adminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findOne({ username: req.admin.username });
    const valid = await admin.comparePassword(currentPassword);
    if (!valid) return res.status(401).json({ error: 'Current password is wrong' });
    admin.password = newPassword;
    await admin.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ════════════════════════════════════════════════════════════
//  PROJECTS  (public read, admin write)
// ════════════════════════════════════════════════════════════

// GET /api/projects  — public
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/admin/projects/analyze  — MUST be before /:id routes
app.post('/api/admin/projects/analyze', adminAuth, async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ error: 'repoUrl is required' });

    const response = await fetch('https://repoexplain.vercel.app/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl }),
    });

    if (!response.ok) throw new Error('RepoExplain API failed');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/projects  — create
app.post('/api/admin/projects', adminAuth, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/admin/projects/:id  — update
app.patch('/api/admin/projects/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/admin/projects/:id
app.delete('/api/admin/projects/:id', adminAuth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, () => console.log(`Coders Palace API → http://localhost:${PORT}`));

const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());

// Configure session with security improvements
app.use(session({
  secret: process.env.SESSION_SECRET || 'b224bf80e52ce64eb5d34f3acf0bbc16e9d2f94d365e715a61b14911d9c21469f66c655c9cda58e9b4ef04cb13d1f355ffb4c217e4311be20cc23f96ddcd79a1',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
  }
}));

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure secret

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Middleware to verify token and maintain session
function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
}

// Function to delete existing sessions for a user
async function deleteSessionsByUserId(userId) {
  const query = 'DELETE FROM sessions WHERE user_id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting sessions:', err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

// Signup route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Save the password without hashing
    const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, password], async (error, userResult) => {
      if (error) return res.status(500).json({ error: 'Database error' });

      const newUser = { id: userResult.insertId, email }; // Create user object
      const token = generateToken(newUser); // Generate JWT token
      await createSession(newUser.id, token); // Create a session

      res.status(201).json({ token, user: newUser });
    });
  });
});

// Login route without password hashing
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (error, results) => {
    if (error) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];

    // Compare the plain password (no hashing)
    if (password !== user.password) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user);

    // Delete existing sessions for the user
    await deleteSessionsByUserId(user.id);

    // Store JWT in a secure, HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    await createSession(user.id, token); // Create a session

    res.status(200).json({ message: 'Login successful' });
  });
});

// Google signup route
app.post('/api/google-signup', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      // Create a new user if they do not exist
      const newUser = await createUserFromGoogle(email);
      
      // Create a session for the new user
      const token = generateToken(newUser.id);
      await createSession(newUser.id, token); // Ensure session is created

      res.status(201).json({ token, user: newUser });
    } else {
      // User already exists, create a session
      const token = generateToken(user.id);
      await createSession(user.id, token); // Ensure session is created

      res.status(200).json({ token, user });
    }
  } catch (error) {
    res.status(500).json({ error: 'Google signup failed' });
  }
});

// Google login route
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, email, name } = ticket.getPayload();

    if (email_verified) {
      const checkQuery = 'SELECT * FROM users WHERE email = ?';
      db.query(checkQuery, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (result.length > 0) {
          const user = result[0];
          const jwtToken = generateToken(user);
          res.cookie('token', jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

          // Delete existing sessions for the user
          await deleteSessionsByUserId(user.id);

          await createSession(user.id, jwtToken); // Create a session
          return res.status(200).json({ message: 'Login successful' });
        } else {
          const insertQuery = 'INSERT INTO users (email, firstname) VALUES (?, ?)';
          db.query(insertQuery, [email, name], async (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            const newUser = { id: result.insertId, email };
            const jwtToken = generateToken(newUser);
            res.cookie('token', jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            await createSession(newUser.id, jwtToken); // Create a session
            return res.status(201).json({ message: 'User created successfully' });
          });
        }
      });
    } else {
      return res.status(400).json({ error: 'Email not verified' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Authentication error' });
  }
});

// Unified createSession function
async function createSession(userId, token) {
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 60 * 60 * 1000); // Example: 1 hour expiration

  const query = 'INSERT INTO sessions (user_id, token, created_at, expires_at) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, token, createdAt, expiresAt], (err) => {
    if (err) {
      console.error('Error creating session:', err);
    }
  });
}

// Find user by email function
async function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

// Route to handle profile update
app.put('/api/profile', authenticateToken, (req, res) => {
  const { firstName, lastName, email } = req.body;
  const userId = req.user.id;

  const query = 'UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?';
  db.query(query, [firstName, lastName, email, userId], (err) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

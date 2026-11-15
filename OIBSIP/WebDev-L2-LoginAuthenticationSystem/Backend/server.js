const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend')));

app.use(
  session({
    secret: 'super-secret-auth-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 
    }
  })
);

function getUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || !username.trim()) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  if (password.length < 8 || !/\d/.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long and contain at least 1 number.'
    });
  }

  const users = getUsers();
  const cleanUsername = username.trim();

  const exists = users.some(
    (u) => u.username.toLowerCase() === cleanUsername.toLowerCase()
  );
  if (exists) {
    return res.status(409).json({ message: 'Username or email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username: cleanUsername, passwordHash: hashedPassword });
  saveUsers(users);

  res.status(201).json({ message: 'Registration successful! Redirecting to login...' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || !username.trim()) {
    return res.status(400).json({ message: 'Please enter both username/email and password.' });
  }

  const users = getUsers();
  const user = users.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid username/email or password.' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username/email or password.' });
  }

  req.session.user = {
    username: user.username,
    loggedInAt: new Date().toLocaleString()
  };

  res.json({ message: 'Login successful!' });
});

app.get('/api/session', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ authenticated: false });
  }
  res.json({ authenticated: true, user: req.session.user });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
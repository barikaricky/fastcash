import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory user storage (replace with database in production)
const users: any[] = [];

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Auth Service',
    timestamp: new Date().toISOString()
  });
});

// Register endpoint
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, phone, password, kycDocumentId, enableBiometrics, totpSecret } = req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email || u.phone === phone);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: 'User already exists'
    });
  }

  // Create new user
  const newUser = {
    id: 'user_' + Date.now(),
    fullName,
    email,
    phone,
    password, // In production, hash this with bcrypt
    kycDocumentId,
    enableBiometrics,
    totpSecret,
    createdAt: new Date().toISOString(),
    verified: true
  };

  users.push(newUser);

  // Generate JWT token
  const token = 'jwt_' + Date.now() + '_' + newUser.id;

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone
      }
    }
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { identifier, password, enableBiometrics } = req.body;

  // Validate required fields
  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email/phone and password are required'
    });
  }

  // Find user by email or phone
  const user = users.find(u => u.email === identifier || u.phone === identifier);

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  // Check password (in production, use bcrypt.compare)
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  // Generate JWT token
  const token = 'jwt_' + Date.now() + '_' + user.id;

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      requiresMFA: enableBiometrics || user.enableBiometrics,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      }
    }
  });
});

// Verify token endpoint
app.post('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'No token provided'
    });
  }

  const token = authHeader.split(' ')[1];

  // Simple token validation (in production, use JWT verification)
  if (token.startsWith('jwt_') || token.startsWith('demo-jwt-token')) {
    return res.json({
      success: true,
      valid: true
    });
  }

  res.status(401).json({
    success: false,
    error: 'Invalid token'
  });
});

// Check email availability
app.post('/api/auth/check-email', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'Email is required'
    });
  }

  const exists = users.some(u => u.email === email);

  res.json({
    success: true,
    available: !exists
  });
});

// Google Login endpoint
app.post('/api/auth/google-login', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'Google token is required'
    });
  }

  try {
    // In production, verify the token with Google
    // For now, we'll simulate it
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: GOOGLE_CLIENT_ID
    // });
    // const payload = ticket.getPayload();

    // Simulated Google user data
    const googleUser = {
      email: 'google' + Date.now() + '@gmail.com',
      name: 'Google User',
      picture: 'https://via.placeholder.com/150'
    };

    // Check if user exists
    let user = users.find(u => u.email === googleUser.email);

    if (!user) {
      // Create new user
      user = {
        id: 'user_' + Date.now(),
        fullName: googleUser.name,
        email: googleUser.email,
        phone: null,
        password: null, // No password for OAuth users
        googleId: token,
        picture: googleUser.picture,
        createdAt: new Date().toISOString(),
        verified: true
      };
      users.push(user);
    }

    // Generate JWT token
    const jwtToken = 'jwt_' + Date.now() + '_' + user.id;

    res.json({
      success: true,
      message: 'Google login successful',
      data: {
        token: jwtToken,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          picture: user.picture
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Google authentication failed'
    });
  }
});

// Google Signup endpoint
app.post('/api/auth/google-signup', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'Google token is required'
    });
  }

  try {
    // Simulated Google user data
    const googleUser = {
      email: 'google' + Date.now() + '@gmail.com',
      name: 'Google User',
      picture: 'https://via.placeholder.com/150'
    };

    // Check if user already exists
    const existingUser = users.find(u => u.email === googleUser.email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists. Please login instead.'
      });
    }

    // Create new user
    const newUser = {
      id: 'user_' + Date.now(),
      fullName: googleUser.name,
      email: googleUser.email,
      phone: null,
      password: null,
      googleId: token,
      picture: googleUser.picture,
      kycDocumentId: null,
      createdAt: new Date().toISOString(),
      verified: true
    };

    users.push(newUser);

    // Generate JWT token
    const jwtToken = 'jwt_' + Date.now() + '_' + newUser.id;

    res.status(201).json({
      success: true,
      message: 'Google signup successful',
      data: {
        token: jwtToken,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          picture: newUser.picture
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Google signup failed'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🔐 Auth Service running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`🔑 Login: POST http://localhost:${PORT}/api/auth/login`);
});

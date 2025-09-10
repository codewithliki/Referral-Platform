const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/User');
const auth = require('../Middleware/auth');

// POST /auth/signup
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Provide valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email.toLowerCase() });
      if (user) return res.status(400).json({ msg: 'Email already registered' });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user = new User({ email: email.toLowerCase(), password: hash });
      await user.save();

      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'LIKI', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// POST /auth/login
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'LIKI', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// GET /auth/me
router.get('/me', auth, async (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
    createdAt: req.user.createdAt
  });
});

module.exports = router;

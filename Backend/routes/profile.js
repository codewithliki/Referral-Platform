const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const Profile = require('../Models/profile');
const { body, validationResult } = require('express-validator');

// POST /profile -> create or update profile for current user
router.post(
  '/',
  auth,
  [
    body('fullName').optional().isString(),
    body('skills').optional().isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const payload = { ...req.body, user: req.user._id, updatedAt: new Date() };
      const profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: payload },
        { new: true, upsert: true }
      ).populate('user', 'email');
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// GET /profile -> get current user's profile
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'email');
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

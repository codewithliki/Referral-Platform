const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const Referral = require('../Models/Referral');
const { body, validationResult } = require('express-validator');

// POST /referral -> create referral
router.post(
  '/',
  auth,
  [
    body('title').notEmpty(),
    body('company').notEmpty(),
    body('description').optional().isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const r = new Referral({
        user: req.user._id,
        title: req.body.title,
        company: req.body.company,
        location: req.body.location || '',
        description: req.body.description || '',
        status: req.body.status || 'open'
      });
      await r.save();
      res.json(r);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// GET /referral -> list current user's referrals (MVP)
router.get('/', auth, async (req, res) => {
  try {
    const list = await Referral.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /referral/:id -> update (owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) return res.status(404).json({ msg: 'Referral not found' });
    if (referral.user.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Not allowed' });

    referral.title = req.body.title ?? referral.title;
    referral.company = req.body.company ?? referral.company;
    referral.location = req.body.location ?? referral.location;
    referral.description = req.body.description ?? referral.description;
    referral.status = req.body.status ?? referral.status;
    referral.updatedAt = new Date();
    await referral.save();
    res.json(referral);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /referral/:id -> delete (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) return res.status(404).json({ msg: 'Referral not found' });
    if (referral.user.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Not allowed' });
    await referral.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

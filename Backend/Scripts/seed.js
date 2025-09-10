require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const connectDB = require('../config/db');

const seed = async () => {
  try {
    await connectDB(); // connects using process.env.MONGO_URI
    const email = 'hire-me@anshumat.org';
    const password = 'HireMe@2025!';

    let user = await User.findOne({ email });
    if (user) {
      console.log('Demo user already exists:', email);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user = new User({ email, password: hash, role: 'user' });
    await user.save();
    console.log('Seeded demo user ->', email, '/', password);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();

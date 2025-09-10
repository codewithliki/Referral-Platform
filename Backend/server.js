require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const referralRoutes = require('./routes/refferal');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// connect to mongo
connectDB();

app.get('/', (req, res) => res.json({ ok: true, msg: 'Referral API running' }));

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/referral', referralRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

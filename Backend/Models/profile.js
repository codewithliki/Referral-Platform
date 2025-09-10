  const mongoose = require('mongoose');

  const EducationSchema = new mongoose.Schema({
    institution: String,
    degree: String,
    from: String,
    to: String,
    details: String
  }, { _id: false });

  const EmploymentSchema = new mongoose.Schema({
    company: String,
    role: String,
    from: String,
    to: String,
    details: String
  }, { _id: false });

  const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fullName: String,
    location: String,
    phone: String,
    summary: String,
    education: [EducationSchema],
    employment: [EmploymentSchema],
    skills: [String],
    updatedAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Profile', ProfileSchema);

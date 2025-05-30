const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Load your User model
const User = require('../models/user');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
      console.log('Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
import mongoose from 'mongoose';
import { hash } from 'argon2';
import User from '../models/user.model.js';
import { MONGO_URI, ADMIN_USER, ADMIN_PASSWORD } from '../config/env.config.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seed.');
      return;
    }
    const hashedPassword = await hash(ADMIN_PASSWORD);
    const admin = new User({
      email: ADMIN_USER,
      password: hashedPassword,
      role: 'admin',
      active: true,
      createdBy: null,
    });
    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

seedAdmin();
